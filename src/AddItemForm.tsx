import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        if (e.key === "Enter" && e.currentTarget.value.trim() !== " ") {
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
        </div>
    )
}