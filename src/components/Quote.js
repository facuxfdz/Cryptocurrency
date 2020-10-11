import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

// Styled Components
const ResultDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;
const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`;
const Price = styled.p`
    font-size: 30px;
    span{
        font-weight: bold;
    }
`;

const Quote = ({resultQuote}) => {

    // Avoid the first run (the initial state is an empty array)
    if(Object.keys(resultQuote).length === 0) return null;

    return ( 
        <ResultDiv>
            <Price>Price: <span> {resultQuote.PRICE} </span></Price>
            <Info>Highest Day Price: <span> {resultQuote.HIGHDAY} </span> </Info>
            <Info>Lowest Day Price Price: <span> {resultQuote.LOWDAY} </span> </Info>
            <Info>Latest Variation: <span> {resultQuote.CHANGEPCT24HOUR} </span> </Info>
            <Info>Latest Update: <span> {resultQuote.LASTUPDATE} </span> </Info>
        </ResultDiv>
    );
}
 
Quote.propTypes = {
    resultQuote: PropTypes.object.isRequired
}

export default Quote;