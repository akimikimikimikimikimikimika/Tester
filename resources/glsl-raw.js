window.framework("glsl",(cues,cd,ce,ap,sc,ss,ael,clr,bcr,dpr)=>{

	let resized=cues.add((_,b)=>{
		if (!c) return;
		var w=0,h=0;
		if (active) {
			let r=bcr(b);
			w=r.width,h=r.height;
		}
		ss(c,"width",w+"px");
		ss(c,"height",h+"px");
		W=w*dpr,H=h*dpr;
		c.width=W,c.height=H;
		ct.viewport(0,0,W,H);
	},"boxSize");

	let vertex=`
		attribute vec2 pos;
		varying vec2 position;

		void main() {
			gl_Position = vec4(pos,0.0,1.0);
			position = pos;
		}
	`;

	let container=cd();
	let indexD=new Int16Array([0,1,2,1,2,3]),posD=new Float32Array([-1,-1,-1,+1,+1,-1,+1,+1]);
	var c,ct;
	var W,H,X,Y;
	var indexB,posB,timeL,pointerL,resolutionL;
	var active=false,af=null;
	var startTime=0;

	let setup=()=>{
		c=ap(container,ce("canvas"));
		pointerDetection();
		ct=c.getContext("webgl");
		indexB=ct.createBuffer();
		posB=ct.createBuffer();

		ct.enable(ct.BLEND);
		ct.blendFuncSeparate(ct.SRC_ALPHA,ct.ONE_MINUS_SRC_ALPHA,ct.ONE,ct.ONE_MINUS_SRC_ALPHA);

		ct.clearColor(0,0,0,0);
	};

	let build=ss=>{
		active=false;

		let pg=ct.createProgram();

		let vs=ct.createShader(ct.VERTEX_SHADER);
		ct.shaderSource(vs,vertex);
		ct.compileShader(vs);
		ct.attachShader(pg,vs);

		let fs=ct.createShader(ct.FRAGMENT_SHADER);
		ct.shaderSource(fs,ss);
		ct.compileShader(fs);
		ct.attachShader(pg,fs);

		ct.linkProgram(pg);

		if (!ct.getProgramParameter(pg, ct.LINK_STATUS)) {
			console.log(ct.getProgramInfoLog(pg));
			active=false;
			return;
		}
		ct.useProgram(pg);

		let posL=ct.getAttribLocation(pg,"pos");
		timeL=ct.getUniformLocation(pg,"time");
		pointerL=ct.getUniformLocation(pg,"pointer");
		resolutionL=ct.getUniformLocation(pg,"resolution");

		ct.bindBuffer(ct.ARRAY_BUFFER,posB);
		ct.bufferData(ct.ARRAY_BUFFER,posD,ct.STATIC_DRAW);
		ct.enableVertexAttribArray(posL);
		ct.vertexAttribPointer(posL,2,ct.FLOAT,false,0,0);
		ct.bindBuffer(ct.ELEMENT_ARRAY_BUFFER,indexB);
		ct.bufferData(ct.ELEMENT_ARRAY_BUFFER,indexD,ct.STATIC_DRAW);

		active=true;

	};

	let runner=()=>{
		if (active) {
			startTime=performance.now()/1000;
			frame();
		}
	};

	let frame=()=>{
		ct.clear(ct.COLOR_BUFFER_BIT);

		if (timeL) ct.uniform1f(timeL,performance.now()/1000-startTime);
		if (pointerL) ct.uniform2f(pointerL,X,Y);
		if (resolutionL) ct.uniform2f(resolutionL,W,H);
		ct.drawElements(ct.TRIANGLES,6,ct.UNSIGNED_SHORT,0);

		af=requestAnimationFrame(frame);
	};

	let pointerDetection=()=>{
		let sp=e=>{
			e.stopPropagation();
			e.preventDefault();
		};
		let cd=e=>{
			let r=bcr(c);
			X=(e.clientX-r.left)/W*dpr*2-1,Y=(e.clientY-r.top)/H*dpr*2-1;
		};
		var valid=false;
		ael(c,"pointerdown",e=>{
			if (e.isPrimary) {
				cd(e);
				valid=true;
			}
			sp(e);
		});
		ael(c,"pointermove",e=>{
			if (e.isPrimary&&valid) cd(e);
			sp(e);
		});
		let f=e=>{
			if (e.isPrimary) valid=false;
			sp(e);
		};
		ael(c,"pointerup",f);
		ael(c,"pointerout",f);
		ael(c,"pointerleave",f);
		ael(c,"pointercancel",f);
	};

	let o={
		name:"x-shader/x-fragment",
		label:"GLSL",
		ext:"glsl",
		type:"box",
		placeholder:"uniform float time,uniform vec2 resolution,uniform vec2 pointer;",
		template:`#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform float time;\nuniform vec2 pointer;\nvarying vec2 position;\nuniform vec2 resolution;\n\nconst float L = 0.2;\nconst float T = 1.0;\nconst float A = 0.5;\n\nvoid main() {\nfloat phase = position.x/L-time/T;\nfloat lightness = 0.0;\nif (position.y <= A*cos(phase))\n\tlightness = 1.0-0.5*(A-position.y)/(A+1.0);\nelse\n\tlightness = 0.5-0.5*(A+position.y)/(A+1.0);\ngl_FragColor = vec4(vec3(lightness),1.0);\n}`,
		node:null,
		exec:(d,e)=>{
			if (af) {
				cancelAnimationFrame(af);
				af=null;
			}
			sc(e,"embed");
			clr(e);
			ap(e,container);
			if (!c) setup();
			build(d.data);
			resized(null,e);
			runner();
		}
	};

	return o;

});