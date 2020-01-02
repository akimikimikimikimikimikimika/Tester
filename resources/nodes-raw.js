window.framework("node",(cues,status,split,input,output,firstMenu,secondMenu,cd,ce,ap,qs,head)=>{

	let f=cd("frame");

	let first=ap(f,cd("first"));
	ap(first,firstMenu.view);
	ap(first,input.view);

	let second=ap(f,cd("second"));
	ap(second,secondMenu.view);
	ap(second,output.view);

	ap(f,cd("border"));
	ap(f,split.view);

	let splitStyle=ap(head,ce("style"));
	cues.add(()=>{
		let p=(1+status.split)*50+"%",n=(1-status.split)*50+"%",sz=status.touch?10:1;
		let ol=[
			["border",`calc( ${p} - ${sz}px )`,`calc( ${n} - ${sz}px )`],
			["detector",`calc( ${p} - ${sz}px )`,`calc( ${n} - ${sz}px )`],
			["first","0px",`calc( ${n} + ${sz}px )`],
			["second",`calc( ${p} + ${sz}px )`,"0px"]
		];
		var s="";
		ol.forEach(o=>{
			[0,1].forEach(n=>[0,1].forEach(m=>{
				s+="@media screen"+(n?"":` and (orientation:${m?"landscape":"portrait"})`)+` {.${n?(m?"horizontal":"vertical"):"auto"} #${o[0]}{${m?"left":"top"}:${o[1]};${m?"right":"bottom"}:${o[2]};}}`;
			}));
		});
		splitStyle.textContent=s;
		output.boxSize();
	},"split")();
	cues.add(output.boxSize,"resize");

	cues.add(()=>{
		qs('[name="theme-color"]').content=status.dark?"#666666":"#999999";
	},"colorScheme");

	cues.add(()=>ap(document.body,f),"load");

});

/* Create separator and build event handler by which the user can move the separator */
window.framework("split",(cues,status,storage,cd,ael,bcr)=>{

	let d=cd("detector");
	let o={
		view:d
	};

	/* convert event data to usable value */
	let adj=e=>{
		let r=bcr(d);
		return {
			x:(e.clientX*2/r.width)-1,
			y:(e.clientY*2/r.height)-1
		};
	};

	if (status.touch) {
		ael(d,"touchstart",e=>{
			if (e.touches.length>1) status.moving=false;
			else status.moving=true;
			e.preventDefault();
		});
		ael(d,"touchmove",e=>{
			if (status.moving) {
				status.split=adj(e.touches[0])[status.currentDir?"x":"y"];
				cues.call("split");
				e.preventDefault();
			}
		});
		let f=e=>{
			if (status.moving) {
				storage.save();
				status.moving=false;
			}
			e.preventDefault();
		};
		ael(d,"touchend",f);
		ael(d,"touchcancel",f);
	}
	else {
		ael(d,"mousedown",e=>{
			status.moving=true;
			e.preventDefault();
		});
		ael(d,"mousemove",e=>{
			if (status.moving) {
				status.split=adj(e)[status.currentDir?"x":"y"];
				cues.call("split");
				e.preventDefault();
			}
		});
		let f=e=>{
			if (status.moving) {
				storage.save();
				status.moving=false;
			}
			e.preventDefault();
		};
		ael(d,"mouseup",f);
		ael(d,"mouseout",f);
	}

	return o;

});

/* Create source editor */
window.framework("input",(cues,docs,storage,output,cd,ce,ap,sa)=>{

	let t=ce("textarea");

	let o={
		view:cd(null,"subView"), /* parent view */
		text:t /* editor */
	};
	ap(o.view,t);

	sa(t,"wrap","soft");
	sa(t,"spellcheck","false");
	sa(t,"autocapitalize","off");
	sa(t,"autocomplete","off");
	sa(t,"autocorrect","off");

	let src=output.source;
	setInterval(()=>{
		let d=docs.list[docs.opened];
		if ((d.scroll!=t.scrollTop)|(d.data!=t.value)) {
			d.scroll=t.scrollTop;
			d.data=t.value;
			src.innerText=t.value;
			storage.save();
		}
	},100);

	cues.add((_,d)=>{
		t.value=d.data;
		t.placeholder=d.app.placeholder;
		setTimeout(()=>t.scrollTo(0,d.scroll),0);
	},"open");

	let r=[/^source:/,/ xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g];
	cues.add((_,d)=>{
		if (r[0].test(d.replace(/\n/g,""))) t.value=d.replace(r[0],"").replace(r[1],"");
	},"receiveFromFrame");

	return o;

});

