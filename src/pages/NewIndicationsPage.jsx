import React from "react";
import Button from "react-bootstrap/Button";

function NewIndicationsPage() {
    const rowFix = {
        border: '0px',
        marginRight: 0,
        marginLeft: 0,
        maxWidth: '100%'
    };

    const headerValues = ['Номер', 'Наименования показателей', 'Единица измерения', '3 этап'];
    const tableValues = [
        {num:'1', name:'Centro comercial Moctezuma', ismerenie:'sm', etap:'3 этап'},
        {num:'2', name:'Centro comercial Moctezuma', ismerenie:'sm', etap:'3 этап'},
        {num:'3', name:'Centro comercial Moctezuma', ismerenie:'sm', etap:'3 этап'},
        {num:'4', name:'Centro comercial Moctezuma', ismerenie:'sm', etap:'3 этап'},
        {num:'5', name:'Centro comercial Moctezuma', ismerenie:'sm', etap:'3 этап'},
    ];

    return (
        <>
            <div>
                <div className='row justify-content-center' style={rowFix}>
                    <div className='col col-sm-12 col-lg-8'>
                        <div className='sectionBox'>
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
                                        <td>{row.name}</td>
                                        <td>{row.ismerenie}</td>
                                        <td>{row.etap}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <Button variant="primary" className="me-2 marginBoxTop marginBoxBottom">
                            Выгрузить
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewIndicationsPage;
