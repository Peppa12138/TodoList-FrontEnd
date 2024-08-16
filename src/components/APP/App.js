import { List, Checkbox, Button, Input, DatePicker, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
export default function ToDoList() {
    const [lists, setLists] = useState([])
    const [task, setTasks] = useState("")
    const [deadline, setDeadline] = useState("")
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");
    if (!userId) {  
        navigate("/");
    }
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/tasks?userId=${userId}`);
                if (response.data.success) {
                    console.log("Fecthed tasks:", response.data.tasks);
                    setLists(response.data.tasks);
                } else {
                    messageApi.error(response.data.message);
                }
            } catch (error) {
                messageApi.error('加载任务失败');
            }
        };
        fetchTasks();
    }, [userId]);
    const addTask = async () => {
        if (task !== "" && deadline) {
            try {
                const response = await axios.post('http://localhost:5002/tasks', {
                    task,
                    deadline,
                    finished: false,
                    userId,
                });
                if (response.data.success) {
                    setLists([...lists, response.data.task]);

                    setDeadline(null);
                    setTasks("");
                    messageApi.success("添加成功");
                } else {
                    messageApi.error(response.data.message);
                }
            } catch (error) {
                messageApi.error('添加任务失败');
            }
        } else {
            if (!deadline && task === "") {
                messageApi.error("请填写任务并提供截止时间");
            } else if (task === "") {
                messageApi.error("请填写任务");
            } else {
                messageApi.error("请提供截止时间");
            }
        }
    };
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5002/tasks/${id}`, {
                params: { userId }
            });
            if (response.data.success) {
                setLists(lists.filter(task => task.id !== id));
                messageApi.success("任务已删除");
            } else {
                messageApi.error(response.data.message);
            }
        } catch (error) {
            messageApi.error('删除任务失败');
        }
    };
    function confirmDelete(id, task) {
        Modal.confirm({
            title: "确认删除",
            content: `确定要删除"${task}"吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: () => { deleteTask(id) }
        })
    }
    const checkTask = async (id, checked) => {
        try {
            const response = await axios.put(`http://localhost:5002/tasks/${id}`, { finished: checked });
            if (response.data.success) {
                setLists(lists.map(e => (e.id === id ? { ...e, finished: checked } : e)));
            } else {
                messageApi.error(response.data.message);
            }
        } catch (error) {
            messageApi.error('更新任务状态失败');
        }
    };
    function handleLogout() {
        Modal.confirm({
            title: "退出登录",
            content: `确定要退出登录吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                localStorage.removeItem("userId");
                navigate("/");
            }
        })

    }
    return (
        <div className="to-do-list">
            {contextHolder}
            <h1 id="title">To Do List</h1>
            <Button type="default" onClick={handleLogout} className="logout-btn">
                登出
            </Button>
            <div>
                <Input
                    placeholder="请输入任务名称"
                    value={task}
                    onChange={(e) => {
                        setTasks(e.target.value)
                    }}
                />
                <DatePicker
                    placeholder="请选择截止时间"
                    inputReadOnly={true}
                    value={deadline ? moment(deadline) : null}
                    onChange={(date) => {
                        setDeadline(date ? date.toString() : null)
                    }}
                />
                <Button type="primary" onClick={addTask}>
                    添加
                </Button>
            </div>
            <div className="list-container">
                <List
                    dataSource={lists}
                    renderItem={(list) => {
                        return (
                            <List.Item
                                key={list.id}
                                actions={[
                                    <Checkbox
                                        onChange={(e) => {
                                            checkTask(list.id, e.target.checked)
                                        }}
                                        defaultChecked={list.finished}
                                    />,
                                    <DeleteOutlined onClick={() => confirmDelete(list.id,list.task)} />
                                ]}
                            >
                                <div
                                    className={`${list.finished ? "finished" : ""} ${moment(list.deadline).isBefore(moment(), "day") ? "timeout" : ""}`}
                                >
                                    <div>{list.task}</div>
                                    <div>截止时间：{moment(list.deadline).format("YYYY-MM-DD")}</div>
                                </div>
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    )
}
