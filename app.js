const courses = [
  { code: 'BIC1013', name: 'Programming Fundamentals', credits: 3, offering: 'Every semester', prereqs: [], slot: ['MON', '09:00', '11:00'] },
  { code: 'BIC1023', name: 'Discrete Mathematics', credits: 3, offering: 'Every semester', prereqs: [], slot: ['TUE', '10:00', '12:00'] },
  { code: 'BIC1033', name: 'Database Systems', credits: 3, offering: 'Every semester', prereqs: ['BIC1013'], slot: ['WED', '09:00', '11:00'] },
  { code: 'BIC1043', name: 'Object Oriented Programming', credits: 3, offering: 'Every semester', prereqs: ['BIC1013'], slot: ['MON', '10:00', '12:00'] },
  { code: 'BIC2013', name: 'Data Structures and Algorithms', credits: 3, offering: 'Semester 1', prereqs: ['BIC1043', 'BIC1023'], slot: ['THU', '09:00', '11:00'] },
  { code: 'BIC2023', name: 'Web Application Development', credits: 3, offering: 'Every semester', prereqs: ['BIC1043'], slot: ['WED', '13:00', '15:00'] },
  { code: 'BIC2033', name: 'Software Engineering', credits: 3, offering: 'Semester 2', prereqs: ['BIC1033', 'BIC1043'], slot: ['TUE', '14:00', '16:00'] },
  { code: 'BIC2043', name: 'Artificial Intelligence Foundations', credits: 3, offering: 'Semester 2', prereqs: ['BIC2013'], slot: ['THU', '10:00', '12:00'] },
  { code: 'BIC2053', name: 'Computer Networks', credits: 3, offering: 'Every semester', prereqs: ['BIC1033'], slot: ['FRI', '09:00', '11:00'] },
  { code: 'BIC2063', name: 'Human Computer Interaction', credits: 3, offering: 'Semester 1', prereqs: ['BIC1043'], slot: ['FRI', '13:00', '15:00'] }
];

let completed = new Set(JSON.parse(localStorage.getItem('scpa-completed') || '[]'));
let selected = new Set(JSON.parse(localStorage.getItem('scpa-selected') || '[]'));

const byId = id => document.getElementById(id);
const eligible = course => course.prereqs.every(code => completed.has(code));
const prerequisiteText = course => course.prereqs.length ? course.prereqs.join(', ') : 'None';
const save = () => { localStorage.setItem('scpa-completed', JSON.stringify([...completed])); localStorage.setItem('scpa-selected', JSON.stringify([...selected])); };

function renderCompleted() {
  byId('completed-course-list').innerHTML = courses.map(course => `<div class="check-card"><input id="complete-${course.code}" type="checkbox" data-completed="${course.code}" ${completed.has(course.code) ? 'checked' : ''}><label for="complete-${course.code}"><strong>${course.code}</strong><br><small>${course.name}</small></label></div>`).join('');
  byId('progress-label').textContent = `${completed.size} completed`;
}

function renderCatalogue() {
  const query = byId('search-input').value.toLowerCase().trim();
  const view = courses.filter(course => `${course.code} ${course.name}`.toLowerCase().includes(query));
  byId('catalogue-body').innerHTML = view.map(course => {
    const isSelected = selected.has(course.code);
    const canSelect = eligible(course) && !completed.has(course.code);
    const status = completed.has(course.code) ? '<span class="status selected">Completed</span>' : canSelect ? '<span class="status eligible">Eligible</span>' : '<span class="status blocked">Missing prerequisite</span>';
    return `<tr><td><strong>${course.code}</strong><br><span class="muted">${course.name}</span></td><td>${course.credits}</td><td>${course.offering}</td><td>${prerequisiteText(course)}</td><td>${status}</td><td><button data-select="${course.code}" ${canSelect ? '' : 'disabled'}>${isSelected ? 'Remove' : 'Add'}</button></td></tr>`;
  }).join('') || '<tr><td colspan="6" class="muted">No matching courses.</td></tr>';
}

