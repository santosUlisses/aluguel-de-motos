import { useState } from "react";
import { Link } from "react-router-dom";

export default function LayoutNavbar() {

    const [aberto, setAberto] = useState(false);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top shadow py-3">
                <div className="container">

                    <Link to="/login" className="navbar-brand fw-bold ">
                        JC Motos <span className="text-warning">| Aluguel de Motos no Rio de Janeiro</span>
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setAberto(!aberto)}
                        aria-label="Abrir menu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className={`collapse navbar-collapse ${aberto ? "show" : ""}`}>

                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                            <li className="nav-item">
                                <a className="nav-link" href="#como_funciona_aluguel_motos" onClick={() => setAberto(false)}>
                                    Como Funciona
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#vantagens-aluguel-motos" onClick={() => setAberto(false)}>
                                    Vantagens
                                </a>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link" href="#catalogo-motos-para-aluguel" onClick={() => setAberto(false)}>
                                    Motos
                                </a>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link" href="#planos" onClick={() => setAberto(false)}>
                                    Planos
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#faq-aluguel-motos" onClick={() => setAberto(false)}>
                                    FAQ
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#comentarios" onClick={() => setAberto(false)}>
                                    Comentarios
                                </a>
                            </li>

                            <li className="nav-item">
                                <a href="https://wa.me/5521994663622"
                                    className="btn btn-warning mt-3 mt-lg-0 ms-lg-3"
                                    onClick={() => setAberto(false)}>
                                    Alugue Agora
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    );
}
