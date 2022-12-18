import { TodoStatus, type Todo } from "@/types";
import { computed, reactive } from "vue";

interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    // [TodoStatus.InProgress]: Todo[];
    [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
    [TodoStatus.Pending]: [],
    // [TodoStatus.InProgress]: [],
    [TodoStatus.Completed]: [],
}
const todoStore = reactive<TodoStore>(defaultVal);

export default() => {
    const getTodosByStatus = (TodoStatus: TodoStatus) => {
        return computed(() => todoStore[TodoStatus]);
    };

    // const getTodosByStatus = (TodoStatus: TodoStatus) => {
    //     return computed(() => todoStore[TodoStatus]);
    // };

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus;
    }

    const addNewTodo = (todo: Todo) => {
        todoStore[todo.status].push(todo);
    };

    const deleteTodo = (todoDelete: Todo) => {
        todoStore[todoDelete.status] = todoStore[todoDelete.status].filter(
          (todo) => todo.id != todoDelete.id
          );  
    };

    return { getTodosByStatus, addNewTodo, deleteTodo, updateTodo};
}