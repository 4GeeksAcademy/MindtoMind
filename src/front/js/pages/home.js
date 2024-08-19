import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

	return (
    <div className="container">
        <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://www.cil.com.ve/MTM/images/ia-salut.png" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Cada día es una nueva oportunidad para reinventarme</h5>
            <p>La ansiedad puede hacernos sentir atrapados en un ciclo de preocupaciones y miedos, pero esta frase nos ayuda a recordarnos a nosotros mismos que cada día es una nueva oportunidad.</p>
          </div>
        </div>
        <div class="carousel-item">
        <img src="https://www.cil.com.ve/MTM/images/ansiedad-social-tratamiento.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Respiro profundo y suelto lo que no puedo controlar</h5>
            <p>El acto de respirar profundo puede ser de gran ayuda para calmar la ansiedad.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://www.cil.com.ve/MTM/images/image.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Estoy en un proceso de crecimiento y aprendizaje</h5>
            <p>Esta frase nos ayuda a recordarnos a nosotros mismos que estamos en constante evolución, y que todos los desafíos que enfrentamos, incluyendo la ansiedad, son oportunidades para crecer y aprender.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

</div>
		);
};
