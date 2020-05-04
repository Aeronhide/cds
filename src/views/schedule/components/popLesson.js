import React from "react";
import { Button, DatePicker, TimePicker, Input, List, Popover } from "antd";

const PopLesson = (props) => {
  return (
    <div>
      <Popover
        content={
          <div className="add-lesson">
            <DatePicker
              className="add-lesson_item"
              allowClear
              value={props.date}
              onChange={(e) => props.setDate(e)}
            />
            <div className="add-lesson_item-lesson">
              <Input
                className="add-lesson_item-lesson_input"
                autoFocus
                onChange={(e) =>
                  props.setLesson({ ...props.lesson, name: e.target.value })
                }
                onKeyDown={(e) => e.keyCode === 13 && props.addLesson()}
                value={props.lesson.name}
              />
              <TimePicker
                className="add-lesson_item-lesson_time"
                value={props.lesson.time}
                onChange={(val) =>
                  props.setLesson({ ...props.lesson, time: val })
                }
              />
            </div>
            <List
              className="add-lesson_item"
              dataSource={props.data.list}
              renderItem={(item) => (
                <List.Item>
                  <div>{item.name}</div>
                </List.Item>
              )}
            />
            <Button onClick={props.addLesson} className="add-lesson_item">
              Add
            </Button>
            <Button
              onClick={props.saveLesson}
              className="add-lesson_item"
              type="primary"
            >
              Save
            </Button>
            <Button
              onClick={() => props.setVisiblePop(false)}
              className="add-lesson_item"
              type="default"
            >
              Cancel
            </Button>
          </div>
        }
        title="Add new lesson"
        placement="bottomLeft"
        trigger="click"
        visible={props.visiblePop}
      >
        <Button onClick={() => props.setVisiblePop(true)} type="primary">
          Add lessons
        </Button>
      </Popover>
    </div>
  );
};

export default PopLesson;
