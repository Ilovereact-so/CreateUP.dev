import React, { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DevIndex from './components/DevIndex';
import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter
} from "react-router-dom";


export const Index = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate("/")
  },[])
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route exact path='/'  element={<DevIndex element = {0}/>}></Route>
          <Route exact path='/review'  element={<DevIndex element = {1}/>}></Route>
          <Route exact path='/niger'  element={<DevIndex element = {2}/>}></Route>

      </Routes>
  </BrowserRouter>
</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
