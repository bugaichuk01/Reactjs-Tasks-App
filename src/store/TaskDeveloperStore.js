import {
  action,
  computed,
  makeObservable,
  observable,
  autorun,
  runInAction,
} from "mobx";

class TaskDeveloperStore {
  tasks = [];
  developers = [];

  constructor() {
    makeObservable(this, {
      tasks: observable,
      developers: observable,
      totalDevelopers: computed,
      totalTasks: computed,
      storeDetails: computed,
      getTasksByDeveloper: action,
      createTask: action,
      createDeveloper: action,
      updateTask: action,
      updateDeveloper: action,
      deleteTask: action,
      deleteDeveloper: action,
      assignDeveloperToTask: action,
    });
    autorun(this.logStoreDetails);
    runInAction(this.prefetchData);
  }

  get totalDevelopers() {
    return this.developers.length;
  }

  get totalTasks() {
    return this.tasks.length;
  }

  getTasksByDeveloper(developerId) {
    return this.tasks.filter((task) => {
      return task.developer && task.developer.id === developerId;
    });
  }

  createTask(task = { id: 0, task: "", urgency: "", type: "", developer: null }) {
    this.tasks.push(task);
    return task;
  }

  createDeveloper(developer = { id: 0, firstName: "", lastName: "" }) {
    this.developers.push(developer);
    return developer;
  }

  updateDeveloper(developerId, update) {
    const developerIndexAtId = this.developers.findIndex(
      (developer) => developer.id === developerId
    );
    if (developerIndexAtId > -1 && update) {
      this.developers[developerIndexAtId] = update;
      return this.developers[developerIndexAtId];
    }
  }

  updateTask(taskId, update) {
    const taskIndexAtId = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndexAtId > -1 && update) {
      this.tasks[taskIndexAtId] = update;
      return this.tasks[taskIndexAtId];
    }
  }

  deleteTask(taskId) {
    const taskIndexAtId = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndexAtId > -1) {
      this.tasks.splice(taskIndexAtId, 1);
    }
  }

  deleteDeveloper(developerId) {
    const developerIndexAtId = this.developers.findIndex(
      (developer) => developer.id === developerId
    );
    if (developerIndexAtId > -1) {
      this.developers.splice(developerIndexAtId, 1);
      this.tasks = this.tasks.map((task) => {
        if (task.developer && task.developer.id === developerId) {
          task.developer = null;
        }
        return task;
      });
    }
  }

  assignDeveloperToTask(developerId, taskId) {
    const taskAtIndex = this.tasks.find(
      (task) => parseInt(task.id) === parseInt(taskId)
    );
    const developerAtIndex = this.developers.find(
      (developer) => parseInt(developer.id) === parseInt(developerId)
    );
    if (taskAtIndex && developerAtIndex) {
      taskAtIndex.developer = developerAtIndex;
    }
  }

  get storeDetails() {
    return `We have ${this.totalTasks} tasks and ${this.totalDevelopers} developers, so far!!!`;
  }

  logStoreDetails = () => {
    console.log(this.storeDetails);
  };

  prefetchData = () => {
    const developers = [{ firstName: "Nazar", lastName: "Bugaichuk", id: 1 }];
    const tasks = [
      {
        id: 1,
        task: "Create Mobx App with tasks",
        urgency: "High",
        type: "Develop",
        developerId: 1,
      },
    ];

    setTimeout(() => {
      console.log("Fetch complete update store");
      developers.map((task) => this.createDeveloper(task));
      tasks.map((task) => {
        this.createTask(task);
        this.assignDeveloperToTask(task.developerId, task.id);
        return task;
      });
    }, 3000);
  };
}

export default TaskDeveloperStore;
