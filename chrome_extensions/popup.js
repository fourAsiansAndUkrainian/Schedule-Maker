var count = 1;
document.addEventListener('DOMContentLoaded',function()
{
	var loadButt = document.getElementById('load');
	loadButt.addEventListener('click',function()
	{
		var slot = document.getElementById("myTable");
		var header = slot.createTHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "Course " +count;
		count = count+1;
	});
});
	
		/*var slot = document.getElementByID("myTable");
		var header = table.createHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "Course " +count;
		count = count+1;*/

