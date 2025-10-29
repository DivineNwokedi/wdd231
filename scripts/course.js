const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 131", name: "Frontend Development I", credits: 3, completed: true },
  { code: "WDD 231", name: "Frontend Development II", credits: 3, completed: false },
  { code: "CSE 110", name: "Programming Building Blocks", credits: 2, completed: true },
  { code: "CSE 111", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 4, completed: false }
];

const courseCards = document.getElementById("courseCards");
const creditTotal = document.getElementById("creditTotal");

function renderCourses(filterFn) {
  const filtered = filterFn ? courses.filter(filterFn) : courses;
  courseCards.innerHTML = "";
  let totalCredits = 0;

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = course.completed ? "completed" : "pending";
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} credits</p>`;
    courseCards.appendChild(card);
    totalCredits += course.credits;
  });

  creditTotal.textContent = `Total Credits: ${totalCredits}`;
}

document.getElementById("allBtn").onclick = () => renderCourses();
document.getElementById("wddBtn").onclick = () => renderCourses(c => c.code.startsWith("WDD"));
document.getElementById("cseBtn").onclick = () => renderCourses(c => c.code.startsWith("CSE"));

renderCourses();
