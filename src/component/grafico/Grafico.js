import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, ReferenceLine} from 'recharts';

export default function Grafico(props){
    return(
        <>
        <h2 className='ml-5 mb-4'>Andamento variazione prezzo</h2>
        <LineChart width={600} height={300} data={props.datiStock} 
        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
            <XAxis dataKey='datetime' stroke='#fff'></XAxis>
            <YAxis stroke='#fff'
            /*
            domain={[
                dataMin => ((dataMin-dataMin*2/100).toFixed(2)),
                dataMax => ((dataMax+dataMax*2/100).toFixed(2))
            ]}
            */
            ></YAxis>
            <CartesianGrid stroke='#ccc' strokeDasharray='4 4'></CartesianGrid>
            <Tooltip/>
            <Legend/>
            <ReferenceLine y={150} label='' stroke='red'></ReferenceLine>
            <Line type='monotone' dataKey='price' stroke='#248bcf'></Line>
        </LineChart>
        </>
    )
}