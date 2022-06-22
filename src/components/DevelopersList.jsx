import {observer} from "mobx-react-lite";
import React from "react";

function DevelopersList({store}) {
    const handleAddDeveloper = () => {
        const firstName = prompt("First name?");
        const lastName = prompt("Last name?");
        store.createDeveloper({id: Date.now(), firstName, lastName});
    };

    const handleUpdateDeveloper = (developer) => {
        developer.firstName = prompt("First name?", developer.firstName);
        developer.lastName = prompt("Last name?", developer.lastName);
        store.updateDeveloper(developer.id, developer);
    };

    const handleDeleteDeveloper = (developer) => {
        store.deleteDeveloper(developer.id);
    };

    return (
        <div className="container">
            <table className={'table table-striped'}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {store.developers.map((developer) => {
                    return (
                        <tr key={developer.id}>
                            <td>{developer.id}</td>
                            <td>{developer.firstName}</td>
                            <td>{developer.lastName}</td>
                            <td>
                                <button
                                    className={'btn btn-light'}
                                    onClick={() => handleDeleteDeveloper(developer)}
                                    style={{marginRight: "1rem"}}
                                >
                                    Delete {developer.firstName}
                                </button>
                                <button
                                    className={'btn btn-light'}
                                    onClick={() => handleUpdateDeveloper(developer)}>
                                    Update {developer.firstName}
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <button
                className={'btn btn-primary'}
                onClick={handleAddDeveloper}>+ New developer
            </button>
        </div>
    );
}

export default observer(DevelopersList);
