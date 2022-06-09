import Actor from "./Pages/Actor";
import UseCase from "./Pages/UseCase";
import KTCN from "./Pages/KTCN";
import Salary from "./Pages/Salary";

import PTMP from "./Pages/PTMT";
import { Routes, Route, Link } from "react-router-dom";

import Provider from "./Store/Provider";
import Final from "./Pages/Final";
import { useContext } from "react";
import Context from "./Store/Context";

const App = () => {
  return (
    <div className="app">
      <nav>
        <ul className="something1">
          <li className="something2">
            <Link className="something3" to="/Actor">
              Actor
            </Link>
          </li>
          <li className="something2">
            <Link className="something3" to="/UseCase">
              UseCase
            </Link>
          </li>
          <li className="something2">
            <Link className="something3" to="/PTMP">
              PTMP
            </Link>
          </li>
          <li className="something2">
            <Link className="something3" to="/KTCN">
              KTCN
            </Link>
          </li>
          <li className="something2">
            <Link className="something3" to="/Salary">
              Salary
            </Link>
          </li>
          <li className="something2">
            <Link className="something3" to="/">
              FinalPrice
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/Actor" element={<Actor />} />
        <Route path="/UseCase" element={<UseCase />} />
        <Route path="/PTMP" element={<PTMP />} />
        <Route path="/KTCN" element={<KTCN />} />
        <Route path="/Salary" element={<Salary />} />
        <Route path="/" element={<Final />} />
      </Routes>
    </div>
  );
};

export default App;
