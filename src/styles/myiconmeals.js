import {styled} from '@mui/system';


const Myiconmeals = styled('div')(({theme}) => ({
    [theme.breakpoints.up('xs')] : {
        fontSize: '0.8rem'
    }, 
    [theme.breakpoints.up('sm')] : {
        fontSize: '1.4rem'
    }, 
    [theme.breakpoints.up('md')] : {
        fontSize: '2rem'
    }, 
    [theme.breakpoints.up('lg')] : {
        fontSize: '2.5rem'
    }, 
    [theme.breakpoints.up('xl')] : {
        fontSize: '3.4rem'
    }, 
    [theme.breakpoints.up('xxl')] : {
        fontSize: '3.4rem'
    }, 

}))

export default Myiconmeals