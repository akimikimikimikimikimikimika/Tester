(()=>{let ce=(t)=>document.createElement(t),cd=(i,c,t)=>{let e=ce("div");if (i) sa(e,"id",i);if (c) sc(e,c);if (t) e.innerHTML=parseHTML(t);return e;},ap=(p,c)=>p.appendChild(c),ib=(c,a)=>a.parentNode.insertBefore(c,a),apd=(p,i,c,t)=>ap(p,cd(i,c,t)),rc=c=>{if (c.parentNode) c.parentNode.removeChild(c)},sa=(e,k,v)=>e.setAttribute(k,v),ra=(e,k)=>e.removeAttribute(k),ss=(e,c)=>sa(e,"style",c),sc=(e,c)=>{if (c) sa(e,"class",c);else ra(e,"class");},sas=(e,w)=>sa(e,"aria-selected",w?"true":"false"),sad=(e,w)=>sa(e,"aria-disabled",w?"true":"false"),ael=(e,t,l,o)=>e.addEventListener(t,l,o),head=document.head,body=document.body,html=document.documentElement;var dir=null,darkMode=null,text=null,resultView=null,printView=null,printSource=null,printResult=null,frame=null,string=null,editing=true,rightMenu=null;let splitStyle=ap(head,ce("style"));let status=new Proxy({touch:false,standalone:false,browser:null,save:false,dir:"auto",dark:false,split:0,moving:false,opened:0,documents:[]},{set:(t,p,v)=>{t[p]=v;let c=[t.dir,t.dark?"dark":"light"];if (t.standalone) c.push("standalone");if (t.touch) c.push("touch");if (t.moving) c.push("moving");if (t.browser!=null) c.push(t.browser.toLowerCase());sc(html,c.join(" "));if (dir) sc(dir,"button"+(t.dir=="horizontal"?" selected":""));if (darkMode) sc(darkMode,"button"+(t.dark?" selected":""));let d=t.documents[t.opened];document.getElementsByName("theme-color")[0].content=t.dark?"#666666":"#999999";(()=>{if (t.split>0.75) t.split=0.75;if (t.split<-0.75) t.split=-0.75;let p=(1+t.split)*50+"%",n=(1-t.split)*50+"%",sz=t.touch?10:1;let ol=[["border",`calc( ${p} - ${sz}px )`,`calc( ${n} - ${sz}px )`],["detector",`calc( ${p} - ${sz}px )`,`calc( ${n} - ${sz}px )`],["first","0px",`calc( ${n} + ${sz}px )`],["second",`calc( ${p} + ${sz}px )`,"0px"]];var s="";ol.forEach(o=>{[0,1].forEach(n=>[0,1].forEach(m=>{s+="@media screen"+(n?"":` and (orientation:${m?"landscape":"portrait"})`)+` {.${n?(m?"horizontal":"vertical"):"auto"} #${o[0]}{${m?"left":"top"}:${o[1]};${m?"right":"bottom"}:${o[2]};}}`;}));});splitStyle.textContent=s;})();if (d) if (d.app.type=="frame") if (frame) if (frame.src.match(/^data:/)) frame.contentWindow.postMessage(t.dark?"style:#cccccc,#111111":"style:#333333,#eeeeee","*");},get:(t,p)=>{if (p=="currentDir") {switch (t.dir) {case "vertical":return false;case "horizontal":return true;case "auto":return html.offsetWidth>=html.offsetHeight;}}else return t[p];}});(()=>{status.standalone=navigator.standalone===true||(/standalone=yes/).test(location.search);if (window.ApplePaySession) status.browser="Safari";if (window.chrome) status.browser="Chrome";if (window.sidebar) status.browser="Firefox";status.touch=ce().ontouchstart===null;})();let uuid=()=>{var s="";for (var n=0;n<12;n++) s+=("0123456789ABCDEF")[Math.floor(Math.random()*16)];return s;};let mkTab=d=>{let b=ap(cd(null,"tab"),cd(null,null,d.name+(d.app.ext?("."+d.app.ext):"")));sa(b,"role","button");d.node=b.parentNode;return d;};let def=()=>{let d=mkTab({name:"Untitled",type:"text/html.body",scroll:0,dataUUID:uuid(),data:"",app:defaultApp,node:null});sc(d.node,"tab opened");return d;};let open=n=>{let o=status.documents[n];text.value=o.data;text.placeholder=o.app.placeholder;setTimeout(()=>text.scrollTo(0,o.scroll),0);printSource.innerHTML=parseHTML(o.data);rc(printResult);rc(frame);rc(string);frame.src="about:";if (o.app.type=="string") ap(resultView,string);if (o.app.type=="frame") ap(resultView,frame);status.documents.forEach((d,m)=>sc(d.node,"tab"+(n==m?" opened":"")));status.opened=n;data.save();rightMenu();};let button=(e,a)=>{var valid=false;if (status.touch) {ael(e,"touchstart",e=>{valid=true;});ael(e,"touchmove",e=>{valid=false;});ael(e,"touchcancel",e=>{valid=false;});ael(e,"touchend",e=>{if (valid) {valid=false;a();}});}else {ael(e,"mousedown",e=>{valid=true;});ael(e,"mouseout",e=>{valid=false;});ael(e,"mouseup",e=>{if (valid) {valid=false;a();}});}};let parseHTML=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/[ \t]/g,"&nbsp;").replace(/\n/g,"<br />");let desc=a=>{let f=(v,r)=>{if (v===null) return "null";else if (v===undefined) return "undefined";else {let c=v.constructor;switch (c) {case String:if (r) return v;else return `"${v.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"`;case Number:case Boolean:case Function:case URL:case Date:return v.toString();case Symbol:if (v.description) "Symbol: "+v.description;else return "Symbol";case Error:case EvalError:case RangeError:case ReferenceError:case SyntaxError:case TypeError:case URIError:if (v.message) return v.name+": "+v.message;else return v.name;case Array:let l=(v.length?Math.floor(Math.log10(v.length)):0)+1;return (v.length+" item"+(v.length>1?"s":""))+" [\n"+v.map((v,n)=>{let m=(n?Math.floor(Math.log10(n)):0)+1;return `${" ".repeat(l-m+1)}${n}: ${f(v)}`;}).join("\n")+"\n]";default:return Object.prototype.toString.call(v);}}};return Array.from(a).map(e=>f(e)).join("\n");};let cs=e=>{let log=a=>{ap(e,cd(null,"log",desc(a)));};let info=a=>{ap(e,cd(null,"info",desc(a)));};let warn=a=>{ap(e,cd(null,"warn",desc(a)));};let error=a=>{ap(e,cd(null,"error",desc(a)));};let clear=a=>{while (e.firstChild) rc(e.firstChild);};let c={log:(...args)=>log(args),info:(...args)=>info(args),warn:(...args)=>warn(args),error:(...args)=>error(args),exception:(...args)=>error(args),clear:(...args)=>clear(args)};return c;};let exeCode=new Function("console","source","return eval(source);");let frameHead=()=>"\n\t\t<meta charset=\"UTF-8\" />\n\t\t<title>Tester</title>\n\t\t<style>html,body{font-size:18px;transition:color 0.1s ease-in-out,background-color 0.1s ease-in-out;}</style>\n\t\t<style id=\"testerViewMode\">@media screen{html,body{color:"+(status.dark?"#cccccc":"#333333")+";background-color:"+(status.dark?"#111111":"#eeeeee")+";}}</style>\n\t\t<script>\n\t\t\t(()=>{\n\t\t\t\tlet s=document.getElementById(\"testerViewMode\"),st=/^style:(#[0-9a-fA-F]{6}),(#[0-9a-fA-F]{6})$/;\n\t\t\t\twindow.addEventListener(\"message\",e=>{\n\t\t\t\t\tif (e.source===window.parent) {\n\t\t\t\t\t\tif (st.test(e.data)) {\n\t\t\t\t\t\t\tlet m=e.data.match(st);\n\t\t\t\t\t\t\ts.textContent=`@media screen{html,body{color:${m[1]};background-color:${m[2]};}}`;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (e.data==\"request-source:\") {\n\t\t\t\t\t\t\tlet m=document.getElementById(\"main\");\n\t\t\t\t\t\t\tif (m) parent.postMessage(\"source:\"+m.innerHTML,\"*\");\n\t\t\t\t\t\t\telse parent.postMessage(\"source:\",\"*\");\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t})();\n\t\t<\/script>";let apps=[{name:"text/html.body",label:"HTML",ext:"html",type:"frame",placeholder:"<div style=\"color:red;\">Hello world!</div>",node:null,exec:(d,e)=>{e.src="data:text/html;base64,"+btoa(unescape(encodeURIComponent("<!doctype html>\n<html>\n\t<head>"+frameHead()+"\n\t</head>\n\t<body id=\"main\" contenteditable=\"true\">"+d.data+"</body>\n</html>")));},mail:d=>{location.href="mailto:?body="+encodeURIComponent(d.data);},back:true},{name:"text/javascript",label:"JavaScript",ext:"js",type:"string",placeholder:"console.log(\"Hello world!\");",node:null,exec:(d,e)=>{let con=cs(e);con.clear();try{let r=exeCode(con,d.data);ap(e,cd(null,"dialog",desc([r])));}catch(err){con.error(err);}}},{name:"text/html",label:"HTML (full)",ext:"html",type:"frame",placeholder:"<!doctype html><html><head><meta charset=\"UTF-8\" /><title>My Great Website</title></head><body><h1>My Great Website</h1></body></html>",node:null,exec:(d,e)=>{e.src="data:text/html;base64,"+btoa(unescape(encodeURIComponent(d.data)));}},{name:"application/mathml+xml",label:"MathML",ext:"mml",type:"frame",placeholder:"<mfrac><mrow><mn>5</mn><mi>π</mi></mrow><mrow><mn>12</mn></mrow></mfrac>",node:null,exec:(d,e)=>{e.src="data:text/html;base64,"+btoa(unescape(encodeURIComponent("<!doctype html>\n<html>\n\t<head>"+frameHead()+"\n\t</head>\n\t<body>\n\t\t<math id=\"main\" contenteditable=\"true\">"+d.data+"</math>\n\t</body>\n</html>")));}},];apps.forEach(a=>{let b=ap(cd(null,"tab"),cd(null,null,a.label));sa(b,"role","button");a.node=b.parentNode;});let defaultApp=apps[0];let data={storage:false,save:()=>{if (data.storage) {let d={dark:status.dark,dir:status.dir,split:status.split,opened:status.opened,documents:status.documents.map(e=>({name:e.name,type:e.type,scroll:e.scroll,data:e.dataUUID}))};try{localStorage.setItem("Tester",JSON.stringify(d));status.documents.forEach(e=>{localStorage.setItem(e.dataUUID,e.data);});}catch(e){data.storage=false;}}},removeDoc:d=>{try{localStorage.removeItem(d.dataUUID);}catch(e){data.storage=false;}}};(()=>{try{let ls=localStorage.getItem("Tester");data.storage=true;if (ls) {let o=JSON.parse(ls);status.dark=!!o.dark;switch (o.dir) {case "auto":case "horizontal":case "vertical":status.dir=o.dir;break;default:status.dir="auto";break;}status.split=o.split?o.split:0;let od=o.documents;var op=o.opened?Math.floor(o.opened):0;if (op<0) op=0;if (od) {if (od.map) {if (op>=od.length) op=od.length-1;status.documents=od.map((e,n)=>{let d={name:e.name?e.name:"Untitled",type:e.type?e.type:"text/html.body",app:null,scroll:e.scroll?e.scroll:0,dataUUID:null,data:"",node:null};let dt=localStorage.getItem(e.data);if (dt!=null) {d.dataUUID=e.data;d.data=dt;}else d.dataUUID=uuid();let a=apps.find(a=>d.type==a.name);if (a) d.app=a;else {d.app=defaultApp;d.type=defaultApp.name;}return mkTab(d);});}}status.opened=op;}else throw new Error("Error");}catch(e){}})();let back=()=>{let d=status.documents[status.opened];let a=d.app;if (a.back) if (frame) if (frame.src.match(/^data:/)) frame.contentWindow.postMessage("request-source:","*");};let exec=()=>{let d=status.documents[status.opened];let a=d.app;if (a.exec) {if (a.type=="string") {if (!printResult.parentNode) ap(printView,printResult);a.exec(d,string);}if (a.type=="frame") a.exec(d,frame);data.save();}};let mail=()=>{let d=status.documents[status.opened];let a=d.app;if (a.mail) {a.mail(d);data.save();}};let tester=(()=>{return {exec:()=>exec(),mail:()=>mail()};})();let f=cd("frame");let first=ap(f,cd("first"));let second=ap(f,cd("second"));ap(f,cd("border"));let detector=ap(f,cd("detector"));(()=>{let d=detector;var r={x:0,y:0};let p=(a,b)=>({x:a.x+y.x,y:a.y+b.y});let m=(a,b)=>({x:a.x-y.x,y:a.y-b.y});let adj=e=>{let r=detector.getBoundingClientRect();return {x:(e.clientX*2/r.width)-1,y:(e.clientY*2/r.height)-1};};if (status.touch) {ael(d,"touchstart",e=>{if (e.touches.length>1) status.moving=false;else status.moving=true;e.preventDefault();});ael(d,"touchmove",e=>{if (status.moving) {status.split=adj(e.touches[0])[status.currentDir?"x":"y"];e.preventDefault();}});let f=e=>{if (status.moving) {data.save();status.moving=false;}e.preventDefault();};ael(d,"touchend",f);ael(d,"touchcancel",f);}else {ael(d,"mousedown",e=>{status.moving=true;e.preventDefault();});ael(d,"mousemove",e=>{if (status.moving) {status.split=adj(e)[status.currentDir?"x":"y"];e.preventDefault();}});let f=e=>{if (status.moving) {data.save();status.moving=false;}e.preventDefault();};ael(d,"mouseup",f);ael(d,"mouseout",f);}})();(()=>{let sd=status.documents;let n=ap(first,cd(null,"nav "+(sd.length>0?"second":"first")));if (sd.length==0) sd.push(def());let close=()=>{sc(n,"nav second");editing=false;if (del.parentNode) int=setTimeout(()=>{apps.forEach(a=>sc(a.node,"tab"));rc(del);rc(name);int=null;},300);};let del=cd(null,"button","×");sa(del,"role","button");sa(del,"title","Delete");button(del,()=>{let op=status.opened;data.removeDoc(sd[op]);rc(sd[op].node);sc(sd[op].app.node,"tab");if (sd.length==1) {sd.length=0;let d=mkTab(def());sd.push(d);docTab(d);open(0);rc(del);rc(name);}else {for (var n=op;n<sd.length-1;n++) sd[n]=sd[n+1];sd.length--;if (op==sd.length) open(op-1);else open(op);close();}});let name=cd(null,"button","✎");sa(name,"role","button");sa(name,"title","Rename");button(name,()=>{let op=sd[status.opened];let nn=prompt("New name:",op.name);if (nn) {op.name=nn;op.node.firstChild.textContent=nn+(op.app.ext?("."+op.app.ext):"");close();data.save();}});var int=null;var docTab=null;var addButtons=null;[0,1].forEach(w=>{let d=ap(ap(ap(n,cd(null,"view "+(w?"second":"first"))),cd()),cd());let b=ap(d,cd(null,"button",w?"＋":"▲"));sa(b,"role","button");sa(b,"title",w?"New document":"Cancel");button(b,w?()=>sc(n,"nav first"):()=>close());if (w) {docTab=(e,w)=>{button(e.node,()=>{if (sd[status.opened]==e) {editing=true;addButtons();sc(e.app.node,"tab selected");sc(n,"nav first");}else open(sd.findIndex(d=>d===e));});if (w) ib(e.node,b.nextSibling);else ap(d,e.node);};sd.forEach(e=>{ap(d,e.node);docTab(e);});}else {apps.forEach(a=>{ap(d,a.node);button(a.node,()=>{if (editing) {let d=sd[status.opened];d.type=a.name;d.app=a;if (a.ext) d.node.firstChild.textContent=d.name+(a.ext?("."+a.ext):"");data.save();open(status.opened);close();}else {let d=mkTab({name:"Untitled",type:a.name,scroll:0,dataUUID:uuid(),data:"",app:a,node:null});docTab(d,true);sd.unshift(d);open(0);sc(n,"nav second");}});});addButtons=()=>{ib(name,b.nextSibling);ib(del,name);};}});})();(()=>{let txt=ap(ap(first,cd(null,"subView")),ce("textarea"));text=txt;sa(txt,"wrap","soft");sa(txt,"spellcheck","false");sa(txt,"autocapitalize","off");sa(txt,"autocomplete","off");sa(txt,"autocorrect","off");setInterval(()=>{let d=status.documents[status.opened];if ((d.scroll!=text.scrollTop)|(d.data!=text.value)) {d.scroll=text.scrollTop;d.data=text.value;printSource.innerHTML=parseHTML(text.value);data.save();}},100);ael(window,"message",e=>{let r=/^source:/;if (e.source==frame.contentWindow) {if (r.test(e.data.replace(/\n/g,""))) text.value=e.data.replace(r,"");}});})();(()=>{let v=ap(ap(ap(ap(second,cd(null,"nav first")),cd(null,"view first")),cd()),cd());let l=[["Back","◀︎",()=>back()],["Execute","▶︎",()=>exec()],["Email","✉️",()=>mail()],["Toggle split direction","↔︎",()=>{status.dir=status.currentDir?"vertical":"horizontal";}],["Toggle dark mode","D",()=>{status.dark=!status.dark;}]];l.forEach((i,n)=>{let b=cd(null,"button",i[1]);sa(b,"title",i[0]);button(b,i[2]);i[3]=b;if (n==3) dir=b;else if (n==4) darkMode=b;});rightMenu=()=>{let d=status.documents[status.opened];while (v.firstChild) rc(v.firstChild);if (d.app.back) ap(v,l[0][3]);if (d.app.exec) ap(v,l[1][3]);if (d.app.mail) ap(v,l[2][3]);ap(v,l[3][3]);ap(v,l[4][3]);};})();(()=>{let sv=ap(second,cd(null,"subView"));resultView=sv;let pt=ap(sv,cd("print-view"));printView=pt;ap(pt,cd(null,"header","Source"));printSource=ap(pt,cd(null,"pre"));printResult=cd(null,"header","Result");let fr=ap(sv,ce("iframe"));fr.src="about:";frame=fr;let st=cd("string");string=st;})();open(status.opened);ap(body,f);})();
