# Smart Course Planner Assistant Product Requirements Document

## 1. Product summary

**Product name:** Smart Course Planner Assistant  
**Project type:** Solo university software project  
**Target users:** UCSI undergraduate students who need to plan upcoming semesters  
**Problem statement:** Students can select unsuitable courses when they cannot easily check prerequisites, course availability, or timetable clashes. This can delay progression and graduation.

The Smart Course Planner Assistant is a web application that helps a student record completed courses, browse a course catalogue, identify eligible subjects, and generate a suggested next-semester plan. The current repository contains a preliminary front-end MVP using illustrative data only.

## 2. Goals and success measures

### Goals

- Make prerequisite rules understandable before course registration.
- Highlight courses offered less frequently so students can plan ahead.
- Suggest a feasible semester schedule with no timetable clashes.
- Let students adjust the suggestion before exporting it to a calendar.

### Success measures for the MVP

| Measure | Target |
| --- | --- |
| Prerequisite validation on test data | At least 85% correct |
| Valid conflict-free schedules generated | At least 80% of test cases |
| Student tester satisfaction | At least 4 out of 5 |
| Usability test participants | At least 5 students |

## 3. Users and user stories

### Primary user

An undergraduate student preparing a course-registration plan for the next semester.

### User stories

- As a student, I want to record completed courses so that the system can determine which prerequisites I have met.
- As a student, I want to browse course details and prerequisites so that I do not register for an ineligible subject.
- As a student, I want to see offering frequency so that I do not miss a rarely offered subject.
- As a student, I want a suggested plan without prerequisite or timetable conflicts so that I can start registration confidently.
- As a student, I want to add or remove suggested courses so that the plan reflects my preferences.
- As a student, I want to export the plan to my calendar so that I can remember the timetable.

## 4. Scope

### In scope for MVP

- Local student course profile
- Illustrative course catalogue with credits, prerequisites, offering frequency, and timetable slots
- Prerequisite eligibility checker
- Manual add/remove for a semester plan
- Conflict detection and automatic conflict-free plan generation
- iCalendar (`.ics`) export
- Responsive web interface

### Out of scope for MVP

- Official institutional course data integration
- Login, cloud storage, or multi-device sync
- Real-time registration-system integration
- Tuition-fee calculation
- AI graduation simulation or recommendation engine

## 5. Functional requirements

| ID | Requirement | Priority | MVP acceptance criteria |
| --- | --- | --- | --- |
| FR-01 | Completed-course profile | High | Student can select completed courses and the selection persists in the browser. |
| FR-02 | Course catalogue | High | Student can view course code, name, credit value, offering frequency, and prerequisites. |
| FR-03 | Prerequisite validation | High | System labels a course as eligible only when all prerequisite courses are completed. |
| FR-04 | Semester-plan generator | High | System recommends up to five eligible courses with non-overlapping demo timetable slots. |
| FR-05 | Manual plan adjustment | Medium | Student can add or remove eligible courses from the plan. |
| FR-06 | Clash feedback | High | System indicates when selected courses overlap in their timetable slots. |
| FR-07 | Calendar export | Medium | Student can download selected courses as a valid `.ics` file. |

## 6. Non-functional requirements

- **Usability:** a first-time user should understand the main flow without a tutorial.
- **Performance:** catalogue filtering and plan generation should complete immediately for a small MVP dataset.
- **Privacy:** the preliminary build stores profile choices only in browser local storage.
- **Accessibility:** use semantic HTML controls, clear labels, readable contrast, and keyboard-operable actions.
- **Data integrity:** all sample data must be labelled as illustrative, not official UCSI data.

## 7. Timeline and roadmap

