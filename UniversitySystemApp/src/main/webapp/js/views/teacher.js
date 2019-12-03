var teacherView = {
    dependencies: {
        titleAll: [],
        universityAll: []
    },
    panel: {
        id: "teacherPanel",
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
                        template: "<span class='webix_icon fas fa-flag'></span>Predavači"
                    },
                    {},
                    {
                        id: "addTeachertBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novog predavača",
                        icon: "plus-circle",
                        click: 'teacherView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "teacherTable",
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
                        id: "firstName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Ime", {
                                content: "textFilter"
                            }
                        ]
                    }, {
                        id: "lastName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Prezime", {
                                content: "textFilter"
                            }
                        ]
                    },
                    {
                        id: "dateOfBirth",
                        fillspace: true,
                        editable: false,
                        sort: "date",
                        format: webix.Date.dateToStr("%d.%m.%Y"),
                        header: [
                            "Datum rodjenja", {
                                content: "dateFilter"
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
                        id: "titleId",
                        fillspace: true,
                        hidden: true
                    },
                    {
                        id: "titleName",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Zvanje", {
                                content: "textFilter"
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
                    },
                ],
                select: "row",
                navigation: true,
                url: "hub/teacher/custom/",
                on:
                    {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    }
            }
        ]
    },
//---------------------
    preloadDependencies: function () {
        var that = this;
        util.preloader.inc();

        var titleAllPromise = connection.sendAjax("GET", "/hub/title/values/",

            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.titleAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o zvanjima.");
            });

        var universityAllPromise = connection.sendAjax("GET", "/hub/university/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.universityAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o univerzitetima.");
            });

        webix.promise.all([titleAllPromise, universityAllPromise]).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i] == false) {
                    util.preloader.reset();
                    return;
                }
            }
            that.postInit();
        });

    },
