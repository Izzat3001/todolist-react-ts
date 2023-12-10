import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css'
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    handlDelet: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
    const [addTaskTitle, setAddTaskTitle] = useState("");

    function onChangeAddTaskHandler(e: ChangeEvent<HTMLInputElement>) {
        setAddTaskTitle(e.currentTarget.value);
    }

    function onKeyUphendler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && e.currentTarget.value) {
            props.addTask(addTaskTitle);
            setAddTaskTitle("")
        }
    }

    function onClickAddTaskButton() {
        if (addTaskTitle) {
            props.addTask(addTaskTitle);
            setAddTaskTitle("")
        }
    }

    function onChangeFilterAll() {
        props.changeFilter("all")
    }

    function onChangeFilterActive() {
        props.changeFilter("active")
    }

    function onChangeFilterComplited() {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3 className='top-title'>{props.title}</h3>
            <div className='add-task'>
                <input
                    className='input-add'
                    type="text" placeholder='write the task here!'
                    value={addTaskTitle}
                    onChange={onChangeAddTaskHandler}
                    onKeyUp={onKeyUphendler}
                />
                <button
                    className='btn-add'
                    onClick={onClickAddTaskButton}
                >
                    Add
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        function onHandleDelet() {
                            props.handlDelet(t.id)
                        }
                        return <li key={t.id} className='tasks'>
                            <div>
                                <input
                                    className='input-check'
                                    type="checkbox"
                                    checked={t.isDone}
                                />
                                <span>
                                {t.title}
                            </span>
                            </div>
                            <button
                                className='remuve-btn'
                                onClick={onHandleDelet}
                            >
                                Del
                            </button>
                        </li>
                    })
                }
            </ul>
            <div className='filter-btn'>
                <button onClick={onChangeFilterAll} className="btn">All</button>
                <button onClick={onChangeFilterActive} className="btn">Active</button>
                <button onClick={onChangeFilterComplited} className="btn">Complited</button>
            </div>
        </div>
    )
}