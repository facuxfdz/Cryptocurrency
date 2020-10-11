import React, { useEffect, useState } from 'react';
import useCrypto from '../hooks/useCrypto';
import useCurrency from '../hooks/useCurrency';
import Error from './Error';
import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';

// Styled components
const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #326ac0;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #66a2fe;
        cursor: pointer;
    }
    &:active{
        background-color: #4790FF;
    }
`;


const Formulario = ({updateCurrency, updateCrypto}) => {

    // States
    const [ cryptolist, SaveCrpytos ] = useState([]); // Has the Crypto Info that comes from de API
    const [ error, updateError ] = useState(false); // Has the actual Error state (Validate)

    // Currencies names and codes to call the API
    const CURRENCIES = [
        { code: 'USD', name: 'U.S Dollar'},
        { code: 'MXN', name: 'Peso Mexicano'},
        { code: 'EUR', name: 'Euro'},
        { code: 'GBP', name: 'British Pound Sterling'},
        { code: 'ARS', name: 'Peso Argentino' } // Apparently takes the Blue Dollar price
    ]
    
    // Custom Hooks
    const [ currency, SelectCurrency ] = useCurrency('Select a currency', '', CURRENCIES); // Has the Form selection
    const [ crypto, SelectCrypto] = useCrypto('Choose your Crypto', '', cryptolist); // Has the API Crypto selection

    // API query
    useEffect( () => {
        const APIquery = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url); 

            SaveCrpytos(result.data.Data);
        }

        APIquery();
    }, []);
    
    // Calculate quote
    const calculate = e => {
        e.preventDefault();

        // Validate
        if(currency === '' || crypto === '' || currency === '-- Select --' || crypto === '-- Select --'){
            updateError(true);
            return;
        }

        // Send data to main component
        updateError(false);

        updateCurrency(currency);
        updateCrypto(crypto);
    }

    return ( 
        <form
            onSubmit={calculate}
        >
            {error 
            
            ? <Error msg='Todos los campos son obligatorios' />
            
            : null}
            <SelectCurrency />

            <SelectCrypto />

            <Button
                type="submit"
                value="Calculate"
            />
        </form>
    );
}
 
Formulario.propTypes = {
    updateCurrency: PropTypes.func.isRequired,
    updateCrypto: PropTypes.func.isRequired
}

export default Formulario;