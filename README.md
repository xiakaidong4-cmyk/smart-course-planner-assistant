# Smart Course Planner Assistant

A lightweight, front-end proof of concept for the BIC2263 Software Project Management solo project. It helps undergraduate students record completed courses, check prerequisite relationships, see course offering frequency, build a conflict-free next-semester plan, and export that plan as an iCalendar file.

## Project planning

The complete planning document is available in [PRD.md](PRD.md). It includes the product scope, user stories, success measures, delivery roadmap, tools, and proposed production tech stack.

## Run locally

Open `index.html` in a modern browser. No package installation or server is required.

## Features

- Completed-course profile stored locally in the browser
- Course catalogue with prerequisite eligibility status
- Automatic conflict-free plan generator (up to five courses)
- Manual course add/remove controls
- Timetable clash detection
- `.ics` calendar export

## Preliminary build

The initial build is a responsive, browser-only MVP built with HTML, CSS, and JavaScript. It demonstrates the core planning flow without requiring a server or an account:

1. Mark courses as completed.
2. View prerequisite eligibility and offering frequency.
3. Add eligible courses manually or generate a conflict-free plan.
4. Review clashes and export the schedule as an `.ics` calendar file.

## Important data limitation

All courses, prerequisites, offering frequencies, and timetable slots are illustrative sample data created for the demo. They are **not official UCSI academic information**. Students must verify actual course requirements and registration details with their faculty.

## Project scope

This MVP addresses REQ-001 to REQ-005 in the management pack. Authentication, cloud saving, and a verified institutional course dataset are intentionally outside the static proof-of-concept scope.
