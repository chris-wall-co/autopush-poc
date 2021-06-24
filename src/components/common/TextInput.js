import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

const Input = styled.input`
    border-radius: 4px;
    border: solid 1px ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.formFg};
    background-color: transparent;
    width: 100%;
    padding: 1em;
`;

const Label = styled.label`
    font-size: .75em;
    margin-bottom: 1em;
    color: ${({ theme }) => theme.bodyBg};
`;

export default ({ id, label, ...rest }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Input id={id} name={id} {...rest} />
        </Container>
    );
}