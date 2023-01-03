import { styled } from '@mui/system';

export const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0',
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));