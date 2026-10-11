import { useEffect, useState } from "react"
import { routes } from "../../../config/routes"
import { api } from "../../../services/api"



export default function Catalogo() {
    const [imagens, setImagens] = useState([]);
    const [imagensCarregadas, setImagensCarregadas] = useState({});
    const url_imagem = routes.imagem.rota;
    async function buscarImagens() {
        try {
            setImagensCarregadas({});
            const res = await api.get(routes.imagem.imagem_destaque);
            setImagens(res.data.imagens);
        } catch (error) {
            console.warn(error.response?.data?.message);
        }
    }

    useEffect(() => {
        buscarImagens()
    }, []);


    return (
        <section id="catalogo-motos-para-aluguel"
            className="py-5 bg-black text-white"
            aria-labelledby="catalogo-heading">
            <div className="container">

                <header className="text-center mb-5">
                    <h2 id="catalogo-heading">
                        Motos Disponíveis para <span className="text-warning">Aluguel</span>
                    </h2>
                    <p className="mt-3 mx-auto" style={{ maxWidth: "700px" }}>
                        Confira nosso catálogo de motos revisadas, econômicas e prontas
                        para trabalho ou lazer. Ideal para entregadores, uso diário
                        ou mobilidade urbana.
                    </p>
                </header>

                <div className="row g-4">

                    {imagens.length > 0 ? (
                        <>
                            {imagens.map(img => (

                                <div className="col-md-4" key={img.id}>
                                    <article className="card h-100 border-0 shadow-sm text-dark" >

                                        {!imagensCarregadas[img.id] && (
                                            <div
                                                className="placeholder-glow"
                                                style={{
                                                    width: "100%",
                                                    height: "550%"
                                                }}
                                            >
                                                <span className="placeholder col-12 h-100"></span>
                                            </div>
                                        )}

                                        <img src={`${url_imagem}${img.url}`} className="card-img-top img-padrao"
                                            onLoad={() => setImagensCarregadas(prev => ({ ...prev, [img.id]: true }))}
                                            style={{ opacity: imagensCarregadas[img.id] ? 1 : 0, transition: "opacity 0.3s" }}
                                            alt={`${img.nome} disponivel para aluguel`}
                                            loading="lazy" />

                                        <div className="card-body text-center">
                                            <h3 className="h5 fw-bold">
                                                Aluguel {img.nome}
                                            </h3>
                                            <p>
                                                {img.descricao}
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            ))
                            }
                        </>
                    )
                        :

                        <h4 className="text-center">Nenhuma moto disponível no momento</h4>

                    }

                </div>
            </div >
        </section >
    )
}
