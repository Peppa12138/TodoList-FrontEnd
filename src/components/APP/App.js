import { List, Checkbox, Button, Input, DatePicker, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
export default function ToDoList() {
    const [lists, setLists] = useState([])
    const [task, setTasks] = useState("")
    const [deadline, setDeadline] = useState("")
    const [messageApi, contextHolder] = message.useMessage()
    const [idCounter, setIdCounter] = useState(1)
    const navigate = useNavigate()
    function addTask() {
        if (lists) {
            if (task !== "" && deadline) {
                setLists([...lists, { id: idCounter, task, deadline, finished: false }])
                setDeadline(null)
                setTasks("")
                setIdCounter(idCounter + 1)
                messageApi.success("添加成功")
            }
            else {
                if (!deadline && task === "") {
                    messageApi.error("请填写任务并提供截止时间")
                }
                else if (task === "") {
                    messageApi.error("请填写任务")
                }
                else {
                    messageApi.error("请提供截止时间")
                }
            }
        }
    }
    function deleteTask(id) {
        if (lists) {
            let temp = []
            for (let i = 0; i < lists.length; i++) {
                if (lists[i].id !== id) {
                    temp.push(lists[i])
                }
            }
            setLists(temp)
        }
    }
    function confirmDelete(id, task) {
        Modal.confirm({
            title: "确认删除",
            content: `确定要删除任务${task}吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: () => { deleteTask(id) }
        })
    }
    function checkTask(id, check) {
        if (lists) {
            const newLists = lists.map((e) => {
                if (e.id === id) {
                    return { ...e, finished: check }
                }
                return e
            })
            setLists(newLists)
        }
    }
    function handleLogout() {
        Modal.confirm({
            title: "退出登录",
            content: `确定要退出登录吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                localStorage.removeItem("token")
                navigate("/")
            }
        })

    }
    return (
        <div className="to-do-list">
            {contextHolder}
            <h1 id="title">To Do List</h1>
            <Button type="default" onClick={handleLogout}>
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
                    renderItem={(list) => (
                        <List.Item
                            actions={[
                                <Checkbox
                                    onChange={(e) => {
                                        checkTask(list.id, e.target.checked)
                                    }}
                                />,
                                <DeleteOutlined onClick={() => confirmDelete(list.id, list.task)} />
                            ]}
                        >
                            <div
                                className={`${list.finished ? "finished" : ""} ${moment(list.deadline).isBefore(moment(), "day") ? "timeout" : ""}`}
                            >
                                <div>{list.task}</div>
                                <div>截止时间：{moment(list.deadline).format("YYYY-MM-DD")}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
