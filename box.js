(()=>{let ce=(t)=>document.createElement(t),cd=(i,c,t)=>{let e=ce("div");if (i) sa(e,"id",i);if (c) sc(e,c);if (t) e.innerText=t;return e;},ap=(p,c)=>p.appendChild(c),rc=c=>{if (c.parentNode) c.parentNode.removeChild(c)},ga=(e,k)=>e.getAttribute(k),sa=(e,k,v)=>{if (v) e.setAttribute(k,v);else e.removeAttribute(v);},sc=(e,c)=>sa(e,"class",c);var box,image;let resized=()=>{if (!box) return;let r=box.getBoundingClientRect();if (image) {let w=ga(image,"width"),h=ga(image,"height");if (r.width<=r.height) {image.style.width=r.width+"px";if (w&&h) image.style.height=r.width/w*h+"px";}else {image.style.height=r.height+"px";if (w&&h) image.style.width=r.height/h*w+"px";}}};let c=ce("canvas");let ct=c.getContext("2d");window.res("box",r=>{r.push(resized);return [{name:"image/svg+xml",label:"SVG",ext:"svg",type:"box",placeholder:"Type SVG here (http://www.w3.org/2000/svg)",template:`<svg xmlns="http://www.w3.org/2000/svg" \nwidth="100" height="100" viewBox="0 0 1000 1000">\n\n<\!-- chimney --\>\n<rect x="600" y="200" width="100" height="200" stroke="salmon" stroke-width="10" fill="none" />\n\n<\!-- house --\>\n<polygon points="500,200 150,500 250,500 250,900 750,900 750,500 850,500" fill="chocolate" />\n\n<\!-- moon --\>\n<path d="M 850,50 C 1000,100 900,300 750,200 C 850,200 900,150 850,50 Z" fill="lime" />\n\n</svg>`,node:null,exec:(d,e)=>{box=e;sc(e,"embed");while (e.firstChild) rc(e.firstChild);let sb=cd();sb.innerHTML=d.data;let m=Array.from(sb.childNodes).find(e=>(e.namespaceURI=="http://www.w3.org/2000/svg")&&(e.tagName="SVG"));image=m;if (m) ap(e,m);resized();}},{name:"text/javascript.canvas",label:"Canvas 2D",ext:"canvas2d",type:"box",placeholder:"const canvas,context;",template:`canvas.width=1000;\ncanvas.height=1000;\n\n// chimney\ncontext.beginPath();\ncontext.rect(600,200,100,200);\ncontext.strokeStyle="salmon";\ncontext.lineWidth="10";\ncontext.stroke();\n\n// house\ncontext.beginPath();\ncontext.moveTo(500,200);\ncontext.lineTo(150,500);\ncontext.lineTo(250,500);\ncontext.lineTo(250,900);\ncontext.lineTo(750,900);\ncontext.lineTo(750,500);\ncontext.lineTo(850,500);\ncontext.closePath();\ncontext.fillStyle="chocolate";\ncontext.fill();\n\n// moon\ncontext.beginPath();\ncontext.moveTo(850,50);\ncontext.bezierCurveTo(1000,100,900,300,750,200);\ncontext.bezierCurveTo(850,200,900,150,850,50);\ncontext.closePath();\ncontext.fillStyle="lime";\ncontext.fill();`,node:null,exec:(d,e)=>{box=e;sc(e,"embed");while (e.firstChild) rc(e.firstChild);ap(e,c);image=c;let f=new Function("source","canvas","context","eval(source);");f(d.data,c,ct);resized();}},{name:"application/mathml+xml",label:"MathML",ext:"mml",type:"box",placeholder:"Type MathML here, not LaTeX",template:"<math>\n<mfrac>\n<mrow><mn>5</mn><mi>π</mi></mrow>\n<mrow><mn>12</mn></mrow>\n</mfrac>\n</math>",node:null,exec:(d,e)=>{sc(e,"text");while (e.firstChild) rc(e.firstChild);let sb=cd();sb.innerHTML=d.data;let m=Array.from(sb.childNodes).find(e=>(e.namespaceURI=="http://www.w3.org/1998/Math/MathML")&&(e.tagName="MATH"));if (m) ap(e,m);}}]});})();