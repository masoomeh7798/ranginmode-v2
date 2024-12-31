import { createContext, useEffect, useReducer } from "react"
import { authReducer } from "./AuthReducer"

const initialState = {
    token: null,
    user: null
}
export const AuthContext = createContext(initialState)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        const parsedUser  = JSON.parse(storedUser ); // Parse the user back into an object

        if (storedToken && storedUser) {
            dispatch({ type: 'SET_TOKEN', payload: { token: storedToken, user: parsedUser } })
        }

    }, [state.token]);
    return (
        <AuthContext.Provider value={{ user: state.user, token: state.token, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

