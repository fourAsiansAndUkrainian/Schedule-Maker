
const AM = -1;
const PM = 1;

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

console.log(timeInMinutes);
console.log(vmtr);

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