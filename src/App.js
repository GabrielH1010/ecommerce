import React from 'react';
import { GlobalStyle } from './styles/globalStyle';
import Home from './page'
import { ToastContainer } from 'react-toastify';
import './styles/fontProvider.css';
import "react-toastify/dist/ReactToastify.css";

const App = () => (
    <div className="App">
      <GlobalStyle />
      <Home/>
      <ToastContainer />

    </div>
  );

export default App;