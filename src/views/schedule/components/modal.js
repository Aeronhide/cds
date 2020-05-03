import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Modal, Timeline } from "antd";

const ModalSchedule = (props) => {
  const selectedDay = props.day && props.day.format("D");
  return (
    <div>
      <Modal
        title={moment(props.day).format("DD dddd MMMM YYYY")}
        visible={props.visibleModal}
        onOk={() => props.setVisibleModal(false)}
        onCancel={() => props.setVisibleModal(false)}
      >
        <div>
          {selectedDay &&
            props.schedule.length &&
            props.schedule.map(
              (item) =>
                item.day === selectedDay && (
                  <Timeline key={item.date} className="timeline">
                    {item.list.map((les) => (
                      <Timeline.Item key={les.lesson} className="timeline_item">
                        {les.lesson}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                )
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

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ModalSchedule);
