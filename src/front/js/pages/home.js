import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

	return (
    <div>
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
    <div className="container d-flex">
    
    <div class="left mb-0 pb-0 col-4">
      <div>
        <h2>Interconexión entre Ansiedad y Depresión</h2>
        <p>
            La ansiedad y la depresión son condiciones que a menudo coexisten, lo que complica el diagnóstico y el tratamiento. La ansiedad puede ser un precursor de la depresión, y viceversa. Las personas que experimentan ansiedad pueden sentirse abrumadas por sus miedos y preocupaciones, lo que puede llevar a una disminución de la motivación y la energía, contribuyendo a sentimientos de desesperanza y tristeza. Del mismo modo, aquellos que sufren de depresión pueden desarrollar ansiedad como resultado de su estado emocional y la presión que sienten. Es esencial abordar ambos trastornos de manera integral para lograr una recuperación efectiva. Las terapias combinadas y un enfoque holístico que incluya apoyo emocional, cambios en el estilo de vida y técnicas de manejo del estrés pueden ser extremadamente beneficiosas para aquellos que luchan con la ansiedad y la depresión.
        </p>
        </div>
        <div>   
        <h2>La Ansiedad</h2>
        <p>
            La ansiedad es una respuesta normal del cuerpo ante situaciones de estrés. Sin embargo, cuando se vuelve constante o excesiva, puede interferir en la vida diaria de una persona. Las personas que padecen trastornos de ansiedad a menudo experimentan preocupaciones incontrolables y temores irracionales. Esto puede llevar a síntomas físicos como palpitaciones, sudoración y tensión muscular. Además, la ansiedad puede manifestarse en diferentes formas, como el trastorno de ansiedad generalizada, el trastorno de pánico y las fobias. Es importante reconocer estos síntomas y buscar apoyo profesional para poder manejarlos adecuadamente. La intervención temprana puede marcar una gran diferencia en el manejo de la ansiedad.
        </p>
        </div>
    </div>    
    <div class="right-home col-8">
        <h2>La Depresión</h2>
        <p>
            La depresión es un trastorno del estado de ánimo que afecta a millones de personas en todo el mundo. Se <br />
            caracteriza por una sensación persistente de tristeza, pérdida de interés en actividades que anteriormente <br/>
             se disfrutaban y una disminución de la energía. Este trastorno no solo impacta el bienestar emocional, sino<br/> 
             que también puede tener efectos físicos, como cambios en el apetito y el sueño. Las personas que padecen <br /> depresión a menudo sienten que están atrapadas en un ciclo negativo del que les resulta difícil escapar.<br/> Es crucial entender que la depresión es tratable y que existen recursos disponibles, como la terapia y los <br/> 
             medicamentos, que pueden ayudar a las personas a recuperarse y mejorar su calidad de vida. 
        </p>
        
        
       
       
    </div>

    
    </div>

</div>
		);
};
