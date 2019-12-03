var markView = {

    dependencies: {
        studentAll: [],
        schoolSubjectAll: [],
        teacherAll: []
    },
    panel: {
        id: "markPanel",
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
                        template: "<span class='fa fa-check'></span> Ocjene"
                    },
                    {},
                    {
                        id: "addMarkBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novi unos",
                        icon: "plus-circle",
                        click: 'markView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "markTable",
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
                        id: "value",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Ocjena", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "studentId",
                        fillspace: true,
                        hidden: true
                    },
                    {
                        id: "studentName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Ime i prezime studenta", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "schoolSubjectId",
                        fillspace: true,
                        hidden: true
                    },
                    {
                        id: "schoolSubjectName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Školski predmet", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "teacherId",
                        fillspace: true,
                        hidden: true
                    },
                    {
                        id: "teacherName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Profesor", {
                                content: "textFilter"
                            }
                        ]
                    }
                ],
                select: "row",
                navigation: true,
                url: "hub/mark/custom/",
                on:
                    {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    }
            }
        ]
    },
    // ---------------------
    preloadDependencies: function () {
        var that = this;
        util.preloader.inc();

        var studentAllPromise = connection.sendAjax("GET", "/hub/student/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.studentAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o studentima.");
            });

        var schoolSubjectAllPromise = connection.sendAjax("GET", "/hub/schoolSubject/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.schoolSubjectAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o školskim predmetima.");
            });

        var teacherAllPromise = connection.sendAjax("GET", "/hub/teacher/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.teacherAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o članovima akademskog osoblja.");
            });

        webix.promise.all([studentAllPromise, schoolSubjectAllPromise, teacherAllPromise]).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i] == false) {
                    util.preloader.reset();
                    return;
                }
            }
            that.postInit();
        });

    },

    // --------------------------------
    postInit: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "markPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "markContextMenu",
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
            master: $$("markTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            markView.showChangeMarkDialog($$("markTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("ocjenu", "ocjenu")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "hub/mark/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("markTable").remove(context.id.row);
                                                util.messages.showMessage("Ocjena je uspješno obrisan.");
                                            } else {
                                                util.messages.showErrorMessage("Ocjena nije uspješno obrisan.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Ocjena nije uspješno obrisan.");
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
        id: "addMarkDialog",
        modal: true,
        position: "center",
        body: {
            id: "addMarkInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-check'></span> Dodavanje ocjene",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addMarkDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addMarkForm",
                    width: 600,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 18
                    },
                    elements: [
                        {
                            view: "text",
                            id: "value",
                            name: "value",
                            label: "Ocjena:",
                            invalidMessage: "Molimo Vas da unesete ocjenu.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "studentId",
                            name: "studentId",
                            label: "Student:",
                            invalidMessage: "Molimo Vas da odaberete studenta.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "schoolSubjectId",
                            name: "schoolSubjectId",
                            label: "Školski predmet:",
                            invalidMessage: "Molimo Vas da odaberete školski predmet.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "teacherId",
                            name: "teacherId",
                            label: "Naziv profesora:",
                            invalidMessage: "Molimo Vas da odaberete ime i prezime profesora.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveMark",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "markView.save",
                                    hotkey: "enter",
                                    width: 375
                                }
                            ]
                        }
                    ],
                }
            ]
        }
    },

    showAddDialog: function () {
        if (util.popupIsntAlreadyOpened("addMarkDialog")) {
            webix.ui(webix.copy(markView.addDialog)).show();

            $$("studentId").define("options", markView.dependencies.studentAll);
            $$("schoolSubjectId").define("options", markView.dependencies.schoolSubjectAll);
            $$("teacherId").define("options", markView.dependencies.teacherAll);


            webix.UIManager.setFocus("value");
        }
    },

    save: function () {
        var form = $$("addMarkForm");

        if (form.validate()) {
            var newMark = {
                value: form.getValues().value,
                studentId: form.getValues().studentId,
                schoolSubjectId: form.getValues().schoolSubjectId,
                teacherId: form.getValues().teacherId
            };
            connection.sendAjax("POST", "/hub/mark/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('markTable').add(jsonData);
                    util.messages.showMessage("Nova ocjena je uspješno dodana.");
                },
                function () {
                    util.messages.showErrorMessage("Nova ocjena nije uspješno dodana.");
                }, newMark);

            util.dismissDialog('addMarkDialog');
        }
    },

    changeMarkDialog: {
        view: "popup",
        id: "changeMarkDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeMarkInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-check'></span> Izmjena ocjene",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeMarkDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeMarkForm",
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
                            id: "value",
                            name: "value",
                            label: "Ocjena:",
                            invalidMessage: "Molimo Vas da unesete ocjenu.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "studentId",
                            name: "studentId",
                            label: "Student:",
                            invalidMessage: "Molimo Vas da odaberete studenta.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "schoolSubjectId",
                            name: "schoolSubjectId",
                            label: "Školski predmet:",
                            invalidMessage: "Molimo Vas da odaberete školski predmet.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "teacherId",
                            name: "teacherId",
                            label: "Profesor:",
                            invalidMessage: "Molimo Vas da odaberete profesora.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveMark",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "markView.saveChangedMark",
                                    hotkey: "enter",
                                    width: 375
                                }
                            ]
                        }
                    ],
                }
            ]
        }
    },

    showChangeMarkDialog: function (mark) {
        if (util.popupIsntAlreadyOpened("changeMarkDialog")) {
            webix.ui(webix.copy(markView.changeMarkDialog)).show();
            var form = $$("changeMarkForm");

            $$("studentId").define("options", markView.dependencies.studentAll);
            $$("schoolSubjectId").define("options", markView.dependencies.schoolSubjectAll);
            $$("teacherId").define("options", markView.dependencies.teacherAll);


            form.elements.id.setValue(mark.id);
            form.elements.value.setValue(mark.value);
            form.elements.studentId.setValue(mark.studentId);
            form.elements.schoolSubjectId.setValue(mark.schoolSubjectId);
            form.elements.teacherId.setValue(mark.teacherId);

            webix.UIManager.setFocus("value");
        }
    },

    saveChangedMark: function () {
        var form = $$("changeMarkForm");

        if (form.validate()) {
            var newMark = {
                id: form.getValues().id,
                value: form.getValues().value,
                studentId: form.getValues().studentId,
                schoolSubjectId: form.getValues().schoolSubjectId,
                teacherId: form.getValues().teacherId
            };

            connection.sendAjax("PUT", "hub/mark/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('markTable').updateItem(newMark.id, jsonData);
                    util.messages.showMessage("Ocjena je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Ocjena nije uspješno promijenjen.");
                }, newMark);

            util.dismissDialog('changeMarkDialog');
        }
    }


};