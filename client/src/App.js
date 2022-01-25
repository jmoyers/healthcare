import React from "react";

import "normalize.css";
import "./App.scss";
import "./icons/css/entypo.css";

import styles from "./Home.module.scss";
import "react-select-search/style.css";
import "./react-selectsearch-custom.scss";
import "react-datetime/css/react-datetime.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import MedscribeIntake from "./MedscribeIntake";
import FormEdit from "./FormEdit";
import Header from "./Header";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className={styles.container}>
        <Header />
        <Routes>
          <Route path="/form/:id/edit" element={<FormEdit />} />
          <Route path="/form/:id/respond" element={<MedscribeIntake />} />
        </Routes>
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
