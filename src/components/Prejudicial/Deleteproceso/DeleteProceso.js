import React, {useState, useEffect} from 'react';
import { Form, Dropdown, Button } from "semantic-ui-react";
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
    const { value } = this.state;
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
        console.log("carpeta de proceso borrada");
        console.log(formData)
        console.log(value);
        
        // var desertRef = firebase.storage().ref().child(`${status}/`)

        // // Delete the file
        // desertRef.delete().then(function() {
        // // File deleted successfully
        // }).catch(function(error) {
        // // Uh-oh, an error occurred!    
        // });

        // db.collection(status).doc(formData.id).delete().then(sucess => {
            
        //     toast.success("proceso borrado correctamente");
        //     console.log("Document successfully deleted!");
        // }).catch(error => {
        //     console.error("Error removing document: ", error);
        //     toast.warning("Error en borrar el proceso");
        // });

        
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
                 onChange={(e,data,{value}) => setFormData({ ...formData, id: data.value, name:this.value })}
                 value={value}
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