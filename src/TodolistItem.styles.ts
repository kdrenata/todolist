import {SxProps} from "@mui/material";

export const getListItemSx = (isDone: boolean): SxProps => ({
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    p: '0',
    color: isDone ? 'gray' : '#2196f3',
    fontSize: isDone ? '16px' : '18px',
    textDecorationLine: isDone ? 'line-through' : 'none'

})