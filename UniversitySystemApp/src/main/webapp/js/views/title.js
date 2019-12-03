var titleView = {
    panel: {
        id: "titlePanel",
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
                        template: "<span class='fa fa-certificate'></span> Zvanja"
                    },
                    {},
                    {
                        id: "addTitleBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novo zvanje",
                        icon: "plus-circle",
                        click: 'titleView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "titleTable",
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
                            "Zvanje", {
                                content: "textFilter"
                            }
                        ]
                    },

                ],
                select: "row",
                navigation: true,
                url: "/hub/title/",
                on:
                    {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    }
            }
        ]
    },


    postInit: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "titlePanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "titleContextMenu",
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

            master: $$("titleTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            titleView.showChangeTitleDialog($$("titleTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("zvanja", "zvanje")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "/hub/title/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("titleTable").remove(context.id.row);
                                                util.messages.showMessage("Zvanje je uspješno obrisano.");
                                            } else {
                                                util.messages.showErrorMessage("Zvanje nije uspješno obrisano.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Zvanje nije uspješno obrisano.");
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
        this.postInit();
    },


    addDialog: {
        view: "popup",
        id: "addTitleDialog",
        modal: true,
        position: "center",
        body: {
            id: "addTitleInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-certificate'></span> Dodavanje zvanja",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addTitleDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addTitleForm",
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
                            invalidMessage: "Molimo Vas da unesete zvanje.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveTitle",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "titleView.save",
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
        if (util.popupIsntAlreadyOpened("addTitleDialog")) {
            webix.ui(webix.copy(titleView.addDialog)).show();


            webix.UIManager.setFocus("name");
        }
    },

    save: function () {
        var form = $$("addTitleForm");

        if (form.validate()) {
            var newTitle = {
                name: form.getValues().name
            };
            connection.sendAjax("POST", "hub/title/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('titleTable').add(jsonData);
                    util.messages.showMessage("Novo zvanje je uspješno dodano.");
                },
                function () {
                    util.messages.showErrorMessage("Novo zvanje nije uspješno dodano.");
                }, newTitle);

            util.dismissDialog('addTitleDialog');
        }
    },

    changeTitleDialog: {
        view: "popup",
        id: "changeTitleDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeTitleInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-certificate'></span> Izmjena zvanja",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeTitleDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeTitleForm",
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
                            invalidMessage: "Molimo Vas da unesete zvanje.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {},
                                {
                                    id: "saveTitle",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "titleView.saveChangedTitle",
                                    hotkey: "enter",
                                    width: 370
                                }
                            ]
                        }
                    ],
                }
            ]
        }
    },

    showChangeTitleDialog: function (title) {
        if (util.popupIsntAlreadyOpened("changeTitleDialog")) {
            webix.ui(webix.copy(titleView.changeTitleDialog)).show();
            var form = $$("changeTitleForm");


            form.elements.id.setValue(title.id);
            form.elements.name.setValue(title.name);

            webix.UIManager.setFocus("name");
        }
    },

    saveChangedTitle: function () {
        var form = $$("changeTitleForm");

        if (form.validate()) {
            var newTitle = {
                id: form.getValues().id,
                name: form.getValues().name

            };

            connection.sendAjax("PUT", "/hub/title/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('titleTable').updateItem(newTitle.id, jsonData);
                    util.messages.showMessage("Zvanje je uspješno promijenjeno.");
                },
                function () {
                    util.messages.showErrorMessage("Zvanje nije uspješno promijenjeno.");
                }, newTitle);

            util.dismissDialog('changeTitleDialog');
        }
    }

};