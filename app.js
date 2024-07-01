import todolistReducer, {
  addTodoAction,
  doneTodoAction,
  removeTodoAction,
} from "./Redux/Todos.js";

const formElem = document.querySelector("form");
const inputElem = document.querySelector("input[type='text']");
const ulElem = document.querySelector("ul");

const { createStore } = Redux;
const store = createStore(todolistReducer);

const changeTodoStatusHandler = (todoId) => {
  const action = doneTodoAction(todoId);
  console.log(action);
  store.dispatch(action);
  console.log(store.getState());
  insertToDom(store.getState());
};
const removeTodoHandler = (todoId) => {
  const action = removeTodoAction(todoId);
  console.log(action);
  store.dispatch(action);
  insertToDom(store.getState());
};

window.changeTodoStatusHandler = changeTodoStatusHandler;
window.removeTodoHandler = removeTodoHandler;

const insertToDom = (datas = []) => {
  ulElem.innerHTML = "";
  datas.forEach((data) => {
    const liElem = `
      <li>
        <span>${data.title}</span>
        <div>
          <span onclick=changeTodoStatusHandler('${data.id}')>
            ${data.isCompleted ? "✅" : "❌"}
          </span>
          <button onclick=removeTodoHandler('${data.id}')>remove</button>
        </div>
      </li>
    `;
    ulElem.insertAdjacentHTML("beforeend", liElem);
  });
};

// form submit
formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  const action = addTodoAction(inputElem.value);
  store.dispatch(action);
  inputElem.value = "";
  console.log(store.getState());
  insertToDom(store.getState());
});
