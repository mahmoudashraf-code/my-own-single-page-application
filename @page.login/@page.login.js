let login = new gui.Ele("app-login", {
    type: "div",
    tages: [
        {
            type: "input",
            attributes: {
                placeholder: "admin"
            }
        },
        {
            type: "button",
            content: "login",
            event: {
                click: () => {
                    new gui.PageRouter("system")
                }
            }
        }
    ]
});
new gui.Page(new gui.layout.Center(login));
