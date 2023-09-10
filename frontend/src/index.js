import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter} from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <BrowserRouter>
  <ChatProvider>
   
   
    <ChakraProvider>
       
   
    <App />
     </ChakraProvider>
     </ChatProvider>
     </BrowserRouter>,
     </React.StrictMode>
  
  

);


