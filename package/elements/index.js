var guiApp;
(function (guiApp) {
    let app;
    (function (app) {
        customElements.define("gui-app", class extends HTMLElement {
            constructor() {
                super();
            }
            connectedCallback() {
                if (this.parentElement.tagName.toLocaleLowerCase() != "body") {
                    this.parentElement.removeChild(this);
                }
            }
        });
        customElements.define("gui-app-header", class extends HTMLElement {
            constructor() {
                super();
            }
            connectedCallback() {
                this.setAttribute("gui-data", "shadow");
            }
        });
        customElements.define("gui-app-footer", class extends HTMLElement {
            constructor() {
                super();
            }
            connectedCallback() {
                this.setAttribute("gui-data", "shadow");
            }
        });
    })(app || (app = {}));
    let other;
    (function (other) {
        customElements.define("gui-icon", class extends HTMLElement {
            constructor() {
                super();
            }
            connectedCallback() {
                this.attachShadow({ mode: "open" });
                this.shadowRoot.innerHTML = `
                <style>
                    img {
                        width: 25px;
                        height: 25px;
                    }
                </style>
                <img src="" alt="gui-icon">`;
                this.shadowRoot.children[1].src = this.getAttribute("src");
            }
            static get observedAttributes() {
                return ["src"];
            }
            attributeChangedCallback(name, oldValue, newValue) {
                if (name == "style") {
                    this.shadowRoot.children[1].src = newValue;
                }
            }
        });
    })(other || (other = {}));
    let menu;
    (function (menu) {
        customElements.define("gui-menu", class extends HTMLElement {
            constructor() {
                super();
            }
            connectedCallback() {
                this.append(document.body.children[0].content.cloneNode(true));
                this.setAttribute("gui-layout", "border");
            }
            static get observedAttributes() {
                return ["open"];
            }
            attributeChangedCallback(name, oldValue, newValue) {
                if (name == "open") {
                    APIGui.toogleWidth(this);
                }
            }
        });
    })(menu || (menu = {}));
})(guiApp || (guiApp = {}));
let APIGui = {
    toogleWidth: (ele) => {
        ele.hasAttribute("style") ? ele.removeAttribute("style") : ele.style.width = "180px";
    },
    data: {}
};
