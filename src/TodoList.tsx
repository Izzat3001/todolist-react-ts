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
    changeStatusTask: (taskId: string, isDone: boolean) => void
    filterClass: FilterValuesType
}

export function TodoList(props: PropsType) {
    const [addTaskTitle, setAddTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTaskTitle(e.currentTarget.value);
    }

    const onKeyUphendler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter" && e.currentTarget.value.trim() !== " ") {
            onClickAddTaskButton()
        }
    }

    const onClickAddTaskButton = () => {
        if (addTaskTitle.trim() !== "") {
            props.addTask(addTaskTitle.trim());
            setAddTaskTitle("")
        } else {
            setError("Title is required!")
        }
    }

    const onChangeFilterAll = () => {
        props.changeFilter("all")
    }

    const onChangeFilterActive = () => {
        props.changeFilter("active")
    }

    const onChangeFilterComplited = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3 className='top-title'>{props.title}</h3>
            <div className='add-task'>
                <input
                    className={`input-add ${error ? " input-add-error" : ''}`}
                    type="text" placeholder='write the task here!'
                    value={addTaskTitle}
                    onChange={onChangeAddTaskHandler}
                    onKeyPress={onKeyUphendler}
                />
                <button
                    className='btn-add'
                    onClick={onClickAddTaskButton}
                >
                    Add
                </button>
            </div>
            {error && (<div className="error-message">{error}</div>)}
            <ul className="tasks-list">
                {
                    props.tasks.map((t) => {
                        const onHandleDelet = () => {
                            props.handlDelet(t.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusTask(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id} className='tasks'>
                            <div>
                                <input
                                    className='input-check'
                                    type="checkbox"
                                    onChange={changeStatus}
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
                <button
                    onClick={onChangeFilterAll}
                    className={`btn ${props.filterClass === "all" ? " active-filter" : ""}`}>All
                </button>
                <button
                    onClick={onChangeFilterActive}
                    className={`btn ${props.filterClass === "active" ? " active-filter" : ""}`}>Active
                </button>
                <button
                    onClick={onChangeFilterComplited}
                    className={`btn ${props.filterClass === "completed" ? " active-filter" : ""}`}>Complited
                </button>
            </div>
        </div>
    )
}