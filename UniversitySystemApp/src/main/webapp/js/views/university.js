var universityView = {
    /*  dependencies:{
         universityAll: []
       }, */
    panel: {
        id: "universityPanel",
        adjust: true,
        rows: [
            {
                view: "toolbar",
                padding: 8,
                css: "panelToolbar",
                cols: [
                    {
                        view: "label",
                        width: 400,
                        template: "<span class='fa fa-university'></span> Univerziteti"
                    },
                    {},
                    {
                        id: "addUniversityBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novi Univerzitet",
                        icon: "plus-circle",
                        click: 'universityView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "universityTable",
                view: "datatable",
                css: "webixDatatable",
                editable: true,
                editaction: "click",
                multiselect: false,
                resizeColumn: true,
                resizeRow: true,
                onContext: {},
                rowHeight: 50,
                columns: [
                    {
                        id: "id",
                        hidden: true,
                        fillspace: true,
                    },
                    {
                        id: "name",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Naziv", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "address",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Adresa", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "dateOfFoundation",
                        fillspace: true,
                        editable: false,
                        sort: "date",
                        format: webix.Date.dateToStr("%d.%m.%Y"),
                        header: [
                            "Datum osnivanja", {
                                content: "dateFilter"
                            }
                        ]
                    },

                ],
                select: "row",
                navigation: true,
                url: "university/",
                on:
                    {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    }
            }
        ]
    },
    /*
        preloadDependencies: function () {
            var that = this;
            util.preloader.inc();

            var universityAllPromise = connection.sendAjax("GET", "/university/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    that.dependencies.universityAll = jsonData;
                },
                function () {
                    util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o univerzitetima.");
                });

            webix.promise.all([universityAllPromise]).then(function (results) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i] == false) {
                        util.preloader.reset();
                        return;
                    }
                }
                that.postInit();
            });

        }, */

    postInit: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "universityPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "universityContextMenu",
            width: 235,
            data: [
                {
                    id: "1",
                    value: "Izmijenite",
                    icon: "pencil-square-o"
                }
            ],
            master: $$("universityTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    universityView.showChangeUniversityDialog($$("universityTable").getItem(context.id.row));

                }
            }
        });
    },

    selectPanel: function () {
        util.preloader.reset();
        this.postInit();
    },

    addDialog: {
        view: "popup",
        id: "addUniversityDialog",
        modal: true,
        position: "center",
        body: {
            id: "addUniversityInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-university'></span> Dodavanje Univerziteta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addUniversityDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addUniversityForm",
                    width: 600,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 18
                    },
                    elements: [
                        {
                            view: "text",
                            id: "name",
                            name: "name",
                            label: "Naziv:",
                            invalidMessage: "Molimo Vas da unesete naziv Univerziteta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu Univerziteta.",
                            required: true
                        },
                        {
                            view: "datepicker",
                            id: "dateOfFoundation",
                            name: "dateOfFoundation",
                            label: "Datum osnivanja:",
                            format: webix.Date.dateToStr("%d.%m.%Y"),
                            stringResult: true,
                            invalidMessage: "Molimo Vas da unesete datum osnivanja Univerziteta.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveUniversity",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "universityView.save",
                                    hotkey: "enter",
                                    width: 375
                                }
                            ]
                        }

                    ],
                    rules: {
                        "name": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addUniversityForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addUniversityForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showAddDialog: function () {
        if (util.popupIsntAlreadyOpened("addUniversityDialog")) {
            webix.ui(webix.copy(universityView.addDialog)).show();


            webix.UIManager.setFocus("name");
        }
    },

    save: function () {
        var form = $$("addUniversityForm");

        if (form.validate()) {
            var newUniversity = {
                name: form.getValues().name,
                address: form.getValues().address,
                dateOfFoundation: new Date(form.getValues().dateOfFoundation)
            };
            connection.sendAjax("POST", "university/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('universityTable').add(jsonData);
                    util.messages.showMessage("Novi Univerzitet je uspješno dodat.");
                },
                function () {
                    util.messages.showErrorMessage("Novi Univerzitet nije uspješno dodat.");
                }, newUniversity);

            util.dismissDialog('addUniversityDialog');
        }
    },

    changeUniversityDialog: {
        view: "popup",
        id: "changeUniversityDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeUniversityInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-university'></span> Izmjena Univerziteta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeUniversityDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeUniversityForm",
                    width: 600,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 18
                    },
                    elements: [
                        {
                            view: "text",
                            id: "id",
                            name: "id",
                            hidden: true
                        },
                        {
                            view: "text",
                            id: "name",
                            name: "name",
                            label: "Naziv:",
                            invalidMessage: "Molimo Vas da unesete naziv Univerziteta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu Univerziteta.",
                            required: true
                        },
                        {
                            view: "datepicker",
                            id: "dateOfFoundation",
                            name: "dateOfFoundation",
                            label: "Datum osnivanja:",
                            format: webix.Date.dateToStr("%d.%m.%Y"),
                            stringResult: true,
                            invalidMessage: "Molimo Vas da unesete datum osnivanja fakulteta.",
                            required: true
                        },

                        {
                            margin: 5,
                            cols: [
                                {},
                                {},
                                {
                                    id: "saveUniversity",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "universityView.saveChangedUniversity",
                                    hotkey: "enter",
                                    width: 370
                                }
                            ]
                        }
                    ],
                    rules: {
                        "name": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addUniversityForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addUniversityForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showChangeUniversityDialog: function (university) {
        if (util.popupIsntAlreadyOpened("changeUniversityDialog")) {
            webix.ui(webix.copy(universityView.changeUniversityDialog)).show();
            var form = $$("changeUniversityForm");


            form.elements.id.setValue(university.id);
            form.elements.name.setValue(university.name);
            form.elements.address.setValue(university.address);
            form.elements.dateOfFoundation.setValue(university.dateOfFoundation);

            webix.UIManager.setFocus("name");
        }
    },

    saveChangedUniversity: function () {
        var form = $$("changeUniversityForm");

        if (form.validate()) {
            var newUniversity = {
                id: form.getValues().id,
                name: form.getValues().name,
                address: form.getValues().address,
                dateOfFoundation: new Date(form.getValues().dateOfFoundation),

            };

            connection.sendAjax("PUT", "university/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('universityTable').updateItem(newUniversity.id, jsonData);
                    util.messages.showMessage("Univerzitet je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Univerzitet nije uspješno promijenjen.");
                }, newUniversity);

            util.dismissDialog('changeUniversityDialog');
        }
    }

};