import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Resetpass = () => {
	const { store, actions } = useContext(Context);

	return ( 
      <div class="container">
          <form>
              <div className="mb-3">
                <label for="exampleInputEmail" class="form-label mt-3">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Repite el Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <button type="submit" className="btn btn-outline-primary submit-login mb-2">Submit</button>
      </form>
      </div>
	);
};