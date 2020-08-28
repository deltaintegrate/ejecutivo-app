import React from 'react';
import { Image, Card, Input, Button} from "semantic-ui-react";

import "./ModalCarpetas.scss";

export default function ModalCarpetas(props) {

    const { title, userImage, estadoProceso } = props;


    return (
        <div className="despliegue">
                <Card >
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src={userImage}
                            />
                        <Card.Header>{title}</Card.Header>
                        <Card.Meta>Carpeta {title}</Card.Meta>
                    </Card.Content>
                     <Card.Content extra>
                        <div className="prejudicial-estado">
                            <h3>Estado: <strong>{estadoProceso}</strong></h3>
                        </div>
                    </Card.Content>
                </Card>
        </div>
    )
}
