import React from "react";
import { Button, DatePicker, Popover, Select } from "antd";

const PopExam = (props) => {
  const { Option } = Select;
  return (
    <div>
      <Popover
        content={
          <div className="add-exam">
            <DatePicker
              className="add-exam_item"
              allowClear
              showTime
              value={props.date}
              onChange={(e) => props.setDate(e)}
            />
            <Select
              className="add-exam_item"
              onChange={(val) =>
                props.setDataExam({ ...props.data, subject: val })
              }
            >
              {props.subjects.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <Button
              onClick={props.saveExam}
              className="add-exam_item"
              type="primary"
            >
              Save
            </Button>
            <Button
              onClick={() => props.setVisiblePopExam(false)}
              className="add-exam_item"
              type="default"
            >
              Cancel
            </Button>
          </div>
        }
        title="Add new exam"
        placement="bottomLeft"
        trigger="click"
        visible={props.visiblePopExam}
      >
        <Button
          style={{ marginLeft: 10 }}
          onClick={() => props.setVisiblePopExam(true)}
          type="default"
        >
          Add exam
        </Button>
      </Popover>
    </div>
  );
};

export default PopExam;
