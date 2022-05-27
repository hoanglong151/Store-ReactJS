import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const theme = createTheme({
    typography: {
        htmlFontSize: 10,
    },
});

export const globalStyles = makeStyles({
    btn: {
        textDecoration: 'none',
        color: '#fff',
        lineHeight: 'none',
    },
});

export default theme;
