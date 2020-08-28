import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import BannerProceso from "../../components/Prejudicial/BannerProceso";
import "./Preproceso.scss";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);


function Preproceso(props) {

    const { match } = props
    const [preproceso, setPreproceso] = useState(null);

    useEffect(() => {
        db.collection("prejudicial").doc(match?.params?.id).get().then(response => {
            setPreproceso(response.data());
        })
    }, [match])

    return (
        <div className="proceso">
            {preproceso && <BannerProceso proceso={preproceso} />}
            <h2>Mas..info</h2>
        </div>
    )
}

export default withRouter(Preproceso);