import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import './nomestock.css';

export default function NomeStock(props){

    const addPreferiti = () => {
        //props.setPreferiti(props.id);
        props.setPreferiti(props.id, props.datiStock);
    }
    return(
        <>
        <div className='nome-stock' onClick={addPreferiti}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-stock fa-1x'> </FontAwesomeIcon>
             {props.datiStock.sigla}  -  {props.datiStock.nome}
        </div>
        </>
    )
}