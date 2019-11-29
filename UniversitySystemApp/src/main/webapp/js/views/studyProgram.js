var studyProgramView = {
    dependencies: {
        collegeAll: []
    },
    panel: {
        id: "studyProgramPanel",
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
                        template: "<span class='fa fa-list-alt'></span>Studijski programi"
                    },
                    {},
                    {
                        id: "addStudyProgramBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novi studijski program",
                        icon: "plus-circle",
                        click: 'studyProgramView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "studyProgramTable",
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
                        id: "numOfYears",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Broj godine", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "ects",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "ECTS", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "collegeId",
                        fillspace: true,
                        hidden: true
                    },
                    {
                        id: "collegeName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Naziv fakulteta", {
                                content: "textFilter"
                            }
                        ]
                    }
                ],
                select: "row",
                navigation: true,
                url: "studyProgram/custom/",
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

        var collegeAllPromise = connection.sendAjax("GET", "/college/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.collegeAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o fakultetima.");
            });

        webix.promise.all([collegeAllPromise]).then(function (results) {
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
        rightPanel = "studyProgramPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "studyProgramContextMenu",
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
            master: $$("studyProgramTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            studyProgramView.showChangeStudyProgramDialog($$("studyProgramTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("studijskog programa", "studijskih programa")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "studyProgram/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("studyProgramTable").remove(context.id.row);
                                                util.messages.showMessage("Studijski program je uspješno obrisan.");
                                            } else {
                                                util.messages.showErrorMessage("Studijski program nije uspješno obrisan.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Studijski program nije uspješno obrisan.");
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
        id: "addStudyProgramDialog",
        modal: true,
        position: "center",
        body: {
            id: "addStudyProgramInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa fa-list-alt'></span> Dodavanje studijskog programa",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addStudyProgramDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addStudyProgramForm",
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
                            label: "Naziv",
                            invalidMessage: "Molimo Vas da unesete naziv studijskog programa.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "numOfYears",
                            name: "numOfYears",
                            label: "Broj godina:",
                            invalidMessage: "Molimo Vas da unesete broj godina studija.",
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
                            view: "richselect",
                            id: "collegeId",
                            name: "collegeId",
                            label: "Naziv fakulteta:",
                            invalidMessage: "Molimo Vas da odaberete naziv fakulteta.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveStudyProgram",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "studyProgramView.save",
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
                            if (value.length > 45) {
                                $$('addStudyProgramForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
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
        if (util.popupIsntAlreadyOpened("addStudyProgramDialog")) {
            webix.ui(webix.copy(studyProgramView.addDialog)).show();

            $$("collegeId").define("options", studyProgramView.dependencies.collegeAll);

            webix.UIManager.setFocus("name");
        }
    },

    save: function () {
        var form = $$("addStudyProgramForm");

        if (form.validate()) {
            var newStudyProgram = {
                name: form.getValues().name,
                numOfYears: form.getValues().numOfYears,
                ects: form.getValues().ects,
                collegeId: form.getValues().collegeId
            };
            connection.sendAjax("POST", "studyProgram/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('studyProgramTable').add(jsonData);
                    util.messages.showMessage("Novi studijski program je uspješno dodat.");
                },
                function () {
                    util.messages.showErrorMessage("Novi studijski program nije uspješno dodat.");
                }, newStudyProgram);

            util.dismissDialog('addStudyProgramDialog');
        }
    },
    changeStudyProgramDialog: {
        view: "popup",
        id: "changeStudyProgramDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeStudyProgramInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='fa fa-list-alt'></span> Izmjena studijskog programa",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeStudyProgramDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeStudyProgramForm",
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
                            invalidMessage: "Molimo Vas da unesete naziv studijskog programa.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "numOfYears",
                            name: "numOfYears",
                            label: "Broj godina:",
                            invalidMessage: "Molimo Vas da unesete broj godina studijskog programa.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "ects",
                            name: "ects",
                            label: "ECTS:",
                            invalidMessage: "Molimo Vas da unesete broj ECTS bodova.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "collegeId",
                            name: "collegeId",
                            label: "Naziv fakulteta:",
                            invalidMessage: "Molimo Vas da odaberete naziv fakulteta.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveStudyProgram",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "studyProgramView.saveChangedStudyProgram",
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
                                $$('addStudyProgramForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showChangeStudyProgramDialog: function (studyProgram) {
        if (util.popupIsntAlreadyOpened("changeStudyProgramDialog")) {
            webix.ui(webix.copy(studyProgramView.changeStudyProgramDialog)).show();
            var form = $$("changeStudyProgramForm");

            $$("collegeId").define("options", studyProgramView.dependencies.collegeAll);

            form.elements.id.setValue(studyProgram.id);
            form.elements.name.setValue(studyProgram.name);
            form.elements.numOfYears.setValue(studyProgram.numOfYears);
            form.elements.ects.setValue(studyProgram.ects);
            form.elements.collegeId.setValue(studyProgram.collegeId);

            webix.UIManager.setFocus("name");
        }
    },

    saveChangedStudyProgram: function () {
        var form = $$("changeStudyProgramForm");

        if (form.validate()) {
            var newStudyProgram = {
                id: form.getValues().id,
                name: form.getValues().name,
                numOfYears: form.getValues().numOfYears,
                ects: form.getValues().ects,
                collegeId: form.getValues().collegeId
            };

            connection.sendAjax("PUT", "/studyProgram/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('studyProgramTable').updateItem(newStudyProgram.id, jsonData);
                    util.messages.showMessage("Studijski program je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Studijski program nije uspješno promijenjen.");
                }, newStudyProgram);

            util.dismissDialog('changeStudyProgramDialog');
        }
    }
};
