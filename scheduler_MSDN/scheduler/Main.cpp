#include "stdafx.h"
#include "Schedule.h"

using namespace std;

void loadFileTest()
{
	char* fileName = "Schedules.txt";
	HANDLE fileHandle = CreateFile(
		fileName,
		GENERIC_READ,
		0,
		NULL,
		OPEN_EXISTING,
		FILE_ATTRIBUTE_NORMAL,
		NULL);

	if (fileHandle == INVALID_HANDLE_VALUE) {
		printf("file 'Schedules.txt' open failed!\n");
		exit(-1);
	}
	DWORD high, low;
	if ((low = GetFileSize(fileHandle, &high)) == INVALID_FILE_SIZE) {
		printf("GetFileSize Error %d\n", GetLastError());
		exit(-1);
	}
	UINT64 fileSize = ((UINT64)high << 32) + low;

	char* buf = new char[fileSize + 1];

	DWORD bytesRead;
	if (ReadFile(fileHandle, buf, fileSize, &bytesRead, NULL) == FALSE) {
		if (GetLastError() != ERROR_HANDLE_EOF) {
			printf("ReadFile Error %d\n", GetLastError());
			exit(-1);
		}
	}
	buf[bytesRead] = NULL;

	printf("%s", buf);

	delete[] buf;
}





void timeMatchingTest()
{
	// CSCE 313
	Time start = { 11, 10, AM };
	Time end = { 12, 25, PM };
	TimeRange tr = { start, end };
	vector<TimeRange> vtr = { tr };
	WeekDay wd1 = { M, vtr };
	WeekDay wd2 = { W, vtr };
	WeekDay wd3 = { F, vtr };
	vector<WeekDay> wkdys = { wd1, wd2, wd3 };

	Section s1("501", wkdys);

	start = { 12, 45, PM };
	end = { 1, 30, PM };
	tr = { start, end };
	vtr = { tr };
	wd1 = { M, vtr };
	wd2 = { W, vtr };
	wd3 = { F, vtr };
	wkdys = { wd1, wd2, wd3 };

	Section s2("502", wkdys);

	vector<Section> s = { s1, s2 };
	Course c1("CSCE 313", s);

	// ECEN 214
	start = { 3, 00, PM };
	end = { 3, 50, PM };
	tr = { start, end };
	vtr = { tr };
	wd1 = { M, vtr };
	wd2 = { W, vtr };
	wd3 = { F, vtr };
	wkdys = { wd1, wd2, wd3 };
	Section s3("200", wkdys);

	
	start = { 10, 50, AM };
	end = { 11, 10, AM };
	tr = { start, end };
	vtr = { tr };
	wd1 = { M, vtr };
	wd2 = { W, vtr };
	wd3 = { F, vtr };
	wkdys = { wd1, wd2, wd3 };
	Section s4("501", wkdys);

	vector<Section> ss = { s3, s4 };
	Course c2("ECEN 214", ss);

	// MATH 311
	start = {8, 0, AM};
	end = { 8, 50, AM };
	tr = { start, end };
	vtr = { tr };
	wd1 = { M, vtr };
	wd2 = { W, vtr };
	wd3 = { F, vtr };
	wkdys = { wd1, wd2, wd3 };
	Section s5("501", wkdys);

	start = { 5, 0, PM };
	end = { 5, 50, PM };
	tr = { start, end };
	vtr = { tr };
	wd1 = { M, vtr };
	wd2 = { W, vtr };
	wd3 = { F, vtr };
	wkdys = { wd1, wd2, wd3 };
	Section s6("502", wkdys);

	vector<Section> sss = { s5, s6 };
	Course c3("MATH 311", sss);

	vector<Course> courses = { c1, c2, c3 };

	queue<Schedule> schedules;
	for (int i = 0; i < courses[0].sections.size(); i++) {
		Section sect = courses[0].sections[i];
		Schedule s;
		s.CheckAdd(sect);
		schedules.push(s);			// initially push all sections A1 A2 to schedules
	}
	
	for (int i = 1; i < courses.size(); ++i) {
		int size = schedules.size();
		while (size != 0) {
			Schedule sch = schedules.front();
			for (int j = 0; j < courses[i].sections.size(); ++j) {
				if (sch.Check(courses[i].sections[j])) {
					Schedule tmp = sch;
					tmp.CheckAdd(courses[i].sections[j]);
					schedules.push(tmp);
				}
			}
			schedules.pop();
			size--;
		}
	} 

	for (int i = 0; !schedules.empty(); ++i) {
		printf("Schedule %d: \n", i+1);
		schedules.front().printSchedule();
		printf("\n");
		schedules.pop();
	}

}




int main()
{
	timeMatchingTest();
}