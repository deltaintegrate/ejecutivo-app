import React, { useState, useEffect } from 'react';
import firebase from "../../../utils/Firebase";
import NoImage from "../../../assets/png/avatarNoImage.png"
import "firebase/storage";


import "./BannerProceso.scss";

export default function BannerProceso(props) {

    const { proceso } = props
    const [BannerUrl, setBannerUrl] = useState(null);


    useEffect(() => {
       firebase.storage().ref(`procesos/prejudicial/${proceso?.name}/${proceso?.banner}`).getDownloadURL().then( url => {
           if(proceso?.banner === "NoImage"){
               setBannerUrl(NoImage)
           }else{
               setBannerUrl(url)
           }
       });
    }, [proceso])

    return (
        <div className="banner-proceso" style={{backgroundImage: `url('${BannerUrl}')`}}>
            <div className="banner-proceso__gradient" />
            <div className="banner-proceso__info" >
                <h4>PROCESO</h4>
                <h1>{proceso.name}</h1>

            </div>
        </div>
    )
}
