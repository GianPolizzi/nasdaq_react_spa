import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stock from './component/Stock';
import { useState } from 'react';
import { useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartLine} from '@fortawesome/free-solid-svg-icons'
import Cerca from './component/ricerca/Cerca';
import NomeStock from './component/lista/NomeStock';

const URL_PRINCIPALE = 'https://financialmodelingprep.com/api/v3/profile/';
const API_KEY = 'apikey=';
//05676d086baedbafecf283058e3777ae

//Data aggiornata (nel JSON è vecchia)
const data = new Date();
const dataAgg = (data.getFullYear()+'-'+data.getMonth()+'-'+data.getDate());
const oraAgg = (data.getHours()+':'+data.getMinutes()+':'+data.getSeconds());

const arrayAziende = [
  {sigla : 'AAPL (demo)', nome : 'Apple', prezzo : 300, data : dataAgg, ora : oraAgg, var : 0.1},
  {sigla : 'GOOGL (demo)', nome : 'Google Inc.', prezzo : 200, data : dataAgg, ora : oraAgg, var : 0.2}
]


export default function App() {

  //Hook
  const [listaStock, setListaStock] = useState(arrayAziende);

  const [datiForm, setDatiForm] = useState('Search (Es: GOOGL)');
  const [listaDati, setListaDati] = useState([]);
  const [contatore, setContatore] = useState(0);

  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [msgErr, setMsgErr] = useState(null);

  const clickTopStock = (e) => {
    //e.preventDefault();
    const newStock = [
      {sigla : 'AMZN (demo)', nome : 'Amazon', prezzo : 500, data : dataAgg, var : 0.0}
    ];
    setListaStock(newStock);
  }

  //Fetch funzionante
  const getDati = async(str) => {
    setShowErr(false);
    setLoading(true);
    await fetch(URL_PRINCIPALE+str+'?'+API_KEY)
    .then(res => res.json())
    .then(res => {
      const [data] = res;
      setListaDati(prevStock => ([ ...prevStock, {sigla : data.symbol, nome : data.companyName, prezzo : data.price, data : dataAgg, ora : oraAgg, var : data.lastDiv} ]));
      setLoading(false);
    })
    .catch((err) => {
      console.error('Fetch fallita! Errore: ', err);
      setLoading(false);
      setShowErr(true);
      setMsgErr(err);
    })
  }

  //Salva gli stock nella lista dei Preferiti
  var addListaPreferiti = (idPreferito, stockPreferito) => {
    console.log('Aggiungo alla lista degli stock preferiti: ', stockPreferito);
    setContatore(contatore+1);
    setListaStock(prevPref => (
      [...prevPref, {id : idPreferito, cont : contatore, sigla : stockPreferito.sigla, nome : stockPreferito.nome, prezzo : stockPreferito.prezzo, data : dataAgg, ora : oraAgg, var : stockPreferito.var}])
    );
  }

  //Elimino Stock dalla lista dei preferiti
  const delStock = (id) => {
    //Sfrutto il metodo filter() di JS: costruisce un nuovo array a partire da listaPreferiti
    //escludendo quello con l'id selezionato
    console.log('ID da eliminare: ', id);
    if(id){
      const preferiti = listaStock.filter(elem => {
        console.log('Elem: ', elem, id);
        return elem !== id;
      });
      console.log('Preferiti: ', preferiti);
      setListaStock(preferiti);
    }
  }


  //Dopo il click su Cerca (setDatiForm)
  useEffect(() => {
    if(datiForm !== 'Search (Es: GOOGL)'){
      console.log('Dati trasmessi al padre: ', datiForm);
      //Ricerca del dato
      getDati(datiForm);
    }
  },[datiForm])


  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title'>NASDAQ App Stock Quote <FontAwesomeIcon icon={faChartLine} className='graph-icon fa-1x'></FontAwesomeIcon></h1>
        <div className='search-bar'>
          <Cerca onInputSearch={datiForm} setInputSearch={setDatiForm}></Cerca>
        </div>
        {
          showErr && <p className='loading-error fixed text-center'>{msgErr}</p>
        }
        {
          loading && <p className="loading fixed text-center">Caricamento in corso...</p>
        }
        <div className='container lista-trovati'>
          <section className='lista-stock'>
            <div className="row">
              <div className="col">
                {
                  (listaDati !== [] &&
                  listaDati.map((elem, i) => {
                    return(
                    <NomeStock key={i} datiStock={elem} id={i} setPreferiti={addListaPreferiti}></NomeStock>
                    )
                  })
                  )
                }
              </div>
            </div>
          </section>
        </div>
        <div className='container-fluid stock-preferiti'>
          <section className='lista-preferiti'>
            <button className='btn btn-warning top-stock' onClick={clickTopStock}>Top Stock</button>
            <div className='row mt-3'>
              {
                  listaStock.map((elem, i) => {
                      return (
                        <Stock key={i} datiStock={elem} id={i} deleteStock={delStock}></Stock>
                      )  
                  })
              }
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}