/* Create previewer */
window.framework("output",(cues,util,status,docs,cd,ce,ap,rc,ael)=>{

	/* parent view */
	let v=cd(null,"subView");

	/*
		for printing: show source code insteatd of textarea
		textarea is invisible in printing
	*/
	let pv=ap(v,cd("print-view"));

	ap(pv,cd(null,"header","Source")); /* shown in printing */
	let s=ap(pv,cd(null,"pre")); /* included in print-view */

	let rt=cd(null,"header","Result"); /* shown in printing */
	cues.add((_,b)=>{
		if (b&&!rt.parentNode) ap(pv,rt);
		if (!b&&rt.parentNode) rc(rt);
	},"resultTitle");

	/* frame,box,string are widgets that show the result and can be replaced with another */
	let w={
		frame:ce("iframe"),
		box:cd("box"),
		string:cd("string")
	};
	w.frame.src="about:blank";
	ap(v,w.frame);
	cues.add((_,d)=>{
		if ((docs.list[docs.opened].app.type=="frame")&&util.blobURL()) w.frame.contentWindow.postMessage(d,"*");
	},"postToFrame");

	cues.add((_,d)=>{
		s.innerText=d.data;
		rc(w.string);
		rc(w.frame);
		rc(w.box);
		w.frame.src="about:blank";
		switch (d.app.type) {
			case "string":ap(v,w.string);break;
			case "frame":ap(v,w.frame);break;
			case "box":ap(v,w.box);break;
		}
	},"open");

	cues.add(()=>{
		if (!status.colorScheme) cues.call("postToFrame",status.dark?"style:dark":"style:light");
	},"colorScheme");

	ael(window,"message",e=>{
		if (e.source===w.frame.contentWindow) cues.call("receiveFromFrame",e.data);
	});

	let o={
		view:v,
		widget:w,
		source:s,
		boxSize:()=>{
			if (!w.box.parentNode) return;
			cues.call("boxSize",w.box);
		}
	};

	return o;

});

