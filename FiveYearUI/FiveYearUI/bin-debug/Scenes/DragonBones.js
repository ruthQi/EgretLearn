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
/**
 * 骨骼动画控制数据，包括两大部分数据：角色各部位的骨骼链接关系；角色每个动作的定义，由每一个部位的运动轨迹组成；
 * 其中”skeletonData”(骨骼控制数据ske.json文件)和”textureData”(纹理分解数据texure.json文件)
 * 都包含骨架名信息。当DragonBones工厂加入多个骨架的数据时，
 * 它们之间将通过这个骨架名来区分。
 * 而一套骨架的骨骼控制数据和纹理数据也是通过相同的骨架名来合成该套骨架的综合数据。
 * 即在xxx_tex.json中记录了各帧的位置，名称，以及对应的图片；xxx_ske.json中把各种的动作串联起来，
 * 使用了xxx_tex.json文件中的帧名称与xxx_ske.json文件关联，从而把xxx_tex.json，xxx_ske.json,png结
 * 合起来实现动画播放
 * 注：在创建项目的时候要选择舞台的尺寸（宽*高）；如果忘记设置，则修改index.html中的data-content-width，
 * data-content-height等属性，这样才能保证图片居中展示
 */
var common;
(function (common) {
    var DragonBonesImp = (function (_super) {
        __extends(DragonBonesImp, _super);
        function DragonBonesImp() {
            var _this = _super.call(this) || this;
            _this.name = "";
            _this.armatureName = "";
            _this.animationName = "Animation";
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
            //this.display.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.frameEvent, this);
            this.addChild(this.display);
            //console.log(this.display)
            console.log('##############################', this.animationName);
            this.display.animation.play(this.animationName);
        };
        DragonBonesImp.prototype.setProgress = function (progress) {
            console.log('88888***********************');
            console.log(this.animationName);
            console.log(progress);
            console.log(this.display);
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