| Phase | Target period | Planned outcome |
| --- | --- | --- |
| Discovery and requirements | 13–24 Oct 2026 | Management pack, user stories, core scope, risks, and demo data definition. |
| Alpha build | 27 Oct–2 Nov 2026 | Course profile, catalogue, and prerequisite checker. |
| MVP integration | 3–23 Nov 2026 | Offering frequency, schedule generator, conflict detection, and preliminary testing. |
| Student feedback and v1.1 | 24 Nov–7 Dec 2026 | Manual plan adjustments, calendar export, usability fixes, and feedback collection. |
| QA and project closure | 8–18 Dec 2026 | Test report, user feedback report, retrospective, and final handover. |

### Milestone roadmap

1. **Alpha Internal Sprint — 2 Nov 2026:** Profile and prerequisite checker available with sample data.
2. **MVP Proof of Concept — 23 Nov 2026:** Core planning workflow is ready for internal pilot testing.
3. **v1.1 Feedback Release — 7 Dec 2026:** Manual adjustment and calendar export are refined from feedback.
4. **Project Closure — 18 Dec 2026:** Documentation, testing evidence, and handover are complete.

## 8. Tools and software

| Need | Tool or software | Reason |
| --- | --- | --- |
| Planning and documentation | Markdown, GitHub Issues/Projects | Versioned requirements, milestones, and tasks. |
| Source control | Git and GitHub | Track changes, publish progress, and share the preliminary build. |
| Interface design | Figma (planned) | Create and test simple dashboard wireframes before larger UI changes. |
| Coding | Visual Studio Code | Lightweight editor with HTML, CSS, JavaScript, and Git support. |
| Browser testing | Google Chrome, Firefox | Check responsive layout and browser compatibility. |
| Testing records | GitHub Issues and Markdown test cases | Record defects, results, and fixes. |

## 9. Tech stack

### Preliminary build in this repository

- **HTML5:** semantic page structure
- **CSS3:** responsive layout, visual hierarchy, and accessible contrast
- **Vanilla JavaScript (ES6):** prerequisite checks, plan generation, clash detection, local storage, and `.ics` export
- **Browser Local Storage:** local-only persistence for the demo profile and selected plan

### Proposed next-stage stack

| Layer | Proposed technology | Why |
| --- | --- | --- |
| Front end | React with Vite | Component-based UI and efficient development for a larger catalogue. |
| Styling | CSS modules or Tailwind CSS | Consistent responsive interface components. |
| Back end | Node.js with Express | JavaScript across front end and back end, simple REST API development. |
| Database | PostgreSQL | Reliable relational model for courses, prerequisites, offerings, users, and saved plans. |
| Authentication | Firebase Auth or JWT-based authentication | Secure account access if cloud saving is added. |
| Testing | Vitest/Jest and Playwright | Unit tests for planner logic and end-to-end browser tests. |
| Deployment | Vercel (front end) and Render/Railway (API) | Student-friendly deployment options with free tiers. |

The proposed stack is a future direction, not a claim that these services are implemented in the current MVP.

## 10. Preliminary build and verification

The current preliminary build demonstrates the required core workflow:

1. User chooses completed courses.
2. The catalogue identifies eligible and blocked courses.
3. The user generates or manually creates a semester plan.
4. The application identifies timetable conflicts.
5. The user exports the selected courses to an `.ics` calendar file.

Repository link: https://github.com/xiakaidong4-cmyk/smart-course-planner-assistant

### Validation plan

- Create test cases for complete, incomplete, and invalid prerequisite combinations.
- Create timetable-clash test cases for overlapping slots.
- Ask at least five students to complete the main planning flow and rate clarity.
- Log defects and feedback in GitHub Issues before the v1.1 release.

## 11. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Inaccurate course data | High | Use verified official data before any production use; label all current data as illustrative. |
| Scope creep | High | Keep advanced graduation simulation and AI recommendations out of the MVP. |
| Incorrect scheduling logic | High | Use manual test cases, add unit tests, and allow manual plan changes. |
| Low usability | Medium | Conduct student feedback testing and iterate on the interface. |

## 12. Assumptions and limitations

- The MVP is a learning prototype rather than an official university registration tool.
- Timetable data is illustrative and does not represent actual UCSI offerings.
- A future production version requires permission and validation before using institutional academic data.
