// =============================================================================
// JavaScript Week 3 — Automated Assignment Validator / Test Suite
// Run with: node assigment/test.js
// Or:       node assigment/test.js assigment/solution.js
// =============================================================================

const path = require("path");
const fs = require("fs");

// ANSI color helpers
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

// Target file resolution
const defaultTarget = path.join(__dirname, "assignment.js");
const targetFile = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : defaultTarget;

console.log(
  `\n${colors.bold}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}`,
);
console.log(
  `${colors.bold}${colors.cyan}  🧪 JavaScript Week 3: Student Grade Tracker — Test Runner      ${colors.reset}`,
);
console.log(
  `${colors.bold}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}`,
);
console.log(
  `${colors.gray}Testing file: ${path.relative(process.cwd(), targetFile)}${colors.reset}\n`,
);

if (!fs.existsSync(targetFile)) {
  console.error(
    `${colors.red}❌ Error: Target file not found at: ${targetFile}${colors.reset}\n`,
  );
  process.exit(1);
}

// Intercept console.log to test logs if needed
let capturedLogs = [];
const originalLog = console.log;
function captureLogs(fn) {
  capturedLogs = [];
  console.log = (...args) => {
    capturedLogs.push(args.join(" "));
  };
  try {
    fn();
  } finally {
    console.log = originalLog;
  }
  return [...capturedLogs];
}

// Load student module
let submission;
try {
  submission = require(targetFile);
} catch (err) {
  console.error(
    `${colors.red}❌ Syntax or runtime error when loading ${path.basename(targetFile)}:${colors.reset}`,
  );
  console.error(err);
  process.exit(1);
}

let passed = 0;
let failed = 0;

function test(description, testFn) {
  try {
    testFn();
    console.log(`  ${colors.green}✔${colors.reset} ${description}`);
    passed++;
  } catch (err) {
    console.log(`  ${colors.red}✖${colors.reset} ${description}`);
    console.log(`    ${colors.yellow}↳ ${err.message}${colors.reset}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message || "Expected values to equal"}: received ${JSON.stringify(actual)} (type: ${typeof actual}), expected ${JSON.stringify(expected)}`,
    );
  }
}

function assertCloseTo(actual, expected, precision = 0.1, message) {
  if (typeof actual !== "number" || isNaN(actual)) {
    throw new Error(
      `${message || "Value"}: expected number, got ${JSON.stringify(actual)}`,
    );
  }
  if (Math.abs(actual - expected) > precision) {
    throw new Error(
      `${message || "Expected values to be close"}: received ${actual}, expected ~${expected}`,
    );
  }
}

// =============================================================================
// Exercise 1 Tests
// =============================================================================
console.log(
  `${colors.bold}--- Exercise 1: One Student, Basic Functions ---${colors.reset}`,
);

test("calculateAverage is defined as a function", () => {
  assert(
    typeof submission.calculateAverage === "function",
    "calculateAverage is not a function. Did you define it?",
  );
});

test("calculateAverage calculates correct average for standard array", () => {
  assert(
    typeof submission.calculateAverage === "function",
    "calculateAverage is not defined",
  );
  const avg = submission.calculateAverage([78, 85, 92, 60, 74]);
  assertCloseTo(avg, 77.8, 0.1, "calculateAverage([78, 85, 92, 60, 74])");
});

test("calculateAverage handles different arrays properly", () => {
  assert(
    typeof submission.calculateAverage === "function",
    "calculateAverage is not defined",
  );
  assertEqual(
    submission.calculateAverage([100, 100, 100]),
    100,
    "calculateAverage([100, 100, 100])",
  );
  assertEqual(submission.calculateAverage([50]), 50, "calculateAverage([50])");
  assertEqual(
    submission.calculateAverage([10, 20, 30]),
    20,
    "calculateAverage([10, 20, 30])",
  );
});

test("getLetterGrade is defined as a function", () => {
  assert(
    typeof submission.getLetterGrade === "function",
    "getLetterGrade is not a function. Did you define it?",
  );
});

test("getLetterGrade returns correct grades ('A' for 90+, 'B' for 80-89, 'C' for 70-79, 'F' for <70)", () => {
  assert(
    typeof submission.getLetterGrade === "function",
    "getLetterGrade is not defined",
  );
  assertEqual(submission.getLetterGrade(95), "A", "getLetterGrade(95)");
  assertEqual(submission.getLetterGrade(90), "A", "getLetterGrade(90)");
  assertEqual(submission.getLetterGrade(89), "B", "getLetterGrade(89)");
  assertEqual(submission.getLetterGrade(80), "B", "getLetterGrade(80)");
  assertEqual(submission.getLetterGrade(79), "C", "getLetterGrade(79)");
  assertEqual(submission.getLetterGrade(70), "C", "getLetterGrade(70)");
  assertEqual(submission.getLetterGrade(69), "F", "getLetterGrade(69)");
  assertEqual(submission.getLetterGrade(55), "F", "getLetterGrade(55)");
});

// =============================================================================
// Exercise 2 Tests
// =============================================================================
console.log(
  `\n${colors.bold}--- Exercise 2: A Whole Class, Array Methods ---${colors.reset}`,
);

