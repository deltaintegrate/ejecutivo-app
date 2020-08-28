import React, { useState, useEffect } from 'react';
import { Menu, Icon, Input } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";
import BasicModal from "../Modal/BasicModal";


import "./MenuLeft.scss";

function MenuLeft( props ) {

    const { user, location } = props;

    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [userAdmin, setUserAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, settitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);


    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location])

    useEffect(() => {
       isUserAdmin(user.uid).then(response =>{
        setUserAdmin(response);
       });
    }, [user])

    const HandlerMenu = (e, menu) => {
       setActiveMenu(menu.to);
    };


    const handlerModal = (type) => {
        switch (type) {
                //case "procesos":
                //settitleModal("nuevo Proceso en prejudicial");
                //setContentModal(<h2>Formulario nuevo prejudicial</h2>);
                //setShowModal(true);
                //break;

                case "judicial":
                    settitleModal("nuevo Proceso en judicial");
                    setContentModal(<h2>Formulario nuevo judicial</h2>);
                    setShowModal(true);
                    break;

                case "post":
                    settitleModal("nuevo Proceso en postjudicial");
                    setContentModal(<h2>Formulario nuevo postjudicial</h2>);
                    setShowModal(true);
                    break;
        
            default:
                settitleModal(null);
                setShowModal(false);
                setContentModal(null);
                break;
        }
    }

    return (
        <>
        <Menu className="menu-left" vertical>
            {userAdmin && (
            <div className="top">
                <Menu.Item>
                    <Input type="text" placeholder="Buscar proceso" />
                </Menu.Item>
                <Menu.Item  as={Link} to="/" name="home" active={ activeMenu === "/"} onClick={HandlerMenu} >
                    <Icon name="home"/> Inicio
                </Menu.Item>
                <Menu.Item as={Link} to="/procesos" name="procesos" active={ activeMenu === "/procesos"} >
                    <Icon name="briefcase"/> Prejudicial
                </Menu.Item>
                <Menu.Item as={Link} to="/judicial" name="judicial" active={ activeMenu === "/judicial"} onClick={HandlerMenu}>
                    <Icon name="balance scale"/> Judicial
                </Menu.Item>
                <Menu.Item as={Link} to="/post" name="post" active={ activeMenu === "/post"} onClick={HandlerMenu}>
                    <Icon name="thumbtack"/>terminados
                </Menu.Item>
            </div>
            )}
            <div className="footer" >
            <Menu.Item as={Link} to="/calendario"name="calendario" active={ activeMenu === "/calendario"} onClick={HandlerMenu}>
                    <Icon name="calendar"/> Calendario
            </Menu.Item>
            <Menu.Item as={Link} to="/biblioteca" name="biblioteca" active={ activeMenu === "/biblioteca"} onClick={HandlerMenu}>
                    <Icon name="book"/> Biblioteca Virtual
            </Menu.Item>
            <Menu.Item as={Link} to="/archivos" name="archivos" active={ activeMenu === "/archivos"} onClick={HandlerMenu}>
                    <Icon name="folder"/> Archivos 
            </Menu.Item>

            </div>
        </Menu>
        <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
            {contentModal}
        </BasicModal>
        </>
    )
}

export default withRouter(MenuLeft);