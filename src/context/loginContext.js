import React from "react";

const LoginContext = React.createContext({
    isLogin: false, 
    login: () => {},
    logout: () => {}
})

export default LoginContext