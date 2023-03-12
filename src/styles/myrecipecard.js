import {styled} from '@mui/system';


const Myrecipecard = styled('div')(({theme}) => ({
    [theme.breakpoints.up('xs')] : {
        width: '345px', 
        height: '350px',  
        marginTop: '0.8em'
    }, 
    [theme.breakpoints.up('sm')] : {
        width: '345px', 
        height: '350px', 
        marginTop: '0.8em'
    }, 
    [theme.breakpoints.up('md')] : {
        width: '345px', 
        height: '350px', 
        margin: '0.8em 0.8em'
    }, 
    [theme.breakpoints.up('lg')] : {
        width: '345px', 
        height: '350px', 
        margin: '0.8em 0.8em'
    }, 
    [theme.breakpoints.up('xl')] : {
        width: '550px', 
        height: '350px', 
        margin: '0.8em 0.8em'
    }, 
    [theme.breakpoints.up('xxl')] : {
        width: '500px', 
        height: '350px', 
        margin: '0.8em 0.8em'
    }, 

}))

export default Myrecipecard