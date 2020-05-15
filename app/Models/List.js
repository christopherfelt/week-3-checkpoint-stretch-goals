import { generateId } from "../utils.js";

export default class List {
  constructor(data) {
    //TODO Your constructor takes in a data object that should have the properties you need to create your list here is a freebie, it will set the id its provided, or if that is undefined it will create a new one (this is an alternative to object destructuring)
    this.id = data.id || generateId();
    this.title = data.title;
    this.color = data.color;
    this.tasks = data.tasks || [];
    class item {
      constructor() {
        console.log("nested class");
      }
    }
    this.testItem = new item();
  }

  get Template() {
    return /*html*/ `
            <div class="col-3">
              <div class="card ">
                <div class="card-body p-0">
                  <h4 id="${
                    this.id + "-title"
                  }" class="card-title d-block" style="background-color: ${
      this.color
    }"  >${this.title}</h4>
                  <p class="card-text">
                    <ul>
                        ${this.TasksTemplate}
                    </ul>
                  </p>
                  <button type="button" class="btn btn-outline-secondary" onclick="app.listController.removeList('${
                    this.id
                  }')">Delete List</button>
                  <form class="form-" onsubmit="app.listController.addTask(event,'${
                    this.id
                  }')" >
                    <div class="form-group">
                      <label for="task"></label>
                      <input type="text" name="task" id="" class="form-control" placeholder="new task" aria-describedby="new task">
                      <button type="submit" class="btn btn-outline-info">Add Task</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    `;
  }

  get TasksTemplate() {
    let template = "";
    this.tasks.forEach((element, i) => {
      template += /*html*/ `
    <li ><span id="${
      this.id + "-task-" + i
    }">${element}</span> <button class='btn btn-danger' onclick='app.listController.removeTask("${
        this.id
      }", ${i})'>X</button></li>
      `;
    });
    return template;
  }

  //Be sure to add the methods needed to create the view template for this model
  //For starting out, your tasks may be strings alone, but later you may wish to turn them into full objects, that will be up to you
}
