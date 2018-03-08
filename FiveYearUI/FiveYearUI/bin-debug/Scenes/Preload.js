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
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            var _this = _super.call(this) || this;
            _this.groupName = "preload";
            _this.priority = 0;
            return _this;
        }
        Preload.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        Preload.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //this.groupName = "preload";
            console.log(this.groupName.indexOf('-'));
            if (this.groupName.indexOf('-') > 0) {
                this.createGroup(this.groupName);
            }
            this.start();
        };
        Preload.prototype.createGroup = function (groupName) {
            console.log(groupName);
        };
        Preload.prototype.start = function () {
            console.log('777777777777777', this.getCurrentState);
            this.currentState = "loading";
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.loadGroup(this.groupName, this.priority);
        };
        Preload.prototype.onProgress = function (e) {
            if (e.groupName == this.groupName) {
                var p = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
                console.log(p);
                //this.progress = new eui.Lable();
                console.log(this.progress);
                //this.progress && (this.progress.text = p + "%");
                this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, p);
            }
        };
        Preload.prototype.onError = function (e) {
            console.warn("Group:" + e.groupName + " has failed to load");
        };
        Preload.prototype.onComplete = function () {
            console.log('complete');
        };
        return Preload;
    }(eui.Component));
    common.Preload = Preload;
    __reflect(Preload.prototype, "common.Preload");
})(common || (common = {}));
//# sourceMappingURL=Preload.js.map