// Parameters:
// - The number of points from the theoretical exam (integer number from 0 to 100)
// - The number of errors made by the candidate during the practical exam (integer number 0 or greater)
// The candidate must take both exams. 
// A candidate is granted a driver's license if they meet the following two conditions: 
// - They scored at least 85 points on the theoretical test 
// - They made no more than two errors on the practical test
// If a candidate fails one of the exams, they must repeat this exam. 
// In addition, if the candidate fails both exams, they are required to take additional hours of driving lessons.

export const driversLicenseExamEvaluation = (theoryExamPoints, practicalExamErrors) => {
    theoryExamPoints = parseInt(theoryExamPoints);
    practicalExamErrors = parseInt(practicalExamErrors);

    if (isNaN(theoryExamPoints) || isNaN(practicalExamErrors)) {
        throw new Error('Incorrect data type.');
    }

    if (theoryExamPoints > 100) {
        throw new Error('There can not be more than 100 points for a theory exam.');
    }
    if (theoryExamPoints < 0) {
        throw new Error('The number of exam points cannot be negative.');
    }
    if (practicalExamErrors < 0) {
        throw new Error('The number of practical exam errors cannot be negative.');
    }

    const output = {
        'license_granted': false,
        'repeat_theory_exam': false,
        'repeat_practical_exam': false,
        'additional_lessons': false
    };
    if (theoryExamPoints < 85) {
        output.repeat_theory_exam = true;
    }
    if (practicalExamErrors > 2) {
        output.repeat_practical_exam = true;
    }

    output.license_granted = !output.repeat_theory_exam && !output.repeat_practical_exam;
    output.additional_lessons = output.repeat_theory_exam && output.repeat_practical_exam;

    return output;
};  