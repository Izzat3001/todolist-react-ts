import React, {ChangeEvent} from "react";
import './App.css'
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
        <>
            <Grid>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                    <IconButton onClick={removeTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
            </Grid>

            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
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
                            return (
                                <li key={t.id} className={t.isDone ? "completed" : ""}>
                                    <Checkbox
                                        onChange={changeStatus}
                                        checked={t.isDone}
                                    />
                                    <EditableSpan title={t.title} onChange={changeTitle}/>
                                    <IconButton size="small" onClick={onHandleDelet}>
                                        <Delete fontSize="small"/>
                                    </IconButton>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='filter-btn'>
                    <Button
                        size='small'
                        onClick={onChangeFilterAll}
                        variant={props.filterClass === "all" ? "contained" : "text"}>All
                    </Button>
                    <Button
                        size='small'
                        onClick={onChangeFilterActive}
                        color="primary"
                        variant={props.filterClass === "active" ? "contained" : "text"}>Active
                    </Button>
                    <Button
                        size='small'
                        onClick={onChangeFilterComplited}
                        color="secondary"
                        variant={props.filterClass === "completed" ? "contained" : "text"}>Complited
                    </Button>
                </div>
            </div>
        </>
    )
}

