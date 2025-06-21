import React, {useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import {apiService} from "./SummaryPage.jsx";
import Form from "react-bootstrap/Form";
import {useDownloadExcel} from "react-export-table-to-excel";

function NewIndicationsPage() {
    const rowFix = {
        border: '0px',
        marginRight: 0,
        marginLeft: 0,
        maxWidth: '100%'
    };

    const tableRef = useRef(null);
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState('');
    const [tableData, setTableData] = useState([]);

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
        let tableReport = await apiService.getNewIndicators(memberName);
        setTableData(tableReport);
        console.log(tableReport);
    }

    const exportToExcel = () => {
        onDownload();
    }

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Отчёт по новым показателям",
        sheet: "Отчёт"
    });

    const headerValues = ['Номер', 'Наименования показателей', 'Единица измерения', 'Значение'];
    const tableValues = [
        {num:'1', name:'Centro comercial Moctezuma', ismerenie:'sm'},
        {num:'2', name:'Centro comercial Moctezuma', ismerenie:'sm'},
        {num:'3', name:'Centro comercial Moctezuma', ismerenie:'sm'},
        {num:'4', name:'Centro comercial Moctezuma', ismerenie:'sm'},
        {num:'5', name:'Centro comercial Moctezuma', ismerenie:'sm'},
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
                        <div className='sectionBox marginBoxBottom'>
                            <h4 style={{marginBottom: '20px'}}>Показатели невыполненных норм</h4>
                            <table className="table table-hover" ref={tableRef}>
                                <thead>
                                <tr>
                                    {headerValues.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {tableData.map(row =>
                                    <tr key={row.num}>
                                        <td>{row.num}</td>
                                        <td>{row.name}</td>
                                        <td>{row.measurement}</td>
                                        <td>{row.value}</td>
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

export default NewIndicationsPage;
