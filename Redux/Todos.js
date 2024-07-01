// Action Types
const addTodo = "ADD_TODO";
const doneTodo = "DONE_TODO";
const removeTodo = "REMOVE_TODO";

// Action Creators:
const addTodoAction = (todoTitle) => ({
  type: addTodo,
  title: todoTitle,
});
const doneTodoAction = (todoId) => ({
  type: doneTodo,
  id: todoId,
});
const removeTodoAction = (todoId) => ({
  type: removeTodo,
  id: todoId,
});

// Reducer:
const reducer = (state = [], action) => {
  if (action.type === addTodo) {
    return [
      ...state,
      {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false,
      },
    ];
  }
  //
  else if (action.type === doneTodo) {
    const copyState = structuredClone(state);
    copyState.forEach((todo, index) => {
      if (todo.id === action.id)
        copyState[index].isCompleted = !todo.isCompleted;
    });
    return copyState;
  }
  //
  else if (action.type === removeTodo) {
    const copyState = structuredClone(state);
    const finalData = copyState.filter((todo) => todo.id !== action.id);
    return finalData;
  }
};

export { addTodoAction, doneTodoAction, removeTodoAction, reducer as default };
