import { toast } from "react-toastify";

export default function alertErrors(type) {

    switch (type) {
        case "auth/wrong-password":
            toast.warning("la contraseña no es valida");
            break;
        
        case "auth/email-already-in-use":
                toast.warning("el nuevo email ya esta en uso");
                break;
    
        default:
            toast.warning("Error del servidor, intentelo mas tarde")
            break;
    }
}