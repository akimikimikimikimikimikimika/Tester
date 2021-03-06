window.framework("xhtml",(util,status)=>{

	let headSource=()=>`
		\n\t\t<meta charset="UTF-8" />\n\t\t<title>Tester</title>\n\t\t<style>html,body{font-size:18px;transition:color 0.1s ease-in-out,background-color 0.1s ease-in-out;}</style>\n\t\t<style id="testerViewMode">@media screen{.light,.light>body{color:#333333;}.dark,.dark>body{color:#cccccc;}}</style>\n\t\t<script>\n\t\t\t(()=>{\n\t\t\t\tlet s=/^style:(light|dark)$/;\n\t\t\t\twindow.addEventListener("message",e=>{\n\t\t\t\t\tif (e.source===parent) {\n\t\t\t\t\t\tif (e.data=="request-source:") {\n\t\t\t\t\t\t\tlet m=document.querySelector("#main");\n\t\t\t\t\t\t\tif (m) parent.postMessage("source:"+m.innerHTML,"*");\n\t\t\t\t\t\t\telse parent.postMessage("source:","*");\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (s.test(e.data)) document.documentElement.className=e.data.match(s)[1];\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t})();\n\t\t<\/script>
	`;
	let getBlob=(s,t)=>{
		let b=new Blob([s],{type:t?"text/html":"application/xhtml+xml"});
		return util.blobURL(b);
	};

	return [
		{
			name:"application/xhtml+xml.body",
			label:"XHTML (body)",
			ext:"xhtml",
			type:"frame",
			placeholder:'<div style="color:red;">Hello world!</div>',
			template:'<div style="color:red;">Hello world!</div>',
			node:null,
			exec:(d,e)=>{
				e.src=getBlob(`<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" class="${status.dark?"dark":"light"}">\n\t<head>${headSource()}\n\t</head>\n\t<body id="main" contenteditable="true">${d.data}</body>\n</html>`);
			},
			mail:d=>{
				location.href="mailto:?body="+encodeURIComponent(d.data);
			},
			back:true
		},
		{
			name:"application/xhtml+xml",
			label:"XHTML",
			ext:"xhtml",
			type:"frame",
			placeholder:"Type XHTML here",
			template:`<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n<title>My Great Website</title>\n<style>\n:root{\ncolor-scheme:light dark;\n}\n</style>\n</head>\n<body>\n<h1>My Great Website</h1>\n<p>Lorem ipsum dolor sit amet</p>\n</body>\n</html>`,
			node:null,
			exec:(d,e)=>e.src=getBlob(d.data)
		},
		{
			name:"text/html",
			label:"HTML",
			ext:"html",
			type:"frame",
			placeholder:"Type HTML here",
			template:"<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"UTF-8\" />\n<title>My Great Website</title>\n</head>\n<body>\n<h1>My Great Website</h1>\n<p>Lorem ipsum dolor sit amet</p>\n</body>\n</html>",
			node:null,
			exec:(d,e)=>e.src=getBlob(d.data,true)
		}
	];

});