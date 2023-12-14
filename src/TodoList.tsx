import React, {ChangeEvent} from "react";
import './App.css'
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    handlDelet: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatusTask: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filterClass: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const onChangeFilterAll = () => {
        props.changeFilter("all", props.id)
    }

    const onChangeFilterActive = () => {
        props.changeFilter("active", props.id)
    }

    const onChangeFilterComplited = () => {
        props.changeFilter("completed", props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <div className="header-top">
                <h3 className='top-title'>
                    <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                </h3>
                <button className='btn-remove' onClick={removeTodoList}>Del</button>
            </div>

            <AddItemForm addItem={addTask} />
            <ul className="tasks-list">
                {
                    props.tasks.map((t) => {
                        const onHandleDelet = () => {
                            props.handlDelet(t.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusTask(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTitle = (newTitle: string) => {
                            props.changeTaskTitle(t.id, newTitle, props.id)
                        }
                        return <li key={t.id} className={`tasks ${t.isDone ? "completed" : ""}`}>
                            <div>
                                <input
                                    className='input-check'
                                    type="checkbox"
                                    onChange={changeStatus}
                                    checked={t.isDone}
                                />
                                <EditableSpan title={t.title} onChange={changeTitle}/>
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

