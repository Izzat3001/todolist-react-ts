import { TaskStateType, TypeTodoList } from "../App"
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TypeTodoList> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsType = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFormTasks = keys[0]
    const idFormTodolists = endTodolistsType[0].id

    expect(idFormTasks).toBe(action.todolistId)
    expect(idFormTodolists).toBe(action.todolistId)
})