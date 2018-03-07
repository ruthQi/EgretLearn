class Router{
    public context;
    constructor(className){
        console.log('===========',className)
        this.context = className;
        var self = this;
        window.addEventListener("popstate", function(e){
            e.state && self.changeScene(egret.getDefinitionByName(e.state.sceneClassName), e.state.params);

        }, false);
    }

    public push(scene,params){
        window.history && window.history.pushState({
            sceneClassName: egret.getQualifiedClassName(scene),
			params: params
        }, document.title, location.href);
        this.changeScene(scene,params);
    }

    public replace(scene,params){
        window.history && window.history.replaceState({
            sceneClassName: egret.getQualifiedClassName(scene),
			params: params
        }, document.title, location.href);
        this.changeScene(scene,params);
    }

    private changeScene(scene, params){
        var item = new scene(params);
        item.$router = this;
        this.context.removeChildren();
        this.context.addChild(item);
    }
}

declare interface Window{};