/* Create bar above the editor */
window.framework("firstMenu",(util,status,docs,apps,storage,cd,ap,ib,rc,sa,sc,tc)=>{

	let o={
		view:cd(null,"nav")
	};

	/* if no document found, create new one */
	if (docs.list.length==0) {
		docs.list.push(docs.template());
		tc(o.view,"first");
	}
	else tc(o.view,"second");

	let close=()=>{
		sc(o.view,"nav second");
		status.editing=false;
		if (del.parentNode) int=setTimeout(()=>{
			apps.list.forEach(a=>sc(a.node,"tab"));
			rc(del);
			rc(name);
			int=null;
		},300);
	};

	/* delete button: remove a document */
	let del=cd(null,"button","×");
	sa(del,"role","button");
	sa(del,"title","Delete");
	util.button(del,()=>{
		let op=docs.list[docs.opened];
		storage.removeDoc(op);
		rc(op.node);
		sc(op.app.node,"tab");
		/* if no file exists, create new document automatically */
		if (docs.list.length==1) {
			docs.list.length=0;
			let d=util.tab(docs.template());
			docs.list.push(d);
			docTab(d);
			docs.open(0);
			rc(del);
			rc(name);
		}
		/* if documents still exists, simply remove one */
		else {
			docs.list.splice(docs.opened,1);
			if (docs.opened==docs.list.length) docs.open(docs.opened-1);
			else docs.open(docs.opened);
			close();
		}
	});

	/* rename button: change document filename */
	let name=cd(null,"button","✎");
	sa(name,"role","button");
	sa(name,"title","Rename");
	util.button(name,()=>{
		let op=docs.list[docs.opened];
		let n=prompt("New name:",op.name);
		if (n) {
			op.name=n;
			op.node.firstChild.textContent=n+(op.app.ext?("."+op.app.ext):"");
			close();
			storage.save();
		}
	});

	var int=null;
	var docTab=null;
	var addButtons=null;

	/* first view */
	(()=>{
		let d=ap(ap(ap(o.view,cd(null,"view first")),cd()),cd());
		let b=ap(d,cd(null,"button","▲"));
		sa(b,"role","button");
		sa(b,"title","Cancel");
		util.button(b,close);
		for (let a of apps.list) {
			ap(d,a.node);
			util.button(a.node,()=>{
				if (status.editing) {
					let d=docs.list[docs.opened];
					d.type=a.name;
					d.app=a;
					if (a.ext) d.node.firstChild.textContent=d.name+(a.ext?("."+a.ext):"");
					storage.save();
					docs.open(docs.opened);
					close();
				}
				else {
					let fn=prompt("file name:","Untitled");
					if (!fn) return;
					let d=util.tab({
						name:fn,
						type:a.name,
						scroll:0,
						dataUUID:util.uuid(),
						data:a.template,
						app:a,
						node:null
					});
					docTab(d,true);
					docs.list.unshift(d);
					docs.open(0);
					sc(o.view,"nav second");
				}
			});
		}
		addButtons=()=>{
			if (int) {
				clearTimeout(int);
				int=null;
			}
			else {
				ib(name,b.nextSibling);
				ib(del,name);
			}
		};
	})();

	/* second view */
	(()=>{
		let p=ap(ap(ap(o.view,cd(null,"view second")),cd()),cd());
		let b=ap(p,cd(null,"button","＋"));
		sa(b,"role","button");
		sa(b,"title","New document");
		util.button(b,()=>sc(o.view,"nav first"));
		/* create a tab for the given document */
		docTab=(e,w)=>{
			util.button(e.node,()=>{
				if (docs.list[docs.opened]==e) {
					status.editing=true;
					addButtons();
					apps.list.forEach(a=>sc(a.node,"tab"+(a==e.app?" selected":"")));
					sc(o.view,"nav first");
				}
				else docs.open(docs.list.findIndex(d=>d===e));
			});
			if (w) ib(e.node,b.nextSibling);
			else ap(p,e.node);
		};
		for (let d of docs.list) {
			ap(p,d.node);
			docTab(d);
		}
	})();

	return o;

});

/* Create bar above the previewer */
window.framework("secondMenu",(cues,util,status,func,cd,ap,rc,sa,sc)=>{

	let o={
		view:cd(null,"nav first")
	};

	let v=ap(ap(ap(o.view,cd(null,"view first")),cd()),cd());

	let sd=()=>status.dir=status.currentDir?"vertical":"horizontal";
	let dm=()=>status.dark=!status.dark;

	let l=[
		{icon:"◀︎",title:"Back",action:func.back},
		{icon:"▶︎",title:"Execute",action:func.exec},
		{icon:"✉️",title:"Email",action:func.mail},
		{icon:"↔︎",title:"Toggle split direction",action:sd},
		{icon:"D",title:"Toggle dark mode",action:dm}
	];

	let b=l.map(i=>{
		let b=cd(i.icon=="D"?"darkModeSwitcher":null,"button",i.icon);
		sa(b,"title",i.title);
		util.button(b,i.action);
		return b;
	});

	cues.add((_,d)=>{
		while (v.firstChild) rc(v.firstChild);
		if (d.app.back) ap(v,b[0]);
		if (d.app.exec) ap(v,b[1]);
		if (d.app.mail) ap(v,b[2]);
		ap(v,b[3]);
		ap(v,b[4]);
	},"open");

	cues.add(()=>{
		sc(b[3],"button"+(status.dir=="horizontal"?" selected":""));
		sc(b[4],"button"+(status.dark?" selected":""));
	},"status");

	return o;

});