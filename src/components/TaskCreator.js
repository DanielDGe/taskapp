import React, { useState, useEffect } from "react";

export const TaskCreator = props => {

    const [newTaskName, setNewTaskName] = useState("");

    const updateNewTaskValue = e => setNewTaskName(e.target.value);

    const createNewTask = () => {
        props.createNewTask(newTaskName);
        setNewTaskName('');
    }

    useEffect(() => {
        if (props.nameTask === "") {
          setNewTaskName("");
        } else {
            console.log("name:" + props.nameTask);
            setNewTaskName(props.nameTask);
        }
        
    }, [props.nameTask]);
    
    return (
        <div className="my-1 pt-2">
            <input
                type="text"
                className="form-control"
                value={newTaskName}
                onChange={updateNewTaskValue}
                placeholder="Task name"
            />
            <button className="btn btn-primary mt-1" onClick={createNewTask}>
                {props.nameTask === "" ? "Add Task" : "Update Task"}
            </button>
        </div>
    );
};