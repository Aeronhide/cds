import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { usePrevious } from "../../../hooks/usePrevious";
import {
  getTheme,
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from "../../../actions";
import { connect } from "react-redux";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
  Tooltip,
} from "antd";
import "../style.sass";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Answers from "./answers";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <InputNumber /> : <Input autoFocus />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Questions = (props) => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const params = useParams();
  const [editingKey, setEditingKey] = useState("");
  const [question, setQuestion] = useState({
    themeId: parseInt(params.id, 10),
    name: "",
  });
  const date = new Date();

  // const prevTheme = usePrevious(props.theme);

  useEffect(() => {
    props.getTheme(params.id);
    props.getQuestions();
  }, []);

  // useEffect(() => {
  //   if (prevTheme && prevTheme.key !== props.theme.key) {
  //     props.getQuestions(props.theme);
  //   }
  // }, [props.theme]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...props.data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await props.updateQuestion(newData[index]);
        setEditingKey("");
      } else {
        newData.push(row);
        await props.updateQuestion(newData[index]);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "80%",
      editable: true,
    },
    {
      title: (render) => <div style={{ paddingLeft: 5 }}>Actions</div>,
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div className="table_actions">
            {editable ? (
              <div>
                <span>
                  <Button
                    type="link"
                    onClick={() => save(record.key)}
                    onKeyDown={(e) => {
                      e.keyCode === 13 && save(record.key);
                    }}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    <CheckOutlined className="table_actions_icon" />
                  </Button>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <Button type="link">
                      <CloseOutlined className="table_actions_icon" />
                    </Button>
                  </Popconfirm>
                </span>
              </div>
            ) : (
              <Tooltip title="Edit">
                <Button
                  type="link"
                  disabled={editingKey !== ""}
                  onClick={() => edit(record)}
                  icon={<EditOutlined className="table_actions_icon" />}
                />
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <Button
                onClick={() => props.deleteQuestion(record.key)}
                type="link"
                icon={<DeleteOutlined className="table_actions_icon" />}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const btnAddQuestion = () => {
    setQuestion({ ...question, name: "" });
    props.addQuestion(question);
  };
  const inputAddQuestion = (e) => {
    if (e.keyCode === 13) {
      setQuestion({ ...question, name: "" });
      props.addQuestion(question);
    }
  };
  const insertQuestion = (e) => {
    setQuestion({
      ...question,
      key: date.getTime(),
      name: e.target.value,
    });
  };

  const headerTitle = () => (
    <div className="table_title">
      <div>
        <Title level={4}>Questions list</Title>
        <div className="table_title_theme">
          <Title className="table_title_theme_text" level={4}>
            Theme:
          </Title>
          <span className="table_title_theme_name">
            {props.theme && props.theme.name}
          </span>
        </div>
      </div>
      <div className="table_title_input-group">
        <Form.Item>
          <Input
            value={question.name}
            onChange={insertQuestion}
            onKeyDown={inputAddQuestion}
          />
        </Form.Item>
        <Form.Item>
          <Button
            autoFocus
            className="table_title_input-group_button"
            onClick={btnAddQuestion}
            type="primary"
          >
            Add question
          </Button>
        </Form.Item>
      </div>
    </div>
  );
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        className="table"
        title={headerTitle}
        expandable={{
          expandedRowRender: (record) => <Answers question={record} />,
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        loading={props.loading}
        dataSource={props.data}
        columns={mergedColumns}
        pagination={{ defaultPageSize: 5 }}
        rowClassName="editable-row"
      />
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.questions.questions,
    theme: state.questions.theme,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  getTheme,
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
