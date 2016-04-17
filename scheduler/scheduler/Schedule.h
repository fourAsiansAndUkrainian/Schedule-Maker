#pragma once

#include "stdafx.h"

#define TOTAL_SIZE 3900	// 3900 minutes for every week
#define NO_CONFLICT 1
#define CONFLICT 0

#define AM -1
#define PM 1
#define EARLIEST_HOUR 8		// earliest class hour of a day

// weeday encodings
#define M 0
#define T 780
#define W 1560
#define R 2340
#define F 3120

struct Time {
	DWORD hour;
	DWORD minute;
	int AMPMIndicator;
};

struct TimeRange {
	Time startTime;
	Time endTime;
};

struct WeekDay {
	int weekDay;		// indicates which weekday it is
	std::vector<TimeRange> timePeriods;

	//WeekDay(int wd, vector<TimeRange> tr): WeekDay(wd), timePeriods()
};


struct MinuteTimeRange {
	DWORD startTime;
	DWORD endTime;
};

struct Section {		// course with section number
	std::string courseName;
	std::string sectionName;
	std::vector<WeekDay> weekdays;

	Section::Section(std::string sn, std::vector<WeekDay> wkd) :
		sectionName(sn), weekdays(wkd) { }

	inline DWORD convertToMinutes(int wkdy, Time& t);

	std::vector<MinuteTimeRange> getMinuteTimeRange();
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
	bool CheckAdd(MinuteTimeRange tr);		// returns true if succeeds
	void CheckAdd(Section sect);
	inline int Check(Section& sect);
	void printSchedule();
};

inline int Schedule::Check(Section& sect)
{
	std::vector<MinuteTimeRange> vmtr = sect.getMinuteTimeRange();
	for (auto minTimeRange : vmtr) {
		if (hashTable[minTimeRange.startTime] || hashTable[minTimeRange.endTime])
			return CONFLICT;
	}
	
	return NO_CONFLICT;
}