window.framework("status",(cues,ce,csm,csal,sc,html)=>{

	let setter=(t,p,v)=>{
		t[p]=v;
		let c=[t.dir,t.colorScheme?"pcs":(t.dark?"dark":"light")];
		if (t.standalone) c.push("standalone");
		if (t.touch) c.push("touch");
		if (t.moving) c.push("moving");
		if (t.browser!=null) c.push(t.browser.toLowerCase());
		sc(html,c.join(" "));
		if (t.split>0.75) t.split=0.75;
		if (t.split<-0.75) t.split=-0.75;
		if (p=="dark") cues.call("colorScheme");
		cues.call("status");
	};
	let getter=(t,p)=>{
		if (p=="currentDir") {
			switch (t.dir) {
				case "vertical":return false;
				case "horizontal":return true;
				case "auto":return html.offsetWidth>=html.offsetHeight;
			}
		}
		else if (p=="dark") {
			if (t.colorScheme) return csm("dark");
			else return t.dark;
		}
		else return t[p];
	};

	let t={
		touch:false,
		standalone:false,
		browser:null,
		online:false,
		save:false,
		dir:"auto",
		dark:csm("dark"),
		colorScheme:csm("light")||csm("dark"),
		split:0,
		moving:false,
		editing:true
	};

	let s=new Proxy(t,{
		set:setter,
		get:getter
	});

	(()=>{
		t.standalone=navigator.standalone===true||(/standalone=yes/).test(location.search);
		t.online=(()=>{
			let p=location.protocol;
			return /https/.test(p)||(/http/.test(p)&&location.hostname=="localhost");
		})();
		if (window.ApplePaySession) t.browser="Safari";
		if (window.chrome) t.browser="Chrome";
		if (window.sidebar) t.browser="Firefox";
		s.touch=ce().ontouchstart===null;
	})();

	csal("light",m=>{if (m.matches) cues.call("colorScheme");});
	csal("dark",m=>{if (m.matches) cues.call("colorScheme");});

	if (status.online) try{
		["../Library/ServiceWorker.js","ServiceWorker.js"].forEach(f=>navigator.serviceWorker.register(f).then(r=>r.update()));
	}catch(e){}

	return s;

});