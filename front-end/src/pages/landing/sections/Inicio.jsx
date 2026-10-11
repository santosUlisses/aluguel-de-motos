export default function Inicio() {
    return (
        <section className="position-relative text-center text-white"
            aria-label="Aluguel de motos com as melhores condições">

            <img src="/tigerArt2.webp" className="img-fluid w-100"
                alt="Moto disponível para aluguel com seguro incluso"
                loading="lazy" />

            <div className="position-absolute top-50 start-50 translate-middle w-100 px-3">

                <header>
                    <h1 className="display-4 fw-bold mt-5">
                        Aluguel de Motos com <br />
                        <span className="text-warning">Seguro e Suporte 24h</span>
                    </h1>
                </header>

                <p className="fs-5 mt-4 mx-auto" style={{ maxWidth: "700px" }}>
                    Alugue motos para trabalho ou lazer com condições facilitadas,
                    zero burocracia e aprovação rápida. Ideal para entregadores,
                    motoristas de app e quem busca mobilidade com economia.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                    <a href="https://wa.me/5521994663622"
                        className="btn btn-warning btn-lg"
                        title="Alugar moto agora">
                        Alugue sua moto agora
                    </a>

                    <a href="#catalogo-motos-para-aluguel"
                        className="btn btn-dark btn-lg"
                        title="Ver motos disponíveis para aluguel">
                        Ver motos disponíveis
                    </a>
                </div>

            </div>

        </section>
    )
}
