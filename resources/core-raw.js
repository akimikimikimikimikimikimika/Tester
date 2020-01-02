window.framework("util",(cues,cd,ap,sa,ael)=>{

	/* add update event */
	ael(window,"resize",()=>cues.call("resize"));
	ael(window,"load",()=>cues.call("load"));

	/* create UUID */
	let uuid=()=>{
		var s="";
		for (var n=0;n<12;n++) s+=("0123456789ABCDEF")[Math.floor(Math.random()*16)];
		return s;
	};

	/* create & manage blob: URL */
	var blob=null;
	let blobURL=b=>{
		if (b) {
			if (blob) URL.revokeObjectURL(blob);
			blob=URL.createObjectURL(b);
		}
		return blob;
	};

	/* make a node button */
	let button=(n,a)=>{
		var valid=false;
		let sp=e=>{
			e.stopPropagation();
			e.preventDefault();
		};
		ael(n,"pointerdown",e=>{
			if (e.isPrimary) valid=true;
			sp(e);
		});
		ael(n,"pointerup",e=>{
			if (e.isPrimary&&valid) {
				a();
			}
			valid=false;
			sp(e);
		});
		let f=e=>{
			if (e.isPrimary) valid=false;
			sp(e);
		};
		ael(n,"pointerout",f);
		ael(n,"pointerleave",f);
		ael(n,"pointercancel",f);
	};

	/* make a tab for a document */
	let tab=d=>{
		let b=ap(cd(null,"tab"),cd(null,null,d.name+(d.app.ext?("."+d.app.ext):"")));
		sa(b,"role","button");
		d.node=b.parentNode;
		return d;
	};

	let o={
		uuid:uuid,
		blobURL:blobURL,
		button:button,
		tab:tab,
		update:null
	};

	return o;

});
/*
	cues: quick execute manager
	if you wish some functions called on a certain event, add it to update
	events are identified with their identifier
	you can create identifier
*/
window.framework("cues",()=>{

	let l={};
	let add=(func,...keys)=>{
		for (let k of keys) {
			if (l[k]) l[k].push(func);
			else l[k]=[func];
		}
		return func;
	};
	let call=async (key,...args)=>{
		if (l[key]) for (let f of l[key]) {
			let r=f.apply(o,[key].concat(args));
			if (r) if (r.constructor==Promise) await r;
		}
	};
	let o={add:add,call:call};
	return o;

});
window.framework("docs",(cues,util,apps,sc,o)=>{

	/* template document creator */
	let t=()=>{
		let d=util.tab({
			name:"Untitled",
			type:"text/html.body",
			scroll:0,
			dataUUID:util.uuid(),
			data:"",
			app:apps.default,
			node:null
		});
		sc(d.node,"tab opened");
		return d;
	};

	/* open a certain document */
	let open=n=>{
		let d=main.list[n];
		main.list.forEach((d,m)=>sc(d.node,"tab"+(n==m?" opened":"")));
		main.opened=n;
		o.storage.save();
		cues.call("open",d);
	};

	cues.add(()=>open(main.opened),"load");

	let main={
		list:[],
		opened:0,
		template:t,
		open:open
	};

	return main;

});
window.framework("apps",(html,javascript,svg,canvas,glsl,mathml,latex,cd,ap,sa)=>{

	let o={
		list:[
			html[0],
			javascript,
			html[1],
			html[2],
			svg,
			canvas,
			glsl,
			mathml,
			latex
		],
		default:null,
		current:0
	};

	o.default=o.list[0];

	o.list.forEach(a=>{
		let b=ap(cd(null,"tab"),cd(null,null,a.label));
		sa(b,"role","button");
		a.node=b.parentNode;
	});

	return o;

});
window.framework("func",(cues,docs,storage,o)=>{

	return {
		back:()=>{
			let d=docs.list[docs.opened];
			let a=d.app;
			if (a.back) cues.call("postToFrame","request-source:");
		},
		exec:()=>{
			let d=docs.list[docs.opened];
			let a=d.app;
			if (a.exec) {
				if (a.type=="string") {
					cues.call("resultTitle",true);
					a.exec(d,o.output.widget.string);
				}
				if (a.type=="frame") a.exec(d,o.output.widget.frame);
				if (a.type=="box") a.exec(d,o.output.widget.box);
				storage.save();
			}
		},
		mail:()=>{
			let d=docs.list[docs.opened];
			let a=d.app;
			if (a.mail) {
				a.mail(d);
				storage.save();
			}
		}
	};

});