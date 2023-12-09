import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

function handlDelet(id: number) {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
}

function changeFilter(value: FilterValuesType) {
    setFilter(value)
}

let tasksForTodoList = tasks;
if(filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
}
if(filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
}

    return (
        <div className="App">
            <TodoList
                title='What you need to learn'
                tasks={tasksForTodoList}
                handlDelet={handlDelet}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
