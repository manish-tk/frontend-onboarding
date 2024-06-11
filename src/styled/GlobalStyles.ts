import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Inter', sans-serif;
        line-height: 1.5;
        font-size: 1rem;
        color: #333;
        background-color: #ececec;
    }

    button, input {
        font-family: inherit;
    }
`;

export default GlobalStyle;
