namespace common{
	export class Preload extends eui.Component{
		public groupName: string="preload";
		public priority: number=0;
		private progress: eui.Label;
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
			//this.groupName = "preload";
			console.log(this.groupName.indexOf('-'))
			if(this.groupName.indexOf('-') > 0){
				this.createGroup(this.groupName);
			}
			this.start();	
		}

		private createGroup(groupName){
			console.log(groupName)
		}
		private start(){
			console.log('777777777777777',this.getCurrentState);
			this.currentState = "loading";
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
			RES.loadGroup(this.groupName, this.priority);
		}
		private onProgress(e){
			if(e.groupName == this.groupName){
				var p = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
				console.log(p)
				//this.progress = new eui.Lable();
				console.log(this.progress)
                //this.progress && (this.progress.text = p + "%");
				this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, p);
			}
		}
		private onError(e){
			console.warn("Group:" + e.groupName + " has failed to load");
		}
		private onComplete(){
			console.log('complete')
		}
		
	}
}

