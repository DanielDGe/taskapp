import React from "react";

export const TaskRow = props => {

  const deleteTask = () => {
    props.callbackDel(props.task.name);
  }

  const updateTask = () => {
    props.callbackUp(props.task.name);
  }

  return (
    <tr key={props.task.name}>
      <td style={{width:'40%'}}>{props.task.name}</td>
      <td>
        <input
          type="checkbox"
          checked={props.task.done}
          onChange={() => props.toggleTask(props.task)}
        />
      </td>

      <td className="d-flex align-items-center">
        <button className="btn btn-danger" onClick={deleteTask}>
          <i className="material-icons">delete</i>
        </button>
        <button className="btn btn-info ml-2" onClick={updateTask}>
          <i className="material-icons">update</i>
        </button>
      </td>

      {/*
      {props.toDelete && (
        <td className="d-flex align-items-center">
          <button className="btn btn-danger" onClick={deleteTask}>
            <i class="material-icons">delete</i>
          </button>
          <button className="btn btn-info ml-2" onClick={deleteTask}>
            <i class="material-icons">update</i>
          </button>
        </td>
      )}
      */}

    </tr>
  );

};