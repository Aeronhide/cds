import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  TimePicker,
  DatePicker,
  Select,
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";
import { setExamSettings } from "../../../actions";
import "../style.sass";

const ExamSettings = (props) => {
  const { Title } = Typography;
  const [data, setData] = useState({
    date: "",
    duration: "",
    group: "",
    cabinet: "",
    examiners: [],
    subject: "",
  });
  const { Option } = Select;
  const cabinets = ["421", "310", "429"];
  const groups = ["AI21", "TI42", "TI31"];
  const examiners = ["Dubkovetskii", "Sisanu", "Palaki", "Puskasu"];
  const subjects = ["IT", "Rules", "Design", "Computer science"];

  useEffect(() => {
    props.setExamSettings(data);
  });

  return (
    <div className="exam-settings">
      <Card>
        <Row>
          <Col md={2}>
            <Title level={4}>Date:</Title>
          </Col>
          <Col md={4}>
            <DatePicker
              onChange={(_, date) => setData({ ...data, date: date })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Title level={4}>Duration:</Title>
          </Col>
          <Col md={4}>
            <TimePicker
              onChange={(_, time) => setData({ ...data, duration: time })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Title level={4}>Group:</Title>
          </Col>
          <Col md={4}>
            <Select
              showSearch
              allowClear={true}
              style={{ width: 200 }}
              placeholder="Select group"
              optionFilterProp="children"
              value={data.group}
              onSelect={(val) => setData({ ...data, group: val })}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {groups.map((group) => (
                <Option key={group} value={group}>
                  {group}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Title level={4}>Cabinet:</Title>
          </Col>
          <Col md={4}>
            <Select
              showSearch
              allowClear={true}
              style={{ width: 200 }}
              placeholder="Select cabinet"
              optionFilterProp="children"
              value={data.cabinet}
              onSelect={(val) => setData({ ...data, cabinet: val })}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {cabinets.map((cabinet) => (
                <Option key={cabinet} value={cabinet}>
                  {cabinet}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Title level={4}>Examiners:</Title>
          </Col>
          <Col md={4}>
            <Select
              showSearch
              mode="multiple"
              style={{ width: 200 }}
              placeholder="Select examiners"
              optionFilterProp="children"
              value={data.examiners}
              onChange={(val) => setData({ ...data, examiners: val })}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {examiners.map((examiner) => (
                <Option key={examiner} value={examiner}>
                  {examiner}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Title level={4}>Subject:</Title>
          </Col>
          <Col md={4}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select subject"
              optionFilterProp="children"
              value={data.subject}
              onChange={(val) => setData({ ...data, subject: val })}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {subjects.map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = { setExamSettings };
export default connect(mapStateToProps, mapDispatchToProps)(ExamSettings);
