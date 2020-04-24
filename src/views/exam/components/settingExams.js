import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Typography, List, Card, Popconfirm, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { loadExams, deleteExam, selectExam } from "../../../actions";

const SettingExams = (props) => {
  const { Title, Text } = Typography;
  const history = useHistory();
  const [popDelete, setPopDelete] = useState(false);

  useEffect(() => {
    props.loadExams();
  }, []);

  const selectExam = (exam) => {
    props.selectExam(exam);
    history.push("/exam");
  };

  const deleteExam = (item) => {
    setPopDelete(false);
    props.deleteExam(item);
  };
  return (
    <div className="setting-exam">
      <Button className="setting-exam_btn" type="primary">
        <NavLink to="/setting-exams/set-up">Add Exam</NavLink>
      </Button>
      <div>
        <Title level={4}>Exams list</Title>
        <List
          loading={props.loading}
          grid={{ gutter: 16 }}
          dataSource={props.exams}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable style={{ textAlign: "center" }}>
                <Title level={2}>{item.settings.group}</Title>
                <Text>{item.settings.date}</Text>
                <div className="setting-exam_actions ">
                  <Tooltip
                    className="setting-exam_actions_item"
                    title="Select exam"
                  >
                    <Button
                      onClick={() => selectExam(item)}
                      shape="circle"
                      icon={<CheckOutlined />}
                    />
                  </Tooltip>
                  <Popconfirm
                    className="setting-exam_actions_item"
                    title="Are you sure delete this exam?"
                    visible={popDelete}
                    onConfirm={() => deleteExam(item)}
                    onCancel={() => setPopDelete(false)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      onClick={() => setPopDelete(true)}
                      shape="circle"
                      icon={<CloseOutlined />}
                    />
                  </Popconfirm>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exams: state.exams.examsList,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  loadExams,
  deleteExam,
  selectExam,
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingExams);
