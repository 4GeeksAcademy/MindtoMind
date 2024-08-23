import React from "react";


export const Homecarousel = () => {



    return(

        <div>
                <div id="carouselExampleCaptions" className="carousel slide  ">
                <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner rounded-start-4 rounded-end-4 my-5 mx-2">
                <div className="carousel-item active">
                    <img src="https://centrointelecto.com/wp-content/uploads/2021/10/salud-mental.jpg" className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        {/* <h2>CUIDE DE TU MENTE</h2> */}
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://www.salud.gob.ec/wp-content/uploads/2012/10/boton_salud_mental.png" className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://img.freepik.com/premium-vector/advanced-brain-mapping-technology-that-allows-psychiatrists-pinpoint-root-cause-patients_216520-55765.jpg" className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                    
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
      </div>
    )
}