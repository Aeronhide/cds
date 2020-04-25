import React from "react";
import { connect } from "react-redux";
import "./style.sass";
import TeacherExamView from "./components/teacherExamView";

const Exam = (props) => {
  return (
    <div className="exam">
      <TeacherExamView />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Exam);
