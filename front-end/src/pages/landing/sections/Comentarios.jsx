import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../../services/api";
import { routes } from "../../../config/routes";



const CARD_WIDTH = 60;


function iniciais(nome) {
    return nome.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

export default function Comentarios() {

    const [comentarios, setComentarios] = useState([]);
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % comentarios.length);
    };

    const prev = () => {
        setIndex((prev) =>
            prev === 0 ? comentarios.length - 1 : prev - 1
        );
    };


    async function buscarComentarios() {
        const res = await api.get(routes.comentario.buscar_aprovado);
        setComentarios(res.data);
    }


    useEffect(() => {
        buscarComentarios();
    }, [])



    return (
        <section id="comentarios" className="py-5 bg-black text-white">
            <div className="container">

                <div className="text-center mb-5">
                    <span className="text-warning fw-semibold text-uppercase small">
                        Avaliações
                    </span>

                    <h2 className="fw-bold mt-2 mb-3">
                        O que nossos{" "}
                        <span className="text-warning">clientes dizem</span>
                    </h2>

                    <p className="text-secondary mb-0">
                        A experiência de quem já confiou em nossos serviços.
                    </p>
                </div>

                {comentarios.length > 0 ? (
                    <>
                        <div className="carousel-wrapper position-relative">


                            <button type="button" onClick={prev} className="nav-btn left"
                                aria-label="Depoimento anterior">
                                <ChevronLeft size={24} />
                            </button>


                            <div className="carousel-viewport">

                                <div className="carousel-track" style={{
                                    transform: `translateX(-${index * CARD_WIDTH}%)`
                                }}>

                                    <div className="carousel-spacer" aria-hidden="true" />

                                    {comentarios.map((coment) => (
                                        <div className="carousel-card" key={coment.id}>
                                            <div className="card bg-dark text-white border-secondary p-4 p-md-5 shadow-lg comentario-card h-100">
                                                <div className="text-warning mb-3">
                                                    <Quote size={36} strokeWidth={1.5} />
                                                </div>

                                                <div className="d-flex align-items-center mb-4">
                                                    {[1, 2, 3, 4, 5].map((estrela) => (
                                                        <Star
                                                            key={estrela}
                                                            className="me-1"
                                                            fill={estrela <= coment.nota ? "#ffc107" : "none"}
                                                            color={estrela <= coment.nota ? "#ffc107" : "#555"}
                                                            size={18}
                                                        />
                                                    ))}
                                                </div>


                                                <p className="comentario-texto fst-italic mb-4">
                                                    {coment.comentario}
                                                </p>


                                                <div className="d-flex align-items-center mt-auto">

                                                    <div className="avatar-circle me-3">
                                                        {iniciais(coment.nome)}
                                                    </div>

                                                    <div className="text-start">
                                                        <h6 className="fw-bold mb-1">
                                                            {coment.nome}
                                                        </h6>

                                                        <small className="text-secondary">
                                                            Cliente
                                                        </small>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                    <div className="carousel-spacer" aria-hidden="true" />
                                </div>
                            </div>


                            <button type="button" onClick={next} className="nav-btn right" aria-label="Próximo depoimento">
                                <ChevronRight size={24} />
                            </button>

                        </div>


                        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">

                            {comentarios.map((coment, i) => (
                                <button key={coment.id} type="button" onClick={() => setIndex(i)}
                                    className={`carousel-dot ${i === index ? "active" : ""}`}
                                    aria-label={`Ir para o depoimento de ${coment.nome}`}
                                    aria-current={i === index ? "true" : undefined} />
                            ))}

                        </div>
                    </>
                ) : (
                    <div className="text-center py-5">
                        <Quote size={40} className="text-secondary mb-3" />

                        <p className="text-secondary mb-0">
                            Ainda não temos avaliações para exibir.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}