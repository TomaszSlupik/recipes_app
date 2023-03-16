import {styled} from '@mui/system';


const Myicon = styled('div')(({theme}) => ({
    [theme.breakpoints.up('xs')] : {
        fontSize: '1.2rem'
    }, 
    [theme.breakpoints.up('sm')] : {
        fontSize: '1.6rem'
    }, 
    [theme.breakpoints.up('md')] : {
        fontSize: '2.2rem'
    }, 
    [theme.breakpoints.up('lg')] : {
        fontSize: '3rem'
    }, 
    [theme.breakpoints.up('xl')] : {
        fontSize: '4rem'
    }, 
    [theme.breakpoints.up('xxl')] : {
        fontSize: '4rem'
    }, 

}))

export default Myicon