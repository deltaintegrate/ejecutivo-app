import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Input, Button, Form } from "semantic-ui-react";
import BannerProceso from "../../components/Prejudicial/BannerProceso";
import UploadDocumentos from "../../components/Prejudicial/UploadDocumentos";
import "./Preproceso.scss";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);


function Preproceso(props) {

    const { match } = props
    const [preproceso, setPreproceso] = useState(null);

    console.log(preproceso);
    console.log(match);
    useEffect(() => {
        db.collection("prejudicial").doc(match?.params?.id).get().then(response => {
            setPreproceso(response.data());
        })
    }, [match])

    return (
        <div className="proceso">
            {preproceso && (
            <>
            <BannerProceso proceso={preproceso} />
            <UploadDocumentos match={match} proceso={preproceso}/>
            </>
            )}

            

        </div>
    )
}



export default withRouter(Preproceso);