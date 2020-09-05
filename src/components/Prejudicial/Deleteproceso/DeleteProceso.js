import React, {useState, useEffect} from 'react';
import { Form, Dropdown, Button, Input } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import { map } from "lodash";
import { toast } from "react-toastify";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebase);






export default function DeleteProceso(props) {

    const { status } = props

    const [Proceso, setProceso] = useState([]);
    const [formData, setFormData] = useState(initialValueForm())
    console.log(status);

    useEffect(() => {
        db.collection(status).get().then( response =>{
            const arrayProcesos = []
            map(response?.docs, procesos => {
                const data = procesos.data();
                arrayProcesos.push({
                    key: procesos.id,
                    value: procesos.id,
                    text: data.name
                });
            });
            setProceso(arrayProcesos);
        }).catch(

        )

    }, [])



    const onClick = () =>{
        db.collection(status).doc(formData.id).delete().then(sucess => {
            toast.success("proceso borrado correctamente");
        }).catch(error => {
            toast.warning("Error en borrar el proceso");
        });

        
    }

    return (
        <Form>
            <Form.Field>
                <Dropdown
                 placeholder='Selecciona proceso a borrar'
                 fluid
                 search
                 selection
                 options={Proceso}
                 lazyLoad
                 onChange={(e,data) => setFormData({ ...formData, id: data.value})}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={onClick} circular > Eliminar Carpeta</Button>
            </Form.Field>
        </Form>
    )
}


function initialValueForm() {
    return {
        id: "",
        name:"",

    }
}