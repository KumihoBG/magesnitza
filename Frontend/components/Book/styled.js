import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const BookTitle = styled(Typography)(({ theme }) => ({
    color: '#FFF',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0 auto',
    padding: '30px 0',
    textTransform: 'uppercase',

    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '1rem',
    },

    [theme.breakpoints.down('xxs')]: {
        fontSize: '0.8rem',
    },
}));

export const Label = styled('label')(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 'bold',

    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
    },

    [theme.breakpoints.down('xxs')]: {
        fontSize: '0.6rem',
    },
}));

export const Select = styled('select')(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '5px',
    margin: '10px auto',
    width: '400px',
    height: '40px',
    border: 'none',
    backgroundColor: '#FFF',
    borderRadius: '5px',
    color: '#000',
    outline: 'none',
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
    },

    [theme.breakpoints.down('xxs')]: {
        fontSize: '0.6rem',
    },
}));

export const Content = styled('p')(({ theme }) => ({
    fontSize: '1.5rem',
    textAlign: 'justify',
    lineHeight: '1.5',
    margin: '0 auto',
    padding: '30px 0',
    whiteSpace: 'pre-line', 
    color: '#FFF',

    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
    },

    [theme.breakpoints.down('xxs')]: {
        fontSize: '0.6rem',
    },
}));

export const Summary = styled('p')(({ theme }) => ({
    fontSize: '1.5rem',
    color: '#FFF',
    width: '40%',
    textAlign: 'justify',
    lineHeight: '1.4',
    margin: '0 auto',
    padding: '30px 0',
    whiteSpace: 'pre-line',
    fontStyle: 'italic',
    
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
    },

    [theme.breakpoints.down('xxs')]: {
        fontSize: '0.6rem',
    },
}));

export const Text = styled('p')(({ theme }) => ({
    fontSize: '1.2rem',
    color: '#FFF',
    textAlign: 'center',
    margin: '0 auto',
    padding: '0',
    whiteSpace: 'pre-line',
    
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
    },

    [theme.breakpoints.down('xxs')]: {
        fontSize: '0.6rem',
    },
}));