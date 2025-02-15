import {Button} from "./Button.tsx";

type TodolistPropsType = {          // тип, который описывает пропсы компонента тудулист
    title: string;
    tasks: Array<TaskType>;
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export function Todolist(props: TodolistPropsType) {
    // const {title, tasks} = props   // диструктуизующее присваивание

// условный рендеринг (отоброжаем тот или иной элемент разметки в зависимости от какого-то условия)
    const tasksList = props.tasks.length === 0   //проверяем есть ли данные в массиве, если равна 0,
        ? <span>Ваш список пуст</span>           // то выводим сообщение и список не генерируем // если не равна                                                                                0, то генерируем список
        : <ul>
            {props.tasks.map(task => {
                return (
                    <li>
                        <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
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
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'x'}/>
            </div>
            {tasksList}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}