//---------------------------------
    postInit: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "teacherPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "teacherContextMenu",
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
            master: $$("teacherTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            teacherView.showChangeTeacherDialog($$("teacherTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("predavača", "predavača")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "/hub/teacher/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("teacherTable").remove(context.id.row);
                                                util.messages.showMessage("Predavač je uspješno obrisan.");
                                            } else {
                                                util.messages.showErrorMessage("Predavač nije uspješno obrisan.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Predavač nije uspješno obrisan.");
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
        id: "addTeacherDialog",
        modal: true,
        position: "center",
        body: {
            id: "addTeacherInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fas fa-flag'></span> Dodavanje predavača",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addTeacherDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addTeacherForm",
                    width: 600,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 18
                    },
                    elements: [
                        {
                            view: "text",
                            id: "firstName",
                            name: "firstName",
                            label: "Ime:",
                            invalidMessage: "Molimo Vas da unesete ime predavača.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "lastName",
                            name: "lastName",
                            label: "Prezime:",
                            invalidMessage: "Molimo Vas da unesete prezime predavača.",
                            required: true
                        },
                        {
                            view: "datepicker",
                            id: "dateOfBirth",
                            name: "dateOfBirth",
                            label: "Datum rodjenja:",
                            format: webix.Date.dateToStr("%d.%m.%Y"),
                            stringResult: true,
                            invalidMessage: "Molimo Vas da unesete datum rodjenja predavača.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu predavača.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "titleId",
                            name: "titleId",
                            label: "Zvanje:",
                            invalidMessage: "Molimo Vas da odaberete zvanje predavača.",
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
                                    id: "saveTeacher",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "teacherView.save",
                                    hotkey: "enter",
                                    width: 375
                                }
                            ]
                        }
                    ],
                    rules: {
                        "firstName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addTeacherForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "lastName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addTeacherForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addTeacherForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        },
                    }
                }
            ]
        }
    },

    showAddDialog: function () {
        if (util.popupIsntAlreadyOpened("addTeacherDialog")) {
            webix.ui(webix.copy(teacherView.addDialog)).show();

            $$("titleId").define("options", teacherView.dependencies.titleAll);
            $$("universityId").define("options", teacherView.dependencies.universityAll);


            webix.UIManager.setFocus("firsName");
        }
    },

    save: function () {
        var form = $$("addTeacherForm");

        if (form.validate()) {
            var newTeacher = {
                firstName: form.getValues().firstName,
                lastName: form.getValues().lastName,
                dateOfBirth: new Date(form.getValues().dateOfBirth),
                address: form.getValues().address,
                titleId: form.getValues().titleId,
                universityId: form.getValues().universityId
            };
            connection.sendAjax("POST", "/hub/teacher/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('teacherTable').add(jsonData);
                    util.messages.showMessage("Novi predavač je uspješno dodat.");
                },
                function () {
                    util.messages.showErrorMessage("Novi predavač nije uspješno dodat.");
                }, newTeacher);

            util.dismissDialog('addTeacherDialog');
        }
    },

    changeTeacherDialog: {
        view: "popup",
        id: "changeTeacherDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeTeacherInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fas fa-flag'></span> Izmjena predavača",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeTeacherDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeTeacherForm",
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
                            id: "firstName",
                            name: "firstName",
                            label: "Ime:",
                            invalidMessage: "Molimo Vas da unesete naziv predavača.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "lastName",
                            name: "lastName",
                            label: "Prezime:",
                            invalidMessage: "Molimo Vas da unesete naziv predavača.",
                            required: true
                        },
                        {
                            view: "datepicker",
                            id: "dateOfBirth",
                            name: "dateOfBirth",
                            label: "Datum rodjenja:",
                            format: webix.Date.dateToStr("%d.%m.%Y"),
                            stringResult: true,
                            invalidMessage: "Molimo Vas da unesete datum rodjenja predavača.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu predavača.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "titleId",
                            name: "titleId",
                            label: "Zvanje:",
                            invalidMessage: "Molimo Vas da odaberete zvanje predavača.",
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
                                    id: "saveTeacher",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "teacherView.saveChangedTeacher",
                                    hotkey: "enter",
                                    width: 375
                                }
                            ]
                        }
                    ],
                    rules: {
                        "firstName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addTeacherForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "lastName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addTeacherForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addTeacherForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showChangeTeacherDialog: function (teacher) {
        if (util.popupIsntAlreadyOpened("changeTeacherDialog")) {
            webix.ui(webix.copy(teacherView.changeTeacherDialog)).show();
            var form = $$("changeTeacherForm");

            $$("titleId").define("options", teacherView.dependencies.titleAll);
            $$("universityId").define("options", teacherView.dependencies.universityAll);

            form.elements.id.setValue(teacher.id);
            form.elements.firstName.setValue(teacher.firstName);
            form.elements.lastName.setValue(teacher.lastName);
            form.elements.dateOfBirth.setValue(teacher.dateOfBirth);
            form.elements.address.setValue(teacher.address);
            form.elements.titleId.setValue(teacher.titleId);
            form.elements.universityId.setValue(teacher.universityId);

            webix.UIManager.setFocus("firstName");
        }
    },

    saveChangedTeacher: function () {
        var form = $$("changeTeacherForm");

        if (form.validate()) {
            var newTeacher = {
                id: form.getValues().id,
                firstName: form.getValues().firstName,
                lastName: form.getValues().lastName,
                dateOfBirth: new Date(form.getValues().dateOfBirth),
                address: form.getValues().address,
                titleId: form.getValues().titleId,
                universityId: form.getValues().universityId
            };

            connection.sendAjax("PUT", "/hub/teacher/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('teacherTable').updateItem(newTeacher.id, jsonData);
                    util.messages.showMessage("Predavač je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Predavač nije uspješno promijenjen.");
                }, newTeacher);

            util.dismissDialog('changeTeacherDialog');
        }
    }
};
