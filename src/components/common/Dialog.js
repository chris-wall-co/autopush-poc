import styled from 'styled-components';

export default styled.dialog`
    display: flex;
    flex-flow: column nowrap;
    padding: 2em;
    background-color: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonFg};
    border-radius: 4px;
    transition: all .25s ease;
    opacity: 0;
    width: 50%;

    &[open] {
        opacity: 1;
    }
`;
