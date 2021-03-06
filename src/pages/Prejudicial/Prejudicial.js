import React, { useState, useEffect } from 'react';
import { Button, Grid } from "semantic-ui-react";
import UploadProceso from "../../components/Prejudicial/Addprejudicial";
import NoImage from "../../assets/png/avatarNoImage.png";
import BasicModal from "../../components/Modal/BasicModal";
import DeleteProceso from "../../components/Prejudicial/Deleteproceso";
import { map } from "lodash";
import { Link } from "react-router-dom";
//import BasicSliderItems from "../../components/Sliders/BasicSliderItems";

import "./Prejudicial.scss";

import firebase from "../../utils/Firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function Prejudicial(props) {


    const { user } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    const [procesos, setProcesos] = useState([]);
    var status = "prejudicial";

    useEffect(() => {
        db.collection("prejudicial").get().then( response => {
            
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
        // va en el el div de prejubot ---> <BasicSliderItems  data={procesos} folderImage="prejudicial" urlName="prejudicial"/>
       setTitleModal("creacion de carpeta");
       setContentModal(< UploadProceso  setShowModal={setShowModal} status={status} />);
       setShowModal(true);
    }

    const onClickDelete = () => {
        setTitleModal("eliminacion Carpeta");
        setContentModal(< DeleteProceso status={status} />)
        setShowModal(true);
    }
    


    return (
        <div  className="prejudicial">
            <div className="prejutop">
                <h3>Prejudicial</h3>
                <div className="botones" >
                    <Button  onClick={onClickDelete} circular>Eliminar Carpeta</Button>
                    <Button onClick={onClick} circular>Crear Carpeta</Button>
                </div>
            </div>
            <div className="prejubot">
                <Grid>
                    {map(procesos, proceso => (
                        <Grid.Column  key={proceso.id} mobile={8} tablet={4} computer={3}>
                            <RenderProceso proceso={proceso}/>
                        </Grid.Column>  
                    ))}
                </Grid>
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {contentModal}
            </BasicModal>
        </div>
    )
}


function RenderProceso(props){
    const { proceso } = props;
    const [bannerUrl, setBannerUrl] = useState(null)


    useEffect(() => {
        firebase.storage().ref(`procesos/prejudicial/${proceso?.name}/${proceso?.banner}`)
        .getDownloadURL()
        .then(url => {
            if(proceso?.banner === "NoImage"){
                setBannerUrl(NoImage)
            }else{
                setBannerUrl(url)
            }
        })
    }, [])

    return(
        <Link to={`/prejudicial/${proceso.id}`} >
            <div className="prejubot__item" >
                <div 
                className="avatar" 
                style={{backgroundImage: `url('${bannerUrl}')`}}
                />
                <h3>{proceso.name}</h3>
            </div>
        </Link>
    );
}