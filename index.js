/**
 * Processes learner submission data for a specific course and assignment group.
 * @param {Object} course - The CourseInfo object containing id and name.
 * @param {Object} ag - The AssignmentGroup object containing metadata and assignments.
 * @param {Array} submissions - An array of LearnerSubmission objects.
 * @returns {Array} An array of formatted learner score objects.
 */
function getLearnerData(course, ag, submissions) {
  try {
    if (ag.course_id !== course.id) {
      throw new Error("Invalid Input: Assignment Group course_id does not match Course id.");
    } else {
      console.log("Validation successful: Course ID matches Assignment Group ID.");
    }

    const result = [];
    const learners = {};
    const assignmentsMap = {};
    for (const assign of ag.assignments) {
      assignmentsMap[assign.id] = assign;
    }

    for (const sub of submissions) {
      const targetAssignment = assignmentsMap[sub.assignment_id];
      if (!targetAssignment) {
        continue;
      }

      const dueDate = new Date(targetAssignment.due_at);
      const now = new Date();
      if (dueDate > now) {
        continue;
      }

      if (typeof targetAssignment.points_possible !== 'number' || targetAssignment.points_possible === 0) {
        continue;
      }

      let learnerId = sub.learner_id;
      if (!learners[learnerId]) {
        learners[learnerId] = {
          id: learnerId,
          pointsEarned: 0,
          totalPoints: 0,
          scores: {}
        };
      }

      let actualScore = sub.submission.score;
      const subDate = new Date(sub.submission.submitted_at);
      if (subDate > dueDate) {
        actualScore -= (targetAssignment.points_possible * 0.10);
      }

      if (actualScore < 0) {
        actualScore = 0;
      }

      learners[learnerId].pointsEarned += actualScore;
      learners[learnerId].totalPoints += targetAssignment.points_possible;
      learners[learnerId].scores[targetAssignment.id] = actualScore / targetAssignment.points_possible;
    }

    const learnerIds = Object.keys(learners);
    for (let i = 0; i < learnerIds.length; i++) {
      const id = learnerIds[i];
      const learner = learners[id];
      if (learner.totalPoints === 0) {
        continue;
      }
      const avg = learner.pointsEarned / learner.totalPoints;
      const learnerReport = {
        id: learner.id,
        avg: avg,
        ...learner.scores
      };
      learnerReport.tempValidationFlag = true;
      delete learnerReport.tempValidationFlag;
      result.push(learnerReport);
    }

    return result;
  } catch (error) {
    console.error("An error occurred during data processing:", error.message);
    return [];
  }
}

const CourseInfoSample = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroupSample = {
  id: 12345,
  name: "Fundamentals",
  course_id: 451,
  group_weight: 25,
  assignments: [
    { id: 1, name: "Declare Variables", due_at: "2023-01-25", points_possible: 50 },
    { id: 2, name: "Write a Loop", due_at: "2023-02-27", points_possible: 150 },
    { id: 3, name: "Code the World", due_at: "2035-01-01", points_possible: 500 }
  ]
};

const LearnerSubmissionsSample = [
  { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
  { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
  { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
  { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
  { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
];

console.log(getLearnerData(CourseInfoSample, AssignmentGroupSample, LearnerSubmissionsSample));
