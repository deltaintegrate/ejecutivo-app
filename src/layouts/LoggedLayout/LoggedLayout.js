import React from 'react';
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes"
import "./LoggedLayout.scss";
import MenuLeft from "../../components/MenuLeft"
import TopBar from "../../components/TopBar";


export default function LoggedLayout(props) {

    const { user, setReloadApp } = props;

    return (
        <Router>
        <Grid className="logged-layout">
            <Grid.Row>
                <Grid.Column width={2}>
                    <MenuLeft user={user} />
                </Grid.Column>
                <Grid.Column className="content" width={14}>
                    <TopBar user = {user}/>
                    <Routes user={user} setReloadApp={setReloadApp} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column className="content" width={2}>
                    <h2>Ejecutivos</h2>
                </Grid.Column>
                <Grid.Column className="content" width={14}>
                    <h2>DIreccion</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Router>
    )
}
