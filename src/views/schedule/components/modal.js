import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { removeEvent } from "../../../actions";
import { message, Modal, Timeline } from "antd";
import "../style.sass";

const ModalSchedule = (props) => {
  const selectedDay = props.day && props.day.format("D");
  const removeRecord = (date) => {
    props.removeEvent(moment(date).format("DD-MM-YYYY"));
    props.setVisibleModal(false);
    message.success("Data removed");
  };

  return (
    <div>
      <Modal
        title={moment(props.day).format("DD dddd MMMM YYYY")}
        visible={props.visibleModal}
        onOk={() => props.setVisibleModal(false)}
        onCancel={() => removeRecord(props.day)}
        okText="Close"
        cancelText="Remove"
        className="modal-event"
      >
        <div>
          {selectedDay &&
            props.schedule.length &&
            props.schedule.map(
              (item) =>
                item.day === selectedDay &&
                (item.type === "lesson" ? (
                  <Timeline key={item.date} className="timeline" mode="left">
                    {item.list.map((les) => (
                      <Timeline.Item
                        label={les.time}
                        key={les.name}
                        className="timeline_item"
                      >
                        {les.name}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                ) : (
                  <div key={item.date}>
                    <h3>{item.subject + " "}</h3>{" "}
                    <span>
                      {moment(item.date, "DD-MM-YYYY HH:mm:ss").format(
                        "HH:mm:ss"
                      )}
                    </span>
                  </div>
                ))
            )}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule,
    loading: state.loading,
  };
};

const mapDispatchToProps = { removeEvent };
export default connect(mapStateToProps, mapDispatchToProps)(ModalSchedule);
