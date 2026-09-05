# JavaScript Week 3 — Assignment: Student Grade Tracker

One theme, three exercises — each builds on the previous one, going from easy to hard. Keep your Exercise 1 code, because Exercises 2 and 3 will reuse it!

---

## Exercise 1 (Easy) — One Student, Basic Functions

### Starter Data

```js
const student = {
  name: "Sokha",
  scores: [78, 85, 92, 60, 74],
};
```

### Requirements:

1. **`calculateAverage(scores)`**:
   - Takes an array of numbers (`scores`).
   - Uses a `forEach` loop with a running total to calculate and return the average.
2. **`getLetterGrade(average)`**:
   - Returns `"A"` for **90+**
   - Returns `"B"` for **80–89**
   - Returns `"C"` for **70–79**
   - Returns `"F"` for **below 70**
3. Using both functions, calculate Sokha's average and letter grade, then log the result in this exact format:
   ```text
   Sokha's average is 77.8 — Grade: C
   ```

> 💡 **New Tool — `.toFixed()` for formatting decimals:**
> In JavaScript, dividing numbers often results in long decimals (e.g., `77.80000000000001`).
> You can use `.toFixed(1)` to round and format a number to **1 decimal place**:
>
> ```js
> const score = 77.800000001;
> console.log(score.toFixed(1)); // Output: "77.8"
>
> const perfect = 85;
> console.log(perfect.toFixed(1)); // Output: "85.0"
> ```
>
> _Note: `.toFixed()` returns a string, so it's perfect for printing in logs!_

> **🎯 What this practices:** Defining basic functions, parameters and `return` values, combining arrays and objects.

---

## Exercise 2 (Medium) — A Whole Class, Array Methods

### Starter Data

```js
const classList = [
  { name: "Sokha", scores: [78, 85, 92, 60, 74] },
  { name: "Dara", scores: [95, 91, 88, 93, 97] },
  { name: "Sreymom", scores: [55, 62, 48, 70, 65] },
  { name: "Bora", scores: [82, 79, 85, 88, 91] },
];
```

### Requirements:

1. Use `.map()` and your `calculateAverage` function from Exercise 1 to build a new array `classAverages` in the shape `{ name, average }` for every student.
2. Use `.filter()` on `classAverages` to build an `honorRoll` array — keeping only students with an average of **85 or above**.
3. Use `.forEach()` on `classAverages` to print a report line for every student:
   ```text
   Sokha — Average: 77.8 (C)
   Dara — Average: 92.8 (A)
   Sreymom — Average: 60.0 (F)
   Bora — Average: 85.0 (B)
   ```
4. Log the count of students who made the honor roll:
   ```text
   2 students made the honor roll.
   ```

> **💡 What this practices:** Chaining helper functions across lists, choosing the right array method for the job (`.map()` vs `.filter()` vs `.forEach()`).

---

## Exercise 3 (Hard) — Callbacks + Bracket Notation

### Starter Data

In this exercise, subject scores are stored directly as object properties instead of an array:

```js
const studentSubjects = {
  name: "Chan",
  Math: 88,
  Khmer: 76,
  English: 91,
  Science: 65,
};

const subjectList = ["Math", "Khmer", "English", "Science"];
```

### Requirements:

1. **Dynamic Property Access**:
   - Using `subjectList` and a loop (`forEach` or `for...in`) with **bracket notation** (`studentSubjects[subject]`), calculate Chan's average across all 4 subjects.
   - _Why bracket notation?_ Because the subject name is stored inside a variable (`subject`), not typed as a literal property name.
2. **`generateReport(student, average, callback)`**:
   - Write a function that accepts `student`, `average`, and a `callback` function.
   - It should **not** log anything directly — instead, it should invoke `callback(student, average)`.
   - _Why do we do this?_ `generateReport` stays generic and reusable while delegating formatting to whatever callback is passed.
3. **Two Callback Formats**:
   - Write `simpleFormat(student, average)`: logs `"Chan: 80"` (or rounded integer).
   - Write `detailedFormat(student, average)`: logs `"Report for Chan — Overall Average: 80.0"`.
   - Call `generateReport` once with `simpleFormat` and once with `detailedFormat`.
4. **🌟 Stretch Goal**:
   - Convert `classList` from Exercise 2 into an array of objects matching the `studentSubjects` format.
   - Use `.forEach()` and `generateReport` to print reports for the entire class using your preferred callback format!

> **💡 What this practices:** Variable-based property access using bracket notation, and designing flexible callback-driven functions.
