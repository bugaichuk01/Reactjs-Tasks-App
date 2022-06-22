import React from "react";
import {observer} from "mobx-react-lite";

function TasksList({store}) {
    const handleAddTask = () => {
        const task = prompt("Your task");
        const urgency = prompt("Task urgency");
        const type = prompt("Task type");
        const developerId = prompt("Developer's id of the task");

        const myTask = store.createTask({id: Date.now(), task, urgency, type});
        store.assignDeveloperToTask(developerId, myTask.id);
    };

    const handleUpdateTask = (task) => {
        task.name = prompt("Name of the task", task.name);
        task.type = prompt("Type of the task", task.type);
        task.breed = prompt("Breed of the task", task.breed);
        const developerId = prompt("Developer's Id of the task", task.developer?.id);
        store.updateTask(task.id, task);
        if (developerId !== task.developer?.id) {
            store.assignDeveloperToTask(developerId, task.id);
        }
    };

    const handleDeleteTask = (task) => {
        store.deleteTask(task.id);
    };

    return (
        <div className={'container'}>
            <p>{store.storeDetails}</p>
            <table className={'table table-striped'}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Task Urgency</th>
                    <th>Task Type</th>
                    <th>Developer</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {store.tasks.map((task) => {
                    return (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.task}</td>
                            <td>{task.urgency}</td>
                            <td>{task.type}</td>
                            <td>
                                {task.developer
                                    ? `${task.developer?.firstName} ${task.developer?.lastName}`
                                    : "---"}
                            </td>
                            <td>
                                <button
                                    className={'btn btn-light'}
                                    onClick={() => handleDeleteTask(task)}
                                    style={{marginRight: "20px"}}
                                >
                                    Delete {task.name}
                                </button>
                                <button
                                    className={'btn btn-light'}
                                    onClick={() => handleUpdateTask(task)}>
                                    Update {task.name}
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <button className={'btn btn-primary'} onClick={handleAddTask}>+ New task</button>
        </div>
    );
}

export default observer(TasksList);
