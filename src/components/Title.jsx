import React from 'react';
import styled from 'styled-components';



const Title = (props) => {
    const TitleText = styled.h1`
    font-weight: bolder;
    font-size: 40px;
    color: ${props.titleText.color}
`;

    const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
    return (
        <TitleContainer>
            <TitleText> {props.titleText.text} </TitleText>
        </TitleContainer>
    )
}

export default Title;
