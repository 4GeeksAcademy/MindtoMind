import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

	return (
    <div className="no-horizontal-scroll">
    <div>
        <div id="carouselExampleCaptions" class="carousel slide  ">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner rounded-start-4 rounded-end-4 my-5  mx-1">
        <div className="carousel-item active">
          <img src="https://www.cil.com.ve/MTM/images/ansiedad-depresion.jpg" className="d-block vh-100 mx-1" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Cada día es una nueva oportunidad para reinventarme</h5>
            <p>La ansiedad puede hacernos sentir atrapados en un ciclo de preocupaciones y miedos, pero esta frase nos ayuda a recordarnos a nosotros mismos que cada día es una nueva oportunidad.</p>
          </div>
        </div>
        <div className="carousel-item">
        <img src="https://www.cil.com.ve/MTM/images/ansiedad-social-tratamiento.jpg" className="d-block vh-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Respiro profundo y suelto lo que no puedo controlar</h5>
            <p>El acto de respirar profundo puede ser de gran ayuda para calmar la ansiedad.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://www.cil.com.ve/MTM/images/image.jpg" className="d-block vh-100 objet-fit-cover" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Estoy en un proceso de crecimiento y aprendizaje</h5>
            <p>Esta frase nos ayuda a recordarnos a nosotros mismos que estamos en constante evolución, y que todos los desafíos que enfrentamos, incluyendo la ansiedad, son oportunidades para crecer y aprender.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    <div className="rounded-start-4 rounded-end-4 ps-5 agencia pt-3 my-3 mx-3">


            <div className="row">

                <div className="col-md-8 col-xl-9 wow bounceIn" data-wow-delay=".3s">
                    <h2 className="h3 text-xs-center text-md-left font-weight-bold">Sistema de IA para colaborar con tu ansiedad y depresión.</h2>
                    <p>MIND TO MIND te asesora en ejercicios practicos, y conversa contigo para ayudarte a mejorar los sintomas de ansiedad y/o depresión, pero debes recordar
                      que este es un sistema basado en Inteligencia Artificial y nunca es un médico o un profesional real en la matería.</p>
                    <p>Así que si tu caso necesita ir más alla, ponemos a tu alcance un servicio adaptado a tus necesidades, de profesionales y expertos en la materia que podras encontrar en nuestra página web y ponerte en contacto con ellos para seguir tu tratamiento.</p>

                </div>
                <div className="col-md-4 col-xl-3 mb-3" data-wow-delay=".6s">
                    <img src="https://www.cil.com.ve/MTM/images/corazon.jpg" alt="La agencia" />
                </div>
            </div>
        </div>
        <div className="container tu-mejor-eleccion py-1">

            <h2 className="h3 text-center font-weight-bold">¿Porque somos <span>tu mejor elección?</span></h2>
            <p className="text-center">
                Desarrollamos el mejor sistema junto con IA para atenderte al momento para calmar tu ansiedad y/o depresión.
            </p>

            <div className="row">
                <ul className="col-6 text-xs-center text-lg-left">
                    <li className="wow zoomIn" data-wow-duration=".3s" data-wow-delay=".3s">
                        <i className="fa fa-briefcase" aria-hidden="true"></i>

                        <div className="contenedor-eleccion">
                            <h4>Profesionales Médicos</h4>
                            <p className="hidden-md-down">Contamos con un gran equipo de profesiones médicos siempre dispuestos a atenderte.</p>
                        </div>
                    </li>
                    <li className="wow zoomIn" data-wow-duration=".3s" data-wow-delay=".7s">
                        <i className="fa fa-bullhorn" aria-hidden="true"></i>
                        <div className="contenedor-eleccion">
                            <h4>Cuando no consigues nadie con quien hablar</h4>
                            <p class="hidden-md-down">Puedes venir y hablar con nuestra IA la cual te dara consejos práticos al momento y siempre contaras con nuestros profesionales médicos.</p>
                        </div>
                    </li>
                    <li className="wow zoomIn" data-wow-duration=".3s" data-wow-delay="1.1s">

                    <i class="fa-solid fa-robot"></i>

                        <div className="contenedor-eleccion">
                            <h4>Recuerda este es un sitio web aplicando IA</h4>
                            <p className="hidden-md-down">Para ayuda profesional siempre debes acudir a un médico.</p>
                        </div>
                    </li>
                </ul>

                <div className="cont col-lg-6 mb-5">
                    <img className="imagenomm" src="https://www.cil.com.ve/MTM/images/imagen45.jpg" alt="omm" />
                </div>

                
            </div>
        </div>


        
    </div>

</div>
		);
};
