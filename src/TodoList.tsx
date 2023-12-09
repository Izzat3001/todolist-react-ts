import React from "react";
import './App.css'
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    handlDelet: (taskId: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function TodoList(props: PropsType) {
    return(
        <div>
            <h3 className='top-title'>{props.title}</h3>
            <div className='add-task'>
                <input className='input-add' type="text" placeholder='write the task here!'/>
                <button className='btn-add'>Add</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => (
                        <li className='tasks'>
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
                                onClick={() => props.handlDelet(t.id)}
                            >
                                Del
                            </button>
                        </li>
                    ))
                }
            </ul>
            <div className='filter-btn'>
                <button onClick={() => props.changeFilter("all")} className="btn">All</button>
                <button onClick={() => props.changeFilter("active")} className="btn">Active</button>
                <button onClick={() => props.changeFilter("completed")} className="btn">Complited</button>
            </div>
        </div>
    )
}