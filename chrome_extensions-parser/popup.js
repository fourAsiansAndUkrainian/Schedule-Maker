
const AM = "am";
const PM = "pm";

const EARLIEST_HOUR = 8;

const M = 0;
const T = 780;
const W = 1560;
const R = 2340;
const F = 3120;

const CONFLICT = 0;
const NO_CONFLICT = 1;


function Time(hour, minute, AMPMIndicator)
{
    this.hour = hour;
    this.minute = minute;
    this.AMPMIndicator = AMPMIndicator;
}

function TimeRange(startTime, endTime)
{
    this.startTime = startTime;
    this.endTime = endTime;
}

function WeekDay(weekDay, timePeriods)
{
    this.weekDay = weekDay;
    this.timePeriods = timePeriods;
}

function Section(sectionName, weekdays)
{
    this.sectionName = sectionName;
    this.weekdays = weekdays;
}

function Course(courseName, sections)
{
    this.courseName = courseName;
    this.sections = sections;
    for (var i in this.sections) {
        this.sections[i].courseName = this.courseName;
    }
}

function Schedule()
{
    this.hashTable = Array.apply(null, Array(3900));
    this.sections = [];
}



// CSCE 313 - 501
var time1 = new Time(11, 10, AM);
var time2 = new Time(12, 25, PM);

var tr = new TimeRange(time1, time2);
var time_ranges = [tr];
var wd1 = new WeekDay(M, time_ranges);
var wd2 = new WeekDay(W, time_ranges);
var wd3 = new WeekDay(F, time_ranges);

var wds1 = [wd1, wd2, wd3];

var s1 = new Section("501", wds1);

// CSCE 313 - 502
var time3 = new Time(12, 45, PM);
var time4 = new Time(1, 30, PM);

var tr2 = new TimeRange(time3, time4);
var trs2 = [tr2]; //should be tr2
var wd4 = new WeekDay(M, trs2);
var wd5 = new WeekDay(W, trs2);
var wd6 = new WeekDay(F, trs2);

var wds2 = [wd4, wd5, wd6];

var s2 = new Section("502", wds2);

var ss1 = [s1, s2];

var c1 = new Course("CSCE 313", ss1);     // course 1 = CSCE 313 with 2 sections


// ECEN 214 - 200
var time5 = new Time(3, 0, PM);
var time6 = new Time(3, 50, PM);

var tr3 = new TimeRange(time5, time6);
var trs3 = [tr3]; 
var wd7 = new WeekDay(M, trs3);
var wd8 = new WeekDay(W, trs3);
var wd9 = new WeekDay(F, trs3);

var wds3 = [wd7, wd8, wd9];

var s3 = new Section("200", wds3);

// ECEN 214 - 501
var time7 = new Time(10, 50, AM);
var time8 = new Time(11, 10, AM);

var tr4 = new TimeRange(time7, time8);
var trs4 = [tr4]; 
var wd10 = new WeekDay(M, trs4);
var wd11 = new WeekDay(W, trs4);
var wd12 = new WeekDay(F, trs4);
var wds4 = [wd10, wd11, wd12];

var s4 = new Section("501", wds4);

var ss2 = [s3, s4];

var c2 = new Course("ECEN 214", ss2);


var allcourses = [c1, c2];


function convertToMinutes(weekday, time)
{
    var hour = time.hour;
    if (time.AMPMIndicator == PM && time.hour != 12) {
        hour += 12;
    }
    return (hour - EARLIEST_HOUR) * 60 + time.minute + weekday;
}


function getMinuteTimeRange(weekdays)
{
    var vmtr = [];
    for (var i in weekdays) {
        for (var j in weekdays[i].timePeriods) {
            var startTimeInMinutes = convertToMinutes(weekdays[i].weekDay, weekdays[i].timePeriods[j].startTime);
            var endTimeInMinutes = convertToMinutes(weekdays[i].weekDay, weekdays[i].timePeriods[j].endTime);
            vmtr.push(startTimeInMinutes);
            vmtr.push(endTimeInMinutes);
        }
    }
    return vmtr;
}


function Check(schedule, section)
{
    var vmtr = getMinuteTimeRange(section.weekdays);
    for (var i in vmtr) {
        if (schedule.hashTable[vmtr[i]] || schedule.hashTable[vmtr[++i]]) {
            return CONFLICT;
        }
    }
    
    return NO_CONFLICT;
}

function CheckAdd(schedule, section)
{
    var vmtr = getMinuteTimeRange(section.weekdays);
    for (var i = 0; i < vmtr.length; i++) {
        if (schedule.hashTable[vmtr[i]] || schedule.hashTable[vmtr[++i]]) {
            return;
        }
    }
    for (var i = 0; i < vmtr.length; i+=2) {
        for (var j = vmtr[i]; j <= vmtr[i+1]; j++) {
            schedule.hashTable[j] = true;
        } 
    }
    schedule.sections.push(section);
}


var timeInMinutes = convertToMinutes(wd1.weekDay, wd1.timePeriods[0].startTime);

var vmtr = getMinuteTimeRange(wds1);


var schedules = [];
for (var i = 0; i < allcourses[0].sections.length; i++) {
    var newSchedule = new Schedule();
    CheckAdd(newSchedule, allcourses[0].sections[i]);
    schedules.push(newSchedule);
}

for (var i = 1; i < allcourses.length; i++) {
    var size = schedules.length;
    while (size != 0) {
        var sch = schedules.shift();
        for (var j = 0; j < allcourses[i].sections.length; j++) {
            if (Check(sch, allcourses[i].sections[j])) {
                var tmp = $.extend(true, {}, sch);
                CheckAdd(tmp, allcourses[i].sections[j]);
                schedules.push(tmp);
            }
        }
        size--;
    }
}

for (var i in schedules)
{
    console.log(schedules[i].sections);
}

//====================================================================================

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
		var ls=[];
		
		while (true){
			var lines = parser.exec(s);
			if(lines!=null){
			ls.push(lines);
			}else{
				break;
			}
		}
		
		var ws1=[];
		var ss=[];
		for(i in ls){
			
			var currentLine=ls[i];
			console.log(currentLine);
			for (var j=0 ; j< currentLine[6].length;j++){
			var time1=new Time(currentLine[7],currentLine[8],currentLine[9])
			var time2=new Time(currentLine[10],currentLine[11],currentLine[12])
			var tr = new TimeRange(time1, time2);
			var time_ranges = [tr];
			var wd=new WeekDay(currentLine[6][j],time_ranges);
			ws1.push(wd);
			}
			var s=new Section(currentLine[4],ws1);
			ss.push(s);
		}
		
		var c1=new Course(ls[0][2]+" "+ls[0][3],ss);
		console.log(c1);
		
		//alert(str);
		//str.split("/\n/");
		//var lines = s.match(/SR\s?(\d*)\s?([A-Z]*)\W?(\d{3})\W?(\d{3})\W?[A-Z]{2}\s?\d?\W*([A-Z-&(\s{0,1})]*)\W\n?\S*\s*(\w*)/g);
		//var lines = s.match(parser);
		//alert(lines);
		//alert();
        
		
        

        
    }

