import React from "react";
import Form from "react-bootstrap/Form";

function DetailsPage() {
    const rowFix = {
        border: '0px',
        marginRight: 0,
        marginLeft: 0,
        maxWidth: '100%'
    };
    const headerValues = ['Номер', 'Поезд', 'Ошибки'];
    const tableValues = [
        {num: '1', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '2', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '3', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '4', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '5', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
    ];

    const headerValues2 = ['Номер', 'Операция', 'Ошибки'];
    const tableValues2 = [
        {num: '1', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '2', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '3', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '4', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '5', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
    ];

    const headerValues3 = ['Номер', 'Субьект', 'Описание'];
    const tableValues3 = [
        {num: '1', subject: 'Станция', description: ['Остановка поезда у входного сигнала']},
        {num: '2', subject: 'Станция', description: ['Остановка поезда у входного сигнала']},
    ];


    return (
        <>
            <div>
                <div className='row justify-content-center' style={rowFix}>
                    <div className='col col-sm-12 col-lg-8'>
                        <div className='d-flex marginBoxTop'>
                            <h2 className="p-2">Команда:</h2>
                            <Form.Select style={{maxWidth: '230px'}}>
                                <option value="1">Этап 1</option>
                                <option value="2">Этап 2</option>
                                <option value="3">Этап 3</option>
                            </Form.Select>
                        </div>
                        <div className='sectionBox'>
                            <h2 style={{marginBottom: '20px'}}>Отчёт по поездам</h2>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    {headerValues.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {tableValues.map(row =>
                                    <tr key={row.num}>
                                        <td>{row.num}</td>
                                        <td>{row.train}</td>
                                        <td>
                                            <ul>
                                                {row.errors.map(e => <li key={e}>{e}</li>)}
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col col-sm-12 col-lg-8'>
                        <div className='sectionBox'>
                            <h2 style={{marginBottom: '20px'}}>Отчёт по операциям</h2>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    {headerValues2.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {tableValues2.map(row =>
                                    <tr key={row.num}>
                                        <td>{row.num}</td>
                                        <td>{row.train}</td>
                                        <td>
                                            <ul>
                                                {row.errors.map(e => <li key={e}>{e}</li>)}
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col col-sm-12 col-lg-8'>
                        <div className='sectionBox marginBoxBottom'>
                            <h2 style={{marginBottom: '20px'}}>Прочие ошибки</h2>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    {headerValues3.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {tableValues3.map(row =>
                                    <tr key={row.num}>
                                        <td>{row.num}</td>
                                        <td>{row.subject}</td>
                                        <td>
                                            <ul>
                                                {row.description.map(e => <li key={e}>{e}</li>)}
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsPage;
