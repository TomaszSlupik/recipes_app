import { useContext } from "react"
import LoginContext from "../context/loginContext"

export default function useLogin () {


    const loginContext = useContext(LoginContext)
    const login = loginContext.isLogin


    const setLogin = (value) => {

        if (value) {
            loginContext.logout()
        }
        else {
            loginContext.login()
        }
    }

    return [login, setLogin]

}