window.framework("javascript",(cd,ce,ap,ael,clr,qs,head)=>{

	var wa=window.Worker,w,log,m="main";
	let math=qs('[src="../Library/Math/Math.js"').src;
	let extJSList=()=>{
		let jQuery="3.4.1";
		let libPath=math.replace(/\/Math\/Math.js$/,"");

		return `[
			{name:"Color",url:"${libPath}/Color/Color.js"},
			{name:"jQuery",url:"https://code.jquery.com/jquery-${jQuery}.min.js"}
		]`;
	};

	let sps=ro=>{
		return `(result,loadExtJS)=>{
			let desc=a=>{
				let f=v=>{
					if (v===null) return "null";
					else if (v===undefined) return "undefined";
					else {
						let c=v.constructor;
						switch (c) {
							case String:
								return \`"\${v.replace(/\u005c\u005c/g,"\u005c\u005c\u005c\u005c").replace(/"/g,"\u005c\u005c\u005c"")}"\`;
							case Number:case Boolean:case Function:case URL:case Date:return v.toString();
							case Symbol:
								if (v.description) "Symbol: "+v.description;
								else return "Symbol";
							case Error:case EvalError:case RangeError:case ReferenceError:case SyntaxError:case TypeError:case URIError:
								if (v.message) return v.name+": "+v.message;
								else return v.name;
							case Array:
								let l=(v.length?Math.floor(Math.log10(v.length)):0)+1;
								return (v.length+" item"+(v.length>1?"s":""))+" [\u005cn"+v.map((v,n)=>{
									let m=(n?Math.floor(Math.log10(n)):0)+1;
									return \`\${" ".repeat(l-m+1)}\${n}: \${f(v)}\`;
								}).join("\u005cn")+"\u005cn]";
							default:
								return Object.prototype.toString.call(v);
						}
					}
				};
				return Array.from(a).map(f).join("\u005cn");
			};
			let o=(()=>{
				let l=${extJSList()};
				let lookUpExtJS=id=>{
					let f=l.find(i=>i.name==id);
					if (f) return f;
					else {
						let o={name:id,url:id};
						l.push(o);
						return o;
					}
				};
				let use=id=>{
					let f=lookUpExtJS(id);
					return new Promise(r=>{
						if (f.loaded) r(true);
						else loadExtJS(f.url).then(v=>{
							f.loaded=v;
							r(v);
						});
					});
				};
				let canIUse=id=>!!lookUpExtJS(id).loaded;
				return {
					use:id=>use(id),
					canIUse:id=>canIUse(id)
				};
			})();
			return {
				desc:desc,
				exec:(()=>{
					let func=new Function("console","print","println","runningOn","use","canIUse","source","return eval(source);");
					return (source,tp)=>{
						tp.con.clear();
						try{
							let r=func(tp.con,tp.con.log,tp.con.log,"${ro}",o.use,o.canIUse,source);
							result(desc([r]));
						}
						catch(e){tp.con.error(e);}
					};
				})()
			};
		}`;
	};
	let tps=`
		(con,sp)=>{
			let log=a=>con("log",sp.desc(a));
			let info=a=>con("info",sp.desc(a));
			let warn=a=>con("warn",sp.desc(a));
			let error=a=>con("error",sp.desc(a));
			let clear=a=>con("clear");
			return {
				con:{
					log:(...args)=>log(args),
					info:(...args)=>info(args),
					warn:(...args)=>warn(args),
					error:(...args)=>error(args),
					exception:(...args)=>error(args),
					clear:(...args)=>clear(args)
				}
			};
		}
	`;
	let sp=eval(sps("main"))(t=>log("result",t),async l=>{
		let s=ce("script");
		sa(s,"type","text/javascript");
		sa(s,"src",l);
		let p=new Promise(r=>{
			ael(s,"load",()=>r(true));
			ael(s,"abort",()=>r(false));
		});
		ap(head,s);
		return await p;
	});
	let ws=`
		importScripts("${math}");

		let post=(t,s)=>{
			self.postMessage({
				type:t,
				source:s
			});
		};
		let sp=(${sps("worker")})(r=>post("result",r),async l=>{
			try{
				importScripts(l);
				return true;
			}catch(e){
				console.error(e);
				return false;
			}
		});
		let exec=s=>{
			let tp=(${tps})(post,sp);
			sp.exec(s,tp);
		};
		self.addEventListener("message",e=>{
			let d=e.data;
			switch (d.type) {
				case "source":
					exec(d.source);
					break;
			}
		});
	`;
	if (wa) {
		let b=new Blob([ws],{type:"text/javascript",endings:"native"});
		let u=URL.createObjectURL(b);
		w=new Worker(u);
		URL.revokeObjectURL(u);
		ael(w,"message",e=>{
			log(e.data.type,e.data.source);
		});
	}

	let o={
		name:"text/javascript",
		label:"JavaScript",
		ext:"js",
		type:"string",
		placeholder:'print("Hello world!");',
		template:'print("Hello world!");',
		node:null,
		exec:(d,e)=>{
			log=(c,t)=>{
				if (c=="clear") clr(e);
				else if (c=="result") ap(e,cd(null,"dialog",t));
				else ap(e,cd(null,c,t));
			};
			let tp=eval(tps)(log,sp);
			let s=d.data;
			if (/^"main"/.test(s)) sp.exec(s,tp);
			else if (/^"worker"/.test(s)) w.postMessage({type:"source",source:s});
			else if (m=="main") sp.exec(s,tp);
			else if (m=="worker") w.postMessage({type:"source",source:s});
		}
	};

	return o;

});