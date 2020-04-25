import React from "react";
import { connect } from "react-redux";

const StudentExamView = () => {
  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    exam: state.exams.exam,
    loading: state.loading,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(StudentExamView);
