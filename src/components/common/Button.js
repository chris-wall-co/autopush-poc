import styled from 'styled-components';

export default styled.button`
    padding: 1em;
    background-color: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonFg};
    border: solid 1px transparent;
    border-radius: 4px;
    text-transform: uppercase;
`;