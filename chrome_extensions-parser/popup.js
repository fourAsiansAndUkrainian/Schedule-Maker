
var count = 1;

		/* chrome.browserAction.onClicked.addListener(function(activeTab) {
			
			chrome.tabs.getCurrent(
			function (tabs) {
				var ps1=document.getElementsByTagName('html')[0].innerHTML;
				alert(ps1);
			})
		}); */

		
	var loadButt = document.getElementById('load');
	loadButt.addEventListener('click', function()
	{	//("test");
	
		console.log('wtf');
		var str = getContentFromClipboard().toString();
		//alert('this works');
		parseSelect(str);
		
		/* var query = { active: true, currentWindow: true };
		chrome.tabs.query(query, function(tabs) {
			var currentTab = tabs[0];
			console.log(currentTab);
			//currentTab.executeScript({
			//	code: 'document.body.style.backgroundColor="green"'
			//});
			chrome.tabs.executeScript(currentTab.id, {
				code:'chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){ sendResponse(document.all[0].innerHTML);}'
			});
			//chrome.tabs.sendMessage(currentTab.id, {text: 'report_back'}, doStuffWithDom);
			//alert(currentTab);
		}); */
		
		
		/*var slot = document.getElementById("myTable");
		var header = slot.createTHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "Course " +count;
		count = count+1;*/
		//alert("test");
		
		
		/*chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, { action: "getDOM" }, function(response) {
		console.log(response);
			});
		});	*/
		//selectAll();
	});
	
	    function selectAll(){
      var e = document.getElementsByTagName('HTML')[0];
      var r = document.createRange();
      r.selectNodeContents(e);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      return s;
    }
    
    function getContentFromClipboard() {
    var result = '';
    var sandbox = document.getElementById('sandbox');
    sandbox.value = '';
    sandbox.select();
    if (document.execCommand('paste')) {
        result = sandbox.value;
        //alert(result);
		//console.log('got value from sandbox: ' + result);
    }
		sandbox.value = '';
		sandbox.blur();
		return result;
	}
	
	//SR\s(\d*)\s([A-Z]*)\W(\d{3})\W(\d{3})\W[A-Z]{2}\s\d\W([A-Z-]*)\W\n\S*\s*(\w*)\s(\d*:\d*\s\w*-\d*:\d*\s\w*)\s(\S\s)*([A-Za-z.,\s\(\)]*)\S*(\d*\/\d*-\d*\/\d*).+?(?=\n)(\W*([A-Z]*)\s(\d*:\d*\s\w*-\d*:\d*\s\w*)\s*([A-Za-z.,\s\(\)]*))
    
	//SR\s(\d*)\s([A-Z]*)\W(\d{3})\W(\d{3})\W[A-Z]{2}\s\d\W([A-Z-]*)\W\n\S*\s*(\w*)\s(\d*:\d*\s\w*-\d*:\d*\s\w*)\s(\S{1,2}\s)*([A-Za-z.,\s\(\)]*)(\d*\/\d*-\d*\/\d*)*.+?(?=\n)(\W*([A-Z]*)\s(\d*:\d*\s\w*-\d*:\d*\s\w*)\s*([A-Za-z.,\s\(\)]*)(\d*\/\d*-\d*\/\d*)*.+?(?=\n)){0,2}
	
	//var parser=/SR\s(\d*)\s([A-Z]*)\W(\d{3})\W(\d{3})\W[A-Z]{2}\s\d\W([A-Z-&(\s{0,1})]*)\W\n\S*\s*(\w*)\s(\d*):(\d*)\s(\w*)-(\d*):(\d*)\s(\w*)\s(?:\S{1,2}\s)*([A-Za-z.,\s\(\)]*)(\d*\/\d*-\d*\/\d*)*.+?(?=\n)(\W*([A-Z]*)\s(\d*):(\d*)\s(\w*)-(\d*):(\d*)\s(\w*)\s*([A-Za-z.,\s\(\)]*)(\d*\/\d*-\d*\/\d*)*.+?(?=\n)){0,1}\W*(([A-Z]*)\s(\d*):(\d*)\s(\w*)-(\d*):(\d*)\s(\w*)\s*([A-Za-z.,\s\(\)]*)((?:\d*\/\d*)-\1)*.+?(?=\n)){0,1}/g;
	
    function parseSelect(str){
        //alert(selectAll());
        
		var s = document.getElementById("test1").innerText;
		var parser = /SR\s?(\d*)\s?([A-Z]*)\W?(\d{3})\W?(\d{3})\W?[A-Z]{2}\s?\d?\W*([A-Z-&(\s{0,1})]*)\W\n?\S*\s*(\w*)\s?(\d*):(\d*)\s?(\w*)-(\d*):(\d*)\s?(\w*)\s?(?:\S{1,3}\s)*([A-Za-z.,\s\(\)]*)(\d*\/\d*-\d*\/\d*)/g;
		
		
		//alert(s);
        
		//console.log(str);
        //str=str.substring(str.indexOf("Select"));
        
		//console.log("test");
		var lines = parser.exec(s);
		
		//alert(str);
		//str.split("/\n/");
		//var lines = s.match(/SR\s?(\d*)\s?([A-Z]*)\W?(\d{3})\W?(\d{3})\W?[A-Z]{2}\s?\d?\W*([A-Z-&(\s{0,1})]*)\W\n?\S*\s*(\w*)/g);
		//var lines = s.match(parser);
		alert(lines);
		//alert();
        
        

        
    }
	
		/*var slot = document.getElementByID("myTable");
		var header = table.createHead();
		var row = header.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "Course " +count;
		count = count+1;*/

