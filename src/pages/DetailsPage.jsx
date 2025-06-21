import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import {apiService} from "./SummaryPage.jsx";
import Button from "react-bootstrap/Button";
import {DownloadTableExcel, useDownloadExcel} from 'react-export-table-to-excel';

function DetailsPage() {
    const trainTableRef = useRef(null);
    const operationTableRef = useRef(null);
    const otherTableRef = useRef(null);
    const trainExcel = {
        currentTableRef: trainTableRef.current,
        filename: "Отчёт по поездам",
        sheet: "Отчёт"
    }

    const operationExcel = {
        currentTableRef: operationTableRef.current,
        filename: "Отчёт по операциям",
        sheet: "Отчёт"
    }

    const otherExcel = {
        currentTableRef: otherTableRef.current,
        filename: "Прочие ошибки",
        sheet: "Отчёт"
    }
    const [excelObject, setExcelObject] = useState(trainExcel);
    const rowFix = {
        border: '0px',
        marginRight: 0,
        marginLeft: 0,
        maxWidth: '100%'
    };
    const headerValues = ['Номер', 'Поезд', 'Ошибки'];
    const headerValues2 = ['Номер', 'Операция', 'Ошибки'];
    const headerValues3 = ['Номер', 'Субьект', 'Описание'];
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState('');
    const [trainTable, setTrainTable] = useState([]);
    const [operationTable, setOperationTable] = useState([]);
    const [anotherTable, setAnotherTable] = useState([]);
    useEffect(() => {
        (async () => {
            //let memberName = 'Команда 2 тест';
            let allMembers = await apiService.getCommands();
            setMembers(allMembers);
            setMember(allMembers[0]);
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            await setTables(member);
        })();
    }, [member]);
    
    const setTables = async (memberName) => {
        let trainReport = await apiService.getTrainDetails(memberName);
        let operationReport = await apiService.getOperationDetails(memberName);
        let anotherReport = await apiService.getAnotherDetails(memberName);
        setTrainTable(trainReport);
        setOperationTable(operationReport);
        setAnotherTable(anotherReport);
        console.log(trainReport);
    }

    const exportToExcel = () => {
/*        const refs = [trainExcel, operationExcel, otherExcel];
        for(let i = 0; i < refs.length; i++){
            setExcelObject(refs[i]);
            onDownload();
        }*/
        onDownload();
    }

    const { onDownload } = useDownloadExcel(trainExcel);
    
    const tableValues = [
        {num: '1', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '2', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '3', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '4', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
        {num: '5', train: 'Centro comercial Moctezuma', errors: ['не допущен до расчетов', 'Пропущен поезд №123']},
    ];

    
    const tableValues2 = [
        {num: '1', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '2', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '3', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '4', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
        {num: '5', train: 'Метка прибытия/отправления №2001', errors: ['время не соответствует заявленному']},
    ];

    
    const tableValues3 = [
        {num: '1', subject: 'Станция', description: ['Остановка поезда у входного сигнала']},
        {num: '2', subject: 'Станция', description: ['Остановка поезда у входного сигнала']},
    ];


    return (
        <>
            <div>
                <div className='row justify-content-center' style={rowFix}>
                    <div className='col col-sm-12 col-lg-8'>
                        <div className='d-flex align-items-center justify-content-between marginBoxTop'>
                            <div className='d-flex align-items-center'>
                                <h3 className="p-2">Команда:</h3>
                                <div>
                                    <Form.Select style={{maxWidth: '230px'}} onChange={e => setMember(e.target.value)}>
                                        {members.map(m => <option key={m} value={m}>{m}</option>)}
                                    </Form.Select>
                                </div>
                            </div>
                            <div>
                                <Button onClick={exportToExcel}>Выгрузить</Button>
                            </div>
                        </div>
                        <div className='sectionBox'>
                            <h4 style={{marginBottom: '20px'}}>Отчёт по поездам</h4>
                            <table className="table table-hover" ref={trainTableRef}>
                                <thead>
                                <tr>
                                    {headerValues.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {trainTable.map(row =>
                                    <tr key={row.num}>
                                        <td>{row.num}</td>
                                        <td style={{maxWidth: '200px'}}>{row.train}</td>
                                        <td>
                                            <p style={{fontWeight: 'bold', marginBottom: '0px'}}>{row.status}</p>
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
                            <h4 style={{marginBottom: '20px'}}>Отчёт по операциям</h4>
                            <table className="table table-hover" ref={operationTableRef}>
                                <thead>
                                <tr>
                                    {headerValues2.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {operationTable.map(row =>
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
                            <h4 style={{marginBottom: '20px'}}>Прочие ошибки</h4>
                            <table className="table table-hover" ref={otherTableRef}>
                                <thead>
                                <tr>
                                    {headerValues3.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {anotherTable.map(row =>
                                    <tr key={row.num}>
                                        <td>{row.num}</td>
                                        <td>{row.subject}</td>
                                        <td>
                                            {row.description}
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
