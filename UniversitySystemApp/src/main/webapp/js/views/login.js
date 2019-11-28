var loginLayout = {
    id: "login",
    width: "auto",
    height: "auto",
    rows: [
        {
            cols: [
                {},
                {
                    height: 50,
                    view: "label",
                    label: "University System Application",
                    css: "company-name-size",
                    align: "center"
                },
                {}
            ]
        },
        {
            cols: [
                {},
                {
                    rows: [
                        {
                            height: 115
                        },
                        {
                            id: "loginForm",
                            view: "form",
                            width: 400,
                            borderless: true,
                            elementsConfig: {
                                labelWidth: 150,
                                bottomPadding: 20
                            },
                            elements: [
                                {
                                    id: "username",
                                    name: "username",
                                    view: "text",
                                    label: "Korisničko ime:",
                                    invalidMessage: "Molimo Vas da unesete korisničko ime.",
                                    required: true
                                },
                                {
                                    id: "password",
                                    name: "password",
                                    view: "text",
                                    type: "password",
                                    label: "Lozinka:",
                                    invalidMessage: "Molimo Vas da unesete lozinku.",
                                    required: true
                                },
                                {
                                    margin: 10,
                                    cols: [
                                        {},
                                        {
                                            id: "loginBtn",
                                            view: "button",
                                            value: "Prijava na sistem",
                                            type: "form",
                                            align: "right",
                                            hotkey: "enter",
                                            width: 150,
                                            click: "login"
                                        },
                                        {}
                                    ]
                                }
                            ]
                        },
                        {}
                    ]
                },
                {
                    borderless: true,
                    view: "template",
                    width: 500,
                    template: "<img src='img/logo.png'/>"
                },
                {}
            ]
        }
    ]
};

function login() {
    var form = $$("loginForm");
    if (form.validate()) {
        webix.ajax().header({"Content-type": "application/json"})
            .post("login", form.getValues()).then(function (data) {
            var user = data.json();
            if (user != null) {
                userData = user;
                showApp();
                $$("userInfo").setHTML("<p style='display: table-cell; line-height: 13px; vertical-align: text-top; horizontal-align:right;font-size: 14px; margin-left: auto;margin-right: 0;}'>" + userData.firstName + " " + userData.lastName + "<br>Korisnik sistema</p>");
            } else {
                util.messages.showErrorMessage("Neuspješno prijavljivanje");
            }
        }).fail(function (error) {
            util.messages.showErrorMessage("Neuspješno prijavljivanje.")
        });
    }
}