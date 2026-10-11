import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";

export default function Footer() {
    return (
        <footer
            className="bg-dark text-light pt-5 pb-3 "
            aria-labelledby="footer-heading">
            <div className="container">


                <section className="text-center mb-5">
                    <h2 id="footer-heading">
                        Fale conosco e alugue sua moto hoje mesmo
                    </h2>
                    <a href="https://wa.me/5521994663622"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning mt-3"
                        title="Chamar no WhatsApp para alugar moto">
                        Chamar no WhatsApp
                    </a>
                </section>

                <div className="row">


                    <div className="col-md-4 mb-4">
                        <h3 className="h5 fw-bold">
                            JC <span className="text-warning">Motos</span>
                        </h3>
                        <p>
                            Especialistas em aluguel de motos no Rio de Janeiro - RJ.
                            Trabalhamos com motos revisadas, seguro incluso e suporte 24h.
                            Ideal para entregadores e mobilidade urbana.
                        </p>
                    </div>


                    <nav className="col-md-2 mb-4">
                        <h3 className="h6 fw-bold mb-3">Links</h3>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#catalogo-motos-para-aluguel" className="text-decoration-none text-light d-block mb-2">
                                    Motos para aluguel
                                </a>
                            </li>
                            <li>
                                <a href="#como_funciona_aluguel_motos" className="text-decoration-none text-light d-block mb-2">
                                    Como funciona
                                </a>
                            </li>
                            <li>
                                <a href="#vantagens-aluguel-motos" className="text-decoration-none text-light d-block mb-2">
                                    Vantagens
                                </a>
                            </li>
                            <li>
                                <a href="#faq-aluguel-motos" className="text-decoration-none text-light d-block">
                                    Perguntas frequentes
                                </a>
                            </li>
                        </ul>
                    </nav>


                    <div className="col-md-3 mb-4">
                        <h3 className="h6 fw-bold mb-3">Atendimento</h3>
                        <address className="mb-0">
                            <p className="mb-1">📍 Rio de Janeiro - RJ</p>
                            <p className="mb-1">📞 (21) 99466-3622</p>
                            <p className="mb-1">✉ contato@jcmotos.com</p>
                            <p>🕒 Seg - Sáb: 08h às 18h</p>
                        </address>
                    </div>


                    <div className="col-md-3 mb-4">
                        <h3 className="h6 fw-bold mb-3">Redes Sociais</h3>
                        <div className="d-flex gap-3 fs-5">
                            <a href="#" className="text-light" aria-label="Instagram JC Motos">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.me/5521994663622" className="text-light" aria-label="WhatsApp JC Motos">
                                <FaWhatsapp />
                            </a>
                            <a href="#" className="text-light" aria-label="Facebook JC Motos">
                                <FaFacebookF />
                            </a>
                        </div>
                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center">
                    <small>
                        © {new Date().getFullYear()} JC Motos -
                        Aluguel de Motos no Rio de Janeiro.
                        Todos os direitos reservados.
                    </small>
                </div>

            </div>
        </footer>
    );
}
