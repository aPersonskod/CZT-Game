import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import {useMediaQuery} from 'react-responsive'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Link = ({id, children, title, variant, onClick}) => (
    <OverlayTrigger
        placement="bottom"
        delay={{show: 250, hide: 400}}
        overlay={<Tooltip id={id}>{title}</Tooltip>}>
        <Button variant={variant} onClick={onClick}>{children}</Button>
    </OverlayTrigger>
);

function OperationDuration() {
    const headerValues = ['Параметр', 'Значение', 'Ед. изм.'];
    const tableValues = [
        {parameter: 'Техническое обслуживание вагонов', value: '46', measurementUnit: 'минут'},
        {parameter: 'Смена бригады', value: '14', measurementUnit: 'минут'},
        {parameter: 'Техническое обслуживание вагонов', value: '46', measurementUnit: 'минут'},
        {parameter: 'Смена бригады', value: '14', measurementUnit: 'минут'},
        {parameter: 'Техническое обслуживание вагонов', value: '46', measurementUnit: 'минут'},
        {parameter: 'Смена бригады', value: '14', measurementUnit: 'минут'},
    ];
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                {headerValues.map(h => <th key={h}>{h}</th>)}
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {tableValues.map((row, i) =>
                                <tr key={i}>
                                    <td>{row.parameter}</td>
                                    <td>{row.value}</td>
                                    <td>{row.measurementUnit}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function Arrival() {
    const headerValues = ['Поезд', 'Тип', 'Время'];
    const tableValues = [
        {train: '2001', type: ['Смена локомотива', 'Смена на заводе'], time: '10:30:00'},
        {train: '2002', type: ['Смена локомотива', 'Смена на заводе'], time: '11:30:00'},
        {train: '2004', type: ['Смена локомотива', 'Смена на заводе'], time: '12:30:00'},
        {train: '2005', type: ['Смена локомотива', 'Смена на заводе'], time: '13:30:00'},
        {train: '2007', type: ['Смена локомотива', 'Смена на заводе'], time: '15:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
        {train: '2009', type: ['Смена локомотива', 'Смена на заводе'], time: '17:30:00'},
    ];
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                {headerValues.map(h => <th key={h}>{h}</th>)}
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {tableValues.map((row, i) =>
                                <tr key={i}>
                                    <td>{row.train}</td>
                                    <td>
                                        <Form.Select>
                                            {row.type.map((t, i) =>
                                                <option key={i} value={t}>{t}</option>
                                            )}
                                        </Form.Select>
                                    </td>
                                    <td>{row.time}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function Departure() {
    const headerValues = ['Поезд', 'Время'];
    const tableValues = [
        {train: '2001', time: '10:30:00'},
        {train: '2002', time: '11:30:00'},
        {train: '2004', time: '12:30:00'},
        {train: '2005', time: '13:30:00'},
        {train: '2007', time: '15:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
        {train: '2009', time: '17:30:00'},
    ];
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                {headerValues.map(h => <th key={h}>{h}</th>)}
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {tableValues.map((row, i) =>
                                <tr key={i}>
                                    <td>{row.train}</td>
                                    <td>{row.time}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function ChangeDataModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isTabletOrMobile = useMediaQuery({query: '(max-width: 991px)'});
    const isBigScreen = useMediaQuery({query: '(min-width: 992px)'});
    const participants = ['3 этап', '2 этап', '1 этап', '0 этап', '-1 этап',];
    const stations = ['А', 'Б', 'В'];
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                     style={{marginRight: '10px', marginBottom: '4px'}}>
                    <path
                        d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
                    <path
                        d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
                Изменение исходных данных
            </Button>

            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Изменения исходных данных</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={7} lg={2}>
                                {isTabletOrMobile &&
                                    <div className='d-flex'>
                                        <div className='p-2'>Участники:</div>
                                        <Form.Select style={{marginBottom: '10px'}}>
                                            {participants.map(p =>
                                                <option key={p} value={p}>{p}</option>
                                            )}
                                        </Form.Select>
                                    </div>
                                }
                                {isBigScreen &&
                                    <div>
                                        <div className='p-2'>Участники:</div>
                                        <Form.Select style={{marginBottom: '10px'}}>
                                            {participants.map(p =>
                                                <option key={p} value={p}>{p}</option>
                                            )}
                                        </Form.Select>
                                    </div>
                                }
                            </Col>
                            <Col xs={5} lg={2}>
                                {isTabletOrMobile &&
                                    <div className='d-flex'>
                                        <div className='p-2'>Станции:</div>
                                        <Form.Select style={{marginBottom: '10px'}}>
                                            {stations.map(p =>
                                                <option key={p} value={p}>{p}</option>
                                            )}
                                        </Form.Select>
                                    </div>
                                }
                                {isBigScreen &&
                                    <div>
                                        <div className='p-2'>Станции:</div>
                                        <Form.Select style={{marginBottom: '10px'}}>
                                            {stations.map(p =>
                                                <option key={p} value={p}>{p}</option>
                                            )}
                                        </Form.Select>
                                    </div>
                                }
                            </Col>
                            <Col xs={12} lg={8}>
                                <Tabs
                                    defaultActiveKey="operation-duration"
                                    id="justify-tab"
                                    className="mb-3"
                                    justify
                                >
                                    <Tab eventKey="operation-duration" title="Длительность операции">
                                        <OperationDuration/>
                                    </Tab>
                                    <Tab eventKey="arrival" title="Прибытие">
                                        <Arrival/>
                                    </Tab>
                                    <Tab eventKey="departure" title="Отправление">
                                        <Departure/>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Link id={1} title={'Сохранить'} variant={'primary'} onClick={handleClose}
                          children={
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-floppy2-fill" viewBox="0 0 16 16">
                                  <path d="M12 2h-2v3h2z"/>
                                  <path
                                      d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"/>
                              </svg>
                          }
                    ></Link>
                    <Link id={1} title={'Выгрузить'} variant={'secondary'} onClick={handleClose}
                          children={
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-upload" viewBox="0 0 16 16">
                                  <path
                                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                  <path
                                      d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                              </svg>
                          }
                    ></Link>
                    <Link id={1} title={'Загрузить'} variant={'secondary'} onClick={handleClose}
                          children={
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-download" viewBox="0 0 16 16">
                                  <path
                                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                  <path
                                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                              </svg>
                          }
                    ></Link>
                    <Button variant="primary">Общий сброс</Button>
                    <Button variant="primary">Сброс</Button>
                    <Button variant="primary">Применить ко всем</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangeDataModal;
