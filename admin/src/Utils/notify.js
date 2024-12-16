import toast from "react-hot-toast";
const notify=(type,message)=>{
    toast[type](message, {
        duration: 2000,
        position: 'top-center',})
}
export default notify