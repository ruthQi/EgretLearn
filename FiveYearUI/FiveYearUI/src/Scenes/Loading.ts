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
			console.log('99999999999999999');
			this.other = new common.Preload();
			this.other.groupName = "other";
			this.other.priority = 1;
			//this.other.groupName="other";
			this.other.addEventListener(egret.Event.COMPLETE, function(){
			// 	//console.log(DragonBonesObj)
			// 	console.log('999999999999999999')
				var dragonBone = new common.DragonBonesImp();
				console.log(dragonBone)
				dragonBone.name = "other";
				dragonBone.armatureName = "loading";
				dragonBone.horizontalCenter = 0;
				dragonBone.verticalCenter = -40;
				self.addChild(dragonBone);
			},this)
			this.preload = new common.Preload();
			this.preload.addEventListener(egret.Event.COMPLETE, function() {
				console.log('77777777777777')
                //n.$router.replace(app.Home)
            }, this)
		}
		


		
	}
}



//export as namespace app;

//app.Loading = LoadingSkin; 