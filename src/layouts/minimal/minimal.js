import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import "./style.sass";

const Minimal = (props) => {
  const history = useHistory();
  const { children } = props;
  return (
    <div className="minimal-layout">
      <div className="minimal-layout_btn-exit">
        <Button
          type="default"
          onClick={() => history.push("/schedule")}
          icon={<ExportOutlined />}
        />
      </div>
      <div className="minimal-layout_content">{children}</div>
    </div>
  );
};

export default Minimal;
