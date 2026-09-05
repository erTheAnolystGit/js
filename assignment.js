// =============================================================================
// JavaScript Week 3 — Assignment: Student Grade Tracker
// =============================================================================

// =============================================================================
// Exercise 1 (Easy) — One Student, Basic Functions
// =============================================================================

const student = {
  name: "Sokha",
  scores: [78, 85, 92, 60, 74],
};

function calculateAverage(scores) {
   let total = 0;
  scores.forEach((score) => {
    total += score;
  });
  return total / scores.length;

}

function getLetterGrade(average) {
  if (average >= 90) return "A";
  if (average >= 80) return "B";
  if (average >= 70) return "C";
  return "F";

}

const sokhaAvg =
calculateAverage(student.scores);
const sokhaGrade =
getLetterGrade(sokhaAvg);
console.log(`${student.name}
average is $
{sokhaAvg.toFixed(1)} - Grade :
$ {sokhaGrade}`);

// =============================================================================
// Exercise 2 (Medium) — A Whole Class, Array Methods
// =============================================================================

const classList = [
  { name: "Sokha", scores: [78, 85, 92, 60, 74] },
  { name: "Dara", scores: [95, 91, 88, 93, 97] },
  { name: "Sreymom", scores: [55, 62, 48, 70, 65] },
  { name: "Bora", scores: [82, 79, 85, 88, 91] },
];

// Requirement 1: Use .map() to build classAverages array
// Target shape for each item: { name: "Sokha", average: 77.8 }
let classAverages = classList.map(student => {
  const average = calculateAverage(student.scores);
  return {
    name: student.name,
    average: Number(average.toFixed(1))
  };
});

let honorRoll = classAverages.filter(student => student.average >= 85);

classAverages.forEach(student => {
  const grade = getLetterGrade(student.average);
  console.log(`${student.name} - Average: ${student.average} (${grade})`);
});

// Requirement 4: Log how many students made the honor roll
console.log(`${honorRoll.length} student mde the honor roll.`);

// =============================================================================
// Exercise 3 (Hard) — Callbacks + Bracket Notation
// =============================================================================

const studentSubjects = {
  name: "Chan",
  Math: 88,
  Khmer: 76,
  English: 91,
  Science: 65,
};

const subjectList = ["Math", "Khmer", "English", "Science"];

// Requirement 1: Calculate Chan's average using subjectList and bracket notation (studentSubjects[subject])
let total = 0;
for (let subject of subjectList) {
  total += studentSubjects[subject];
}
let chanAverage = total / subjectList.length;

// Requirement 2: Write generateReport(student, average, callback)
// Note: Do NOT console.log here. Call callback(student, average)
function generateReport(student, average, callback) {
  return callback(student, average);
  // TODO: Invoke the callback with student and average
}

// Requirement 3: Write two callback functions
function simpleFormat(student, average) {
  console.log(`${student.name}: ${average}`);
  // TODO: Log in format: "Chan: 80"
}

function detailedFormat(student, average) {
  console.log(`Report for ${student.name} -Overall Average: ${average}.`);
  // TODO: Log in format: "Report for Chan — Overall Average: 80.0"
}

// Call generateReport with each callback format
// TODO: generateReport(studentSubjects, chanAverage, simpleFormat);
// TODO: generateReport(studentSubjects, chanAverage, detailedFormat);

// =============================================================================
// Stretch Goal (Optional)
// =============================================================================
// Transform classList into subject-key objects and run generateReport with forEach!
classList.forEach(student => {
  const avg = calculateAverage(student.scores);
  const studentobj = {
    name: student.name,
    Math: student.scores[0],
    Khmer: student.scores[1],
    English: student.scores[2],
    Science: student.scores[3]
  };
  generateReport(studentobj, avg, simpleFormat);
  generateReport(studentobj, avg, detailedFormat);
});
// TODO: Your stretch goal code here

// =============================================================================
// DO NOT MODIFY BELOW THIS LINE — Used for automated tests
// =============================================================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    student,
    calculateAverage,
    getLetterGrade,
    classList,
    classAverages,
    honorRoll,
    studentSubjects,
    subjectList,
    chanAverage,
    generateReport,
    simpleFormat,
    detailedFormat,
  };
}
