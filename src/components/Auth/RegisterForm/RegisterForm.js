import React, {useState} from 'react';
import { Button , Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";

import firebase from "../../../utils/Firebase";

import "firebase/auth";

import "./RegisterForm.scss";


export default function RegisterForm( props ) {
    
    const { setSelectedForm } = props;
    const [FormData, setFormData]  = useState(defaultValueForm());
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading,setIsLoading] = useState(false);


    const handlerShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    const onChange = e => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {

        
        setFormError({});
        let errors = {};
        let formOk = true;

        if(!validateEmail(FormData.email)){
            errors.email =true;
            formOk = false;
        }

        if(FormData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }

        if(!FormData.username){
            errors.username = true;
            formOk = false;
        }

        setFormError(errors);

        if(formOk) {
            setIsLoading(true);
            firebase.auth().createUserWithEmailAndPassword(FormData.email, FormData.password).then(() => {
                toast.success("registro completado");
                changeUserName();
                sendVerificationEmail();
                
            }).catch(()=> {
                toast.error("Error al crear la cuenta.");
            }).finally(()=>{
                setIsLoading(false);
                setSelectedForm(null);
            })
        }
    }


    const changeUserName = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: FormData.username
        }).catch(() => {
            toast.error("error asignar el nombre de usuario");
        })
    }

    const sendVerificationEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            toast.success("se ha enviado email de verificacion");
        }).catch(() =>{
            toast.error("error al enviar el email de verificacion");
        })
    }

    return (
        <div className="register-form">
            <h1>Registrate para tener todo de contenido de la oficina</h1>
                <Form onSubmit={onSubmit} onChange={onChange}>
                    <Form.Field>
                        <Input 
                        type="text"
                        name="email"
                        placeholder="Correo electronico"
                        icon="mail outline"
                        error={formError.email} 
                        />
                        {formError.email && (
                            <span className="error-text">Correo Electronico no valido.</span>
                        )}
                    </Form.Field>
                    <Form.Field>
                        <Input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        error={formError.password} 
                        icon={ showPassword ? (
                            <Icon name= "eye slash outline" link onClick={handlerShowPassword} />
                            ) : (
                                <Icon name= "eye" link onClick={handlerShowPassword} />
                            ) }
                        />
                        {formError.password && (
                            <span className="error-text">Contraseña inferior a 5 caracteres.</span>
                        )}
                    </Form.Field>
                    <Form.Field>
                        <Input 
                        type="text"
                        name="username"
                        placeholder="¿Como deberiamos llamarte?"
                        error={formError.username}
                        icon="user circle outline"

                        />
                        {formError.username && (
                            <span className="error-text">Introduce un nombre</span>
                        )}
                    </Form.Field>
                    <Button type="submit" loading={isLoading}>
                        Continuar
                    </Button>
                </Form>

                <div className="register-form__options">
                    <p onClick={()=> setSelectedForm(null)}>Volver</p>
                    <p>
                        ¿ya tienes cuenta de ejecutivos?{" "}
                        <span onClick={()=> setSelectedForm("login")}>Iniciar sesion</span>
                    </p>
                </div>
            
        </div>
    )
}

function defaultValueForm(){

    return {
        email: "",
        password: "",
        username: ""


    }
}
