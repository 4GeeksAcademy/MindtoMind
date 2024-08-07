import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="carouselExampleIndicators" class="carousel slide">
  			<div class="carousel-indicators">
    		<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    		<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    		
  		</div>
  		<div class="carousel-inner">
    	<div class="carousel-item active">
      		<img src="https://www.cil.com.ve/MTM/images/handtohand.png" class="d-block h-100 w-100" alt="..." />
    	</div>
    	<div class="carousel-item">
      		<img src="https://www.cil.com.ve/MTM/images/ia-salut.png" class="d-block h-100 w-100" alt="..." />
    	</div>
    	
  		</div>
  		<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    	<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    	<span class="visually-hidden">Previous</span>
  		</button>
  		<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    		<span class="carousel-control-next-icon" aria-hidden="true"></span>
    		<span class="visually-hidden">Next</span>
  		</button>
		</div>
	);
};
