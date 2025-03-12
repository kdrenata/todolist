import {SxProps} from "@mui/material";

export const getListItemSx = (isDone: boolean): SxProps => ({
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    p: '0',
    color: isDone ? 'grey' : 'black',
    textDecorationLine: isDone ? 'line-through' : 'none'

})