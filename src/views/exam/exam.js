import React from "react";
import { connect } from "react-redux";

const Exam = (props) => {
  console.warn("exam", props.exam);
  return <div className="exam">exam</div>;
};
const mapStateToProps = (state) => {
  return {
    exam: state.exams.exam,
    loading: state.loading,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Exam);