function overlaps(a, b) { return a[0] === b[0] && a[1] < b[2] && b[1] < a[2]; }
function conflictCodes() {
  const plan = courses.filter(course => selected.has(course.code)); const conflicted = new Set();
  plan.forEach((course, index) => plan.slice(index + 1).forEach(other => { if (overlaps(course.slot, other.slot)) { conflicted.add(course.code); conflicted.add(other.code); } }));
  return conflicted;
}
function renderPlan(message) {
  const plan = courses.filter(course => selected.has(course.code)); const conflicts = conflictCodes();
  byId('course-count').textContent = `${plan.length} course${plan.length === 1 ? '' : 's'}`;
  byId('credit-count').textContent = `${plan.reduce((sum, course) => sum + course.credits, 0)} credits`;
  byId('conflict-count').textContent = conflicts.size ? `${conflicts.size} courses have timetable conflicts` : 'No timetable conflicts';
  byId('conflict-count').className = conflicts.size ? 'conflict' : '';
  if (message) byId('planner-message').textContent = message;
  byId('selected-course-list').innerHTML = plan.length ? plan.map(course => `<div class="selected-item"><div><strong>${course.code} — ${course.name}</strong><span class="muted">${course.credits} credits · ${course.offering}</span></div><div class="slot">${course.slot[0]} ${course.slot[1]}–${course.slot[2]} ${conflicts.has(course.code) ? '<span class="conflict">Conflict detected</span>' : ''}</div><button class="secondary" data-remove="${course.code}">Remove</button></div>`).join('') : '<div class="empty">No courses selected yet. Add eligible courses or generate a plan.</div>';
}
function generatePlan() {
  selected.clear(); const occupied = [];
  courses.filter(course => eligible(course) && !completed.has(course.code)).forEach(course => { if (selected.size < 5 && !occupied.some(slot => overlaps(slot, course.slot))) { selected.add(course.code); occupied.push(course.slot); } });
  save(); renderCatalogue(); renderPlan('A conflict-free suggestion was generated from the eligible demo courses. You can remove courses to adjust it.');
}
function downloadCalendar() {
  const plan = courses.filter(course => selected.has(course.code));
  if (!plan.length) { renderPlan('Add at least one course before exporting a calendar.'); return; }
  const dayOffsets = { MON: 0, TUE: 1, WED: 2, THU: 3, FRI: 4 };
  const monday = new Date(); monday.setHours(0,0,0,0); monday.setDate(monday.getDate() + ((8 - monday.getDay()) % 7 || 7));
  const pad = n => String(n).padStart(2, '0'); const stamp = date => `${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
  const events = plan.map(course => { const start = new Date(monday); start.setDate(monday.getDate() + dayOffsets[course.slot[0]]); const [h,m] = course.slot[1].split(':').map(Number); start.setHours(h,m); const end = new Date(start); const [eh,em] = course.slot[2].split(':').map(Number); end.setHours(eh,em); return `BEGIN:VEVENT\nUID:${course.code}-${Date.now()}@smart-course-planner\nDTSTART:${stamp(start)}\nDTEND:${stamp(end)}\nRRULE:FREQ=WEEKLY;COUNT=14\nSUMMARY:${course.code} ${course.name}\nDESCRIPTION:Demo timetable generated by Smart Course Planner Assistant\nEND:VEVENT`; }).join('\n');
  const blob = new Blob([`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Smart Course Planner//EN\n${events}\nEND:VCALENDAR`], {type:'text/calendar'}); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'smart-course-plan.ics'; link.click(); URL.revokeObjectURL(link.href);
}
document.addEventListener('change', event => { if (event.target.dataset.completed) { const code = event.target.dataset.completed; event.target.checked ? completed.add(code) : completed.delete(code); selected.forEach(selectedCode => { if (!eligible(courses.find(course => course.code === selectedCode))) selected.delete(selectedCode); }); save(); renderCompleted(); renderCatalogue(); renderPlan('Your course profile was updated. Ineligible planned courses were removed.'); } });
document.addEventListener('click', event => { const code = event.target.dataset.select; if (code) { selected.has(code) ? selected.delete(code) : selected.add(code); save(); renderCatalogue(); renderPlan('Your plan was updated.'); } if (event.target.dataset.remove) { selected.delete(event.target.dataset.remove); save(); renderCatalogue(); renderPlan('Course removed from your plan.'); } });
byId('search-input').addEventListener('input', renderCatalogue); byId('generate-button').addEventListener('click', generatePlan); byId('export-button').addEventListener('click', downloadCalendar); byId('reset-button').addEventListener('click', () => { completed.clear(); selected.clear(); save(); renderCompleted(); renderCatalogue(); renderPlan('Demo reset.'); });
renderCompleted(); renderCatalogue(); renderPlan();
