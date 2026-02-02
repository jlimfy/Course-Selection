import React, { useState } from 'react';
import { Upload, BookOpen, GraduationCap, TrendingUp, AlertCircle, XCircle, Award } from 'lucide-react';

const CourseAdvisorApp = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [studentTrack, setStudentTrack] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  // ============================================
  // PROGRAM REQUIREMENTS - UPDATE HERE
  // ============================================
  const programRequirements = {
    totalCredits: 120,
    coreCredits: 94,
    compulsoryCredits: 12,
    electiveCredits: 14,
    
    tracks: ['Local', 'International'],
    
    // All available courses in the program
    allCourses: [
      { code: 'SE004', name: 'Basic English', credits: 4, type: 'Conditional', forTrack: 'Local', minGrade: 'C', gpaInclusion: false },
      { code: 'SE005', name: 'English Foundation', credits: 4, type: 'Conditional', forTrack: 'Local', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY1760', name: 'Masterclass Attendance 2', credits: 0, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY1650', name: 'Recital Attendance 1', credits: 0, type: 'Core', forTrack: 'All', minGrade: 'S', gpaInclusion: false },
      { code: 'BCY1660', name: 'Recital Attendance 2', credits: 0, type: 'Core', forTrack: 'All', minGrade: 'S', gpaInclusion: false },
      { code: 'BCY1750', name: 'Masterclass Attendance 1', credits: 0, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'MPU3411', name: 'Extra-curricular Learning Experience 1', credits: 1, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY1413', name: 'World Music', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1423', name: 'Music and Film', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2864', name: 'Second Major Instrument 3', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BBM1013', name: 'Fundamentals of Marketing', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1612', name: 'Choir / Orchestra 1', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1632', name: 'Choir / Orchestra 1', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'MCC3122', name: 'Falsafah dan Isu Semasa (Micro-Credential)', credits: 2, type: 'Compulsory', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY1222', name: 'Aural Skills 2', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'FCF1212', name: 'Aural Foundation 1', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1242', name: 'Live Sound', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1402', name: 'Writing in Music', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BLE3012', name: 'Effective Speaking', credits: 2, type: 'Compulsory', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BLE3022', name: 'Effective Writing', credits: 2, type: 'Compulsory', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'MPU3232', name: 'Integriti dan Anti-Rasuah', credits: 2, type: 'Compulsory', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCL2233', name: 'Kodaly Method 1', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1814', name: 'Major Instrument 1', credits: 4, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1864', name: 'Second Major Instrument 1', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1023', name: 'Music Theory 2', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BBB1123', name: 'Basic Entrepreneurship', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY0922', name: 'Second Minor Instrument (Ext)', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY1874', name: 'Second Major Instrument 2', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1232', name: 'English Diction', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'MCC3112', name: 'Penghayatan Etika dan Peradaban (Micro-Credential)', credits: 2, type: 'Compulsory', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY0912', name: 'Minor Instrument (Ext)', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY2742', name: 'Modern Band 2', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1013', name: 'Music Theory 1', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1942', name: 'Class Piano 2 / Minor Instrument 2', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1922', name: 'Class Piano 2 / Minor Instrument 2', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY0824', name: 'Foundation Major Instrument 2', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'SM112', name: 'Introduction To Public Speaking', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'MPU3213', name: 'Bahasa Kebangsaan A', credits: 3, type: 'Conditional', forTrack: 'Local', minGrade: 'C', gpaInclusion: false },
      { code: 'SM101', name: 'Introduction To Mass Communication', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1212', name: 'Aural Skills 1', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1252', name: 'Introduction to Music Marketing', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1932', name: 'Class Piano 1/ Minor Instrument 1', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1912', name: 'Class Piano 1/ Minor Instrument 1', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY0814', name: 'Foundation Major Instrument 1', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BSP1014', name: 'Introduction to Psychology', credits: 4, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1231', name: 'Introduction to Music Technology', credits: 1, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1242', name: 'French Diction', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'FCF1012', name: 'Music Theory Rudiments 1', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY1824', name: 'Major Instrument 2', credits: 4, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BBB1043', name: 'Fundamentals of Management', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1413', name: 'Malaysian Music', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'FCF1222', name: 'Aural Foundation 2', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCL1262', name: 'Italian Diction', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1832', name: 'Short Semester Major Instrument', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'MPU3132', name: 'Bahasa Melayu Komunikasi 3', credits: 2, type: 'Compulsory', forTrack: 'International', minGrade: 'C', gpaInclusion: false },
      { code: 'BCL1622', name: 'Choir/Orchestra 2', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1642', name: 'Choir/Orchestra 2', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL1252', name: 'German Diction', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY1882', name: 'Short Semester Second Major Instrument', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'FCF1022', name: 'Music Theory Rudiments 2', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'MPU3112', name: 'Penghayatan Etika dan Peradaban', credits: 2, type: 'Compulsory', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCL2032', name: 'Introduction to Post-Tonal Harmony', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2303', name: 'Principles of Teaching', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2232', name: 'Introduction to Jazz Improvisation', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY0864', name: 'Second Major Instrument (Ext)', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCL2443', name: 'Performance Practices', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'MPU3421', name: 'Extra-curricular Learning Experience 2', credits: 1, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCL2612', name: 'Choir / Orchestra 3', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2632', name: 'Choir / Orchestra 3', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2313', name: 'Piano Pedagogy 1', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2323', name: 'Piano Pedagogy 2', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2243', name: 'Kodaly Method 2', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2313', name: 'Music and the Brain', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2013', name: 'Music Theory 3', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY0834', name: 'Major Instrument (Ext)', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY2243', name: 'Music Production Techniques', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2563', name: 'Instrumental Literature', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2033', name: 'Analysis', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2262', name: 'Keyboard Skills', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2212', name: 'Aural Skills 3', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2413', name: 'Music History 1', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2323', name: 'Psychology of Music', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2533', name: 'Vocal Literature 1', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2043', name: 'Counterpoint', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2622', name: 'Choir/Orchestra 4', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2642', name: 'Choir/Orchestra 4', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2052', name: 'Jingle Writing', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2252', name: 'Conducting Skills', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2513', name: 'Piano Literature 1', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2814', name: 'Major Instrument 3', credits: 4, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2413', name: 'Rock Music History', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2343', name: 'String Pedagogy', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2874', name: 'Second Major Instrument 4', credits: 4, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2423', name: 'Jazz Music History', credits: 3, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2303', name: 'Introduction to Music Therapy', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2824', name: 'Major Instrument 4', credits: 4, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2053', name: 'Instrumentation', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY0862', name: 'Second Major Instrument (Short Sem Ext)', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCY2033', name: 'Film Scoring', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2922', name: 'Minor Instrument 4', credits: 2, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2273', name: 'Opera Workshop', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCL2543', name: 'Vocal Literature 2', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY0832', name: 'Major Instrument (Short Sem Ext)', credits: 2, type: 'Conditional', forTrack: 'All', minGrade: 'C', gpaInclusion: false },
      { code: 'BCL2523', name: 'Piano Literature 2', credits: 3, type: 'Elective', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
      { code: 'BCY2732', name: 'Modern Band 1', credits: 2, type: 'Core', forTrack: 'All', minGrade: 'C', gpaInclusion: true },
    ]
  };

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
    'S': null
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError('');
    
    const fileName = file.name.toLowerCase();
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
    const isCSV = fileName.endsWith('.csv');

    if (!isExcel && !isCSV) {
      setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      return;
    }

    try {
      let courses;
      
      if (isExcel) {
        // Handle Excel files
        courses = await parseExcelFile(file);
      } else {
        // Handle CSV files
        courses = await parseCSVFile(file);
      }
      
      if (courses.length === 0) {
        setError('No valid courses found in file. Please check the format.');
        return;
      }

      setCompletedCourses(courses);
      if (studentTrack) {
        analyzeProgress(courses, studentTrack);
      } else {
        setError('Please select your student track first.');
      }
    } catch (err) {
      setError('Error reading file: ' + err.message);
    }
  };

  const parseCSVFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const courses = parseFile(text);
          resolve(courses);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read CSV file'));
      reader.readAsText(file);
    });
  };

  const parseExcelFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          
          // Load SheetJS from CDN
          if (!window.XLSX) {
            const script = document.createElement('script');
            script.src = 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js';
            script.onload = () => {
              parseExcelData(data, resolve, reject);
            };
            script.onerror = () => reject(new Error('Failed to load Excel parser'));
            document.head.appendChild(script);
          } else {
            parseExcelData(data, resolve, reject);
          }
        } catch (error) {
          reject(new Error('Failed to parse Excel file: ' + error.message));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read Excel file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const parseExcelData = (data, resolve, reject) => {
    try {
      const workbook = window.XLSX.read(data, { type: 'array' });
      
      // Get first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to CSV format
      const csv = window.XLSX.utils.sheet_to_csv(worksheet);
      
      // Parse the CSV data
      const courses = parseFile(csv);
      resolve(courses);
    } catch (error) {
      reject(new Error('Failed to parse Excel data: ' + error.message));
    }
  };

  const parseFile = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const courses = [];
    
    const startIndex = lines[0].toLowerCase().includes('code') || lines[0].toLowerCase().includes('course') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.includes('\t') ? line.split('\t') : line.split(',');
      
      if (parts.length >= 3) {
        const course = {
          code: parts[0].trim(),
          name: parts[1] ? parts[1].trim() : '',
          credits: parseFloat(parts[2].trim()) || 0,
          type: parts[3] ? parts[3].trim() : 'Elective',
          grade: parts[4] ? parts[4].trim().toUpperCase() : null
        };
        
        if (course.code) {
          courses.push(course);
        }
      }
    }
    
    return courses;
  };

  const checkGradePassing = (grade, minGrade) => {
    if (!grade) return false;
    if (grade === 'S') return true;
    
    const gradeOrder = ['F', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];
    const studentGradeIndex = gradeOrder.indexOf(grade);
    const minGradeIndex = gradeOrder.indexOf(minGrade);
    
    return studentGradeIndex >= minGradeIndex;
  };

  const calculateGPA = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(studentCourse => {
      const catalogCourse = programRequirements.allCourses.find(c => c.code === studentCourse.code);
      
      if (catalogCourse && catalogCourse.gpaInclusion && studentCourse.grade) {
        const points = gradePoints[studentCourse.grade];
        if (points !== null && points !== undefined) {
          totalPoints += points * studentCourse.credits;
          totalCredits += studentCourse.credits;
        }
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : null;
  };

  const analyzeProgress = (courses, track) => {
    const applicableCourses = programRequirements.allCourses.filter(
      c => c.forTrack === 'All' || c.forTrack === track
    );

    // Create a map of alternative course codes (courses with multiple code options)
    const courseAlternatives = {
      'BCL1612': ['BCL1632'],
      'BCL1632': ['BCL1612'],
      'BCL1942': ['BCY1922'],
      'BCY1922': ['BCL1942'],
      'BCL1932': ['BCY1912'],
      'BCY1912': ['BCL1932'],
      'BCL1622': ['BCL1642'],
      'BCL1642': ['BCL1622'],
      'BCL2612': ['BCL2632'],
      'BCL2632': ['BCL2612'],
      'BCL2622': ['BCL2642'],
      'BCL2642': ['BCL2622']
    };

    // Helper function to check if a course requirement is fulfilled
    const isCourseCompleted = (requiredCode, completedCodes) => {
      if (completedCodes.includes(requiredCode)) return true;
      // Check if any alternative was completed
      const alternatives = courseAlternatives[requiredCode] || [];
      return alternatives.some(alt => completedCodes.includes(alt));
    };

    const passedCourses = courses.filter(studentCourse => {
      const catalogCourse = applicableCourses.find(c => c.code === studentCourse.code);
      if (!catalogCourse) return false;
      return checkGradePassing(studentCourse.grade, catalogCourse.minGrade);
    });

    const passedCodes = passedCourses.map(c => c.code);
    
    const coreCompleted = passedCourses.filter(sc => {
      const cc = applicableCourses.find(c => c.code === sc.code);
      return cc && cc.type === 'Core';
    });
    
    const compulsoryCompleted = passedCourses.filter(sc => {
      const cc = applicableCourses.find(c => c.code === sc.code);
      return cc && cc.type === 'Compulsory';
    });
    
    const electiveCompleted = passedCourses.filter(sc => {
      const cc = applicableCourses.find(c => c.code === sc.code);
      return cc && cc.type === 'Elective';
    });

    const failedCourses = courses.filter(studentCourse => {
      const catalogCourse = applicableCourses.find(c => c.code === studentCourse.code);
      if (!catalogCourse) return false;
      // Only show failed Core and Compulsory courses (exclude Conditional and Elective)
      if (catalogCourse.type !== 'Core' && catalogCourse.type !== 'Compulsory') return false;
      return !checkGradePassing(studentCourse.grade, catalogCourse.minGrade);
    });

    const passedElectives = passedCourses.filter(sc => {
      const cc = applicableCourses.find(c => c.code === sc.code);
      return cc && cc.type === 'Elective';
    });

    const coreCreditsCompleted = coreCompleted.reduce((sum, c) => sum + c.credits, 0);
    const compulsoryCreditsCompleted = compulsoryCompleted.reduce((sum, c) => sum + c.credits, 0);
    const electiveCreditsCompleted = electiveCompleted.reduce((sum, c) => sum + c.credits, 0);
    
    const totalCreditsCompleted = coreCreditsCompleted + compulsoryCreditsCompleted + electiveCreditsCompleted;

    const remainingCoreCredits = Math.max(0, programRequirements.coreCredits - coreCreditsCompleted);
    const remainingCompulsoryCredits = Math.max(0, programRequirements.compulsoryCredits - compulsoryCreditsCompleted);
    const remainingElectiveCredits = Math.max(0, programRequirements.electiveCredits - electiveCreditsCompleted);
    const remainingTotalCredits = programRequirements.totalCredits - totalCreditsCompleted;

    const incompleteCoreAndCompulsory = applicableCourses.filter(
      course => {
        // Only show Core and Compulsory courses
        if (course.type !== 'Core' && course.type !== 'Compulsory') return false;
        // Check if this course or any of its alternatives have been completed
        return !isCourseCompleted(course.code, passedCodes);
      }
    );

    // Remove duplicates for courses with alternatives (only show one option)
    const seenAlternatives = new Set();
    const deduplicatedIncomplete = [];
    
    incompleteCoreAndCompulsory.forEach(course => {
      const alternatives = courseAlternatives[course.code] || [];
      const allCodes = [course.code, ...alternatives].sort().join(',');
      
      // Skip if we've already processed this group of alternatives
      if (seenAlternatives.has(allCodes)) {
        return;
      }
      
      // Check if ANY of the alternatives were completed
      const anyAlternativeCompleted = [course.code, ...alternatives].some(code => 
        isCourseCompleted(code, passedCodes)
      );
      
      // Only add to list if none of the alternatives were completed
      if (!anyAlternativeCompleted) {
        seenAlternatives.add(allCodes);
        deduplicatedIncomplete.push(course);
      }
    });

    const cgpa = calculateGPA(courses);

    setAnalysis({
      totalCreditsCompleted,
      coreCreditsCompleted,
      compulsoryCreditsCompleted,
      electiveCreditsCompleted,
      remainingTotalCredits,
      remainingCoreCredits,
      remainingCompulsoryCredits,
      remainingElectiveCredits,
      incompleteCoreAndCompulsory: deduplicatedIncomplete,
      failedCourses,
      passedElectives,
      cgpa,
      progressPercentage: ((totalCreditsCompleted / programRequirements.totalCredits) * 100).toFixed(1)
    });
  };

  const handleTrackChange = (e) => {
    const newTrack = e.target.value;
    setStudentTrack(newTrack);
    if (completedCourses.length > 0) {
      analyzeProgress(completedCourses, newTrack);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Music Program Course Advisor</h1>
          </div>
          <p className="text-gray-600">Track your progress and plan your path to graduation</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Select Your Track</h2>
          </div>
          
          <select
            value={studentTrack}
            onChange={handleTrackChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
          >
            <option value="">-- Select Your Student Type --</option>
            <option value="Local">Local Student</option>
            <option value="International">International Student</option>
          </select>
        </div>

        {studentTrack && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Upload Completed Courses</h2>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Click to upload your completed courses file</p>
                <p className="text-sm text-gray-500">Accepts: CSV (.csv) or Excel (.xlsx, .xls)</p>
                <p className="text-xs text-gray-400 mt-2">Use the provided template or create your own file</p>
              </label>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        )}

        {analysis && (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-700">Overall</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{analysis.progressPercentage}%</p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.totalCreditsCompleted} / {programRequirements.totalCredits} credits
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${analysis.progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">Core</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">{analysis.coreCreditsCompleted}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.remainingCoreCredits} remaining
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
                  <Award className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-700">Compulsory</h3>
                </div>
                <p className="text-3xl font-bold text-orange-600">{analysis.compulsoryCreditsCompleted}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.remainingCompulsoryCredits} remaining
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${(analysis.compulsoryCreditsCompleted / programRequirements.compulsoryCredits) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-700">CGPA</h3>
                </div>
                <p className="text-3xl font-bold text-indigo-600">
                  {analysis.cgpa || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.cgpa ? 'Cumulative GPA' : 'Add grades'}
                </p>
              </div>
            </div>

            {analysis.failedCourses.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">⚠️ Core/Compulsory Courses Below Minimum Grade - Must Retake</h2>
                <div className="space-y-3">
                  {analysis.failedCourses.map((course, idx) => (
                    <div key={idx} className="border border-red-200 bg-red-50 rounded-lg p-4 flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{course.code} - {course.name}</p>
                        <p className="text-sm text-gray-600">{course.credits} credits | Type: {course.type} | Grade: {course.grade}</p>
                        <p className="text-xs text-red-700 mt-1">
                          ⚠ Must achieve minimum grade to receive credit
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Elective Courses Summary</h2>
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-700">
                  Total Elective Credits Completed: <span className="text-green-600">{analysis.electiveCreditsCompleted}</span> / {programRequirements.electiveCredits}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.remainingElectiveCredits > 0 
                    ? `You need ${analysis.remainingElectiveCredits} more elective credits`
                    : '✅ Elective requirement fulfilled!'}
                </p>
              </div>
              
              {analysis.passedElectives.length > 0 && (
                <>
                  <h3 className="font-semibold text-gray-700 mb-3">Completed Elective Courses:</h3>
                  <div className="space-y-2">
                    {analysis.passedElectives.map((course, idx) => (
                      <div key={idx} className="border border-green-200 bg-green-50 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-800">{course.code} - {course.name}</p>
                          <p className="text-sm text-gray-600">Grade: {course.grade}</p>
                        </div>
                        <span className="text-green-600 font-semibold">{course.credits} credits</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {analysis.incompleteCoreAndCompulsory.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Core & Compulsory Courses Still Needed</h2>
                <p className="text-sm text-gray-600 mb-3">
                  These are required Core and Compulsory courses you haven't completed yet. Conditional courses are not shown here.
                </p>
                <div className="space-y-3">
                  {analysis.incompleteCoreAndCompulsory.slice(0, 15).map((course, idx) => (
                    <div key={idx} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-800">{course.code} - {course.name}</p>
                      <p className="text-sm text-gray-600">{course.credits} credits | Type: {course.type}</p>
                    </div>
                  ))}
                  {analysis.incompleteCoreAndCompulsory.length > 15 && (
                    <p className="text-sm text-gray-600 text-center">
                      ...and {analysis.incompleteCoreAndCompulsory.length - 15} more courses
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Graduation Requirements Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Credits Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Required:</span>
                      <span className="font-semibold">{programRequirements.totalCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold text-green-600">{analysis.totalCreditsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-semibold text-orange-600">{analysis.remainingTotalCredits}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Core Remaining:</span>
                      <span className="font-semibold">{analysis.remainingCoreCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compulsory Remaining:</span>
                      <span className="font-semibold">{analysis.remainingCompulsoryCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Elective Remaining:</span>
                      <span className="font-semibold">{analysis.remainingElectiveCredits}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Program Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student Type:</span>
                      <span className="font-semibold">{studentTrack}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Semesters Remaining (15 cr/sem):</span>
                      <span className="font-semibold">{Math.ceil(analysis.remainingTotalCredits / 15)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current CGPA:</span>
                      <span className="font-semibold">{analysis.cgpa || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!analysis && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sample File Format</h2>
            <div className="bg-gray-50 rounded border border-gray-200 p-4 font-mono text-sm overflow-x-auto">
              <div className="mb-1">Course Code,Course Name,Credits,Type,Grade</div>
              <div>BCY1013,Music Theory 1,3,Core,A</div>
              <div>BCY1814,Major Instrument 1,4,Core,B+</div>
              <div>BCL1413,Malaysian Music,3,Core,A-</div>
              <div>BCY1413,World Music,3,Elective,B</div>
              <div>MPU3112,Penghayatan Etika dan Peradaban,2,Compulsory,C</div>
              <div>BLE3012,Effective Speaking,2,Compulsory,B</div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Note:</strong> Include Grade column to calculate CGPA. Type should be: Core, Compulsory, Elective, or Conditional
            </p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Grades Accepted:</strong> A+, A, A-, B+, B, B-, C+, C, C-, D+, D, F, S (Satisfactory)
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Course Types:</strong>
              </p>
              <ul className="text-sm text-gray-600 ml-4 mt-1">
                <li>• <strong>Core</strong> - Required courses (94 credits total)</li>
                <li>• <strong>Compulsory</strong> - Required with local/international variations (12 credits total)</li>
                <li>• <strong>Elective</strong> - Your choice of electives (14 credits total)</li>
                <li>• <strong>Conditional</strong> - Makeup courses (don't count toward 120 credits)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAdvisorApp;
