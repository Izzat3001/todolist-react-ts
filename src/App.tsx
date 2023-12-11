import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>("all");

    function handlDelet(id: string) {
        const filteredTask = tasks.filter(t => t.id !== id);
        setTasks(filteredTask);
    }

    function addTask(title: string) {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList
                title='What you need to learn'
                tasks={tasksForTodoList}
                handlDelet={handlDelet}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatusTask={changeStatus}
                filterClass={filter}
            />
        </div>
    );
}

export default App;
