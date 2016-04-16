var count = 1;
function myFunctionLoad()
{
		var slot = document.getElementByID("myTable");
		var header = table.createHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "Course " +count;
		count = count+1;
}
