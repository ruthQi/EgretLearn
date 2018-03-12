
namespace common{
	export class DragonBonesImp extends eui.Component implements  eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.parseData();
			this.createDisplay();
		}
		public name: string="";
		public armatureName: string="";
		public animationName: string="";
		public texCount: number=1;
		public autoplay: boolean=true;
		//public autoPlay: true;
		private factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
		private parseData(){
			
			if(!this.factory.getDragonBonesData(this.name)){
				console.log("+++++++++++",this.name)
				var skeletonData = RES.getRes(this.name + '_ske_json');
				console.log(skeletonData)
				this.factory.parseDragonBonesData(skeletonData);
				console.log('!!!!!!!!!!!^^^^^^^^^^^^^*********',this.texCount)
				if(this.texCount > 1){
					console.log('&&&&&&&&&&&&&&&*************((((((((((((((()))))))))))))))')
					for(var i = 0; i<this.texCount; i++){
						var texJson = RES.getRes(this.name + '_tex_' + i +'_json');
						var texPng = RES.getRes(this.name + '_tex_' + i + '_png');
						this.factory.parseTextureAtlasData(texJson,texPng,this.name);
					}	
				}else{
					console.log('000000000000088888888888888')
					var texJson = RES.getRes(this.name + '_tex_json');
					var texPng = RES.getRes(this.name + '_tex_png');
					//var otherTexPng = RES.getRes('other_tex_png');
					this.factory.parseTextureAtlasData(texJson,texPng,this.name);
				}
			}
		}

		private display;
		private createDisplay(){
			var t = this;
			this.display = this.factory.buildArmatureDisplay(this.armatureName, this.name);
			this.display.addEventListener(dragonBones.EventObject.START, function(){
				t.dispatchEventWith(dragonBones.EventObject.START);
			},this);
			this.display.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, function(){
				t.dispatchEventWith(dragonBones.EventObject.LOOP_COMPLETE);
			},this);
			this.display.addEventListener(dragonBones.EventObject.COMPLETE, function(){
				t.dispatchEventWith(dragonBones.EventObject.COMPLETE);
			},this);
			this.addChild(this.display);
			console.log('##############################',this.animationName)
			this.display.animation.play(this.animationName);
		}

		public setProgress(progress){
			console.log('88888***********************')
			console.log(this.animationName);
			console.log(progress);
			this.display && this.display.animation.gotoAndStopByProgress(this.animationName, progress);
		}

		public play(name){
			this.display && this.display.animation.play(name || this.animationName);
		}

		
	}

}
