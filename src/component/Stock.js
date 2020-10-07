import React from 'react';
import { useState } from 'react';
import '../component/stock.css'
import { useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartLine} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import Grafico from './grafico/Grafico';

export default function Stock(props) {

    //Hook
    const [dati, setDati] = useState(props.datiStock);
    const [monitoring, setMonitoring] = useState(false);
    const [datiGrafico, setDatiGrafico] = useState([{datetime : props.datiStock.ora, price : props.datiStock.prezzo}]);

    //Costanti
    const colore_prezzo = dati.prezzo>250 ? 'verde' : (dati.prezzo>150 ? 'giallo' : 'rosso');

    const aggiornoStock = () => {
        //Creo una funzione che aggiorna il prezzo in modo randomico
        let random = Math.round(Math.random()*30)+250;
        const data = new Date();
        const oraAgg = (data.getHours()+':'+data.getMinutes()+':'+data.getSeconds());
        
        setDati(prevDati => ({...prevDati, prezzo : random, ora : oraAgg}));
        setDatiGrafico(prevDatiGrafico => [...prevDatiGrafico, {datetime : oraAgg, price : random}]);
    }

    const eliminaStock = () => {
        props.deleteStock(props.datiStock);
    }

    const toggleMonitoring = () => {
        setMonitoring(!monitoring);
    }


    useEffect(() => {
        const bott = document.getElementById('bottone');
        //Se vera
        if(monitoring){
            console.log('Effect: ', monitoring);
            bott.className = 'mostra';
        }
        //Se falsa
        else{
            console.log('Effect: ', monitoring);
            bott.className = 'nascondi';
        }
    },[monitoring])


    //Mi metto in ascolto del cambiamento della props.datiStock
    useEffect(() => {
        //Richiamo metodo necessario per il rendering dell'oggetto
        setDati(props.datiStock);
        //Aggiorno costantemente il valore dello stock (in modo fittizio)
        setInterval(() => aggiornoStock(), 5000);
    },[props.datiStock])

    const diff = (dati.prezzo - props.datiStock.prezzo).toFixed(2);
    const diffPerc = (props.datiStock.prezzo) ? (diff/props.datiStock.prezzo*100).toFixed(1) : 'N/A';


    return(
        <>
        <div className='stock col-md-6'>
                <div className='bodystock m-1 p-3'>
                <FontAwesomeIcon icon={faTimesCircle} className='close circle-icon' onClick={eliminaStock}></FontAwesomeIcon>
                    <div className='row'>
                        <div className='col-sm'>
                            <h2>{dati.sigla}</h2>
                            <p>Nasdaq</p>
                        </div>
                        <div className='col-sm'>
                            <h2 className={colore_prezzo}>{dati.prezzo}$</h2>
                            <p>Data: {dati.data}</p>
                            <p>Ora: {dati.ora}</p>
                        </div>
                        <div className='col-sm'>
                            <h2>{diff}</h2>
                            <p>{diffPerc}%</p>
                        </div>
                        <div className='col-sm'>
                            <FontAwesomeIcon icon={faChartLine} className='stock-icon fa-2x'></FontAwesomeIcon>
                            <br></br>
                            <label className='switch'>
                                <input type='checkbox' id='bottone' className='nascondi' onChange={toggleMonitoring} data-onstyle='info'/>
                                <span className='slider round'></span>
                            </label>
                        </div>
                    </div>
                    <br></br>
                    {
                        (monitoring && 
                            <div className='row bodygrafico'>
                                    <Grafico datiStock={datiGrafico}></Grafico>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}