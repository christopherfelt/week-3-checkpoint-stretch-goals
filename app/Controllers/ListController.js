import ListService from "../Services/ListService.js";
import store from "../store.js";

//TODO Don't forget to render to the screen after every data change.
function _drawLists() {
  let lists = store.State.lists;
  let template = "";
  lists.forEach((l) => (template += l.Template));
  document.getElementById("lists").innerHTML = template;
}

//Public
export default class ListController {
  constructor() {
    //NOTE: After the store loads, we can automatically call to draw the lists.
    _drawLists();
  }

  addList(event) {
    event.preventDefault();
    let formData = event.target;
    let rawListData = {
      title: formData.title.value,
      color: formData.listColor.value,
    };
    formData.reset();
    ListService.addList(rawListData);
    _drawLists();
  }

  removeList(id) {
    let listName = document.getElementById(id + "-title").innerText;
    swal({
      title: "Wait!",
      text: "Are you sure you want to delete '" + listName + "'?",
      icon: "warning",
      button: "yep i'm good",
    }).then((value) => {
      if (value) {
        ListService.removeList(id);
        _drawLists();
      }
    });
  }

  addTask(event, id) {
    event.preventDefault();
    let formData = event.target;
    let task = formData.task.value;
    ListService.addTask(id, task);
    _drawLists();
  }

  removeTask(id, index) {
    let taskName = document.getElementById(id + "-task-" + index).innerText;
    swal({
      title: "Wait!",
      text: "Are you sure you want to delete '" + taskName + "'?",
      icon: "warning",
      button: "yep i'm good",
    }).then((value) => {
      if (value) {
        ListService.removeTask(id, index);
        _drawLists();
      }
    });
  }

  toggleComplete(id, index) {
    ListService.toggleCheck(id, index);
    _drawLists();
  }

  removeCompleted(id) {
    ListService.removeCompleted(id);
    _drawLists();
  }

  //TODO: Your app will need the ability to create, and delete both lists and listItems
}
