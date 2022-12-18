<script setup lang="ts">
import { computed } from "vue";
import { TodoStatus, type Todo } from "@/types";
import useTodos from "@/store/useTodos";
import Draggable from "vuedraggable";
import CreateTodo from "./CreateTodo.vue";



interface Props {
    status: TodoStatus;
    // completed: boolean;
}
const props = defineProps<Props>();

const { getTodosByStatus, deleteTodo, updateTodo, addNewTodo } = useTodos();
const todoList = getTodosByStatus(props.status);
console.log(props.status);
const groupLabel = {
    [TodoStatus.Pending]: "Pending",
    [TodoStatus.Completed]: "Completed"
};

const onDraggableChange = (payload: any) => {
    if (payload?.added?.element) {
        updateTodo(payload?.added?.element, props.status);
    }
};
const onCheckboxClicked = (todo: Todo) => {
    deleteTodo(todo);
    updateTodo(todo, todo.completed ? TodoStatus.Completed : TodoStatus.Pending);
    addNewTodo(todo);
};
</script>

<template>
    <div class="group-wrapper">
        <h3 class="header">{{ groupLabel[props.status] }}</h3>

        <Draggable class="draggable" :list="todoList" group="todos" itemKey="id" @change="onDraggableChange">
            <template #item="{ element: todo }">
                <li>
                    {{ todo.title }}
                    <span class="delete-icon" @click="deleteTodo(todo)">x</span>
                    <div>
                        <span class="todo-description">{{ todo.description }}</span>
                    </div>
                    <div>
                        <input type="checkbox" id="checkbox" v-model="todo.completed" @change="onCheckboxClicked(todo)"
                            :value="todo.completed" />
                        <label for="checkbox">Completed?</label>
                    </div>
                </li>
            </template>
        </Draggable>

        <!-- <CreateTodo :status="props.status" :completed="false"/> -->
    </div>
</template>

<style scoped>
.group-wrapper {
    flex: 1;
    padding: 20px;
    background-color: rgb(56, 80, 103);
    color: white;
    width: 300px;
}

.group-wrapper li {
    list-style-type: none;
    background-color: aliceblue;
    color: rgb(56, 80, 103);
    padding: 2px 5px;
    cursor: grab;
    margin-bottom: 10px;
}

.header {
    display: flex;
    justify-content: center;
    border: 2px;
    border-style: double;
    border-color: white;
    margin-bottom: 10px;
}

.draggable {
    min-height: 200px;
}

.delete-icon {
    float: right;
    cursor: pointer;
}

.todo-description {
    font-size: 12px;
}
</style>