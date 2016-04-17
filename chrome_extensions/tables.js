document.getElementById("a").innerHTML = localStorage.getItem("courses");
var these = document.getElementById('these');
var doA = document.getElementById("Do");
var n = document.getElementById("Nothing");
var text = document.getElementById('a').innerHTML;
console.log("text"+text);
if(these)
{
	these.addEventListener('click',function()
	{  
		
		document.getElementById('b').innerHTML += text;
	});
}
if(doA)
{
doA.addEventListener('click',function()
{
	document.getElementById("b").innerHTML = localStorage.getItem("Clips")
});
}
if(n)
{
n.addEventListener('click',function()
{
	localStorage.setItem("Clips",text);
	console.log(text);
});
}
/*window.addEventListener("load",function()
{
	//document.getElementById("a").innerHTML = localStorage.getItem("Clips")
});*/
