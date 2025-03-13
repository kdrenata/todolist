import {useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


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
            ? <TextField
                variant="standard"
                value={value}
                autoFocus={isEditMode}
                onChange={(e) => setValue(e.target.value)}
                onBlur={offEditeMode}
            />
            : <Box component='span'
                // sx={{color: 'red'}}
                onDoubleClick={onEditeMode}>
                {title}
            </Box>
    )
}