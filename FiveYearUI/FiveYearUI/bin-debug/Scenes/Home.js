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
            var _this = _super.call(this) || this;
            _this.skinName = 'HomeSkin';
            _this.timeScale = 2;
            _this.frameFactor = 6;
            _this.totalFrames = 4124;
            _this.totalProgress = _this.totalFrames * _this.frameFactor * _this.timeScale;
            return _this;
        }
        Home.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        Home.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //this.mainDB = new common.DragonBonesImp();
            //this.mainDB.animationName = "Animation";
            //this.mainDB.armatureName = "Armature";
            this.mainDB.setProgress(0);
            //this.scrollBar = new eui.Group();
            this.scrollBar.height = this.totalProgress + this.stage.stageHeight;
            console.log(this.stage.stageHeight);
            //this.scroller = new eui.Scroller();
            this.scroller.addEventListener(eui.UIEvent.CHANGE, this.onScroll, this);
            //this.startBtn = new eui.Rect();
            //this.startBtn.touchEnabled = true;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
            //this.replayBtn = new eui.Rect();
            this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay, this);
        };
        Home.prototype.onScroll = function () {
            var scrollV = this.scroller.viewport.scrollV;
            var radio = scrollV / this.totalProgress;
            console.log(scrollV, this.totalProgress);
            this.mainDB.setProgress(radio);
            //注：此处的scroller的y需要设置为0，否则的话radio获取到的值不能===1
            if (radio === 1) {
                this.stop();
            }
        };
        Home.prototype.start = function () {
            var _this = this;
            console.log('%%%%%%%%%%%%&&&&&&&&&&&&&****************');
            egret.Tween.get(this.cover).to({
                alpha: 0
            }, 300, egret.Ease.sineInOut).call(function () {
                _this.cover.visible = false;
                _this.mainDB.visible = true;
            });
        };
        Home.prototype.replay = function () {
            this.end.visible = false;
            this.mainDB.visible = true;
            this.mainDB.setProgress(0);
            this.scroller.viewport.scrollV = 0;
            this.scroller.addEventListener(eui.UIEvent.CHANGE, this.onScroll, this);
        };
        Home.prototype.stop = function () {
            this.end.visible = true;
            this.mainDB.visible = false;
            this.scroller.removeEventListener(eui.UIEvent.CHANGE, this.onScroll, this);
            this.endDB.play('enter');
        };
        return Home;
    }(eui.Component));
    app.Home = Home;
    __reflect(Home.prototype, "app.Home", ["eui.UIComponent", "egret.DisplayObject"]);
})(app || (app = {}));
//# sourceMappingURL=Home.js.map