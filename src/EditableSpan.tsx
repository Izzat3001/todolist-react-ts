import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType ={
    title: string,
    onChange: (newValue: string) => void
};

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    };

    const activateWievEditMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <TextField
            size='small'
            id="standard-basic"
            label="Standard"
            variant="standard"
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateWievEditMode}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

};