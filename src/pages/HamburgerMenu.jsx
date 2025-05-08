import { useState } from 'react';
import {NavLink} from "react-router";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AppService from "../services/AppService.js";
import SettingsModal from "./SettingsModal.jsx";
import ChangeDataModal from "./ChangeDataModal.jsx";
export const appService = new AppService();
function HamburgerMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>ЦЗТ Игра</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex justify-content-between flex-column' style={{height:'100%'}}>
                        <div className='hamburger-menu'>
                            <ul>
                                {appService.pages.map((p, i) =>
                                    <li key={i+10}>
                                        <NavLink to={p.path} key={i} onClick={handleClose}
                                                 style={({isActive}) => ({
                                                     color: isActive ? 'black' : '#797979',
                                                     backgroundColor: isActive ? '#F5F7F9' : '',
                                                     borderRadius: isActive ? '20px' : ''
                                                 })}
                                        >{p.header}</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <div style={{marginBottom:'10px'}}>
                                <SettingsModal needCaption={true}/>
                            </div>
                            <ChangeDataModal/>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default HamburgerMenu;
