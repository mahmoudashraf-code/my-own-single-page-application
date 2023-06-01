var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * craete new gui app
 */
var gui;
(function (gui) {
    var _common = /** @class */ (function () {
        function _common() {
        }
        _common.prototype._add = function (parent) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            data.forEach(function (element) {
                if (element == null) {
                    parent.appendChild(new Component("bash-null").ele);
                    return;
                }
                ;
                parent.appendChild(element.ele);
            });
        };
        _common.prototype._remove = function (parent, element) {
            if (typeof element == "number")
                parent.removeChild(parent.children[element]);
            else if (element instanceof Component)
                parent.removeChild(element.ele);
        };
        _common.prototype._replace = function (parent, old, newCom) {
            parent.replaceChild(newCom.ele, old.ele);
        };
        _common.prototype._lisen = function (parent, event, callback) {
            parent.addEventListener(event, callback);
        };
        return _common;
    }());
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component(tagName) {
            var _this = _super.call(this) || this;
            _this.ele = document.createElement(tagName);
            return _this;
        }
        Component.prototype.add = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            this._add.apply(this, __spreadArrays([this.ele], data));
        };
        Component.prototype.append = function (ele) {
            this.ele.appendChild(ele);
        };
        Component.prototype.remove = function (element) {
            this._remove(this.ele, element);
        };
        Component.prototype.replace = function (old, newCom) {
            this._replace(this.ele, old, newCom);
        };
        Component.prototype.lisen = function (event, callback) {
            this._lisen(this.ele, event, callback);
        };
        return Component;
    }(_common));
    /**
     * layout in Al-Bashir gui
     */
    var layout;
    (function (layout) {
        /**
         * border layout.
         */
        var Border = /** @class */ (function (_super) {
            __extends(Border, _super);
            /**
             * create border layout
             * @constructor
             * @param {Component} data[0] - top components.
             * @param {Component} data[1] - center components.
             * @param {Component} data[2] - button components.
             * @param {Component} data[4] - left components.
             * @param {Component} data[5] - right components.
             */
            function Border() {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i] = arguments[_i];
                }
                var _this = this;
                if (data.length != 5) {
                    console.error("Error : no components");
                    return;
                }
                _this = _super.call(this, "bash-borderLayout") || this;
                _super.prototype.add.call(_this, data[0], new Component("bash-borderLayout-center"), data[2]);
                _this._add(_this.ele.getElementsByTagName("bash-borderLayout-center")[0], data[3], data[1], data[4]);
                return _this;
            }
            Border.prototype.update = function (element, i) {
                if (i == 0 || i == 2)
                    this.ele.replaceChild(element.ele, this.ele.children[i]);
                else
                    this.ele.replaceChild(element.ele, this.ele.children[1].children[i]);
            };
            return Border;
        }(Component));
        layout.Border = Border;
        var Grid = /** @class */ (function (_super) {
            __extends(Grid, _super);
            function Grid(columns) {
                var gap = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    gap[_i - 1] = arguments[_i];
                }
                var _this = _super.call(this, "bash-gridLayout") || this;
                _this.ele.style.gridTemplateColumns = columns.join(" ");
                _this.ele.style.gridGap = gap.join(" ");
                return _this;
            }
            return Grid;
        }(Component));
        layout.Grid = Grid;
        var Center = /** @class */ (function (_super) {
            __extends(Center, _super);
            function Center(component) {
                var _this = _super.call(this, "bash-CenterLayout") || this;
                _super.prototype.add.call(_this, component);
                return _this;
            }
            Center.prototype.add = function (com) {
                this.remove(0);
                this.add(com);
            };
            return Center;
        }(Component));
        layout.Center = Center;
    })(layout = gui.layout || (gui.layout = {}));
    var Ele = /** @class */ (function (_super) {
        __extends(Ele, _super);
        function Ele(tag, ele) {
            var _this = _super.call(this, tag) || this;
            _this.fromJSON(ele);
            return _this;
        }
        Ele.prototype.fromJSON = function (ele) {
            this.tagesFunction(this.ele, [ele]);
        };
        Ele.prototype.tagesFunction = function (ele, tages) {
            var _this = this;
            tages.forEach(function (element) {
                var x = document.createElement(element.type);
                _this.setData(x, element);
                ele.appendChild(x);
            });
        };
        Ele.prototype.attribute = function (ele, att) {
            for (var key in att) {
                ele.setAttribute(key, att[key]);
            }
        };
        Ele.prototype.events = function (ele, event) {
            for (var key in event) {
                ele.addEventListener(key, event[key]);
            }
        };
        Ele.prototype.setData = function (x, element) {
            if (element.htmlEle) {
                x.appendChild(element.htmlEle);
            }
            this.attribute(x, element.attributes);
            if (element.content != undefined)
                x.innerHTML += element.content;
            if (element.tages != undefined)
                this.tagesFunction(x, element.tages);
            if (element.event)
                this.events(x, element.event);
        };
        return Ele;
    }(Component));
    gui.Ele = Ele;
    var Page = /** @class */ (function (_super) {
        __extends(Page, _super);
        function Page() {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            var _this = _super.call(this, "bash-Page") || this;
            _this.add.apply(_this, data);
            if (document.body.contains(_this.ele)) {
                document.body.removeChild(_this.ele);
            }
            document.body.appendChild(_this.ele);
            return _this;
        }
        Page.prototype.head = function (data) {
            this.ele.replaceChild(data.ele, this.ele.getElementsByTagName("head")[0]);
        };
        return Page;
    }(Component));
    gui.Page = Page;
    var Head = /** @class */ (function (_super) {
        __extends(Head, _super);
        function Head(title) {
            var _this = _super.call(this, "head") || this;
            var titleTag = document.createElement("title");
            titleTag.innerHTML = title;
            _this.ele.appendChild(titleTag);
            return _this;
        }
        Head.prototype.style = function (style) {
            var _this = this;
            style.forEach(function (element) {
                var link = document.createElement("link");
                link.href = element;
                link.rel = "stylesheet";
                _this.ele.appendChild(link);
            });
        };
        Head.prototype.script = function (script) {
            var _this = this;
            script.forEach(function (element) {
                var link = document.createElement("script");
                link.src = element;
                _this.ele.appendChild(link);
            });
        };
        return Head;
    }(Component));
    gui.Head = Head;
    var Form = /** @class */ (function (_super) {
        __extends(Form, _super);
        function Form(title, url, tab) {
            if (title === void 0) { title = "title"; }
            if (url === void 0) { url = ""; }
            if (tab === void 0) { tab = false; }
            var _this = _super.call(this) || this;
            if (tab) {
                _this.form = window.open(url, title);
                return _this;
            }
            _this.form = window.open(url, title, "height=500,width=500,top=200,left=200");
            return _this;
        }
        Form.prototype.add = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            this._add.apply(this, __spreadArrays([this.form.document.body], data));
        };
        Form.prototype.head = function (data) {
            this.form.document.replaceChild(data.ele, this.form.document.getElementsByTagName("head")[0]);
        };
        Form.prototype.close = function () {
            this.form.close();
        };
        Form.prototype.open = function () {
            this.form.open();
        };
        Form.prototype.setUrl = function (url) {
            this.form.location.href = url;
        };
        Form.prototype.getUrl = function () {
            return this.form.location.href;
        };
        return Form;
    }(_common));
    gui.Form = Form;
    var Router = /** @class */ (function () {
        function Router(data) {
            this.data = data;
            if (document.location.protocol != "http:" && document.location.protocol != "https:") {
                throw new Error("router not allow to protocol " + document.location.protocol);
            }
            this.ele = document.createElement("bash-router");
            this.routerNba(document.location.pathname);
        }
        Router.prototype.routerNba = function (url) {
            for (var i = 0; i < this.data.length; i++) {
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
        };
        Router.prototype.navigate = function (url) {
            if (url == document.location.pathname)
                return;
            this.routerNba(url);
            window.history.pushState('page', 'bashir', url);
        };
        return Router;
    }());
    gui.Router = Router;
    var Dialog = /** @class */ (function (_super) {
        __extends(Dialog, _super);
        function Dialog(header) {
            var _this = _super.call(this, "bash-dialog") || this;
            _this.ele.appendChild(document.createElement("dialog"));
            _this.ele = _this.ele.children[0];
            _this.dialog = _this.ele;
            _this.header(header);
            _this.ele = _this.ele.children[1];
            document.body.appendChild(_this.dialog.parentNode);
            return _this;
        }
        Dialog.prototype.header = function (header) {
            var headerEle = document.createElement("header");
            headerEle.appendChild(document.createElement("h3"));
            headerEle.children[0].innerHTML = header;
            this.ele.appendChild(headerEle);
            this.ele.appendChild(document.createElement("div"));
        };
        Dialog.prototype.open = function () {
            this.dialog.showModal();
            this.dialog.style.display = "block";
        };
        Dialog.prototype.close = function () {
            this.dialog.close();
            this.dialog.style.display = "none";
        };
        return Dialog;
    }(Component));
    gui.Dialog = Dialog;
    var PageRouter = /** @class */ (function () {
        function PageRouter(page) {
            if (document.location.protocol != "http:" && document.location.protocol != "https:") {
                throw new Error("router not allow to protocol " + document.location.protocol);
            }
            location.href = location.origin + "/@page." + page + "/@page." + page + ".html";
        }
        return PageRouter;
    }());
    gui.PageRouter = PageRouter;
})(gui || (gui = {}));
