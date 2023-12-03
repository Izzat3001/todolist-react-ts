import React from "react";
import './App.css'

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
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
                <li><input className='input-check' type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input className='input-check' type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input className='input-check' type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
            </ul>
        </div>
    )
}