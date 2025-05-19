import { driversLicenseExamEvaluation } from '../driversLicense/driversLicense.js';

describe('Driver\'s license tests', () => {

    /**
     * Positive testing
     */

    const driversLicensePassesProvider = [

        /**
         * Decision table-based test cases
         */

        {'theory_exam_points': 90, 'practical_exam_errors': 1, 'output': {                               // Test case 1 based on business rule 1
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 90, 'practical_exam_errors': 5, 'output': {                               // Test case 2 based on business rule 2
            'license_granted': false,
            'repeat_theory_exam': false,
            'repeat_practical_exam': true,
            'additional_lessons': false
        }},
        {'theory_exam_points': 50, 'practical_exam_errors': 1, 'output': {                               // Test case 3 based on business rule 3
            'license_granted': false,
            'repeat_theory_exam': true,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 50, 'practical_exam_errors': 5, 'output': {                               // Test case 4 based on business rule 4
            'license_granted': false,
            'repeat_theory_exam': true,
            'repeat_practical_exam': true,
            'additional_lessons': true
        }},

        /**
         * Boundary value-based test cases
         */

        // Theory exam points (a middle value is used for practical exam errors)

        {'theory_exam_points': 0, 'practical_exam_errors': 1, 'output': {                               // Valid partition 0-84: lower boundary value
            'license_granted': false,
            'repeat_theory_exam': true,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 1, 'practical_exam_errors': 1, 'output': {                               
            'license_granted': false,
            'repeat_theory_exam': true,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 83, 'practical_exam_errors': 1, 'output': {                               
            'license_granted': false,
            'repeat_theory_exam': true,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 84, 'practical_exam_errors': 1, 'output': {                               // Valid partition 0-84: upper boundary value
            'license_granted': false,
            'repeat_theory_exam': true,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 85, 'practical_exam_errors': 1, 'output': {                               // Valid partition 85-100: lower boundary value
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 86, 'practical_exam_errors': 1, 'output': {                               
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 99, 'practical_exam_errors': 1, 'output': {                               
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 100, 'practical_exam_errors': 1, 'output': {                              // Valid partition 85-100: upper boundary value           
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},

        // Practical exam errors (a middle value is used for theory exam points)

        {'theory_exam_points': 90, 'practical_exam_errors': 0, 'output': {                              // Partition 0-2: lower boundary value           
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 90, 'practical_exam_errors': 1, 'output': {                              
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 90, 'practical_exam_errors': 2, 'output': {                              // Partition 0-2: upper boundary value           
            'license_granted': true,
            'repeat_theory_exam': false,
            'repeat_practical_exam': false,
            'additional_lessons': false
        }},
        {'theory_exam_points': 90, 'practical_exam_errors': 3, 'output': {                              // Partition 3-MAX INTEGER: lower boundary value           
            'license_granted': false,
            'repeat_theory_exam': false,
            'repeat_practical_exam': true,
            'additional_lessons': false
        }},
        {'theory_exam_points': 90, 'practical_exam_errors': 4, 'output': {                              
            'license_granted': false,
            'repeat_theory_exam': false,
            'repeat_practical_exam': true,
            'additional_lessons': false
        }},
        {'theory_exam_points': 90, 'practical_exam_errors': Number.MAX_SAFE_INTEGER, 'output': {        // Edge case: maximum integer in JavaScript
            'license_granted': false,
            'repeat_theory_exam': false,
            'repeat_practical_exam': true,
            'additional_lessons': false
        }},
        {'theory_exam_points': 90, 'practical_exam_errors': Number.MAX_SAFE_INTEGER + 1, 'output': {    // Edge case: maximum integer in JavaScript 
            'license_granted': false,
            'repeat_theory_exam': false,
            'repeat_practical_exam': true,
            'additional_lessons': false
        }},        
    ];
    describe.each(driversLicensePassesProvider)('Driver\'s license passes', (params) => {
        it(`${params.theory_exam_points} theory exam points, ${params.practical_exam_errors} practical exam errors passes`, () => {
            expect(driversLicenseExamEvaluation(params.theory_exam_points, params.practical_exam_errors)).toEqual(params.output);
        });
    });

    /**
     * Negative testing
     */

    const driversLicenseFailsProvider = [
        
        // Equivalence partition-based test case

        {'theory_exam_points': 120, 'practical_exam_errors': 1},    // Theory exam points: middle value for the invalid partition

        // Boundary value-based test case

        {'theory_exam_points': 101, 'practical_exam_errors': 1},    // Theory exam points: lower boundary value for the invalid partition

        // Edge cases 

        {'theory_exam_points': Number.MAX_SAFE_INTEGER, 'practical_exam_errors': 1},        // Maximum integer in JavaScript
        {'theory_exam_points': Number.MAX_SAFE_INTEGER + 1, 'practical_exam_errors': 1},    // Maximum integer in JavaScript + 1 
    ];
    describe.each(driversLicenseFailsProvider)('Driver\'s license fails', (params) => {
        it(`${params.theory_exam_points} theory exam points, ${params.practical_exam_errors} practical exam errors fails`, () => {
            expect(() => driversLicenseExamEvaluation(params.theory_exam_points, params.practical_exam_errors)).toThrow('There can not be more than 100 points for a theory exam.');
        });
    });

    // Other edge cases

    it('Negative theory exam points fails', () => {
        expect(() => driversLicenseExamEvaluation(-1, 1)).toThrow('The number of exam points cannot be negative.');
    });

    it('Negative practical exam errors fails', () => {
        expect(() => driversLicenseExamEvaluation(90, -1)).toThrow('The number of practical exam errors cannot be negative.');
    });

    const driversLicenseWrongDataTypeFailsProvider = [
        {'theory_exam_points': 'Hello', 'practical_exam_errors': 1},
        {'theory_exam_points': 90, 'practical_exam_errors': 'Hello'}
    ];
    describe.each(driversLicenseWrongDataTypeFailsProvider)('Driver\'s license wrong data type fails', (params) => {
        it('Wrong data type fails', () => {
            expect(() => driversLicenseExamEvaluation(params.theory_exam_points, params.practical_exam_errors)).toThrow('Incorrect data type.');
        });
    });
});