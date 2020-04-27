import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getExam, getAnswers, startExam } from "../../actions";
import TeacherExamView from "./components/teacherExamView";
import StudentExamView from "./components/studentExamView";
import "./style.sass";

const Exam = (props) => {
  const [count, setCount] = useState(false);
  const settings = props.exam && props.exam.settings;
  const started = props.exam && props.exam.started;
  const questions = props.exam && props.exam.questions;
  const students = [
    { name: "Charlie Brown", status: "connected" },
    { name: "Charlie Brown", status: "disconnected" },
    { name: "Charlie Brown", status: "finished" },
    { name: "Charlie Brown", status: "connected" },
  ];
  useEffect(() => {
    props.getExam();
    props.getAnswers();
  }, []);

  const beginExam = () => {
    props.getExam();
  };

  return (
    <div className="exam">
      {/*<TeacherExamView*/}
      {/*  settings={settings}*/}
      {/*  answers={props.answers}*/}
      {/*  questions={questions}*/}
      {/*  students={students}*/}
      {/*  started={started}*/}
      {/*  startExam={props.startExam}*/}
      {/*  loading={props.loading}*/}
      {/*/>*/}
      <StudentExamView
        questions={questions}
        answers={props.answers}
        count={count}
        settings={settings}
        started={started}
        beginExam={beginExam}
        loading={props.loading}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    exam: state.exam,
    answers: state.answers,
    loading: state.loading,
  };
};

const mapDispatchToProps = { getExam, getAnswers, startExam };
export default connect(mapStateToProps, mapDispatchToProps)(Exam);
