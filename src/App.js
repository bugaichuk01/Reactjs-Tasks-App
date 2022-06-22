import TaskDeveloperStore from "./store/TaskDeveloperStore";
import PetList from "./components/TasksList";
import DevelopersList from "./components/DevelopersList";
import React from "react";

function App() {
    const store = new TaskDeveloperStore();
    return (
        <div className="App">
            <div className={'mt-5'}>
                <PetList store={store}/>
            </div>
            <hr/>
            <div className={'mt-5'}>
                <DevelopersList store={store}/>
            </div>
        </div>
    );
}

export default App;
