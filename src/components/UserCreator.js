import React, { useState } from "react";

export const UserCreator = props => {
    
    const [newUserName, setNewUserName] = useState("");

    const updateNewUserValue = e => setNewUserName(e.target.value);

    const createNewUser = () => {
        props.setUser(newUserName);
        setNewUserName('');
    }

    return (
        <div className="my-1">
            <input
                type="text"
                className="form-control"
                value={newUserName}
                onChange={updateNewUserValue}
                placeholder="User name"
            />
            <button className="btn btn-primary mt-1" onClick={createNewUser}>
                Set User
      </button>
        </div>
    );
};