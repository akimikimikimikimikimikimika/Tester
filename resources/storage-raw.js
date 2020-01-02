window.framework("storage",(util,status,docs,apps,o)=>{

	/* 	An object that collects functions for saving data */
	let s={
		on:false,
		save:()=>{
			if (s.on) {
				let d={
					dark:status.dark,
					dir:status.dir,
					split:status.split,
					opened:docs.opened,
					documents:docs.list.map(e=>({
						name:e.name,
						type:e.type,
						scroll:e.scroll,
						data:e.dataUUID
					}))
				};
				try{
					localStorage.setItem("Tester",JSON.stringify(d));
					docs.list.forEach(e=>{
						localStorage.setItem(e.dataUUID,e.data);
					});
				}catch(e){s.on=false;}
			}
		},
		removeDoc:d=>{
			try{
				localStorage.removeItem(d.dataUUID);
			}catch(e){s.on=false;}
		}
	};

	/* Preparing for saving data */
	try{
		let ls=localStorage.getItem("Tester");
		s.on=true;
		if (ls) {
			let j=JSON.parse(ls);
			status.dark=!!j.dark;
			switch (j.dir) {
				case "auto":case "horizontal":case "vertical":status.dir=j.dir;break;
				default:status.dir="auto";break;
			}
			status.split=j.split?j.split:0;
			let od=j.documents;
			var op=j.opened?Math.floor(j.opened):0;
			if (op<0) op=0;
			if (od) {if (od.map) {
				if (op>=od.length) op=od.length-1;
				docs.list=od.map(e=>{
					let d={
						name:e.name?e.name:"Untitled",
						type:e.type?e.type:"application/xhtml+xml.body",
						app:null,
						scroll:e.scroll?e.scroll:0,
						dataUUID:null,
						data:"",
						node:null
					};
					if (d.type=="text/html.body") d.type="application/xhtml+xml.body";
					let dt=localStorage.getItem(e.data);
					if (dt!=null) {
						d.dataUUID=e.data;
						d.data=dt;
					}
					else d.dataUUID=util.uuid();
					let a=apps.list.find(a=>d.type==a.name);
					if (a) d.app=a;
					else {
						d.app=apps.default;
						d.type=apps.default.name;
					}
					return util.tab(d);
				});
				status.editing=docs.list.length==0;
			}}
			docs.opened=op;
		}
		else throw new Error("Error");
	}
	catch(e){}

	return s;

});