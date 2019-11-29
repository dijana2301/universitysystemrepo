schoolSubjectView = {
    dependencies: {
        studyProgramAll: []
    },
    panel: {
        id: "schoolSubjectPanel",
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
                        template: "<span class='fa fa-book'></span> Školski predmeti"
                    },
                    {},
                    {
                        id: "addSchoolSubjectBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novi školski predmet",
                        icon: "plus-circle",
                        click: 'schoolSubjectView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "schoolSubjectTable",
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
                        id: "studyProgramId",
                        fillspace: true,
                        hidden: true
                    },
                    {
                        id: "studyProgramName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Naziv studijskog programa", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "ects",
                        fillspace: true,
                        editable: false,
                        sort: "integer",
                        header: [
                            "ECTS", {
                                content: "textFilter"
                            }
                        ]
                    }
                ],
                select: "row",
                navigation: true,
                url: "schoolSubject/custom/",
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

        var studyProgramAllPromise = connection.sendAjax("GET", "/studyProgram/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.studyProgramAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o studijskim programima.");
            });

        webix.promise.all([studyProgramAllPromise]).then(function (results) {
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
        rightPanel = "schoolSubjectPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "schoolSubjectContextMenu",
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
            master: $$("schoolSubjectTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            schoolSubjectView.showChangeSchoolSubjectDialog($$("schoolSubjectTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("školskih predmeta", "školskog predmeta")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "schoolSubject/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("schoolSubjectTable").remove(context.id.row);
                                                util.messages.showMessage("Školski predmet je uspješno obrisan.");
                                            } else {
                                                util.messages.showErrorMessage("Školski predmet nije uspješno obrisan.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Školski predmet nije uspješno obrisan.");
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
        id: "addSchoolSubjectDialog",
        modal: true,
        position: "center",
        body: {
            id: "addSchoolSubjectInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='fa fa-book'></span> Dodavanje školskog predmeta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addSchoolSubjectDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addSchoolSubjectForm",
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
                            invalidMessage: "Molimo Vas da unesete naziv školskog predmeta.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "studyProgramId",
                            name: "studyProgramId",
                            label: "Naziv studijskog programa:",
                            invalidMessage: "Molimo Vas da odaberete naziv studijskog programa kojem pripada.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "ects",
                            name: "ects",
                            label: "Broj ECTS bodova:",
                            invalidMessage: "Molimo Vas da unesete broj ECTS bodova.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveSchoolSubject",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "schoolSubjectView.save",
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
                                $$('addSchoolSubjectForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
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
        if (util.popupIsntAlreadyOpened("addSchoolSubjectDialog")) {
            webix.ui(webix.copy(schoolSubjectView.addDialog)).show();

            $$("studyProgramId").define("options", schoolSubjectView.dependencies.studyProgramAll);

            webix.UIManager.setFocus("name");
        }
    },

    save: function () {
        var form = $$("addSchoolSubjectForm");

        if (form.validate()) {
            var newSchoolSubject = {
                name: form.getValues().name,
                studyProgramId: form.getValues().studyProgramId,
                ects: form.getValues().ects
            };
            connection.sendAjax("POST", "schoolSubject/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('schoolSubjectTable').add(jsonData);
                    util.messages.showMessage("Novi studijski program je uspješno dodat.");
                },
                function () {
                    util.messages.showErrorMessage("Novi studijski program nije uspješno dodat.");
                }, newSchoolSubject);

            util.dismissDialog('addSchoolSubjectDialog');
        }
    },

    changeSchoolSubjectDialog: {
        view: "popup",
        id: "changeSchoolSubjectDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeSchoolSubjectInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='fa fa-book'></span> Izmjena školskog predmeta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeSchoolSubjectDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeSchoolSubjectForm",
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
                            invalidMessage: "Molimo Vas da unesete naziv školskog predmeta.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "studyProgramId",
                            name: "studyProgramId",
                            label: "Naziv studijskog programa:",
                            invalidMessage: "Molimo Vas da odaberete naziv univerziteta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "ects",
                            name: "ects",
                            label: "ECTS bodovi:",
                            invalidMessage: "Molimo Vas da unesete ECTS bodove.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveSchoolSubject",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "schoolSubjectView.saveChangedSchoolSubject",
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
                                $$('addSchoolSubjectForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showChangeSchoolSubjectDialog: function (schoolSubject) {
        if (util.popupIsntAlreadyOpened("changeSchoolSubjectDialog")) {
            webix.ui(webix.copy(schoolSubjectView.changeSchoolSubjectDialog)).show();
            var form = $$("changeSchoolSubjectForm");

            $$("studyProgramId").define("options", schoolSubjectView.dependencies.studyProgramAll);

            form.elements.id.setValue(schoolSubject.id);
            form.elements.name.setValue(schoolSubject.name);
            form.elements.studyProgramId.setValue(schoolSubject.studyProgramId);
            form.elements.ects.setValue(schoolSubject.ects);


            webix.UIManager.setFocus("name");
        }
    },

    saveChangedSchoolSubject: function () {
        var form = $$("changeSchoolSubjectForm");

        if (form.validate()) {
            var newSchoolSubject = {
                id: form.getValues().id,
                name: form.getValues().name,
                studyProgramId: form.getValues().studyProgramId,
                ects: form.getValues().ects
            };

            connection.sendAjax("PUT", "schoolSubject/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('schoolSubjectTable').updateItem(newSchoolSubject.id, jsonData);
                    util.messages.showMessage("Školski predmet je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Školski predmet nije uspješno promijenjen.");
                }, newSchoolSubject);

            util.dismissDialog('changeSchoolSubjectDialog');
        }
    }
};

