<script setup lang="ts">
import TodoGroup from "./TodoGroup.vue";
import { TodoStatus } from "@/types";
import CreateTodo from "./CreateTodo.vue";

</script>

<template>
    <div class="add-new">
        <CreateTodo :status="TodoStatus.Pending" :completed="false" />
    </div>
    <div class="groups-wrapper">
        <TodoGroup class="pending" :status="TodoStatus.Pending" :completed="false" />
        <TodoGroup class="completed" :status="TodoStatus.Completed" :completed="true" />
    </div>
</template>

<style scoped>
.groups-wrapper {
    display: flex;
    justify-content: space-around;
    gap: 20px;

}

.add-new {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    border: 2px;
    border-style: double;
}

.pending {
    background-color: red;
}

.completed {
    background-color: green;
}
</style>