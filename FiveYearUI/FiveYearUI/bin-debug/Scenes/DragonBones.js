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
var common;
(function (common) {
    var DragonBonesImp = (function (_super) {
        __extends(DragonBonesImp, _super);
        function DragonBonesImp() {
            var _this = _super.call(this) || this;
            _this.name = "";
            _this.armatureName = "";
            _this.animationName = "";
            _this.texCount = 1;
            _this.autoplay = true;
            //public autoPlay: true;
            _this.factory = new dragonBones.EgretFactory();
            return _this;
        }
        DragonBonesImp.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        DragonBonesImp.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.parseData();
            this.createDisplay();
        };
        DragonBonesImp.prototype.parseData = function () {
            if (!this.factory.getDragonBonesData(this.name)) {
                console.log("+++++++++++", this.name);
                var skeletonData = RES.getRes(this.name + '_ske_json');
                console.log(skeletonData);
                this.factory.parseDragonBonesData(skeletonData);
                console.log('!!!!!!!!!!!^^^^^^^^^^^^^*********', this.texCount);
                if (this.texCount > 1) {
                    console.log('&&&&&&&&&&&&&&&*************((((((((((((((()))))))))))))))');
                    for (var i = 0; i < this.texCount; i++) {
                        var texJson = RES.getRes(this.name + '_tex_' + i + '_json');
                        var texPng = RES.getRes(this.name + '_tex_' + i + '_png');
                        this.factory.parseTextureAtlasData(texJson, texPng, this.name);
                    }
                }
                else {
                    console.log('000000000000088888888888888');
                    var texJson = RES.getRes(this.name + '_tex_json');
                    var texPng = RES.getRes(this.name + '_tex_png');
                    //var otherTexPng = RES.getRes('other_tex_png');
                    this.factory.parseTextureAtlasData(texJson, texPng, this.name);
                }
            }
        };
        DragonBonesImp.prototype.createDisplay = function () {
            var t = this;
            this.display = this.factory.buildArmatureDisplay(this.armatureName, this.name);
            this.display.addEventListener(dragonBones.EventObject.START, function () {
                t.dispatchEventWith(dragonBones.EventObject.START);
            }, this);
            this.display.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, function () {
                t.dispatchEventWith(dragonBones.EventObject.LOOP_COMPLETE);
            }, this);
            this.display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                t.dispatchEventWith(dragonBones.EventObject.COMPLETE);
            }, this);
            this.addChild(this.display);
            console.log('##############################', this.animationName);
            this.display.animation.play(this.animationName);
        };
        DragonBonesImp.prototype.setProgress = function (progress) {
            console.log('88888***********************');
            console.log(this.animationName);
            console.log(progress);
            this.display && this.display.animation.gotoAndStopByProgress(this.animationName, progress);
        };
        DragonBonesImp.prototype.play = function (name) {
            this.display && this.display.animation.play(name || this.animationName);
        };
        return DragonBonesImp;
    }(eui.Component));
    common.DragonBonesImp = DragonBonesImp;
    __reflect(DragonBonesImp.prototype, "common.DragonBonesImp", ["eui.UIComponent", "egret.DisplayObject"]);
})(common || (common = {}));
//# sourceMappingURL=DragonBones.js.map