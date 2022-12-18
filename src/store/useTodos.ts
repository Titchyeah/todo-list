import { TodoStatus, type Todo } from "@/types";
import { computed, reactive } from "vue";

interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
    [TodoStatus.Pending]: [],
    [TodoStatus.Completed]: [],
}
const todoStore = reactive<TodoStore>(defaultVal);

export default () => {
    const getTodosByStatus = (TodoStatus: TodoStatus) => {
        return computed(() => todoStore[TodoStatus]);
    };

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus;
        todo.completed = !!(newStatus == TodoStatus.Completed);
    }

    const addNewTodo = (todo: Todo) => {
        const all = todoStore.completed.concat(todoStore.pending);
        const exists = all.filter(e => e.title.toLowerCase() === todo.title.toLowerCase());
        if (exists.length) {
            window.alert("Card exists");
            return;
        }
        if(todo.description === ""){
            window.alert("Description must not be blank");
            return;
        }
        todoStore[todo.status].push(todo);
    };

    const deleteTodo = (todoDelete: Todo) => {
        todoStore[todoDelete.status] = todoStore[todoDelete.status].filter(
            (todo) => todo.id != todoDelete.id
        );
    };

    return { getTodosByStatus, addNewTodo, deleteTodo, updateTodo };
}