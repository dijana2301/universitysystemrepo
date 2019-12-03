var userView = {

    panel: {
        id: "userPanel",
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
                        template: "<span class='webix_icon far fa-user'></span> Korisnici"
                    },
                    {},
                    {
                        id: "addUserBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte novog korisnika",
                        icon: "plus-circle",
                        click: 'userView.showAddDialog',
                        autowidth: true
                    }
                ]
            },
            {
                id: "userTable",
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
                        id: "username",
                        fillspace: true,
                        editable: false,
                        sort: "string",
                        header: [
                            "Username", {
                                content: "textFilter"
                            }
                        ]
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

                ],
                select: "row",
                navigation: true,
                url: "hub/user/",
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
        rightPanel = "userPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        webix.ui({
            view: "contextmenu",
            id: "userContextMenu",
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
            master: $$("userTable"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            userView.showChangeUserDialog($$("userTable").getItem(context.id.row));
                            break;
                        case "2":
                            var delBox = (webix.copy(commonViews.brisanjePotvrda("korisnika", "korisnik")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    connection.sendAjax("DELETE", "hub/user/" + context.id.row,
                                        function (text, data, xhr) {
                                            if ("Success" === text) {
                                                $$("userTable").remove(context.id.row);
                                                util.messages.showMessage("Korisnik je uspješno obrisan.");
                                            } else {
                                                util.messages.showErrorMessage("Korisnik nije uspješno obrisan.");
                                            }
                                        },
                                        function () {
                                            util.messages.showErrorMessage("Korisnik nije uspješno obrisan.");
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
        id: "addUserDialog",
        modal: true,
        position: "center",
        body: {
            id: "addUserInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon far fa-user'></span> Dodavanje korisnika",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('addUserDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addUserForm",
                    width: 600,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 18
                    },
                    elements: [
                        {
                            view: "text",
                            id: "username",
                            name: "username",
                            label: "Username:",
                            invalidMessage: "Molimo Vas da unesete Vaš username.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "firstName",
                            name: "firstName",
                            label: "Ime:",
                            invalidMessage: "Molimo Vas da unesete Vaše ime.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "lastName",
                            name: "lastName",
                            label: "Prezime:",
                            invalidMessage: "Molimo Vas da unesete Vaše prezime.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [
                                {},
                                {
                                    id: "saveUser",
                                    view: "button",
                                    value: "Sačuvajte novi unos",
                                    type: "form",
                                    click: "userView.save",
                                    hotkey: "enter",
                                    width: 375
                                }
                            ]
                        }

                    ],
                    rules: {
                        "username": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addUserForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "firstName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 50) {
                                $$('addUserForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 50!';
                                return false;
                            }
                            return true;
                        },
                        "lastName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 50) {
                                $$('addUserForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 50!';
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
        if (util.popupIsntAlreadyOpened("addUserDialog")) {
            webix.ui(webix.copy(userView.addDialog)).show();


            webix.UIManager.setFocus("username");
        }
    },

    save: function () {
        var form = $$("addUserForm");

        if (form.validate()) {
            var newUser = {
                username: form.getValues().username,
                firstName: form.getValues().firstName,
                lastName: form.getValues().lastName
            };
            connection.sendAjax("POST", "/hub/user/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('userTable').add(jsonData);
                    util.messages.showMessage("Novi korisnik je uspješno dodat.");
                },
                function () {
                    util.messages.showErrorMessage("Novi korisnik nije uspješno dodat.");
                }, newUser);

            util.dismissDialog('addUserDialog');
        }
    },

    changeUserDialog: {
        view: "popup",
        id: "changeUserDialog",
        modal: true,
        position: "center",
        body: {
            id: "changeUserInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon far fa-user'></span> Izmjena korisnika",
                            width: 400
                        },
                        {},
                        {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('changeUserDialog');"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changeUserForm",
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
                            id: "username",
                            name: "username",
                            label: "Username:",
                            invalidMessage: "Molimo Vas da unesete username.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "firstName",
                            name: "firstName",
                            label: "Ime:",
                            invalidMessage: "Molimo Vas da unesete ime korisnika.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "lastName",
                            name: "lastName",
                            label: "Prezime:",
                            invalidMessage: "Molimo Vas da unesete prezime korisnika.",
                            required: true
                        },

                        {
                            margin: 5,
                            cols: [
                                {},
                                {},
                                {
                                    id: "saveUser",
                                    view: "button",
                                    value: "Sačuvajte izmjene",
                                    type: "form",
                                    click: "userView.saveChangedUser",
                                    hotkey: "enter",
                                    width: 370
                                }
                            ]
                        }
                    ],
                    rules: {
                        "username": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 45) {
                                $$('addUserForm').elements.name.config.invalidMessage = 'Maksimalan broj karaktera je 45!';
                                return false;
                            }
                            return true;
                        },
                        "firstName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 50) {
                                $$('addUserForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 50!';
                                return false;
                            }
                            return true;
                        },
                        "lasttName": function (value) {
                            if (!value)
                                return false;
                            if (value.length > 50) {
                                $$('addUserForm').elements.address.config.invalidMessage = 'Maksimalan broj karaktera je 50!';
                                return false;
                            }
                            return true;
                        }
                    }
                }
            ]
        }
    },

    showChangeUserDialog: function (user) {
        if (util.popupIsntAlreadyOpened("changeUserDialog")) {
            webix.ui(webix.copy(userView.changeUserDialog)).show();
            var form = $$("changeUserForm");


            form.elements.id.setValue(user.id);
            form.elements.username.setValue(user.username);
            form.elements.firstName.setValue(user.firstName);
            form.elements.lastName.setValue(user.lastName);

            webix.UIManager.setFocus("username");
        }
    },

    saveChangedUser: function () {
        var form = $$("changeUserForm");

        if (form.validate()) {
            var newUser = {
                id: form.getValues().id,
                username: form.getValues().username,
                firstName: form.getValues().firstName,
                lastName: form.getValues().lastName

            };

            connection.sendAjax("PUT", "/hub/user/",
                function (text, data, xhr) {
                    var jsonData = data.json();
                    $$('userTable').updateItem(newUser.id, jsonData);
                    util.messages.showMessage("Korisnik je uspješno promijenjen.");
                },
                function () {
                    util.messages.showErrorMessage("Korisnik nije uspješno promijenjen.");
                }, newUser);

            util.dismissDialog('changeUserDialog');
        }
    }

};