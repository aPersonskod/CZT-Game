import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SettingsModal({needCaption}) {
    const svgStyle = {marginRight:needCaption? '10px' : '0', marginBottom:'4px'};
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={svgStyle}>
                    <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                    <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
                {needCaption && 'Настройки'}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Настройки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Стадия игры</Accordion.Header>
                                <Accordion.Body>
                                    <div style={{width: '100%'}}>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2">Этап:</div>
                                            <Form.Select style={{maxWidth: '230px'}}>
                                                <option value="1">Первый</option>
                                                <option value="2">Второй</option>
                                                <option value="3">Третий</option>
                                            </Form.Select>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="p-2">Раунд:</div>
                                            <Form.Select style={{maxWidth: '230px'}}>
                                                <option value="1">Первый</option>
                                                <option value="2">Второй</option>
                                                <option value="3">Третий</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Сводная таблица</Accordion.Header>
                                <Accordion.Body>
                                    <div style={{width: '100%'}}>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '180px'}}>Время подсветки:</div>
                                            <InputGroup>
                                                <Form.Control
                                                    placeholder="4"
                                                    aria-label="4"
                                                    aria-describedby="basic-addon1"
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Игровой таймер</Accordion.Header>
                                <Accordion.Body>
                                    <div style={{width: '100%'}}>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '180px'}}>Время раунда:</div>
                                            <InputGroup>
                                                <Form.Control
                                                    placeholder="120"
                                                    aria-label="120"
                                                    aria-describedby="basic-addon1"
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Показ критических ошибок</Accordion.Header>
                                <Accordion.Body>
                                    <div style={{width: '100%'}}>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '180px'}}>Перерыв между показами:
                                            </div>
                                            <InputGroup>
                                                <Form.Control
                                                    placeholder="10"
                                                    aria-label="10"
                                                    aria-describedby="basic-addon1"
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '180px'}}>Количество видео за показ:</div>
                                            <InputGroup style={{marginTop: '20px'}}>
                                                <Form.Range/>
                                            </InputGroup>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Нормы расчетных показателей</Accordion.Header>
                                <Accordion.Body>
                                    <div style={{width: '100%'}}>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '230px'}}>Время от явки локомотивной
                                                бригады до отправления с поездом:
                                            </div>
                                            <InputGroup>
                                                <Form.Control/>
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '230px'}}>Средний простой поезда на
                                                станции:
                                            </div>
                                            <InputGroup>
                                                <Form.Control/>
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '230px'}}>Средний простой местного
                                                вагона:
                                            </div>
                                            <InputGroup>
                                                <Form.Control/>
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '230px'}}>Средний простой транзитного
                                                вагона без переработки:
                                            </div>
                                            <InputGroup>
                                                <Form.Control/>
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '230px'}}>Время от прибытия
                                                локомотивной бригады с поездом до сдачи ТПС:
                                            </div>
                                            <InputGroup>
                                                <Form.Control/>
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '230px'}}>План по погрузке:
                                            </div>
                                            <InputGroup>
                                                <Form.Control/>
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-between' style={{marginBottom: '5px'}}>
                                            <div className="p-2" style={{minWidth: '230px'}}>План по выгрузке:
                                            </div>
                                            <InputGroup>
                                                <Form.Control/>
                                            </InputGroup>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Сбросить
                    </Button>
                    <Button variant="primary">Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SettingsModal;
