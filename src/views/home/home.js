import React from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <div className="link-to-dashboard">
        <Button
          type="default"
          onClick={() => history.push("/schedule")}
          icon={<ExportOutlined />}
        />
      </div>
      <div>home</div>
    </div>
  );
};

export default Home;
