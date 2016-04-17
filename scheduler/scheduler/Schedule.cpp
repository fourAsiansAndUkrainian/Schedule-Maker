#include "Schedule.h"

using namespace std;

inline DWORD Section::convertToMinutes(int wkdy, Time& t)
{
	DWORD hour = t.hour;
	if (t.AMPMIndicator == PM && t.hour != 12) {
		hour += 12;
	}
	return (hour - EARLIEST_HOUR) * 60 + t.minute + wkdy;
}


vector<MinuteTimeRange> Section::getMinuteTimeRange()
{
	vector<MinuteTimeRange> vmtr;
	for (int i = 0; i < weekdays.size(); i++) {
		for (int j = 0; j < weekdays[i].timePeriods.size(); j++) {
			MinuteTimeRange minTimeRange = { 
				convertToMinutes(weekdays[i].weekDay, weekdays[i].timePeriods[j].startTime),
				convertToMinutes(weekdays[i].weekDay, weekdays[i].timePeriods[j].endTime) };
			vmtr.push_back(minTimeRange);
		}
	}
	
	return vmtr;
}


string Section::getTime()
{
	string resultString = "";
	
	for (auto weekday : weekdays) {

		switch (weekday.weekDay)
		{
		case M: resultString += "M"; break;
		case T: resultString += "T"; break;
		case W: resultString += "W"; break;
		case R: resultString += "R"; break;
		case F: resultString += "F"; break;
		}
		for (auto time : weekday.timePeriods) {
			string hourString = to_string(time.startTime.hour);
			if (hourString.length() == 1) {
				hourString.insert(0, "0");
			}
			string minString = to_string(time.startTime.minute);
			if (minString.length() == 1) {
				minString.insert(0, "0");
			}
			string startTimeString = hourString + ":" + minString;
			startTimeString += time.startTime.AMPMIndicator == AM ? " AM" : " PM";

			hourString = to_string(time.endTime.hour);
			if (hourString.length() == 1) {
				hourString.insert(0, "0");
			}
			minString = to_string(time.endTime.minute);
			if (minString.length() == 1) {
				minString.insert(0, "0");
			}
			string endTimeString = hourString + ":" + minString;
			endTimeString += time.endTime.AMPMIndicator == AM ? " AM" : " PM";

			resultString += "\t" + startTimeString + " - " + endTimeString + "\n\t\t\t";
		}
		resultString += "\n";
	}

	return resultString;
}


Schedule::Schedule()
{
	hashTable = new bool[TOTAL_SIZE];
	ZeroMemory(hashTable, TOTAL_SIZE * sizeof(bool));
}

Schedule::Schedule(const Schedule& sch)
{
	this->hashTable = new bool[TOTAL_SIZE];
	this->sections = sch.sections;
	memcpy(this->hashTable, sch.hashTable, TOTAL_SIZE);
}

bool Schedule::CheckAdd(MinuteTimeRange tr)
{
	if (hashTable[tr.startTime] || hashTable[tr.endTime]) {
		return false;
	}
	// if no conflict then set to everything in between as 1
	for (int i = tr.startTime; i <= tr.endTime; ++i) {
		hashTable[i] = true;
	}
	return true;
}

void Schedule::CheckAdd(Section sect)
{
	vector<MinuteTimeRange> vmtr = sect.getMinuteTimeRange();
	for (auto minTimeRange : vmtr) {
		if (hashTable[minTimeRange.startTime] || hashTable[minTimeRange.endTime])
			return;
	}
	
	for (auto minTimeRange : vmtr) {
		for (int i = minTimeRange.startTime; i <= minTimeRange.endTime; ++i) {
			hashTable[i] = true;
		}
	}
	sections.push_back(sect);
}

Schedule Schedule::operator=(const Schedule& sch)
{
	this->sections = sch.sections;
	memcpy(this->hashTable, sch.hashTable, TOTAL_SIZE);
	return *this;
}

void Schedule::printSchedule()
{
	for (int i = 0; i < sections.size(); ++i) {
		string stringTime = sections[i].getTime();
		cout << sections[i].courseName << "-" << sections[i].sectionName 
			<< "\t" << stringTime << endl;
	}
}