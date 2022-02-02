import React, { useState, useEffect } from 'react';
import { HttpsReq } from "./HttpApi/api"
import TodoFields from './TodoFields';
const Axios = () => {
    const [data, setData] = useState([]);
    const [selectItems, setSelectItems] = useState(true);
    const [selectId, setSelectId] = useState();
    const [error, setError] = useState("")
    let todoDatas;
    todoDatas = JSON.parse(localStorage.getItem("todo"));
    const AxiosEffect = () => {
        HttpsReq.get("data").then((res) => {
            setData(res.data);
            localStorage.setItem("todo", JSON.stringify(res.data));
        })
    }
    useEffect(() => {
        AxiosEffect()
    }, [])
    useEffect(() => {
        todoDatas = JSON.parse(localStorage.getItem("todo"));
    }, [data.length])
    const [todoData, setTodoData] = useState("");
    const TodoValue = (e) => {
        setTodoData(e.target.value);
        setError("")
    }
    const onAdd = (e) => {
        if (!todoData) {
            setError("Must enter value*")
            return
        }
        if (todoData && !selectItems) {
            const Editmap = todoDatas.map((item) => {
                if (item.id === selectId) {
                    return { ...item, name: todoData }
                }
                return item
            })
            localStorage.setItem('todo', JSON.stringify(Editmap));
            const found = data.find(item => item.id === selectId);
            const foundnew = { ...found, name: todoData }
            HttpsReq.put(`data/${selectId}`, foundnew).then((res) => {
                setTodoData("");
                setSelectItems(true)
            })
        }
        else {
            let singleTodo = {
                name: todoData,
                complete: false,
            }
            e.preventDefault();
            HttpsReq.post("data", singleTodo).then((res) => {
                localStorage.setItem('todo', JSON.stringify([...data, res.data]));
                setTodoData("");
            })
        }
    }
    const onDelete = (id) => { 
        const result = todoDatas.filter(item => item.id !== id);
            setData(result);
            localStorage.setItem("todo", JSON.stringify(result));
        HttpsReq.delete(`data/${id}`).then(() => {    
        })
    }
    const onEdit = (id) => {
            const found = todoDatas.find(item => item.id === id);
            setTodoData(found.name)
            setSelectItems(false)
            setSelectId(id)
    }
    const onClearData = () => {
        todoDatas.forEach((item) => {
            HttpsReq.delete(`data/${item.id}`).then(() => {
                setData([]);
                localStorage.clear()
            })
        })
    }
    const onCancel = () => {
        if (todoData && !selectItems) {
            setTodoData("");
            setSelectItems(true)
        }
    }
    const handleCheck = (id) => {
        let newData = [...data];
        const foundcheck = newData.find(item => item.id === id);
        const foundObjIndex = newData.indexOf(foundcheck);
        newData[foundObjIndex].complete = !newData[foundObjIndex].complete;
        HttpsReq.put(`data/${id}`, foundcheck).then(() => {
            localStorage.setItem('todo', JSON.stringify(newData));
        })
    }
    return (
        <div className="Wrapper">
            <TodoFields
                data={data}
                onAdd={onAdd}
                onDelete={onDelete}
                todoData={todoData}
                change={TodoValue}
                onEdit={onEdit}
                error={error}
                selectItems={selectItems}
                onClearData={onClearData}
                onCancel={onCancel}
                todoDatas={todoDatas}
                handleCheck={handleCheck}
            />
        </div>
    );
};

export default Axios;