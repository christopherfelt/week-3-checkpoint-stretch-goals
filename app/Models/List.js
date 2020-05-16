import { generateId } from "../utils.js";

export default class List {
  constructor(data) {
    //TODO Your constructor takes in a data object that should have the properties you need to create your list here is a freebie, it will set the id its provided, or if that is undefined it will create a new one (this is an alternative to object destructuring)
    this.id = data.id || generateId();
    this.title = data.title;
    this.color = data.color;
    // this.tasks = data.tasks || [];
    class task {
      constructor(taskObj) {
        this.title = taskObj.title;
        this.complete = taskObj.complete || false;
      }
    }
    // this.testTasks = data.tasks.map((t) => new task(t));
    this.tasks = data.tasks ? data.tasks.map((t) => new task(t)) : [];
  }

  // old div tag: <div class="col-sm-3 col-md-6 col-lg-4 my-3">
  // Removed this tag: <div class="card-columns"></div>

  get Template() {
    return /*html*/ `
            
              <div class="card rounded card-width">
                <div class="card-body p-0">
                <div class="d-block" style="background-color: ${this.color}">
                  <span id="${this.id + "-title"}" 
                  class="card-title d-inline text-center ml-2 mt-2 gochi-hand-font list-title">
                  ${this.title}</span>
                  <button type="button" class="btn d-inline float-right remove-list"
                  onclick="app.listController.removeList('${this.id}')">
                  X</button>
                </div>
                  <p class="card-text">
                        ${this.TasksTemplate}
                    
                  </p>
                  <button type="button" class="btn btn-outline-danger ml-2 p-1
                  ${this.tasks.some((t) => t.complete == true) ? "" : "d-none"}
                  " onclick="app.listController.removeCompleted('${
                    this.id
                  }')" ><small>Remove Completed</small></button>
                  <form class="form-inline mx-1 my-1" onsubmit="app.listController.addTask(event,'${
                    this.id
                  }')" >
                    <div class="">
                      <label for="task"></label>
                      <input type="text" name="task" class="form-control d-inline" placeholder="new task" aria-describedby="new task">
                      <button type="submit" class="btn btn-outline-info ml-3" d-inline><i class="fas fa-plus    "></i></button>
                    </div>
                  </form>
                </div>
              </div>
            
    `;
  }

  get TasksTemplate() {
    let template = "";
    this.tasks.forEach((element, i) => {
      template += /*html*/ `
    <div class="pl-5 my-1 d-flex justify-content-between item-div" >
      <div class="text-left d-inline task-div align-self-center ">
        <label class="checkbox-container"
          id="${this.id + "-task-" + i}">
          <input type="checkbox" class="" onclick="app.listController.toggleComplete('${
            this.id
          }', ${i})" ${element.complete ? "checked" : ""}>
          <span class="checkmark" ${
            element.complete
              ? "style='background-color:" + this.color + ";'"
              : ""
          }></span>
          <span class="item-title">${element.title}</span>
        </label> 
      </div>

      <div class="d-inline pr-3">
        <button class='btn ml-3 remove-task text-right' onclick='app.listController.removeTask("${
          this.id
        }", ${i})'><i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
      `;
    });
    return template;
  }

  //Be sure to add the methods needed to create the view template for this model
  //For starting out, your tasks may be strings alone, but later you may wish to turn them into full objects, that will be up to you
}
