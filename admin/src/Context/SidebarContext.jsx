import { createContext, useEffect, useReducer } from "react"
import { sidebarReducer } from "./SidebarReducer"

const initialState = {
    isOpenSidebar:false,
}
export const SidebarContext=createContext(initialState)

export const SidebarContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sidebarReducer, initialState)
    return (
        <SidebarContext.Provider value={{ isOpenSidebar: state.isOpenSidebar, dispatch }}>
            {children}
        </SidebarContext.Provider>
    )

}

