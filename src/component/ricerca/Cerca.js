import React, { useState } from 'react';

export default function Cerca(props) {

    //Hook (serve per svuotare il campo input di ricerca)
    const [campoRicerca, setCampoRicerca] = useState(props.onInputSearch);

    //Al variare del campo input salva value nel campoRicerca
    const onInputChange = (e) => {
        setCampoRicerca(e.target.value);
        //props.setInputSearch(e.target.value);
    }
/*
    //Mi metto in ascolto di campoRicerca (ridondante: questo lo sta facendo onInputChange)
    useEffect(() => {
        setCampoRicerca(campoRicerca);
        //props.setInputSearch(campoRicerca);
        console.log('UseEffect(Cerca): ',campoRicerca);
    },[campoRicerca])
*/

    //onSubmit del form
    const invioForm = (e) => {
        e.preventDefault();
        props.setInputSearch(campoRicerca);
        //-->useEffect()-->getDati();
    }


    return(
        <>
        <div className='row'>
            <form className='form-inline' onSubmit={invioForm}>
                <div className='form-group'>
                    <input type='text' name='cerca' placeholder={campoRicerca} onChange={onInputChange} className='form-control mb-4 mr-sm-2'></input>
                </div>
                <button type='submit' className='btn btn-primary mb-4'>Cerca</button>
            </form>
        </div>
        </>
    )
}