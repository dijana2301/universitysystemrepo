var studentView = {
    dependencies: {
        studyProgramAll: [],
        universityAll: [],
        selectStudentId: 0
    },
    panel: {
        id: "studentPanel",
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
                        template: "<span class='fa fa-users'></span> Studenti"
                    },
                    {},
                    {
                        id: "addStudentBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novog studenta",
                        icon: "plus-circle",
                        click: 'studentView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "studentTable",
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
                    },
                    {
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
                            "Studijski program", {
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
                    {
                        id: "numRegistration",
                        fillspace: true,
                        editable: false,
                        sort: "integer",
                        header: [
                            "Broj indeksa", {
                                content: "textFilter"
                            }
                        ]
                    }
                ],
                select: "row",
                navigation: true,
                url: "hub/student/custom/",
                on:
                    {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    }
            }
        ]
    },
//--------------------------
    preloadDependencies: function () {
        var that = this;
        util.preloader.inc();

        var studyProgramAllPromise = connection.sendAjax("GET", "/hub/studyProgram/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.studyProgramAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o studijskim programima.");
            });

        var universityAllPromise = connection.sendAjax("GET", "/hub/university/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.universityAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o studijskim programima.");
            });

        webix.promise.all([studyProgramAllPromise, universityAllPromise]).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i] == false) {
                    util.preloader.reset();
                    return;
                }
            }
            that.postInit();
        })
    },
