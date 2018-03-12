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
			//console.log(this.groupName.indexOf('-'))
			console.log('00000000-------------',this.groupName)
			if(this.groupName.indexOf('-') > 0){
				this.createGroup(this.groupName);
			}
			this.start();	
		}

		private createGroup(groupName){
			console.log(groupName);
			var arr = [];
			var nameArr = groupName.split('-');
			nameArr.forEach(function(name){
				var allName = RES.getGroupByName(name);
                allName.forEach(function(item) {
                    arr.push(item.name)
                }) 
			});
			RES.createGroup(groupName, arr, true);
		}
		private start(){
			console.log('777777777777777',this.getCurrentState);
			console.log('=========================',this.groupName)
			this.currentState = "loading";
			console.log('~~~~~~~~~~~~~~~~~~~~~',this.priority)
			RES.loadGroup(this.groupName, this.priority);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);		
			
		}
		private onProgress(e){
			console.log('--------------------------',e);
			let groupName = e.groupName;
			console.log('=======================',this.groupName,groupName)
			if(groupName == "preload"){
				var p = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
				console.log(p)
				this.progress && console.log(p)
				//this.progress = new eui.Lable();
				console.log('111111111111111111111111',this)
				console.log(this.progress)
                this.progress && (this.progress.text = p + "%");
				p && this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, p);
			}
		}
		private onError(e){
			console.warn("Group:" + e.groupName + " has failed to load");
		}
		private onComplete(e){
			if(e.groupName == this.groupName){
				console.log('complete');
				this.end();
			}

		}
		private end(){
			console.log('ppppppppppppp')
			this.currentState = 'loaded';
			//this.other加载完成，就会触发complete,所以preload也会终止
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
			this.dispatchEventWith(egret.Event.COMPLETE);
		}
		
	}
}

