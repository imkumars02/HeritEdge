import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Student from "./Student/Student";
import StudentAttendance from "./Student/StudentAttendance";
import StudentMarks from "./Student/StudentMarks";
import StudentReport from "./Student/StudentReport";
import StudentTimeTable from "./Student/StudentTimeTable";
import Teacher from "./Teacher/Teacher";
import TeacherAttendance from "./Teacher/TeacherAttendance";
import TeacherClass from "./Teacher/TeacherClass";
import TeacherLeave from "./Teacher/TeacherLeave";
import TeacherMarks from "./Teacher/TeacherMarks";
import TeacherTimeTable from "./Teacher/TeacherTimeTable";
import TeacherReportPage from "./Teacher/TeacherReportPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}></Route>

        {/* Student Routes */}
        <Route path="/Student" Component={Student}></Route> 
        <Route path="/StudentAttendance" Component={StudentAttendance}></Route>
        <Route path="/StudentMarks" Component={StudentMarks}></Route>
        <Route path="/StudentReportPage" Component={StudentReport}></Route>
        <Route path="/StudentTimeTable" Component={StudentTimeTable}></Route>

        {/* Teacher Routes */}
        <Route path="/Teacher" Component={Teacher}></Route>
        <Route path="/TeacherAttendance" Component={TeacherAttendance}></Route>
        <Route path="/TeacherClass" Component={TeacherClass}></Route>
        <Route path="/TeacherLeave" Component={TeacherLeave}></Route>
        <Route path="/TeacherMarks" Component={TeacherMarks}></Route>
        <Route path="/TeacherReportPage" Component={TeacherReportPage}></Route>
        <Route path="/TeacherTimeTable" Component={TeacherTimeTable}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
