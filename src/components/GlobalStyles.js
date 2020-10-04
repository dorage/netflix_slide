import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { palette } from '../vars';

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
        overflow-x:hidden;
        overflow-y:hidden;
    }
    #root{
        min-height:100vh;
        
        color:${palette.highlight};
        font-family: 'Oswald', sans-serif;
        font-weight:500;
        background-color:${palette.background};
    }
`;

export default GlobalStyles;
