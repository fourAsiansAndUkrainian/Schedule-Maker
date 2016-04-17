var loadButt = document.getElementById('load');
var count = 0;
var courses =[];
if(loadButt)
{
	loadButt.addEventListener('click',function(global)
	{
		if(win)
		{
		}
		else
		{
			var win = window.open('tables.html','MyTables');
		}
		localStorage.setItem("courses",getContentFromClipboard());
		count += 1;

	/*var slot = document.getElementById('myTable');	
	var header = slot.createTHead();
	var row = header.insertRow(0);
	var cell = row.insertCell(0);
	var a = "Course"+count;
	courses.push(a);
	cell.innerHTML = a;
	count = count+1;*/
	});

}
function getContentFromClipboard()
{
	var result = '';
	var sandbox = document.getElementById('sandbox');
	sandbox.value = '';
	sandbox.select();
	if(document.execCommand('paste'))
	{
		result = sandbox.value;
		//console.log("result:"+result);
	}
	sandbox.value = '';
	return result;
}



















/*var bgPage = chrome.extension.getBackgroundPage();
var courses = [];
var count = 1;
var loadButt = document.getElementById('load');
var deleteButt = document.getElementById('delete');
var storeButt = document.getElementById('store');
var slot = document.getElementById("myTable");
/*window.addEventListener("unload",function(event)
{
	chrome.extension.getBackgroundPage().docBody = document.body;

});
window.addEventListener("load",function(event)
{
	var docBody = document.body;
	var lastDocBody = bgPage.docBody;
	if(lastDocBody)
	{
		docBody.parentElement.replaceChild(document.importNode(lastDocBody,true),docBody);

	}
});
window.addEventListener("unload",function(event)
{
	alert("im unloading");

});
window.addEventListener("load",function(event)
{

});
if(loadButt)
{
	loadButt.addEventListener('click',function()
	{
    
		chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {});


	var header = slot.createTHead();
	var row = header.insertRow(0);
	var cell = row.insertCell(0);
	var a = "Course"+count;
	courses.push(a);
	cell.innerHTML = a;
	count = count+1;
	});
}
if(storeButt)
{
	storeButt.addEventListener("click",function()
	{
	/*var slot = document.getElementById("myTable");
	slot.innerHTML = "";
	});
	for(i=0;i<courses.length;i++)
	{
		console.log(courses[i]);
	}
	});
}
*/


