import React, { useState, useEffect } from "react";

import { TaskBanner } from "./components/TaskBanner";
import { TaskRow } from "./components/TaskRow";
import { TaskCreator } from "./components/TaskCreator";
import { UserCreator } from "./components/UserCreator";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {

  //-----------------------------State------------------------------------

  const [userName, setUserName] = useState("");
  const [taskItems, setTaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: true },
    { name: "Task Four", done: false }
  ]);
  
  const [showCompleted, setshowCompleted] = useState(true);

  const [nameTask, setNameTask] = useState("");


  //-------------------------------Effect------------------------------------

  useEffect(() => {

    let userData = localStorage.getItem("user");

    if (userData != null) {
      setUserName(JSON.parse(userData));
    } else {
      setUserName("Daniel");
    }

    let data = localStorage.getItem("tasks");

    if (data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setTaskItems([
        { name: "Task One", done: false },
        { name: "Task Two", done: false },
        { name: "Task Three", done: true },
        { name: "Task Four", done: false }
      ]);
      setshowCompleted(true);
    }
  }, []); //Ejecuta este effect cuando carga la aplicacion.

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]); //Ejecuta esta funcion cada vez que el taskItem cambia el State.

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userName));
  }, [userName]);


  //---------------------------Methods--------------------------

  const createNewUser = userNameProps => {

    setUserName(userNameProps);

  }

  const createNewTask = taskName => {

    if (nameTask === "") {

      if (!taskItems.find(t => t.name === taskName)) {
        setTaskItems([...taskItems, { name: taskName, done: false }]);
      }

    } else {

      setTaskItems(taskItems.map(task => (task.name === nameTask ? { ...task, name: taskName } : task)));
      setNameTask("");
    }

  };

  const deleteTask = t => {
    console.log(t);

    var array = [...taskItems]; // make a separate copy of the array
    var tarea = taskItems.find(task => task.name === t);
    var index = array.indexOf(tarea);

    if (index !== -1) {
      array.splice(index, 1);
      //this.setState({ people: array });
      setTaskItems(array);
      console.log(index);
    }
  };

  const updateTask = t => {
    console.log("Update");

    setNameTask(t);

  }

  const toggleTask = task =>
    setTaskItems(
      taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const taskTableRows = doneValue =>
    taskItems
      .filter(task => task.done === doneValue)
      .map(task => (
        <TaskRow 
            key={task.name}
            task={task} 
            toggleTask={toggleTask} 
            toDelete={doneValue} 
            callbackDel={deleteTask}
            callbackUp={updateTask} />
      ));

  return (

    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <div className="container-fluid">

        <UserCreator setUser={createNewUser} />

        <TaskCreator {...{createNewTask, nameTask}} />

        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(false)}</tbody>
        </table>

        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={checked => setshowCompleted(checked)}
          />
        </div>

        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>

  );
}

export default App;
