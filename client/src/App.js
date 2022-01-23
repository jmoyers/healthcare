import React from "react";

import "normalize.css";
import "./App.scss";
import "./icons/css/entypo.css";

import styles from "./Home.module.scss";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import MedscribeIntake from "./MedscribeIntake";
import FormEdit from "./FormEdit";
import Header from "./Header";

const App = () => (
  <BrowserRouter>
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<MedscribeIntake />} />
        <Route path="/edit" element={<FormEdit />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
