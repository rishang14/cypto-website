import { ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App'; 
import {BrowserRouter} from "react-router-dom"; 
import {ChakraProvider} from "@chakra-ui/react"; 
import ColorModeSwitcher from './ColorModeSwitcher';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode> 
    <ColorModeScript />  
    <BrowserRouter>
    <ChakraProvider  theme={theme}> 
      <App />
      <ColorModeSwitcher/>
    </ChakraProvider>
    </BrowserRouter>
   
  </StrictMode>
);
 
export const server="https://api.coingecko.com/api/v3";