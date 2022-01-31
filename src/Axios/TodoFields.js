import React from 'react';

const TodoFields = ({
    onAdd,
    todoData, 
    change, 
    onDelete, 
    handleCheck, 
    data, 
    onEdit, 
    selectItems, 
    error, 
    onClearData, 
    onCancel }) => {
    return (
        <div>
            <div className="inputFieldWrap">
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={change}
                    value={todoData}
                    className="TodoInput" required />
                <button
                    className="addBtn"
                    onClick={onAdd}
                >
                    {selectItems ? "Add" : "Update"}
                </button>
                {!selectItems ? <button
                    style={{ backgroundColor: "#a6acaf" }}
                    className="addBtn"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                    : null
                }
                <div className="validate">
                    {error}
                </div>
            </div>
            {data?.map((item) => {
                return <div className="axoisDataWrap" key={item.id} >
                    <div key={item.id} style={{ textDecoration: item.complete ? "line-through" : null }}>
                        <input
                            type="checkbox"
                            id={item.id}
                            checked={item.complete}
                            onChange={() => handleCheck(item.id)}

                        />
                        <span>{item.name}</span>
                    </div>
                    <div>
                        <button
                            style={{ backgroundColor: "#34c13a" }}
                            className="delBtn" onClick={() => {onEdit(item.id)}}>
                            Edit
                        </button>
                        <button
                            className="delBtn" onClick={() => {onDelete(item.id)}}>
                            Delete
                        </button>
                    </div>
                </div>
            })}
            {data?.length ?
            <div className="btnGrp">
                <button className="clearBtn" style={{color:"#ea9393"}}>Select All</button> 
                <button className="clearBtn" onClick={onClearData}>Clear All</button> 
            </div>
                : null}
        </div>
    );
};

export default TodoFields;