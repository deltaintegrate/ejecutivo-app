import React, { useState, useCallback } from 'react';
import { Button, Form, Input, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import NoImage from "../../../assets/png/avatarNoImage.png";
import { toast } from "react-toastify";

import { v4 as uuidv4 } from 'uuid';
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import "firebase/firestore";

import "./UploadProceso.scss";


const db = firebase.firestore(firebase);

export default function UploadPreju(props) {

    const { setShowModal, status } = props
    const [formData, setFormData] = useState(initialValueForm())
    const [banner, seTbanner] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

   
    const file20 = new File([1000],'NoImage.png',{type:'image/png'})


 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDrop = useCallback(acceptedFiles =>{
        const file = acceptedFiles[0];
        setFile(file);
        seTbanner(URL.createObjectURL(file));
    })
    
    const { getRootProps, getInputProps} = useDropzone({
        noKeyboard:true,
        accept:"image/jpeg, image/png",
        onDrop
    })


    const uploadImage = (fileName,data) => {
        const ref = firebase.storage().ref().child(`procesos/${status}/${data}/${fileName}`);
        return ref.put(file);
    }

    const uploadNoImage =  (fileName,data) => {
        const ref = firebase.storage().ref().child(`procesos/${status}/${data}/${fileName}`);
        return ref.put(file20);
    }

    const onSubmit = () =>{
       if(!formData.name){
           toast.warning("añade el nombre del usuario de proceso");
       }else if (file === null){
        setIsLoading(true);
        const fileName = "NoImage";
        uploadNoImage(fileName,formData.name).then(() => {
            console.log("imagen subida correctamente");
            db.collection(status).add({name:formData.name, banner:fileName}).then(() =>{
                toast.success("Proceso creado correctamente");
                setIsLoading(false);
                setShowModal(false);
                resetForm();
            }).catch(() =>{
                toast.error("Error al generar la carpeta");
                setIsLoading(false);
            })
        }).catch(() => {
            toast.error("Error al crear carpeta");
            setIsLoading(false);
        })
       } else {
           setIsLoading(true);
           const fileName = uuidv4();
           console.log(file);
           uploadImage(fileName,formData.name).then(() => {
               console.log("imagen subida correctamente");
               db.collection(status).add({name:formData.name, banner:fileName}).then(() =>{
                toast.success("proceso creado correctamente");
                setIsLoading(false);
                setShowModal(false);
                resetForm();
                }).catch(() =>{
                    toast.error("Error al generar la carpeta");
                    setIsLoading(false);
                    })
            }).catch(() => {
                toast.error("Error al crear carpeta");
                setIsLoading(false);
           })
       }
    }
  

    const resetForm =() => {
        setFormData(initialValueForm());
        setFile(null);
        seTbanner(null);
    }

    return (
       <Form className="add-preju-form" onSubmit={onSubmit} >
           <Form.Field className="preju-banner">
               <div className="banner" {...getRootProps()} style={{backgroundImage: `url('${banner}')`}} />
               <input {...getInputProps()} />
                {!banner && <Image src={NoImage} />}
           </Form.Field>
           <Form.Field className="preju-avatar" >
                <div>
                    Imagen por defecto,ingrese Imagen si desea personalizar la carpeta
                </div>
           </Form.Field>
           <Form.Field>
               <Input placeholder="nombre usuario del proceso" onChange={e =>setFormData({ name: e.target.value})} />
           </Form.Field>
           <Button type="submit" loading={isLoading} > crear carpeta</Button>
       </Form>
    )
}


function initialValueForm() {

    return{
        name:""
    };
   

}
