import React, { useState } from 'react';
import { Upload, BookOpen, GraduationCap, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const App = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  // Sample program requirements (can be customized)
  const programRequirements = {
    totalCredits: 120,
    coreCredits: 90,
    electiveCredits: 30,
    coreCourses: [
      { code: 'CS101', name: 'Introduction to Programming', credits: 3, prerequisites: [] },
      { code: 'CS102', name: 'Data Structures', credits: 3, prerequisites: ['CS101'] },
      { code: 'CS201', name: 'Algorithms', credits: 3, prerequisites: ['CS102'] },
      { code: 'CS202', name: 'Database Systems', credits: 3, prerequisites: ['CS101'] },
      { code: 'MATH101', name: 'Calculus I', credits: 4, prerequisites: [] },
      { code: 'MATH102', name: 'Calculus II', credits: 4, prerequisites: ['MATH101'] },
      { code: 'ENG101', name: 'English Composition', credits: 3, prerequisites: [] },
      { code: 'PHY101', name: 'Physics I', credits: 4, prerequisites: [] },
    ]
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError('');
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const courses = parseFile(text, file.name);
        
        if (courses.length === 0) {
          setError('No valid courses found in file. Please check the format.');
          return;
        }

        setCompletedCourses(courses);
        analyzeProgress(courses);
      } catch (err) {
        setError('Error reading file: ' + err.message);
      }
    };

    reader.readAsText(file);
  };

  const parseFile = (text, filename) => {
    const lines = text.split('\n').filter(line => line.trim());
    const courses = [];
    
    // Skip header row if it exists
    const startIndex = lines[0].toLowerCase().includes('code') || lines[0].toLowerCase().includes('name') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle both CSV and tab-separated values
      const parts = line.includes('\t') ? line.split('\t') : line.split(',');
      
      if (parts.length >= 4) {
        const course = {
          code: parts[0].trim(),
          name: parts[1].trim(),
          credits: parseFloat(parts[2].trim()) || 0,
          type: parts[3].trim().toLowerCase().includes('core') ? 'Core' : 'Elective',
          grade: parts[4] ? parts[4].trim() : null
        };
        
        if (course.code && course.name) {
          courses.push(course);
        }
      }
    }
    
    return courses;
  };

  const calculateGPA = (courses) => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && gradePoints[course.grade.toUpperCase()] !== undefined) {
        totalPoints += gradePoints[course.grade.toUpperCase()] * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : null;
  };

  const analyzeProgress = (courses) => {
    const completedCodes = courses.map(c => c.code);
    const coreCompleted = courses.filter(c => c.type === 'Core');
    const electiveCompleted = courses.filter(c => c.type === 'Elective');
    
    const totalCreditsCompleted = courses.reduce((sum, c) => sum + c.credits, 0);
    const coreCreditsCompleted = coreCompleted.reduce((sum, c) => sum + c.credits, 0);
    const electiveCreditsCompleted = electiveCompleted.reduce((sum, c) => sum + c.credits, 0);

    const remainingTotalCredits = programRequirements.totalCredits - totalCreditsCompleted;
    const remainingCoreCredits = Math.max(0, programRequirements.coreCredits - coreCreditsCompleted);
    const remainingElectiveCredits = Math.max(0, programRequirements.electiveCredits - electiveCreditsCompleted);

    // Find incomplete core courses
    const incompleteCourses = programRequirements.coreCourses.filter(
      course => !completedCodes.includes(course.code)
    );

    // Check prerequisites and recommend next courses
    const availableCourses = incompleteCourses.filter(course => {
      return course.prerequisites.every(prereq => completedCodes.includes(prereq));
    });

    const blockedCourses = incompleteCourses.filter(course => {
      return course.prerequisites.some(prereq => !completedCodes.includes(prereq));
    });

    const cgpa = calculateGPA(courses);

    setAnalysis({
      totalCreditsCompleted,
      coreCreditsCompleted,
      electiveCreditsCompleted,
      remainingTotalCredits,
      remainingCoreCredits,
      remainingElectiveCredits,
      incompleteCourses,
      availableCourses,
      blockedCourses,
      cgpa,
      progressPercentage: ((totalCreditsCompleted / programRequirements.totalCredits) * 100).toFixed(1)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Course Advisor & GPA Calculator</h1>
          </div>
          <p className="text-gray-600">Upload your completed courses to see your progress and get recommendations</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Upload Completed Courses</h2>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Click to upload CSV or Excel file</p>
              <p className="text-sm text-gray-500">Format: Code, Name, Credits, Type (Core/Elective), Grade (optional)</p>
              <p className="text-xs text-gray-400 mt-2">Example: CS101, Introduction to Programming, 3, Core, A</p>
            </label>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysis && (
          <>
            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-700">Overall Progress</h3>
                </div>
                <p className="text-3xl font-bold text-indigo-600">{analysis.progressPercentage}%</p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.totalCreditsCompleted} / {programRequirements.totalCredits} credits
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${analysis.progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">Core Courses</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">{analysis.coreCreditsCompleted}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.remainingCoreCredits} credits remaining
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(analysis.coreCreditsCompleted / programRequirements.coreCredits) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-700">CGPA</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {analysis.cgpa || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.cgpa ? 'Current cumulative GPA' : 'Add grades to calculate'}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Next Semester</h2>
              
              {analysis.availableCourses.length > 0 ? (
                <div className="space-y-3">
                  {analysis.availableCourses.map((course, idx) => (
                    <div key={idx} className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{course.code} - {course.name}</p>
                        <p className="text-sm text-gray-600">{course.credits} credits</p>
                        {course.prerequisites.length > 0 && (
                          <p className="text-xs text-green-700 mt-1">
                            ✓ Prerequisites met: {course.prerequisites.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">All core courses with met prerequisites are completed! Consider electives.</p>
              )}
            </div>

            {/* Blocked Courses */}
            {analysis.blockedCourses.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Waiting on Prerequisites</h2>
                <div className="space-y-3">
                  {analysis.blockedCourses.map((course, idx) => (
                    <div key={idx} className="border border-orange-200 bg-orange-50 rounded-lg p-4 flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{course.code} - {course.name}</p>
                        <p className="text-sm text-gray-600">{course.credits} credits</p>
                        <p className="text-xs text-orange-700 mt-1">
                          ⚠ Missing prerequisites: {course.prerequisites.filter(p => !completedCourses.find(c => c.code === p)).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Graduation Requirements Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Credits Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Credits Needed:</span>
                      <span className="font-semibold">{programRequirements.totalCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credits Completed:</span>
                      <span className="font-semibold text-green-600">{analysis.totalCreditsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credits Remaining:</span>
                      <span className="font-semibold text-orange-600">{analysis.remainingTotalCredits}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Core Credits Remaining:</span>
                      <span className="font-semibold">{analysis.remainingCoreCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Elective Credits Remaining:</span>
                      <span className="font-semibold">{analysis.remainingElectiveCredits}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Estimated Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Semesters Remaining (15 credits/sem):</span>
                      <span className="font-semibold">{Math.ceil(analysis.remainingTotalCredits / 15)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Core Courses:</span>
                      <span className="font-semibold text-green-600">{analysis.availableCourses.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blocked Core Courses:</span>
                      <span className="font-semibold text-orange-600">{analysis.blockedCourses.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sample File Format */}
        {!analysis && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sample File Format</h2>
            <div className="bg-gray-50 rounded border border-gray-200 p-4 font-mono text-sm overflow-x-auto">
              <div>Code,Name,Credits,Type,Grade</div>
              <div>CS101,Introduction to Programming,3,Core,A</div>
              <div>MATH101,Calculus I,4,Core,B+</div>
              <div>ENG101,English Composition,3,Core,A-</div>
              <div>ELEC201,Digital Marketing,3,Elective,B</div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Note:</strong> The Grade column is optional. Include it to calculate your CGPA.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
