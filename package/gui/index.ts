/**
 * craete new gui app 
 */
namespace gui {
    class _common {
        protected _add(parent: HTMLElement, ...data: Component[]) {
            data.forEach(element => {
                if (element == null) {
                    parent.appendChild(new Component("bash-null").ele)
                    return;
                };
                parent.appendChild(element.ele)
            });
        }
        protected _remove(parent: HTMLElement, element: Component): void;
        protected _remove(parent: HTMLElement, i: number): void;
        protected _remove(parent: HTMLElement, element: any) {
            if (typeof element == "number")
                parent.removeChild(parent.children[element]);
            else if (element instanceof Component)
                parent.removeChild(element.ele);
        }
        protected _replace(parent: HTMLElement, old: Component, newCom: Component) {
            parent.replaceChild(newCom.ele, old.ele);
        }
        protected _lisen(parent: HTMLElement, event: string, callback: EventListenerOrEventListenerObject) {
            parent.addEventListener(event, callback)
        }
    }
    class Component extends _common {
        ele: HTMLElement;
        constructor(tagName: string) {
            super();
            this.ele = document.createElement(tagName);
        }
        public add(...data: Component[]): void {
            this._add(this.ele, ...data);
        }
        public append(ele: HTMLElement): void {
            this.ele.appendChild(ele);
        }
        public remove(element: Component): void;
        public remove(i: number): void;
        public remove(element: any) {
            this._remove(this.ele, element);
        }
        public replace(old: Component, newCom: Component) {
            this._replace(this.ele, old, newCom);
        }
        public lisen(event: string, callback: EventListenerOrEventListenerObject) {
            this._lisen(this.ele, event, callback)
        }
    }
    /**
     * layout in Al-Bashir gui
     */
    export namespace layout {
        /**
         * border layout.
         */
        export class Border extends Component {
            /**
             * create border layout
             * @constructor
             * @param {Component} data[0] - top components.
             * @param {Component} data[1] - center components.
             * @param {Component} data[2] - button components.
             * @param {Component} data[4] - left components.
             * @param {Component} data[5] - right components.
             */
            constructor(...data: Component[]) {
                if (data.length != 5) {
                    console.error("Error : no components");
                    return;
                }
                super("bash-borderLayout");
                super.add(data[0], new Component("bash-borderLayout-center"), data[2]);
                this._add((<HTMLElement>this.ele.getElementsByTagName("bash-borderLayout-center")[0]), data[3], data[1], data[4]);
            }
            public update(element: Component, i: number) {
                if (i == 0 || i == 2)
                    this.ele.replaceChild(element.ele, this.ele.children[i]);
                else
                    this.ele.replaceChild(element.ele, this.ele.children[1].children[i]);
            }
        }
        export class Grid extends Component {
            constructor(columns: string[], ...gap: string[]) {
                super("bash-gridLayout");
                this.ele.style.gridTemplateColumns = columns.join(" ");
                this.ele.style.gridGap = gap.join(" ");
            }
        }
        export class Center extends Component {
            constructor(component: Component) {
                super("bash-CenterLayout");
                super.add(component);
            }
            add(com: Component) {
                this.remove(0);
                this.add(com);
            }
        }
    }
    export class Ele extends Component {
        constructor(tag: string, ele: element) {
            super(tag);
            this.fromJSON(ele);
        }
        public fromJSON(ele: element) {
            this.tagesFunction(this.ele, [ele]);
        }
        private tagesFunction(ele: HTMLElement, tages: element[]) {
            tages.forEach(element => {
                let x = document.createElement(element.type);
                this.setData(x, element);
                ele.appendChild(x);
            });
        }
        private attribute(ele: HTMLElement, att: object) {
            for (const key in att) {
                ele.setAttribute(key, att[key])
            }
        }
        private events(ele: HTMLElement, event: { [x: string]: EventListenerOrEventListenerObject }) {
            for (const key in event) {
                ele.addEventListener(key, event[key]);
            }
        }
        private setData(x: HTMLElement, element: element) {
            if (element.htmlEle) {
                x.appendChild(element.htmlEle);
            }
            this.attribute(x, element.attributes);
            if (element.content != undefined) x.innerHTML += element.content;
            if (element.tages != undefined) this.tagesFunction(x, element.tages);
            if (element.event)
                this.events(x, element.event);
        }
    }
    export class Page extends Component {
        constructor(...data: Component[]) {
            super("bash-Page");
            this.add(...data);
            if (document.body.contains(this.ele)) {
                document.body.removeChild(this.ele);
            }
            document.body.appendChild(this.ele);
        }
        public head(data: Head) {
            this.ele.replaceChild(data.ele, this.ele.getElementsByTagName("head")[0]);
        }
    }
    export class Head extends Component {
        constructor(title: string) {
            super("head");
            let titleTag = document.createElement("title");
            titleTag.innerHTML = title;
            this.ele.appendChild(titleTag);
        }
        style(style: string[]) {
            style.forEach(element => {
                let link = document.createElement("link");
                link.href = element;
                link.rel = "stylesheet";
                this.ele.appendChild(link);
            });
        }
        script(script: string[]) {
            script.forEach(element => {
                let link = document.createElement("script");
                link.src = element;
                this.ele.appendChild(link);
            });
        }
    }
    export class Form extends _common {
        form: Window;
        constructor(title: string = "title", url: string = "", tab: boolean = false) {
            super();
            if (tab) {
                this.form = window.open(url, title);
                return;
            }
            this.form = window.open(url, title, "height=500,width=500,top=200,left=200");
        }
        public add(...data: Component[]) {
            this._add(this.form.document.body, ...data);
        }
        public head(data: Head) {
            this.form.document.replaceChild(data.ele, this.form.document.getElementsByTagName("head")[0]);
        }
        public close() {
            this.form.close();
        }
        public open() {
            this.form.open();
        }
        public setUrl(url: string) {
            this.form.location.href = url;
        }
        public getUrl() {
            return this.form.location.href;
        }
    }
    export class Router {
        ele: HTMLElement;
        constructor(private data: { path: string; component: Component, fun?: () => void }[]) {
            if (document.location.protocol != "http:" && document.location.protocol != "https:") {
                throw new Error("router not allow to protocol " + document.location.protocol);
            }
            this.ele = document.createElement("bash-router");
            this.routerNba(document.location.pathname);
        }
        private routerNba(url: string) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].path == url) {
                    this.ele.innerHTML = "";
                    if (this.data[i].component)
                        this.ele.appendChild(this.data[i].component.ele);
                    if (this.data[i].fun)
                        this.data[i].fun();
                    return;
                }
            }
            this.ele.innerHTML = "not found router";
        }
        public navigate(url: string) {
            if (url == document.location.pathname) return;
            this.routerNba(url);
            window.history.pushState('page', 'bashir', url);
        }
    }
    export class Dialog extends Component {
        dialog: HTMLDialogElement;
        constructor(header: string) {
            super("bash-dialog");
            this.ele.appendChild(document.createElement("dialog"));
            this.ele = (<HTMLDialogElement>this.ele.children[0]);
            this.dialog = (<HTMLDialogElement>this.ele);
            this.header(header);
            this.ele = (<HTMLDialogElement>this.ele.children[1]);
            document.body.appendChild(this.dialog.parentNode);
        }
        private header(header: string) {
            let headerEle = document.createElement("header");
            headerEle.appendChild(document.createElement("h3"));
            headerEle.children[0].innerHTML = header;
            this.ele.appendChild(headerEle);
            this.ele.appendChild(document.createElement("div"));
        }
        open() {
            this.dialog.showModal();
            this.dialog.style.display = "block";
        }
        close() {
            this.dialog.close();
            this.dialog.style.display = "none";
        }
    }
    export class PageRouter {
        constructor(page: string) {
            if (document.location.protocol != "http:" && document.location.protocol != "https:") {
                throw new Error("router not allow to protocol " + document.location.protocol);
            }
            location.href = `${location.origin}/@page.${page}/@page.${page}.html`;
        }
    }
    export class Server {
        ip: string;
        constructor(ip: string, port: string) {
            this.ip = `http://${ip}:${port}`;
        }
        post() {

        }
        get() {

        }
        delete() {

        }
        put() {

        }
    }
    interface element {
        type: string | any,
        tages?: element[],
        htmlEle?: HTMLElement;
        attributes?: {
            [attribute: string]: string
        };
        content?: string,
        event?: {
            [event: string]: EventListenerOrEventListenerObject,
        }
    }
}