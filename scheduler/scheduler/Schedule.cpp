#include "Schedule.h"

using namespace std;

inline DWORD Section::convertToMinutes(Time& t)
{
	DWORD hour = t.hour;
	if (t.AMPMIndicator == PM && t.hour != 12) {
		hour += 12;
	}
	return (hour - EARLIEST_HOUR) * 60 + t.minute;
}


TimeRange Section::getTimeRange()
{
	TimeRange timeRange = { convertToMinutes(startTime), convertToMinutes(endTime) };
	return timeRange;
}


string Section::getTime()
{
	string hourString = to_string(startTime.hour);
	if (hourString.length() == 1) {
		hourString.insert(0, "0");
	}
	string minString = to_string(startTime.minute);
	if (minString.length() == 1) {
		minString.insert(0, "0");
	}
	string startTimeString = hourString + ":" + minString;
	startTimeString += startTime.AMPMIndicator == AM ? " AM" : " PM";

	hourString = to_string(endTime.hour);
	if (hourString.length() == 1) {
		hourString.insert(0, "0");
	}
	minString = to_string(startTime.minute);
	if (minString.length() == 1) {
		minString.insert(0, "0");
	}
	string endTimeString = hourString + ":" + minString;
	endTimeString += endTime.AMPMIndicator == AM ? " AM" : " PM";

	return startTimeString + " - " + endTimeString;
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

bool Schedule::CheckAdd(TimeRange tr)
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
	TimeRange tr = sect.getTimeRange();
	if (hashTable[tr.startTime] || hashTable[tr.endTime])
		return;

	for (int i = tr.startTime; i <= tr.endTime; ++i) {
		hashTable[i] = true;
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