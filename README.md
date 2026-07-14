 SBA 308: JavaScript Fundamentals - Learner Data Processor

An elegant and robust JavaScript program designed to parse, validate, and process student assignment submission data from a simulated Learning Management System (LMS). 

This application takes raw data representing courses, assignment groups, and learner submissions, applies custom grading logic (including late penalties and filtering out future assignments), and returns a clean, formatted report of student averages and individual grades.

---

## Features

* **Data Validation:** Verifies that assignment groups map correctly to their respective courses, throwing explicit errors if a mismatch is detected.
* **Late Submission Penalties:** Automatically applies a **10% penalty** of the total possible assignment points to any submission turned in past the due date.
* **Graceful Error Handling:** Employs `try/catch` blocks to protect against script crashes and screens data for invalid metrics (e.g., preventing division by zero if `points_possible` is `0`).
* **Dynamic Filtering:** Excludes assignments that are not yet due from both individual grades and final weighted average calculations.
* **Data Transformation:** Aggregates multi-layered submission structures into a streamlined, learner-specific flat array of objects.

---

## Tech Stack & Concepts Demonstrated

This project is built purely in **Modern JavaScript (ES6+)** to showcase fundamental programming competencies:

* **Variable Declaration:** Proper and distinct use of `const` and `let` based on scope and mutability.
* **Control Flow:** Implementation of conditional logic (`if/else` statements) to evaluate late assignments and valid data.
* **Error Management:** Program-wide `try/catch` structures to intercept, log, and recover from exceptional states.
* **Diverse Iteration:** Utilization of multiple loop paradigms (including traditional `for` loops and modern `for...of` loops) alongside loop control statements (`continue`).
* **Data Structures:** Extensive creation, nested manipulation, and property extraction (`delete`, Object spread) of complex Objects and Arrays.

---

## Code Architecture

The core of the application lies in the `getLearnerData()` function, which coordinates the processing pipeline:

```javascript
getLearnerData(CourseInfo, AssignmentGroup, [LearnerSubmission])
