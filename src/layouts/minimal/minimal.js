import React from "react";
import "./style.sass";

const Minimal = (props) => {
  const { children } = props;
  return (
    <div className="minimal-layout">
      <div className="minimal-layout_content">{children}</div>
    </div>
  );
};

export default Minimal;
