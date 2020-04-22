import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addTheme, deleteTheme, getThemes, updateTheme } from "../../actions";
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
import "./style.sass";
import {
  AppstoreAddOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
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

const Themes = (props) => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const history = useHistory();
  const [editingKey, setEditingKey] = useState("");
  const [theme, setTheme] = useState({ name: "" });
  const date = new Date();

  useEffect(() => {
    props.getThemes();
  }, []);

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
      const newData = [...props.themes];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await props.updateTheme(newData[index]);
        setEditingKey("");
      } else {
        newData.push(row);
        await props.updateTheme(newData[index]);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const goToQuestions = (theme) => {
    history.push(`/themes/${theme.key}`);
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
            <Tooltip title="Add question">
              <Button
                onClick={() => goToQuestions(record)}
                type="link"
                icon={<AppstoreAddOutlined className="table_actions_icon" />}
              />
            </Tooltip>
            {editable ? (
              <div>
                <span>
                  <Button
                    type="link"
                    onClick={() => save(record.key)}
                    style={{
                      marginRight: 8,
                    }}
                    icon={<CheckOutlined className="table_actions_icon" />}
                  />
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <Button
                      type="link"
                      icon={<CloseOutlined className="table_actions_icon" />}
                    />
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
                onClick={() => props.deleteTheme(record.key)}
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
  const btnAddTheme = () => {
    setTheme({ name: "" });
    props.addTheme(theme);
  };
  const inputAddTheme = (e) => {
    if (e.keyCode === 13) {
      setTheme({ name: "" });
      props.addTheme(theme);
    }
  };
  const insertTheme = (e) => {
    setTheme({ key: date.getTime(), name: e.target.value });
  };

  const headerTitle = () => (
    <div className="table_title">
      <Title level={4}>Themes list</Title>
      <div className="table_title_input-group">
        <Form.Item>
          <Input
            value={theme.name}
            onChange={insertTheme}
            onKeyDown={inputAddTheme}
          />
        </Form.Item>
        <Form.Item>
          <Button
            autoFocus
            className="table_title_input-group_button"
            onClick={btnAddTheme}
            type="primary"
          >
            Add theme
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
        loading={props.loading}
        dataSource={props.themes}
        columns={mergedColumns}
        pagination={{ defaultPageSize: 5 }}
        rowClassName="editable-row"
      />
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    themes: state.themes,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  getThemes,
  addTheme,
  deleteTheme,
  updateTheme,
};
export default connect(mapStateToProps, mapDispatchToProps)(Themes);
