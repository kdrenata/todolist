import {styled} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props>(({background, theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    // boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
    boxShadow: "3px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: '5px',
    "&:hover": {
        backgroundColor: '#3f51b5',
        boxShadow: "5px 6px 14px rgba(0, 0, 0, 0.25)",
        transform: "translateY(-2px)",
    },
    "&:active": {
        boxShadow: "2px 3px 8px rgba(0, 0, 0, 0.2)",
        transform: "translateY(1px)",
    },
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || theme.palette.primary.light,
}))