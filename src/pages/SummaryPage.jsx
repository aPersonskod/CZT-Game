import {useState, useEffect} from "react";
import TimerPage from "./TimerPage.jsx";
import ApiService from "../services/ApiService.js";
export const apiService = new ApiService();

function SummaryPage() {
    const rowFix = {
        border: '0px',
        marginRight: 0,
        marginLeft: 0,
        maxWidth: '100%'
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            setData(await apiService.getSummary());
            console.log(await apiService.getSummary());
        })();
    }, []);
    
    const headerValues = ['Команда', 'Прибытие поездов', 'Отправлено поездов', 'Итог'];
    const tableValues = [
        {name:'Alfreds Futterkiste1', arrival:'5', departures:'0'},
        {name:'Alfreds Futterkiste2', arrival:'4', departures:'2'},
        {name:'Alfreds Futterkiste3', arrival:'6', departures:'0'},
        {name:'Alfreds Futterkiste4', arrival:'7', departures:'0'},
        {name:'Alfreds Futterkiste5', arrival:'3', departures:'1'},
    ];

    return (
        <>
            <div>
                <div className='row' style={rowFix}>
                    <div className='col col-sm-12 col-lg-5'>
                        <div className='sectionBox'>
                            <TimerPage/>
                        </div>
                    </div>
                    <div className='col col-sm-12 col-lg-7'>
                        <div className='sectionBox'>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    {headerValues.map(h => <th key={h}>{h}</th>)}
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {data.map((row, i) =>
                                    <tr key={i}>
                                        <td>{row.name}</td>
                                        <td>{row.arrival}</td>
                                        <td>{row.departures}</td>
                                        <td>{row.sum}</td>
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

export default SummaryPage;
