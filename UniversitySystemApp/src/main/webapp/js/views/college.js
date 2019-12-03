var collegeView = {
    dependencies: {
        universityAll: []
    },
    panel: {
        id: "collegePanel",
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
                        template: "<span class='fa fa-graduation-cap'></span> Fakulteti"
                    },
                    {},
                    {
                        id: "addCollegeBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novi fakultet",
                        icon: "plus-circle",
                        click: 'collegeView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "collegeTable",
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
                    {
                        id: "universityId",
                        fillspace: true,
                        hidden: true
                    },
                    {
                        id: "universityName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Univerzitet", {
                                content: "textFilter"
                            }
                        ]
                    }
                ],
                select: "row",
                navigation: true,
                url: "hub/college/custom/",
                on:
                    {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    }
            }
        ]
    },

    preloadDependencies: function () {
        var that = this;
        util.preloader.inc();

        var universityAllPromise = connection.sendAjax("GET", "/hub/university/values/",
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

    },

    postInit: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "collegePanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "collegeContextMenu",
            width: 235,
            data: [
                {
                    id: "1",
                    value: "Izmijenite",
                    icon: "pencil-square-o"
                },
                {
                    id: "2",
                    value: "Obrišite",
                    icon: "trash"
                }
            ],
            master: $$("collegeTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            collegeView.showChangeCollegeDialog($$("collegeTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("fakulteta", "fakultet")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "hub/college/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("collegeTable").remove(context.id.row);
                                                util.messages.showMessage("Fakultet je uspješno obrisan.");
                                            } else {
                                                util.messages.showErrorMessage("Fakultet nije uspješno obrisan.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Fakultet nije uspješno obrisan.");
                                        });
                                }
                            };
                            webix.confirm(delBox);
                            break;
                    }
                }
            }
        });
    },

    selectPanel: function () {
        util.preloader.reset();
        this.preloadDependencies();
    },

    addDialog: {
        view: "popup",
        id: "addCollegeDialog",
        modal: true,
        position: "center",
        body: {
            id: "addCollegeInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-graduation-cap'></span> Dodavanje fakulteta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addCollegeDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addCollegeForm",
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
                            invalidMessage: "Molimo Vas da unesete naziv fakulteta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu fakulteta.",
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
                            view: "richselect",
                            id: "universityId",
                            name: "universityId",
                            label: "Univerzitet:",
                            invalidMessage: "Molimo Vas da odaberete naziv univerziteta.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveCollege",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "collegeView.save",
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
                                $$('addCollegeForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addCollegeForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
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
        if (util.popupIsntAlreadyOpened("addCollegeDialog")) {
            webix.ui(webix.copy(collegeView.addDialog)).show();

            $$("universityId").define("options", collegeView.dependencies.universityAll);

            webix.UIManager.setFocus("name");
        }
    },

    save: function () {
        var form = $$("addCollegeForm");

        if (form.validate()) {
            var newCollege = {
                name: form.getValues().name,
                address: form.getValues().address,
                dateOfFoundation: new Date(form.getValues().dateOfFoundation),
                universityId: form.getValues().universityId
            };
            connection.sendAjax("POST", "hub/college/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('collegeTable').add(jsonData);
                    util.messages.showMessage("Novi fakultet je uspješno dodat.");
                },
                function () {
                    util.messages.showErrorMessage("Novi fakultet nije uspješno dodat.");
                }, newCollege);

            util.dismissDialog('addCollegeDialog');
        }
    },

    changeCollegeDialog: {
        view: "popup",
        id: "changeCollegeDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeCollegeInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-graduation-cap'></span> Izmjena fakulteta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeCollegeDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeCollegeForm",
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
                            invalidMessage: "Molimo Vas da unesete naziv fakulteta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu fakulteta.",
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
                            view: "richselect",
                            id: "universityId",
                            name: "universityId",
                            label: "Univerzitet:",
                            invalidMessage: "Molimo Vas da odaberete naziv univerziteta.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveCollege",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "collegeView.saveChangedCollege",
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
                                $$('addCollegeForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addCollegeForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showChangeCollegeDialog: function (college) {
        if (util.popupIsntAlreadyOpened("changeCollegeDialog")) {
            webix.ui(webix.copy(collegeView.changeCollegeDialog)).show();
            var form = $$("changeCollegeForm");

            $$("universityId").define("options", collegeView.dependencies.universityAll);

            form.elements.id.setValue(college.id);
            form.elements.name.setValue(college.name);
            form.elements.address.setValue(college.address);
            form.elements.dateOfFoundation.setValue(college.dateOfFoundation);
            form.elements.universityId.setValue(college.universityId);

            webix.UIManager.setFocus("name");
        }
    },

    saveChangedCollege: function () {
        var form = $$("changeCollegeForm");

        if (form.validate()) {
            var newCollege = {
                id: form.getValues().id,
                name: form.getValues().name,
                address: form.getValues().address,
                dateOfFoundation: new Date(form.getValues().dateOfFoundation),
                universityId: form.getValues().universityId
            };

            connection.sendAjax("PUT", "hub/college/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('collegeTable').updateItem(newCollege.id, jsonData);
                    util.messages.showMessage("Fakultet je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Fakultet nije uspješno promijenjen.");
                }, newCollege);

            util.dismissDialog('changeCollegeDialog');
        }
    }
};
