import React, { useState } from 'react';
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api"
import AlertErrors from "../../utils/AlertErrors";
import firebase from "../../utils/Firebase";
import "firebase/auth";
import alertErrors from '../../utils/AlertErrors';

export default function UserEmail(props) {

    const { user, setShowModal, setTitleModal, setContentModal } = props


    const onEdit = () => {
        setTitleModal("Actualizar Email");
        setContentModal(< ChangeEmailForm email={user.email} setShowModal={setShowModal} />)
        setShowModal(true);
    }

    return (
        <div className="user-email" >
            <h3>Email : { user.email }</h3>
            <Button circular onClick={onEdit} >
                Actualizar
            </Button>
        </div>
    )
}


function ChangeEmailForm(props) {

    const { email, setShowModal} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email:"", password: ""});
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if (!formData.email) {
            toast.warning("El email es el mismo");
        } else {
            setIsLoading(true);
            reauthenticate(formData.password).then(() => {
                const currentUser = firebase.auth().currentUser;

                currentUser.updateEmail(formData.email).then(() =>{
                    toast.success("email actualizado correctamente");
                    setIsLoading(false);
                    setShowModal(false);
                    currentUser.sendEmailVerification().then(() => {
                        firebase.auth().signOut();
                    })
                }).catch(err =>{
                    console.log(err);
                    alertErrors(err?.code);
                    setIsLoading(false);
                })
            }).catch( err => {
                console.log(err);
                AlertErrors(err?.code);
                setIsLoading(false);
            })
        }
    }
    return (
        <Form onSubmit={onSubmit} >
            <Form.Field>
                <Input defaultValue ={email} onChange={ e => setFormData({ ...formData, email: e.target.value})} />
            </Form.Field>
            <Form.Field>
                <Input placeholder="contraseña" type={showPassword ? "text": "password"} icon={ <Icon name={showPassword ? "eye slash outline": "eye"} link  onClick={() => setShowPassword(!showPassword)} />}  onChange={ e => setFormData({ ...formData, password: e.target.value})} />
            </Form.Field>
            <Button type="submit" loading={isLoading} >
                Actualizar email
            </Button>
        </Form>
    );
}