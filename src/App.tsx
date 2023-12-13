import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
export type TypeTodoList = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TypeTodoList>>([
        {id: todoListId1, title: 'What to learn', filter: "all"},
        {id: todoListId2, title: 'What to buy', filter: "completed"}
    ])

    const [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Books", isDone: true},
        ]
    })

    function handlDelet(id: string, todoListId: string) {
        const tasks = tasksObj[todoListId];
        const filteredTask = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTask;
        setTasksObj({...tasksObj});
    };

    function addTask(title: string, todoListId: string) {
        const task = {
            id: v1(),
            title: title,
            isDone: false,
        };
        const tasks = tasksObj[todoListId];
        const newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(t => t.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListId: string) {
        const filteredTodoList = todoLists.filter(t => t.id !== todoListId);
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTasksObj({...tasksObj})
    }


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const tasks = tasksObj[todoListId];
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            handlDelet={handlDelet}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatusTask={changeStatus}
                            filterClass={tl.filter}
                            removeTodoList={removeTodoList}
                        />)
                })
            }
        </div>
    );
}

export default App;
