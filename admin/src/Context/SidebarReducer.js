export const sidebarReducer=(state,action)=>{
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
                isOpenSidebar:!state.isOpenSidebar
            } 
        default:
            return state
    }
}