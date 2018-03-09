var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Router = (function () {
    function Router(obj) {
        console.log('===========', obj);
        this.context = obj;
        var self = this;
        window.addEventListener("popstate", function (e) {
            e.state && self.changeScene(egret.getDefinitionByName(e.state.sceneClassName), e.state.params);
        }, false);
    }
    Router.prototype.push = function (scene, params) {
        window.history && window.history.pushState({
            sceneClassName: egret.getQualifiedClassName(scene),
            params: params
        }, document.title, location.href);
        this.changeScene(scene, params);
    };
    Router.prototype.replace = function (scene, params) {
        //console.log(scene)
        window.history && window.history.replaceState({
            sceneClassName: egret.getQualifiedClassName(scene),
            params: params
        }, document.title, location.href);
        this.changeScene(scene, params);
    };
    Router.prototype.changeScene = function (scene, params) {
        var item = new scene(params);
        console.log('$$$$$$$$$$$$$$$$$$$', item);
        item.$router = this;
        this.context.removeChildren();
        this.context.addChild(item);
    };
    return Router;
}());
__reflect(Router.prototype, "Router");
//# sourceMappingURL=Router.js.map