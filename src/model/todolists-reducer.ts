
import {FilterValues, TodolistType} from "../App.tsx"
import {v1} from "uuid";

const initialState: Array<TodolistType> = []

export type DeleteTodolistAT = ReturnType<typeof DeleteTodolistAC>
export  type CreateTodolistAT = ReturnType<typeof CreateTodolistAC>
export  type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
export  type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>


export type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer =
    (todolists: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
        switch (action.type) {
            case 'delete_todolist': {
                const {id} = action.payload
                return todolists.filter(tl => tl.id !== id) // можно так (tl => tl.id !== action.payload.id)
            }
            case 'create_todolist': {
                const newTodolistId = v1()
                const {title} = action.payload
                return [...todolists, {id: newTodolistId, title: title, filter: 'all'}]
            }
            case 'change_todolist_title': {
                const {id, title} = action.payload
                return todolists.map(tl => tl.id === id ? {...tl, title: title} : tl)
            }
            case 'change_todolist_filter': {
                const {id, filter} = action.payload
                return todolists.map(tl => tl.id === id ? {...tl, filter} : tl)
            }

            default:
                return todolists;
        }

    }

export const DeleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: { id }
} as const)

export const CreateTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload: { title }
} as const)

export const ChangeTodolistTitleAC = ({ id, title } : {id: string, title: string}) => ({
    type: 'change_todolist_title',
    payload: { id, title }
} as const)

export const ChangeTodolistFilterAC = ({ id, filter } : {id: string, filter: FilterValues}) => ({
    type: 'change_todolist_filter',
    payload: { id, filter }
} as const)
