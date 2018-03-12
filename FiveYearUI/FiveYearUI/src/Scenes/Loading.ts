//var app;

namespace app{
	export class Loading extends eui.Component implements  eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "LoadingSkin";
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		//private other: ;
		//private dragonBone:DragonBonesImp;
		private preload: common.Preload;
		private other: common.Preload;
		private Rect: eui.Rect;
		private Image: eui.Image;
		protected childrenCreated():void
		{
			super.childrenCreated();
			var self = this;
			//this.other = new common.Preload();
			console.log(this.other)
			//this.other.groupName = "other";
			//this.other.priority = 1;
			//this.other.groupName="other";
			this.other.addEventListener(egret.Event.COMPLETE, function(e){
			// 	//console.log(DragonBonesObj)
				console.log('yyyyyyyyyyyyyyyyyyyyy')
				var dragonBone = new common.DragonBonesImp();
				console.log(dragonBone)
				dragonBone.name = "other";
				dragonBone.armatureName = "loading";
				dragonBone.horizontalCenter = 0;
				dragonBone.verticalCenter = -40;
				self.addChild(dragonBone);
				//this.preload.groupName = "preload";	
			},this);
			//this.preload = new common.Preload();
			this.preload.addEventListener(egret.Event.COMPLETE, function(e) {
				console.log('77777777777777')
				console.log(this.$router)
				this.$router.replace(app.Home);
			}, this)
			//this.preload = new common.Preload();
			
		}
		
		


		
	}
}



//export as namespace app;

//app.Loading = LoadingSkin; 