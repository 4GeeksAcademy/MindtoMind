import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Home2 } from "../component/Home2";
import { Homecarousel } from "../component/homecarousel";

export const Home = () => {
  const { store, actions } = useContext(Context);

	return (
  <div className="no-horizontal-scroll">
    <div>
      
      <Homecarousel/>

      <Home2/>

  </div>
</div>
		);
};
