import React, {useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Orders from "./pages/Orders";

function App() {
    return (
        <div className="App">

            <Router>
                <Routes>
                    <Route exact path="/" element={<Orders/>}/>
                    {/*<Route path="/orders/:id/view" element={<ViewOrder/>}/>*/}
                    {/*<Route path="/orders/:id" element={<EditOrder/>}/>*/}
                    {/*<Route path="/orders/:id/detail" element={<OrderDetail/>}/>*/}
                </Routes>
            </Router>
            {/*<OrderForm/>*/}
        </div>
    );
}

export default App;
