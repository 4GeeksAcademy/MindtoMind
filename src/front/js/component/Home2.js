import React from "react";
import "../../styles/home2.css";

export const Home2 = () => {
  return (
    <div className=" container-fluid">
      <div className="row black-wrapper">
        <div className="col-lg-6 mb-4">
          <img
            src="https://cdn.websites.hibu.com/9cbbe6282a474b6a85980c948ff8c941/dms3rep/multi/home-support3.jpg"
            className="img-fluid w-75"
            alt="Home Support"
          />
        </div>
        <div className="col-lg-6 mb-4">
          <h3 className="branco">Bienvenido a Mind To Mind</h3>

          <p className="branco">
            Explora nuestro directorio de psicólogos y busca el profesional
            adecuado para ti, agenda una cita directamente con el profesional.
          </p>

          <p className="branco">
            Nuestro chat consejero está disponible las 24 horas del día, para
            escucharte y ofrecerte apoyo cuando lo necesites, sea para hablar, o
            simplemente para una orientación.
          </p>

          <p className="branco">
            Accede a artículos y herramientas para manejar el estrés y otros
            desafíos emocionales. Te brindamos las claves para cuidar tu
            bienestar mental.
          </p>
        </div>
      </div>

      <div className="row mt-4 minhaclasse pt-4">
        <div className="col-lg-4 col-md-6 mb-2">
          <div className="card minhaclasse ">
            <div className="card-header p-0">
              <img
                src="https://th.bing.com/th/id/OIP.7BGpRXF-j9xknC62W7eJ4QHaE4?rs=1&pid=ImgDetMain"
                className="img-fluid w-100 tresImagenes"
                alt="Olas de Serenidad"
              />
            </div>
            <div className="card-body text-center">
              <h4 className="branco">Olas de Serenidad</h4>
              <p className="branco">
                Meditando en la playa, el alma se sumerge en la calma infinita,
                sanando y encontrando equilibrio en cada susurro del mar.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-2">
          <div className="card minhaclasse">
            <div className="card-header p-0">
              <img
                className="img-fluid w-100 tresImagenes"
                alt="Rumbo Interior"
                src="https://www.lifeder.com/wp-content/uploads/2014/12/Salud-Mental-Lifeder-15.jpg"
              />
            </div>
            <div className="card-body text-center">
              <h4 className="branco">Rumbo Interior</h4>
              <p className="branco">
                Tu vida refleja la profundidad de tu mente, donde cada
                pensamiento esculpe su propio horizonte de posibilidades.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-2">
          <div className="card minhaclasse">
            <div className="card-header p-0">
              <img
                src="https://uncafeconletras.net/wp-content/uploads/2022/09/Frases-de-salud-mental-696x465.jpg"
                className="img-fluid w-100 tresImagenes"
                alt="Bienestar"
              />
            </div>
            <div className="card-body text-center">
              <h4 className="branco">Bienestar</h4>
              <p className="branco">
                Una mente en equilibrio es el mejor aliado para superar
                cualquier desafío.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row black-wrapper mt-4">
        <div className="col-lg-6 mb-4 mt-4">
          <h3 className="branco">Sobre Nosotros</h3>
          <p className="branco">
            En Mind To Mind, entendemos que la vida puede ser desafiante, y que
            a veces todos necesitamos un poco de apoyo adicional. Por eso, hemos
            creado una comunidad donde puedes encontrar el respaldo emocional
            que necesitas, en cualquier momento y en cualquier lugar.
          </p>
          <p className="branco mb-5">
            Ofrecemos un espacio donde las personas pueden recibir apoyo
            emocional inmediato a través de nuestro chat con IA, y también la
            posibilidad de conectarse con psicólogos para una atención más
            profunda y personalizada. Creemos en la importancia de cuidar la
            salud mental, y estamos aquí para acompañarte en cada paso del
            camino.
          </p>
        </div>

        <div className="col-lg-6 mt-4 mb-5 ">
          <img
            src="https://th.bing.com/th/id/OIP.an295sAlWwpLDzBk0EeqoQAAAA?rs=1&pid=ImgDetMain"
            className="center img-fluid w-75"
            alt="Sobre Nosotros"
          />
        </div>
      </div>
    </div>
  );
};
