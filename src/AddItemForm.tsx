import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [addTaskTitle, setAddTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTaskTitle(e.currentTarget.value);
    }

    const onKeyUphendler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13 && e.currentTarget.value !== " ") {
            onClickAddTaskButton()
        }
    }

    const onClickAddTaskButton = () => {
        if (addTaskTitle.trim() !== "") {
            props.addItem(addTaskTitle.trim());
            setAddTaskTitle("")
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
            <TextField
                type="text"
                label='write the task here!'
                value={addTaskTitle}
                onChange={onChangeAddTaskHandler}
                onKeyPress={onKeyUphendler}
                size='small'
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={onClickAddTaskButton}
                // variant={"contained"}
                color={"primary"}
                size="small"
            >
                <ControlPoint/>
            </IconButton>
        </div>
    )
}