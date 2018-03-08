//var app;
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
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            var _this = _super.call(this) || this;
            _this.skinName = "LoadingSkin";
            return _this;
        }
        Loading.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        Loading.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            console.log('99999999999999999');
            this.other = new common.Preload();
            this.other.groupName = "other";
            this.other.priority = 1;
            //this.other.groupName="other";
            this.other.addEventListener(egret.Event.COMPLETE, function () {
                // 	//console.log(DragonBonesObj)
                // 	console.log('999999999999999999')
                var dragonBone = new common.DragonBonesImp();
                console.log(dragonBone);
                dragonBone.name = "other";
                dragonBone.armatureName = "loading";
                dragonBone.horizontalCenter = 0;
                dragonBone.verticalCenter = -40;
                self.addChild(dragonBone);
            }, this);
            this.preload = new common.Preload();
            this.preload.addEventListener(egret.Event.COMPLETE, function () {
                console.log('77777777777777');
                //n.$router.replace(app.Home)
            }, this);
        };
        return Loading;
    }(eui.Component));
    app.Loading = Loading;
    __reflect(Loading.prototype, "app.Loading", ["eui.UIComponent", "egret.DisplayObject"]);
})(app || (app = {}));
//export as namespace app;
//app.Loading = LoadingSkin;  
//# sourceMappingURL=Loading.js.map