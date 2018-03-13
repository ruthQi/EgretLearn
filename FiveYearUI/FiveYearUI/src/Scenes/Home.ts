namespace app{
	export class Home extends eui.Component implements  eui.UIComponent {
		private timeScale: number;
		private frameFactor: number;
		private totalFrames: number;
		private totalProgress: number;
		public constructor() {
			super();
			this.skinName = 'HomeSkin';
			this.timeScale = 2;
			this.frameFactor = 6;
			this.totalFrames = 4124;
			this.totalProgress = this.totalFrames * this.frameFactor * this.timeScale
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		//此处变量的命名与exml文件中的元素id对应，使用时，不需要再new,再new的话又创建了一个新的对象
		//在exml中，展示层的顺序在exml中的体现是越先展示的越在下面；例如展示顺序为a->b->c；在exml中写的顺序为c,b,a
		private mainDB: common.DragonBonesImp;
		private scrollBar: eui.Group;
		private scroller: eui.Scroller;
		private startBtn: eui.Rect;
		private replayBtn: eui.Rect;
		private cover: eui.Group;
		private end: eui.Group;
		private endDB: common.DragonBonesImp;

		protected childrenCreated():void
		{
			super.childrenCreated();
			//this.mainDB = new common.DragonBonesImp();
			//this.mainDB.animationName = "Animation";
			//this.mainDB.armatureName = "Armature";
			this.mainDB.setProgress(0);
			//this.scrollBar = new eui.Group();
			this.scrollBar.height = this.totalProgress + this.stage.stageHeight;
			console.log(this.stage.stageHeight)
			//this.scroller = new eui.Scroller();
			this.scroller.addEventListener(eui.UIEvent.CHANGE, this.onScroll, this);
			//this.startBtn = new eui.Rect();
			//this.startBtn.touchEnabled = true;
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
			//this.replayBtn = new eui.Rect();
			this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay,this);

		}

		private onScroll(){
			var scrollV = this.scroller.viewport.scrollV;
			var radio = scrollV / this.totalProgress;
			console.log(scrollV,this.totalProgress)
			this.mainDB.setProgress(radio);
			//注：此处的scroller的y需要设置为0，否则的话radio获取到的值不能===1
			if(radio === 1){
				this.stop();
			}
		}

		private start(){
			console.log('%%%%%%%%%%%%&&&&&&&&&&&&&****************');
			egret.Tween.get(this.cover).to({
				alpha: 0
			}, 300, egret.Ease.sineInOut).call(()=>{
				this.cover.visible = false;
				this.mainDB.visible = true;
			})

		}
		private replay(){
			this.end.visible = false;
			this.mainDB.visible = true;
			this.mainDB.setProgress(0);
			this.scroller.viewport.scrollV = 0;
			this.scroller.addEventListener(eui.UIEvent.CHANGE, this.onScroll, this);
		}

		private stop(){
			this.end.visible = true;
			this.mainDB.visible = false;
			this.scroller.removeEventListener(eui.UIEvent.CHANGE, this.onScroll, this);
			this.endDB.play('enter');
		}
		
	}
}
