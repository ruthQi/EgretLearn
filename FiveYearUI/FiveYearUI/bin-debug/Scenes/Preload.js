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
            //console.log(this.groupName.indexOf('-'))
            console.log('00000000-------------', this.groupName);
            if (this.groupName.indexOf('-') > 0) {
                this.createGroup(this.groupName);
            }
            this.start();
        };
        Preload.prototype.createGroup = function (groupName) {
            console.log(groupName);
            var arr = [];
            var nameArr = groupName.split('-');
            nameArr.forEach(function (name) {
                var allName = RES.getGroupByName(name);
                allName.forEach(function (item) {
                    arr.push(item.name);
                });
            });
            RES.createGroup(groupName, arr, true);
        };
        Preload.prototype.start = function () {
            console.log('777777777777777', this.getCurrentState);
            console.log('=========================', this.groupName);
            this.currentState = "loading";
            console.log('~~~~~~~~~~~~~~~~~~~~~', this.priority);
            RES.loadGroup(this.groupName, this.priority);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
        };
        Preload.prototype.onProgress = function (e) {
            console.log('--------------------------', e);
            var groupName = e.groupName;
            console.log('=======================', this.groupName, groupName);
            if (groupName == "preload") {
                var p = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
                console.log(p);
                this.progress && console.log(p);
                //this.progress = new eui.Lable();
                console.log('111111111111111111111111', this);
                console.log(this.progress);
                this.progress && (this.progress.text = p + "%");
                p && this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, p);
            }
        };
        Preload.prototype.onError = function (e) {
            console.warn("Group:" + e.groupName + " has failed to load");
        };
        Preload.prototype.onComplete = function (e) {
            console.log('complete');
            //e.groupName = this.groupName;
            //console.log('***************', e)
            this.end();
        };
        Preload.prototype.end = function () {
            console.log('ppppppppppppp');
            this.currentState = 'loaded';
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            this.dispatchEventWith(egret.Event.COMPLETE);
        };
        return Preload;
    }(eui.Component));
    common.Preload = Preload;
    __reflect(Preload.prototype, "common.Preload");
})(common || (common = {}));
//# sourceMappingURL=Preload.js.map