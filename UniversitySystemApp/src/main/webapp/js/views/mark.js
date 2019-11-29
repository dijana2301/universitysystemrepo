var markView = {
    /*
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
                            "Ocjena:", {
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
                            "Ime i prezime studenta:", {
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
                            "Naziv školskog predmeta:", {
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
                            "Naziv profesora:", {
                                content: "textFilter"
                            }
                        ]
                    }
                ],
                select: "row",
                navigation: true,
                url: "mark/custom/",
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

        var studentAllPromise = connection.sendAjax("GET", "/student/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.studentAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o studentima.");
            });

        webix.promise.all([studentAllPromise]).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i] == false) {
                    util.preloader.reset();
                    return;
                }
            }
            that.postInit();
        },
        var schoolSubjectAllPromise = connection.sendAjax("GET", "/schoolSubject/values/",
            function (text, data, xhr) {
                var jsonData = data.json();
                that.dependencies.studentAll = jsonData;
            },
            function () {
                util.messages.showErrorMessage("Greška prilikom prikupljanja podataka o studentima.");
            });

        webix.promise.all([schoolSubjectAllPromise]).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i] == false) {
                    util.preloader.reset();
                    return;
                }
            }
            that.postInit();
        }  );

    },

    // --------------------------------

*/

};