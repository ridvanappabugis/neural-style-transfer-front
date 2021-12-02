import {  Routes, Route, BrowserRouter } from "react-router-dom"

import './App.css';
import NotFound from "./pages/exception/NotFound";
import Error from "./pages/exception/Error";
import Home from "./pages/home/Home";
import Stylize from "./pages/stylize/Stylize";
import React from "react";
import Artwork from "./pages/artwork/Artwork";
import Modal from 'react-modal';
import Search from "./pages/search/Search";

function App() {
  Modal.setAppElement('#root');

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/500" element={<Error />} />
              <Route path="/artwork/:id" element={<Artwork />} />
              <Route path="/stylize" element={<Stylize />} />
              <Route path="/search" element={<Search />} />
              {/*<Route path="/artists"><Artists baseUrl={BASE_URL} /></Route>*/}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
