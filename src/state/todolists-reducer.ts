import {FilterValuesType, TypeTodoList} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
};

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
};

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType | ChangeTodolistFilterActionType;


export const todolistsReducer = (state: Array<TypeTodoList>, action: ActionsType): Array<TypeTodoList> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error('Error')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST" , id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST" , title: title, todolistId: v1()}
}

export const changeTodolistAC = (title: string, id: string): ChangeTodolistActionType => {
    return { type: "CHANGE-TODOLIST-TITLE" , title: title, id: id }
}

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER" , filter: filter, id: id }
}