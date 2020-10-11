import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

// Styled Components
const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Selection = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.3rem;
    color: #264653;
    font-family: 'Bebas Neue', cursive;
    transition: background-color .3s ease;
    &:hover {
        cursor: pointer;
        background-color: #CAF0F8;
    }
`;

const Option = styled.option`
    font-family: 'Bebas Neue', cursive;
   
`;

const useCurrency = (label, initialState, options) => {

    // Custom hook state
    const [ state, handleState ] = useState(initialState);

    const Select = () => (
        <Fragment>
            <Label>{label}</Label>
            <Selection
                onChange= {e => { handleState(e.target.value) }}
                value={state}
            >
                <Option>-- Select --</Option>
                {options.map(option => (
                    <Option key={option.code} value={option.code}>{option.name}</Option>
                ))}
               
            </Selection>
        </Fragment>
    );

    // Return state, interface, func that modifies the state
    return [ state, Select, handleState ];
}

export default useCurrency;