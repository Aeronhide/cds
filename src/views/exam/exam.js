import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

const Exam = () => {
  return (
    <div className="exam">
      <div className="exam_empty">
        <Button type="primary">
          <NavLink to="/exam/set-up">Add Exam</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default Exam;
