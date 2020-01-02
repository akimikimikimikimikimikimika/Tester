window.framework("svg",(cues,cd,ap,clr,rc,sc,ga,ss,bcr,svgNS)=>{

	let sb=cd();
	let extract=d=>{
		sb.innerHTML=d;
		return Array.from(sb.childNodes).find(e=>(e.namespaceURI==svgNS)&&(e.tagName=="svg"));
	};

	let resized=cues.add((_,b)=>{
		if (!root) return;
		let r=bcr(b);
		var w=r.width,h=r.height;
		let iw=ga(root,"width"),ih=ga(root,"height");
		if (iw&&ih) {
			if (w*ih>h*iw) w=h/ih*iw;
			if (w*ih<h*iw) h=w/iw*ih;
			w+="px",h+="px";
		}
		else w=h="unset";
		ss(root,"width",w);
		ss(root,"height",h);
	},"boxSize");

	let container=cd();
	var root;

	let o={
		name:"image/svg+xml",
		label:"SVG",
		ext:"svg",
		type:"box",
		placeholder:`Type SVG here (${svgNS})`,
		template:`<svg xmlns="${svgNS}" \nwidth="100" height="100" viewBox="0 0 1000 1000">\n\n<\!-- chimney --\>\n<rect x="600" y="200" width="100" height="200" stroke="salmon" stroke-width="10" fill="none" />\n\n<\!-- house --\>\n<polygon points="500,200 150,500 250,500 250,900 750,900 750,500 850,500" fill="chocolate" />\n\n<\!-- moon --\>\n<path d="M 850,50 C 1000,100 900,300 750,200 C 850,200 900,150 850,50 Z" fill="lime" />\n\n</svg>`,
		node:null,
		exec:(d,e)=>{
			sc(e,"embed");
			clr(e);
			ap(e,container);
			let m=extract(d.data);
			if (!m) return;
			if (root) rc(root);
			root=ap(container,m);
			resized(null,e);
		}
	};

	return o;

});
window.framework("canvas",(cues,ce,cd,ap,clr,sc,ga,sa,ss,bcr)=>{

	let resized=cues.add((_,b)=>{
		if (!c) return;
		let r=bcr(b);
		var w=r.width,h=r.height;
		let iw=ga(c,"width"),ih=ga(c,"height");
		if (iw&&ih) {
			if (w*ih>h*iw) w=h/ih*iw;
			if (w*ih<h*iw) h=w/iw*ih;
			w+="px",h+="px";
		}
		else w=h="unset";
		ss(c,"width",w);
		ss(c,"height",h);
	},"boxSize");

	let container=cd();
	var c,ct;
	let setup=()=>{
		c=ap(container,ce("canvas"));
		ct=c.getContext("2d");
	};
	let f=new Function("source","canvas","context","eval(source);");

	let o={
		name:"text/javascript.canvas",
		label:"Canvas 2D",
		ext:"canvas2d",
		type:"box",
		placeholder:"const canvas,context;",
		template:`canvas.width=1000;\ncanvas.height=1000;\n\n// chimney\ncontext.beginPath();\ncontext.rect(600,200,100,200);\ncontext.strokeStyle="salmon";\ncontext.lineWidth="10";\ncontext.stroke();\n\n// house\ncontext.beginPath();\ncontext.moveTo(500,200);\ncontext.lineTo(150,500);\ncontext.lineTo(250,500);\ncontext.lineTo(250,900);\ncontext.lineTo(750,900);\ncontext.lineTo(750,500);\ncontext.lineTo(850,500);\ncontext.closePath();\ncontext.fillStyle="chocolate";\ncontext.fill();\n\n// moon\ncontext.beginPath();\ncontext.moveTo(850,50);\ncontext.bezierCurveTo(1000,100,900,300,750,200);\ncontext.bezierCurveTo(850,200,900,150,850,50);\ncontext.closePath();\ncontext.fillStyle="lime";\ncontext.fill();`,
		node:null,
		exec:(d,e)=>{
			sc(e,"embed");
			clr(e);
			ap(e,container);
			if (!c) setup();
			sa(c,"width"),sa(c,"height");
			f(d.data,c,ct);
			resized(null,e);
		}
	};

	return o;

});
window.framework("mathml",(cd,ap,clr,sc,mmlNS)=>{

	let sb=cd();
	let extract=d=>{
		sb.innerHTML=d;
		return Array.from(sb.childNodes).find(e=>(e.namespaceURI==mmlNS)&&(e.tagName=="math"));
	};

	let o={
		name:"application/mathml+xml",
		label:"MathML",
		ext:"mml",
		type:"box",
		placeholder:`Type MathML here (${mmlNS})`,
		template:`<math xmlns="${mmlNS}">\n\ <mroot>\n\ \ <mrow>\n\ \ \ <mfrac>\n\ \ \ \ <mi>c</mi><mn>2</mn>\n\ \ \ </mfrac>\n\ \ \ <mo>&#177;</mo>\n\ \ \ <msqrt>\n\ \ \ \ <msup>\n\ \ \ \ \ <mfenced><mfrac>\n\ \ \ \ \ \ <mi>c</mi><mn>2</mn>\n\ \ \ \ \ </mfrac></mfenced>\n\ \ \ \ \ <mn>2</mn>\n\ \ \ \ </msup>\n\ \ \ \ <mo>-</mo>\n\ \ \ \ <msup>\n\ \ \ \ \ <mfenced><mfrac>\n\ \ \ \ \ \ <mi>b</mi><mn>3</mn>\n\ \ \ \ \ </mfrac></mfenced>\n\ \ \ \ \ <mn>3</mn>\n\ \ \ \ </msup>\n\ \ \ </msqrt>\n\ \ </mrow>\n\ \ <mn>3</mn>\n\ </mroot>\n</math>`,
		node:null,
		exec:(d,e)=>{
			sc(e,"text");
			clr(e);
			let m=extract(d.data);
			if (!m) return;
			ap(e,m);
		}
	};

	return o;

});
window.framework("latex",(ce,ap,ael,clr,sc,head)=>{

	var mathJaxLoaded=false;
	let libURL="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";

	let loadLib=()=>{
		return new Promise((rs,rj)=>{
			let s=ce("script");
			s.src=libURL;
			ael(s,"load",()=>{
				mathJaxLoaded=true;
				rs();
			});
			ael(s,"abort",rj);
			ap(head,s);
		});
	};

	let o={
		name:"application/x+latex",
		label:"LaTeX",
		ext:"latex",
		type:"box",
		placeholder:"Type LaTeX here",
		template:"\\sqrt[3]{\n\ \\frac{c}{2}\n\ \\pm\n\ \\sqrt{\n\ \ {\\left(\n\ \ \ \\frac{c}{2}\n\ \ \\right)}^2\n\ \ -\n\ \ {\\left(\n\ \ \ \\frac{b}{3}\n\ \ \\right)}^2\n\ }\n}\n\\tag{1}",
		node:null,
		exec:(d,e)=>{
			let f=async ()=>{
				sc(e,"text");
				MathJax.typesetClear([e]);
				clr(e);
				e.textContent=`\\[ ${d.data} \\]`;
				await MathJax.typesetPromise([e]);
			};
			if (!mathJaxLoaded) loadLib().then(f);
			else f();
		}
	};

	return o;

});