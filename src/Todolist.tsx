import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {useState, KeyboardEvent} from "react";

type TodolistPropsType = {          // тип, который описывает пропсы компонента тудулист
    title: string;
    tasks: Array<TaskType>;
    deleteTask: (taskId: string) => void;
    // changeFilter: (newFilterValue: FilterValues) => void;
    createTask: (title: string) => void;
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export const Todolist = ({
     title,
     tasks,
     deleteTask,
     createTask,
     // changeFilter
}: TodolistPropsType) => {
    // const {title, tasks} = props   // деструктурирующее присваивание

    // const inputRef = useRef<HTMLInputElement>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');  // локальный state, который контролирует input

    const [filter, setFilter] = useState<FilterValues>('all')

    const changeFilter = (newFilterValue: FilterValues) => {
        setFilter(newFilterValue)
    }

    let tasksForTodolist = tasks
    if(filter === 'active'){
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }



// условный рендеринг (отоброжаем тот или иной элемент разметки в зависимости от какого-то условия)
    const tasksList = tasks.length === 0   //проверяем есть ли данные в массиве, если равна 0,
        ? <span>Ваш список пуст</span>           // то выводим сообщение и список не генерируем // если не равна                                                                                0, то генерируем список
        : <ul>
            {tasksForTodolist.map(task => {
                const showTaskId = () => deleteTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title='x' onClickHandler={showTaskId}/>
                    </li>
                )
            })}
        </ul>
    // С ЦИКЛОМ
    // let taskList = <span>Ваш список пуст</span>;
    // if (props.tasks.length) {
    //     taskList = <ul>
    //         {props.tasks.map(task => {
    //             return (
    //                 <li>
    //                     <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
    //                 </li>
    //             )
    //         })}
    //     </ul>
    // }

    const createTaskOnClickHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }
    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {          // добавление по нажатию на клавишу
        if (e.key === 'Enter' && taskTitle && taskTitle.length <= 15) {   // то же самое что при нажатии на кнопку
            createTaskOnClickHandler()
        }}


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input //  получает содержимое локального state(a)
                    value={taskTitle}
                    placeholder='max title length is 15 charters'
                    onChange={(e) => setTaskTitle(e.currentTarget.value)} //все что польз вводит, поручаем передавать в локальный state
                    onKeyDown={createTaskOnKeyDownHandler}
                />
                <Button title={'+'}
                        isDisabled={!taskTitle || taskTitle.length > 15}
                        onClickHandler={createTaskOnClickHandler}/>

            </div>
            {/*// добавляем два выражения условного рендеринга*/}
            {taskTitle && taskTitle.length <= 15 && <div>max title length is 15 charters</div>}
            {taskTitle.length > 15 && <div style={{color:'red'}}>title is to long</div>}

            {tasksList}
            <div>
                <Button title={'All'} onClickHandler={() => changeFilter('all')}/>
                <Button title={'Active'} onClickHandler={() => changeFilter('active')}/>
                <Button title={'Completed'} onClickHandler={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}