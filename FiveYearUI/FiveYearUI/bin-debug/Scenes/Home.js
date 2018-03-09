var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var app;
(function (app) {
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home() {
            return _super.call(this) || this;
        }
        Home.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        Home.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return Home;
    }(eui.Component));
    app.Home = Home;
    __reflect(Home.prototype, "app.Home", ["eui.UIComponent", "egret.DisplayObject"]);
})(app || (app = {}));
//# sourceMappingURL=Home.js.map