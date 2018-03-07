
class DragonBonesImp extends eui.Component implements  eui.UIComponent {
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
	public name: "";
	public armatureName: "";
	public animationName: "";
	public texCount: 1;
	//public autoPlay: true;
	private factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
	private parseData(){
		if(!this.factory.getDragonBonesData(this.name)){
			var skeletonData = RES.getRes(this.name + '_ske_json');
			this.factory.parseDragonBonesData(skeletonData);
			if(this.texCount > 1){
				for(var i = 0; i<this.texCount; i++){
					var texJson = RES.getRes(this.name + '_tex_' + i +'_json');
					var texPng = RES.getRes(this.name + '_tex_' + i + '_png');
					this.factory.parseTextureAtlasData(texJson,texPng,this.name);
				}	
			}else{
				var texJson = RES.getRes(this.name + '_tex_json');
				var texPng = RES.getRes(this.name + '_tex_png');
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
		//this.autoPlay && this.display.animation.play(this.animationName);
	}

	public setProgress(progress){
		this.display && this.display.animation.gotoAndStopByProgress(this.animationName, progress);
	}

	
}
// window.DragonBonesObj = new DragonBones();

//  declare interface Window {
// 	 DragonBonesObj: DragonBones
//  }