var app;

class LoadingSkin extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "app/LoadingSkin";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private other;
	private dragonBone:DragonBonesImp;
	protected childrenCreated():void
	{
		super.childrenCreated();
		var self = this;
		this.other.addEventListener(egret.Event.COMPLETE, function(){
			//console.log(DragonBonesObj)
			this.dragonBone = new DragonBonesImp();
			this.dragonBone.name = "other";
			this.dragonBone.armatureName = "loading";
			this.dragonBone.horizontalCenter = 0;
			this.dragonBone.verticalCenter = -40;
			self.addChild(this.dragonBone);

		},this);
	}
	
}

//export as namespace app;

//app.Loading = LoadingSkin; 