test("classAverages is an array with 4 student objects", () => {
  assert(
    Array.isArray(submission.classAverages),
    "classAverages should be an array",
  );
  assertEqual(
    submission.classAverages.length,
    4,
    "classAverages should contain 4 items",
  );
});

test("classAverages has correct structure { name, average } and calculated values", () => {
  assert(
    Array.isArray(submission.classAverages),
    "classAverages is not an array",
  );
  const sokha = submission.classAverages.find((s) => s && s.name === "Sokha");
  const dara = submission.classAverages.find((s) => s && s.name === "Dara");
  const sreymom = submission.classAverages.find(
    (s) => s && s.name === "Sreymom",
  );
  const bora = submission.classAverages.find((s) => s && s.name === "Bora");

  assert(
    sokha && typeof sokha.average === "number",
    "Sokha item with numeric average is missing",
  );
  assert(
    dara && typeof dara.average === "number",
    "Dara item with numeric average is missing",
  );
  assert(
    sreymom && typeof sreymom.average === "number",
    "Sreymom item with numeric average is missing",
  );
  assert(
    bora && typeof bora.average === "number",
    "Bora item with numeric average is missing",
  );

  assertCloseTo(sokha.average, 77.8, 0.1, "Sokha's average");
  assertCloseTo(dara.average, 92.8, 0.1, "Dara's average");
  assertCloseTo(sreymom.average, 60.0, 0.1, "Sreymom's average");
  assertCloseTo(bora.average, 85.0, 0.1, "Bora's average");
});

test("honorRoll filters students with average >= 85 (Dara and Bora)", () => {
  assert(Array.isArray(submission.honorRoll), "honorRoll should be an array");
  assertEqual(submission.honorRoll.length, 2, "honorRoll length should be 2");
  const names = submission.honorRoll.map((s) => s.name).sort();
  assertEqual(
    JSON.stringify(names),
    JSON.stringify(["Bora", "Dara"]),
    "honorRoll should contain Dara and Bora",
  );
});

// =============================================================================
// Exercise 3 Tests
// =============================================================================
console.log(
  `\n${colors.bold}--- Exercise 3: Callbacks + Bracket Notation ---${colors.reset}`,
);

test("chanAverage is calculated correctly (80)", () => {
  assertCloseTo(submission.chanAverage, 80, 0.1, "chanAverage");
});

test("generateReport is defined and executes the provided callback with (student, average)", () => {
  assert(
    typeof submission.generateReport === "function",
    "generateReport is not a function",
  );

  let called = false;
  let receivedStudent = null;
  let receivedAverage = null;

  const testCallback = (student, avg) => {
    called = true;
    receivedStudent = student;
    receivedAverage = avg;
  };

  const dummyStudent = { name: "TestBot" };
  submission.generateReport(dummyStudent, 90, testCallback);

  assert(called, "generateReport did not call the callback function");
  assertEqual(
    receivedStudent,
    dummyStudent,
    "generateReport did not pass student object to callback",
  );
  assertEqual(
    receivedAverage,
    90,
    "generateReport did not pass average to callback",
  );
});

test("simpleFormat callback logs '<Name>: <Average>'", () => {
  assert(
    typeof submission.simpleFormat === "function",
    "simpleFormat is not a function",
  );
  const logs = captureLogs(() => {
    submission.simpleFormat({ name: "Chan" }, 80);
  });
  assert(logs.length > 0, "simpleFormat did not console.log anything");
  assert(
    logs[0].includes("Chan") && logs[0].includes("80"),
    `simpleFormat output '${logs[0]}' should contain 'Chan' and '80'`,
  );
});

test("detailedFormat callback logs 'Report for <Name> — Overall Average: <Average>'", () => {
  assert(
    typeof submission.detailedFormat === "function",
    "detailedFormat is not a function",
  );
  const logs = captureLogs(() => {
    submission.detailedFormat({ name: "Chan" }, 80);
  });
  assert(logs.length > 0, "detailedFormat did not console.log anything");
  assert(
    logs[0].toLowerCase().includes("report") &&
      logs[0].includes("Chan") &&
      logs[0].includes("80"),
    `detailedFormat output '${logs[0]}' should contain 'Report', 'Chan', and '80'`,
  );
});

// =============================================================================
// Summary
// =============================================================================
console.log(
  `\n${colors.bold}════════════════════════════════════════════════════════════════${colors.reset}`,
);
console.log(`${colors.bold}  📊 Test Summary${colors.reset}`);
console.log(`════════════════════════════════════════════════════════════════`);
console.log(`  Passed: ${colors.green}${passed}${colors.reset}`);
console.log(
  `  Failed: ${failed > 0 ? colors.red + failed : colors.gray + "0"}${colors.reset}`,
);
console.log(`  Total:  ${passed + failed}`);

if (failed === 0) {
  console.log(
    `\n  ${colors.bold}${colors.green}🎉 Awesome job! All tests passed successfully!${colors.reset}\n`,
  );
  process.exit(0);
} else {
  console.log(
    `\n  ${colors.yellow}⚠️ Some tests failed. Check the error hints above and keep trying!${colors.reset}\n`,
  );
  process.exit(1);
}
