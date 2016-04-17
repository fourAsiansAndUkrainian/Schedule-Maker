#pragma once

#include "stdafx.h"

#define TOTAL_SIZE 780	// 780 minutes
#define NO_CONFLICT 1
#define CONFLICT 0

#define AM -1
#define PM 1
#define EARLIEST_HOUR 8		// earliest class hour of a day


struct Time {
	DWORD hour;
	DWORD minute;
	int AMPMIndicator;
};

struct TimeRange {
	DWORD startTime;
	DWORD endTime;
};

struct Section {		// course with section number
	std::string courseName;
	std::string sectionName;
	Time startTime;
	Time endTime;

	Section::Section(std::string sn, Time st, Time et) :
		sectionName(sn), startTime(st), endTime(et) { }

	inline DWORD convertToMinutes(Time& t);

	TimeRange getTimeRange();
	std::string getTime();
};

struct Course {			// a course with all sections 
	std::string courseName;
	std::vector<Section> sections;

	Course(std::string sn, std::vector<Section> sect) :
		courseName(sn), sections(sect) {
		for (int i = 0; i < sections.size(); i++) {
			sections[i].courseName = courseName;
		}
	}

	Section section(int i) { return sections[i]; }
};

class Schedule {
	bool* hashTable;
	std::vector<Section> sections;
public:
	Schedule();
	Schedule(const Schedule& sch);
	Schedule operator=(const Schedule& sch);
	~Schedule() { delete[] hashTable; }
	bool CheckAdd(TimeRange tr);		// returns true if succeeds
	void CheckAdd(Section sect);
	inline int Check(Section& sect);
	void printSchedule();
};

inline int Schedule::Check(Section& sect)
{
	TimeRange tr = sect.getTimeRange();
	if (hashTable[tr.startTime] || hashTable[tr.endTime])
		return CONFLICT;
	return NO_CONFLICT;
}
