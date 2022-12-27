import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

export const FormContainer = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80vw',
    height: '100%',
    padding: '20px 2%',
    margin: '0 auto',
    border: '3px solid #00bcd5',
    borderRadius: '20px',
    background: '#c2c0bc',
}));

export const Input = styled('input')(({ theme }) => ({
    outline: 'none',
    color: '#000',
    border: 'none',
    borderBottom: '1px solid #00bcd5',
    padding: '10px',
    width: '350px',
    fontSize: '18px',
    marginBottom: '20px',
    float: 'left',

    '&::placeholder': {
        color: '#00bcd5',
    },
}));

export const Heading = styled(Typography)(({ theme }) => ({
    color: '#f25218',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
    fontFamily: 'Roboto',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    background: '#f25218',
    color: '#fff',
    width: '350px',
    height: '50px',
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
    fontFamily: 'Roboto',
    marginTop: '20px',
    borderRadius: '10px',
    border: '1px solid #FFF',

    '&:hover': {
        background: '#00bcd5',
    },
}));

export const InputContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0',
    margin: '0 auto',
}));