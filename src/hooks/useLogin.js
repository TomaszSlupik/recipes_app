import { useContext } from "react"
import LoginContext from "../context/loginContext"

export default function useLogin () {


    const loginContext = useContext(LoginContext)
    const login = loginContext.user


    const setLogin = (user) => {

        if (user) {
            loginContext.login(user)
                window.localStorage.setItem('token', JSON.stringify(user))
            
        }
        else {
            loginContext.logout()
            window.localStorage.removeItem('token')
           
        }

      
    }

    return [login, setLogin]

}