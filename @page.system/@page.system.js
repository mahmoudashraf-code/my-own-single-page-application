let header = new gui.Ele("app-header", {
    type: "div",
    tages: [
        {
            type: "h3",
            content: "Al-Bashir dynamic web page"
        },
        {
            type: "nav",
            tages: [
                {
                    type: "ul",
                    tages: [
                        {
                            type: "li",
                            content: "Home",
                            event: {
                                click: () => {
                                    router.navigate("/")
                                }
                            }
                        },
                        {
                            type: "li",
                            content: "demo",
                            event: {
                                click: () => {
                                    router.navigate("/demo")
                                }
                            }
                        },
                        {
                            type: "li",
                            content: "About Me",
                            event: {
                                click: () => {
                                    router.navigate("/about")
                                }
                            }
                        },
                        {
                            type: "li",
                            content: "Log Out",
                            event: {
                                click: () => {
                                    new gui.PageRouter("login")
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
let home = new gui.Ele("home", {
    type: "div",
    tages: [
        {
            type: "p",
            content: "home work"
        }
    ]
});
let demo = new gui.Ele("demo", {
    type: "div",
    tages: [
        {
            type: "p",
            content: "demo work"
        }
    ]
});
let about = new gui.Ele("about-me", {
    type: "div",
    tages: [
        {
            type: "p",
            content: "anout Me work"
        }
    ]
});
let router = new gui.Router([
    {
        path: "/",
        component: home
    },
    {
        path: "/home",
        component: home
    },
    {
        path: "/demo",
        component: demo
    },
    {
        path: "/about",
        component: about
    }
]);
new gui.Page(new gui.layout.Border(header, router, null, null, null));
