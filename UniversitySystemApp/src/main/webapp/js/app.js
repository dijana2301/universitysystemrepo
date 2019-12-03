var MENU_STATES = {
    COLLAPSED: 0,
    EXPANDED: 1
};
var menuState = MENU_STATES.COLLAPSED;

var userData = null;

var menuActions = function (id) {

    switch (id) {
        case "university":
            universityView.selectPanel();
            break;
        case "college":
            collegeView.selectPanel();
            break;
        case "studyProgram":
            studyProgramView.selectPanel();
            break;
        case "schoolSubject":
            schoolSubjectView.selectPanel();
            break;
        case "teacher":
            teacherView.selectPanel();
            break;
        case "student":
            studentView.selectPanel();
            break;
        case "mark":
            markView.selectPanel();
            break;
        case "title":
            titleView.selectPanel();
            break;
        case "user":
            userView.selectPanel();
            break;
    }
};

var menuAdmin = [
    {
        id: "university",
        value: "Univerziteti",
        icon: "university"
    },
    {
        id: "college",
        value: "Fakulteti",
        icon: "graduation-cap"
    },
    {
        id: "studyProgram",
        value: "Studijski programi",
        icon: "list-alt"
    },
    {
        id: "schoolSubject",
        value: "Školski predmeti",
        icon: "book"
    },
    {
        id: "teacher",
        value: "Predavač",
        icon: "fas fa-flag"
    },
    {
        id: "student",
        value: "Studenti",
        icon: "users"
    },
    {
        id: "mark",
        value: "Ocjene",
        icon: "check"
    },
    {
        id: "title",
        value: "Zvanja",
        icon: "certificate"
    },
    {
        id: "user",
        value: "Korisnici",
        icon: "far fa-user"
    }
];

var panel = {id: "empty"};
var rightPanel = null;

var init = function () {
    preloadDependencies();
    if (!webix.env.touch && webix.ui.scrollSize) webix.CustomScroll.init();
    webix.i18n.setLocale("sr-SP");
    webix.Date.startOnMonday = true;
    webix.ui(panel);
    panel = $$("empty");
    webix.ajax("state", {
        error: function (text, data, xhr) {
            if (xhr.status == 403) {
                showLogin();
            }
        },
        success: function (text, data, xhr) {
            if (xhr.status == "200") {
                if (data.json() != null && data.json().id != null) {
                    userData = data.json();
                    showApp();
                    $$("userInfo").setHTML("<p style='display: table-cell; line-height: 13px; vertical-align: text-top; horizontal-align:right;font-size: 14px; margin-left: auto;margin-right: 0;}'>" + userData.firstName + " " + userData.lastName + "<br>Korisnik sistema</p>");
                } else {
                    //TODO SHOW ERROR MESSAGE
                }
            } else {
                //TODO ERROR LOGIN
            }
        }
    });
};

var menuEvents = {
    onItemClick: function (item) {
        menuActions(item);
    }
};

var showLogin = function () {
    var login = webix.copy(loginLayout);
    webix.ui(login, panel);
    panel = $$("login");
};

var startTimerForRequest = function () {
    webix.ajax().get("hub/user/numberOfRequests").then(function (data) {
        numberOfRequests = data.text();
        if (numberOfRequests == 0) {
            $$("requestBtn").config.badge = null;
        } else {
            $$("requestBtn").config.badge = numberOfRequests;
        }

        $$("requestBtn").refresh();
    }).fail(function (error) {
        util.messages.showErrorMessage("Neuspješno dobavljanje broja zahtjeva");
    });
};

var showApp = function () {
    var main = webix.copy(mainLayout);
    webix.ui(main, panel);
    panel = $$("app");
    var localMenuData = null;
    if (userData != null) {
        localMenuData = webix.copy(menuAdmin);
        webix.ui({
            id: "menu-collapse",
            view: "template",
            template: '<div id="menu-collapse" class="menu-collapse">' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
                '</div>',
            onClick: {
                "menu-collapse": function (e, id, trg) {
                    var elem = document.getElementById("menu-collapse");
                    if (menuState == MENU_STATES.COLLAPSED) {
                        elem.className = "menu-collapse open";
                        menuState = MENU_STATES.EXPANDED;
                        $$("mainMenu").toggle();
                    } else {
                        elem.className = "menu-collapse";
                        menuState = MENU_STATES.COLLAPSED;
                        $$("mainMenu").toggle();
                    }
                }
            }
        });

        $$("mainMenu").define("data", localMenuData);
        $$("mainMenu").define("on", menuEvents);

        rightPanel = "emptyRightPanel";
        if (userData != null) {
            universityView.selectPanel();
            $$("mainMenu").select("university");
        }
    }
};

var preloadDependencies = function () {
    // webix.ajax().get("hub/vehicleMaintenanceType").then(function (data) {
    //     var vehicleMaintenancesTypeTemp = data.json();
    //     firstVehicleMaintenancesType = vehicleMaintenancesTypeTemp[0].id;
    //     vehicleMaintenancesTypeTemp.forEach(function (obj) {
    //         vehicleMaintenancesType.push({
    //             id: obj.id,
    //             value: obj.name
    //         });
    //     });
    // }).fail(function (error) {
    //     util.messages.showErrorMessage("Neuspješno dobavljanje vrsta troškova");
    // });
};

//main call
window.onload = function () {
    init();
};

