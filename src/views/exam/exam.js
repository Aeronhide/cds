import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getExam, getAnswers, startExam } from "../../actions";
import TeacherExamView from "./components/teacherExamView";
import StudentExamView from "./components/studentExamView";
import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./style.sass";

const Exam = (props) => {
  const history = useHistory();
  const user = localStorage.getItem("user");
  const settings = props.exam && props.exam.settings;
  const started = props.exam && props.exam.started;
  const questions = props.exam && props.exam.questions;
  const timeToEnd = props.exam && props.exam.startedTime;
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
      <div className="link-to-dashboard">
        <Button
          type="default"
          onClick={() => history.push("/schedule")}
          icon={<ExportOutlined />}
        />
      </div>
      {user === "teacher" ? (
        <TeacherExamView
          settings={settings}
          answers={props.answers}
          questions={questions}
          students={students}
          started={started}
          startExam={props.startExam}
          loading={props.loading}
        />
      ) : (
        <StudentExamView
          questions={questions}
          answers={props.answers}
          settings={settings}
          started={started}
          beginExam={beginExam}
          time={timeToEnd}
          loading={props.loading}
        />
      )}
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
