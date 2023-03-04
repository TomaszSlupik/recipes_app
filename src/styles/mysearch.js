import {styled} from '@mui/system';


const Mysearch = styled('input')(({theme}) => ({
    [theme.breakpoints.up('xs')] : {
        width: '100%' ,
        borderRadius: '8px',
        [theme.breakpoints.up('xs')]: {
            width: '6ch',
            '&:focus': {
              width: '20ch',
            },
           },
        transition: '0.3s all', 
        border: '1px solid #21415b', 
        height: '2.5rem'
       
    }, 
    [theme.breakpoints.up('sm')] : {
        width: '100%' ,
        borderRadius: '8px',
        [theme.breakpoints.up('xs')]: {
            width: '20ch',
            '&:focus': {
              width: '40ch',
            },
           },
        transition: '0.3s all', 
        border: '1px solid #21415b', 
        height: '2.5rem'
       
    }

}))

export default Mysearch