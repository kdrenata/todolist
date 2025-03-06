import {useState} from "react";


type EditableSpan = {
    title: string,
    changeTitle: (newTitle: string) => void,
}

export const EditableSpan = ({title, changeTitle}: EditableSpan) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(title)


    const onEditeMode = () => {
        setIsEditMode(true)
    }
    const offEditeMode = () => {
        setIsEditMode(false)
        changeTitle(value)
    }
    return (
        isEditMode
            ? <input
            value={value}
            autoFocus={isEditMode}
            onChange={(e) => setValue(e.target.value)}
            onBlur={offEditeMode}
            />
            : <span onDoubleClick={onEditeMode}>{title}</span>
    )
}