import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Input, Button, Form } from "semantic-ui-react";
import BannerProceso from "../../components/Prejudicial/BannerProceso";
import "./Preproceso.scss";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);


function Preproceso(props) {

    const { match } = props
    const [preproceso, setPreproceso] = useState(null);
    const [formData, setFormData] = useState(initialValue())

    console.log(preproceso);
    useEffect(() => {
        db.collection("prejudicial").doc(match?.params?.id).get().then(response => {
            setPreproceso(response.data());
        })
    }, [match])

    return (
        <div className="proceso">
            {preproceso && <BannerProceso proceso={preproceso} />}
            
            <Form>
                <Form.Field>
                    <Input placeholder="registro civil"></Input>
                </Form.Field>
                <Form.Field>
                    <Input placeholder="registro civil"></Input>
                </Form.Field>
                <Form.Field>
                    <Input placeholder="registro civil"></Input>
                </Form.Field>
            </Form>
            

        </div>
    )
}


function initialValue(params) {
    return {

    }
}

export default withRouter(Preproceso);