import React from "react";

import "normalize.css";
import "./App.scss";
import "./icons/css/entypo.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import MedscribeIntake from "./MedscribeIntake";
import FormEdit from "./FormEdit";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MedscribeIntake />} />
      <Route path="/edit" element={<FormEdit />} />
    </Routes>
  </BrowserRouter>
);

export default App;
