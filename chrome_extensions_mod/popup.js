var count = 1;
var courses = 1;
//document.addEventListener('DOMContentLoaded',function()
	var loadButt = document.getElementById("load");
	var t = new Array();
	if (loadButt) {
	loadButt.addEventListener('click', function(global)
	{	
		if (win) {
			//win.focus();
			//slot.innerHTML = "Course " + course + " ";
			//count++;
		}
		else{
			var win = window.open('tab.html', 'myTab');
			//win.focus();
			//slot.innerHTML = "Course " + course + " ";
			//count++;
		}
		
		t[count] = "Course" + " " + count;
		count++;
		localStorage["t"] = JSON.stringify(t); 
		var cars = JSON.parse(localStorage["t"]);
		//localStorage.setItem(1, "course" + " " + count);
		//localStorage.setItem(2,"course" + " " + "horse");
		//count++;
		//console.log(count);
		//localStorage.setItem("counter":count);
		//courses++;
		/*var header = slot.createTHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "Course " + count;
		count = count+1;*/
	});
}

	/*var deleteButt = document.getElementById('delete');
	deleteButt.addEventListener('click', function(){
		var Table = document.getElementById('myTable');
		Table.innerHTML = "";
		count = 1;
	});/*



	/*document.addEventListener("unload",function (){
    //Fetch all contents
    chrome.storage.local.get("id",function (obj){
        //console.log(JSON.stringify(obj));
        slot = obj;
    });
    //Set some content from browser action
    chrome.storage.local.set({"id":slot},function (){
        console.log("Storage Succesful");
    });
});
		/*var slot = document.getElementByID("myTable");
		var header = table.createHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "Course " +count;
		count = count+1;*/


