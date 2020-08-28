import React from 'react';
import { Switch, Route } from "react-router-dom";

//pages
import Home from "../pages/home";
import Prejudicial from "../pages/Prejudicial";
import Settings from "../pages/Settings";
import Preproceso from "../pages/Preproceso";


export default function routes(props) {

    const { user, setReloadApp } = props;


    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/procesos" exact>
                < Prejudicial user={user} setReloadApp={setReloadApp} />
            </Route>
            <Route path="/judicial" exact>
                <h1>Bienvenido a Judicial</h1>
            </Route>
            <Route path="/post" exact>
                <h1>Bienvenido a Procesos Terminados</h1>
            </Route>
            <Route path="/calendario" exact>
                <h1>Calendario Oficina 2020</h1>
            </Route>
            <Route path="/biblioteca" exact>
                <h1>Biblioteca de Archivos virtuales</h1>
            </Route>
            <Route path="/archivos" exact>
                <h1>Archivos referentes </h1>
            </Route>
            <Route path="/settings" exact>
                <Settings user={user} setReloadApp={setReloadApp} />
            </Route>
            <Route path="/prejudicial/:id" exact>
                <Preproceso />
            </Route>
    
        </Switch>
    )
}
