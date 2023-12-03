import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";

let task1: Array<TaskType> = [
    {id: 1, title: "HTML", isDone: true},
    {id: 2, title: "CSS", isDone: true},
    {id: 3, title: "React", isDone: false},
]

function App() {
    return (
        <div className="App">
            <TodoList title='What you need to learn' tasks={task1} />
        </div>
    );
}

export default App;
