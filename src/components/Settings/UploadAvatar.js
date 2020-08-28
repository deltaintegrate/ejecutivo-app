import React, { useState, useCallback } from 'react';
import { Image } from "semantic-ui-react";
import NoAvatar from "../../assets/png/perfil.png";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/storage";
import "firebase/auth";



export default function UploadAvatar(props) {

    const { user, setReloadApp } = props;

    const [avatarUrl, setavatarUrl] = useState(user.photoURL);

    const onDrop = useCallback(acceptedFiles =>{
        const file = acceptedFiles[0];
        setavatarUrl(URL.createObjectURL(file));
        uploadImage(file).then(() => {
            updateUserAvatar()
        })

    });
    

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept:"image/jpeg, image/png",
        nokeyboard: true,
        onDrop

    })


    const uploadImage = file =>{
        console.log(file);
        const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
         return ref.put(file);
    };

    const updateUserAvatar= () => {
        firebase.storage().ref(`avatar/${user.uid}`).getDownloadURL().then( async response => {
            await firebase.auth().currentUser.updateProfile({photoURL: response});
            setReloadApp(prevState => !prevState);
        }).catch(() => {
            toast.error("error al actualizar el avatar.")
        })
    }

    return (
        <div className="user-avatar" {...getRootProps()} >
            <input {...getInputProps()} />
            {isDragActive ? (
                <Image src={NoAvatar}/>
            ): (
                <Image src={avatarUrl ? avatarUrl: NoAvatar} />
                )}
            
        </div>
    )
}
