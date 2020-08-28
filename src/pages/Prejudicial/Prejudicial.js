import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Card, Image} from "semantic-ui-react";
import ModalCarpetas from "../../components/Modal/ModalCarpetas";
import UploadPreju from "../../components/Prejudicial/UploadPreju";
import BasicModal from "../../components/Modal/BasicModal";
import imageusual from "../../assets/png/logo2.png"
import { map } from "lodash";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";

import "./Prejudicial.scss";

import firebase from "../../utils/Firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function Prejudicial(props) {


    const { user, setReloadApp } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    const [procesos, setProcesos] = useState([]);

    useEffect(() => {
        db.collection("prejudicial").get().then((response) => {
            
            const arrayProcesos = [];
            map(response?.docs, procesos => {
                const data = procesos.data();
                data.id =procesos.id;
                arrayProcesos.push(data);
            });
            setProcesos(arrayProcesos);
        })
    }, [])

    const onClick = () => {
       setTitleModal("creacion de carpeta");
       setContentModal(< UploadPreju  setShowModal={setShowModal} />);
       setShowModal(true);
    }
    


    return (
        <div  className="prejudicial">
            <div className="prejutop">
                <h3>Prejudicial</h3>
                <Button onClick={onClick} circular>Crear Carpeta</Button>
            </div>
            <div className="prejubot">
                <BasicSliderItems  data={procesos} folderImage="prejudicial" urlName="prejudicial"/>
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {contentModal}
            </BasicModal>
        </div>
    )
}
