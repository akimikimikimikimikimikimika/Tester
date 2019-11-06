(()=>{var status,blobURL;let headSource=()=>{return `\n\t\t<meta charset="UTF-8" />\n\t\t<title>Tester</title>\n\t\t<meta name="color-scheme" value="light dark" />\n\t\t<style>html,body{font-size:18px;transition:color 0.1s ease-in-out,background-color 0.1s ease-in-out;}</style>\n\t\t<style id="testerViewMode">@media screen{${status.colorScheme?`@media (prefers-color-scheme: light) {html,body{color:#333333;background-color:#eeeeee;}}@media (prefers-color-scheme: dark) {html,body{color:#cccccc;background-color:#111111;}}`:(`html,body{color:${status.dark?"#cccccc":"#333333"};background-color:${status.dark?"#111111":"#eeeeee"};}`)}}</style>\n\t\t<script>\n\t\t\t(()=>{\n\t\t\t\tlet s=document.getElementById("testerViewMode"),st=/^style:(#[0-9a-fA-F]{6}),(#[0-9a-fA-F]{6})$/;\n\t\t\t\twindow.addEventListener("message",e=>{\n\t\t\t\t\tif (e.source===window.parent) {\n\t\t\t\t\t\tif (e.data=="request-source:") {\n\t\t\t\t\t\t\tlet m=document.querySelector("#main");\n\t\t\t\t\t\t\tif (m) parent.postMessage("source:"+m.innerHTML,"*");\n\t\t\t\t\t\t\telse parent.postMessage("source:","*");\n\t\t\t\t\t\t}${status.colorScheme?"":`\n\t\t\t\t\t\telse if (st.test(e.data)) {\n\t\t\t\t\t\t\tlet m=e.data.match(st);\n\t\t\t\t\t\t\ts.textContent=\`@media screen{html,body{color:\${m[1]};background-color:\${m[2]};}}\`;\n\t\t\t\t\t\t}`}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t})();\n\t\t<\/script>`;};let getBlob=s=>{let b=new Blob([s],{type:"text/html"});return blobURL(b);};let l=[{name:"text/html.body",label:"HTML",ext:"html",type:"frame",placeholder:'<div style="color:red;">Hello world!</div>',template:'<div style="color:red;">Hello world!</div>',node:null,exec:(d,e)=>{e.src=getBlob(`<!doctype html>\n<html>\n\t<head>${headSource()}\n\t</head>\n\t<body id="main" contenteditable="true">${d.data}</body>\n</html>`);},mail:d=>{location.href="mailto:?body="+encodeURIComponent(d.data);},back:true},{name:"text/html",label:"HTML (full)",ext:"html",type:"frame",placeholder:"Type whole HTML source here",template:"<!doctype html>\n<html>\n<head>\n<meta charset=\"UTF-8\" />\n<title>My Great Website</title>\n</head>\n<body>\n<h1>My Great Website</h1>\n</body>\n</html>",node:null,exec:(d,e)=>{e.src=getBlob(d.data);}}];window.res("html",(s,b)=>{status=s,blobURL=b;return l;});})();