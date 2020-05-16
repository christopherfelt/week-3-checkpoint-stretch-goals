import List from "../Models/List.js";
import store from "../store.js";

//Public
class ListService {
  removeCompleted(id) {
    let list = store.State.lists.find((l) => l.id == id);
    list.tasks = list.tasks.filter((t) => t.complete == false);
    store.saveState();
  }
  toggleCheck(id, index) {
    let list = store.State.lists.find((l) => l.id == id);
    list.tasks[index].complete = !list.tasks[index].complete;
    store.saveState();
  }
  removeTask(id, index) {
    let list = store.State.lists.find((l) => l.id == id);
    list.tasks.splice(index, 1);
    store.saveState();
  }
  addTask(id, task) {
    let list = store.State.lists.find((l) => l.id == id);
    let listIndex = store.State.lists.findIndex((l) => l.id == id);
    let listCopy = JSON.parse(JSON.stringify(list));
    listCopy.tasks.push({ title: task });
    store.State.lists = store.State.lists.filter((l) => l.id != id);
    let updatedList = new List(listCopy);
    store.State.lists.splice(listIndex, 0, updatedList);
    store.saveState();
  }
  removeList(id) {
    store.State.lists = store.State.lists.filter((l) => l.id != id);
    store.saveState();
  }
  addList(rawListData) {
    let list = new List(rawListData);
    store.State.lists.push(list);
    store.saveState();
  }

  //TODO  Here is where we handle all of our business logic,
  //given the information you need in the controller,
  //what methods will you need to do when this class is first 'constructed'?
  //NOTE You will need this code to persist your data into local storage, be sure to call the store method to save after each change
}

const SERVICE = new ListService();
export default SERVICE;
