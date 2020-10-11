import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import image from './cryptomonedas.png';
import Quote from './components/Quote';
import styled from '@emotion/styled';
import axios from 'axios';

// Styled Components
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 990px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  // States
  const [ currency, updateCurrency ] = useState(''); // Has the selected currency in the form 
  const [ crypto, updateCrypto ] = useState(''); // Has the selected crypto in the form
  const [ resultQuote, updateResult ] = useState({}); // Has the object which contains info about crypto linked with the choosed currency
  const [ loading, updateLoading ] = useState(false);

  useEffect( () => {

    const calculateCrypto = async () => { // When the form submit is done

      // Avoid the first run 
      if(currency === '') return;

      // API query
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
      const result = await axios.get(url);
      updateLoading(true);
      
      // Hiding Spinner
      setTimeout( () => {

        updateLoading(false);

        updateResult(result.data.DISPLAY[crypto][currency]);
      }, 3000);
      
    }

    calculateCrypto();
  }, [currency, crypto]);

  // Show Spinner or Result (conditional component loading)
  const Component = (loading) ? <Spinner /> : <Quote resultQuote={resultQuote} />

  return (
    <Contenedor>
      <div>
        <Image 
          src={image}
          alt="Crypto Image"
        />
      </div>
      <div>
        <Heading>Quote cryptocurrencies instantly</Heading>
      
        <Formulario 
          updateCurrency={updateCurrency}
          updateCrypto={updateCrypto}
        />

        {Component}
      </div>
    </Contenedor>
  );
}



export default App;