//---------------------------------------
    postInit: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "studentPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "studentContextMenu",
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
                },
                {
                    id: "3",
                    value: "Pregled ocjena",
                    icon: "check"
                }
            ],
            master: $$("studentTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            studentView.showChangeStudentDialog($$("studentTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("studenata", "studenta")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "/hub/student/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("studentTable").remove(context.id.row);
                                                util.messages.showMessage("Student je uspješno obrisan.");
                                            } else {
                                                util.messages.showErrorMessage("Student nije uspješno obrisan.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Student nije uspješno obrisan.");
                                        });
                                }
                            };
                            webix.confirm(delBox);
                            break;
                        case "3":
                            studentView.showMarksDialog($$("studentTable").getItem(context.id.row));
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
        id: "addStudentDialog",
        modal: true,
        position: "center",
        body: {
            id: "addStudentInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-users'></span> Dodavanje studenta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addStudentDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addStudentForm",
                    width: 600,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 18,
                    },
                    elements: [
                        {
                            view: "text",
                            id: "firstName",
                            name: "firstName",
                            label: "Ime:",
                            invalidMessage: "Molimo Vas da unesete ime studenta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "lastName",
                            name: "lastName",
                            label: "Prezime:",
                            invalidMessage: "Molimo Vas da unesete prezime studenta.",
                            required: true
                        },
                        {
                            view: "datepicker",
                            id: "dateOfBirth",
                            name: "dateOfBirth",
                            label: "Datum rodjenja:",
                            format: webix.Date.dateToStr("%d.%m.%Y"),
                            stringResult: true,
                            invalidMessage: "Molimo Vas da unesete datum rodjenja studenta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu studenta.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "studyProgramId",
                            name: "studyProgramId",
                            label: "Studijski program:",
                            invalidMessage: "Molimo Vas da odaberete naziv studijskog programa.",
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
                            view: "text",
                            id: "numRegistration",
                            name: "numRegistration",
                            label: "Broj indexa:",
                            invalidMessage: "Molimo Vas da unesete broj indexa.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveStudent",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "studentView.save",
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
                                $$('addStudentForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "lastName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addStudentForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addStudentForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        },
                        "numRegistration": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 10) {
                                $$('addStudentForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 10!';
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
        if (util.popupIsntAlreadyOpened("addStudentDialog")) {
            webix.ui(webix.copy(studentView.addDialog)).show();

            $$("studyProgramId").define("options", studentView.dependencies.studyProgramAll);
            $$("universityId").define("options", studentView.dependencies.universityAll);


            webix.UIManager.setFocus("firsName");
        }
    },

    save: function () {
        var form = $$("addStudentForm");

        if (form.validate()) {
            var newStudent = {
                firstName: form.getValues().firstName,
                lastName: form.getValues().lastName,
                dateOfBirth: new Date(form.getValues().dateOfBirth),
                address: form.getValues().address,
                studyProgramId: form.getValues().studyProgramId,
                universityId: form.getValues().universityId,
                numRegistration: form.getValues().numRegistration
            };
            connection.sendAjax("POST", "/hub/student/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('studentTable').add(jsonData);
                    util.messages.showMessage("Novi student je uspješno dodat.");
                },
                function () {
                    util.messages.showErrorMessage("Novi student nije uspješno dodat.");
                }, newStudent);

            util.dismissDialog('addStudentDialog');
        }
    },

    changeStudentDialog: {
        view: "popup",
        id: "changeStudentDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeStudentInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-users'></span> Izmjena studenta",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeStudentDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeStudentForm",
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
                            invalidMessage: "Molimo Vas da unesete naziv studenta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "lastName",
                            name: "lastName",
                            label: "Prezime:",
                            invalidMessage: "Molimo Vas da unesete naziv studenta.",
                            required: true
                        },
                        {
                            view: "datepicker",
                            id: "dateOfBirth",
                            name: "dateOfBirth",
                            label: "Datum rodjenja:",
                            format: webix.Date.dateToStr("%d.%m.%Y"),
                            stringResult: true,
                            invalidMessage: "Molimo Vas da unesete datum rodjenja studenta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "address",
                            name: "address",
                            label: "Adresa:",
                            invalidMessage: "Molimo Vas da unesete adresu studenta.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "studyProgramId",
                            name: "studyProgramId",
                            label: "Naziv studijskog programa:",
                            invalidMessage: "Molimo Vas da odaberete naziv studijskog programa.",
                            required: true
                        },
                        {
                            view: "richselect",
                            id: "universityId",
                            name: "universityId",
                            label: "Naziv univerziteta:",
                            invalidMessage: "Molimo Vas da odaberete naziv univerziteta.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "numRegistration",
                            name: "numRegistration",
                            label: "Broj indexa:",
                            invalidMessage: "Molimo Vas da odaberete broj indexa.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveStudent",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "studentView.saveChangedStudent",
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
                                $$('addStudentForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "lastName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addStudentForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "address": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 100) {
                                $$('addStudentForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 100!';
                                return false;
                            }
                            return true;
                        },
                        "numRegistration": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 10) {
                                $$('addStudentForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 10!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showChangeStudentDialog: function (student) {
        if (util.popupIsntAlreadyOpened("changeStudentDialog")) {
            webix.ui(webix.copy(studentView.changeStudentDialog)).show();
            var form = $$("changeStudentForm");

            $$("studyProgramId").define("options", studentView.dependencies.studyProgramAll);
            $$("universityId").define("options", studentView.dependencies.universityAll);

            form.elements.id.setValue(student.id);
            form.elements.firstName.setValue(student.firstName);
            form.elements.lastName.setValue(student.lastName);
            form.elements.dateOfBirth.setValue(student.dateOfBirth);
            form.elements.address.setValue(student.address);
            form.elements.studyProgramId.setValue(student.studyProgramId);
            form.elements.universityId.setValue(student.universityId);
            form.elements.numRegistration.setValue(student.numRegistration);

            webix.UIManager.setFocus("firstName");
        }
    },

    saveChangedStudent: function () {
        var form = $$("changeStudentForm");

        if (form.validate()) {
            var newStudent = {
                id: form.getValues().id,
                firstName: form.getValues().firstName,
                lastName: form.getValues().lastName,
                dateOfBirth: new Date(form.getValues().dateOfBirth),
                address: form.getValues().address,
                studyProgramId: form.getValues().studyProgramId,
                universityId: form.getValues().universityId,
                numRegistration: form.getValues().numRegistration

            };

            connection.sendAjax("PUT", "/hub/student/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('studentTable').updateItem(newStudent.id, jsonData);
                    util.messages.showMessage("Student je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Student nije uspješno promijenjen.");
                }, newStudent);

            util.dismissDialog('changeStudentDialog');
        }
    },

    marksDialog: function (studentId) {
        return {
            view: "popup",
            id: "marksDialog",
            modal: true,
            height: 500,
            position: "center",
            body: {
                id: "marksInside",
                rows: [
                    {
                        view: "toolbar",
                        cols: [
                            {
                                view: "label",
                                label: "<span class='webix_icon fa-check'></span> Ocjene",
                                width: 400
                            },
                            {},
                            {
                                hotkey: 'esc',
                                view: "icon",
                                icon: "close",
                                align: "right",
                                click: "util.dismissDialog('marksDialog');"
                            }
                        ]
                    },
                    {
                        id: "marksTable",
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
                                    "Naziv školskog predmeta", {
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
                                    "Naziv profesora", {
                                        content: "textFilter"
                                    }
                                ]
                            }
                        ],
                        select: "row",
                        navigation: true,
                        url: "hub/mark/custom/byStudentId/" + studentId
                    }
                ]
            }
        };
    },

    showMarksDialog: function (student) {
        if (util.popupIsntAlreadyOpened("marksDialog")) {
            webix.ui(webix.copy(studentView.marksDialog(student.id))).show();
        }
    }
};
