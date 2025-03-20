import {TasksStateType} from "../App.tsx";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";


const initialState: TasksStateType = {}

type ActionType = CreateTodolistAT | DeleteTodolistAT

export const tasksReducer = (tasks: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'create_todolist': {
            const {id} = action.payload;
            return  {...tasks, [id]: []}
        }
        case 'delete_todolist': {
            const {id} = action.payload;
            delete tasks[id];
            return {...tasks}
        }

        default:
            return tasks;
    }

}