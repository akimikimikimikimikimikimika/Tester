window.framework("header",{
	resources:["cues","util","status","xhtml","javascript","svg","canvas","glsl","mathml","latex","apps","docs","storage","func","split","output","input","firstMenu","secondMenu","node"],
	util:{
		args:["cues","cd","ap","sa","ael"]
	},
	status:{
		args:["cues","ce","csm","csal","sc","html"]
	},
	xhtml:{
		args:["util","status"]
	},
	javascript:{
		args:["cd","ce","ap","ael","clr","qs","head"]
	},
	svg:{
		args:["cues","cd","ap","clr","rc","sc","ga","ss","bcr","svgNS"]
	},
	canvas:{
		args:["cues","ce","cd","ap","clr","sc","ga","sa","ss","bcr"]
	},
	glsl:{
		args:["cues","cd","ce","ap","sc","ss","ael","clr","bcr","dpr"]
	},
	mathml:{
		args:["cd","ap","clr","sc","mmlNS"]
	},
	latex:{
		args:["ce","ap","ael","clr","sc","head"]
	},
	apps:{
		args:["xhtml","javascript","svg","canvas","glsl","mathml","latex","cd","ap","sa"]
	},
	docs:{
		args:["cues","util","apps","sc"]
	},
	storage:{
		args:["util","status","docs","apps"]
	},
	func:{
		args:["cues","docs","storage"]
	},
	split:{
		args:["cues","status","storage","cd","ael","bcr"]
	},
	input:{
		args:["cues","docs","storage","output","cd","ce","ap","sa"]
	},
	firstMenu:{
		args:["util","status","docs","apps","storage","cd","ap","ib","rc","sa","sc","tc"]
	},
	secondMenu:{
		args:["cues","util","status","func","cd","ap","rc","sa","sc"]
	},
	output:{
		args:["cues","util","status","docs","cd","ce","ap","rc","ael"]
	},
	node:{
		args:["cues","status","split","input","output","firstMenu","secondMenu","cd","ce","ap","qs","head"]
	}
});