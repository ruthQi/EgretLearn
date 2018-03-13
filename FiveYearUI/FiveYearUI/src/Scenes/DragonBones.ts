
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
		public animationName: string="Animation";
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
