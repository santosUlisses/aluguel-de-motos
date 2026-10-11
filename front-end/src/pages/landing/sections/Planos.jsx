export default function Planos() {
    return (
        <section id="planos" className="py-5 bg-black text-white">
            <div className="container text-center">

                <h2 className="mb-5">
                    Nossos <span className="text-warning">Planos</span>
                </h2>

                <div className="row g-4">

                    <div className="col-md-4">
                        <div className="card bg-dark text-white p-4 h-100 shadow">
                            <h4>Plano 30 dias</h4>
                            <h2 className="text-white mt-3">R$ 80</h2>
                            <p>Por diária</p>
                            <ul className="list-unstyled mt-3">
                                <li>✔ Seguro incluso</li>
                                <li>✔ Moto revisada</li>
                                <li>✔ Suporte 24h</li>
                            </ul>
                            <a href="https://wa.me/5521994663622" className="btn btn-warning mt-5">
                                Alugar Agora
                            </a>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card bg-dark text-white p-4 h-100 shadow-lg">
                            <h4>Plano 60 dias</h4>
                            <h2 className="mt-3 ">R$ 70</h2>
                            <p>Por diária</p>
                            <ul className="list-unstyled mt-3" >
                                <li>✔ Seguro incluso</li>
                                <li>✔ Moto revisada</li>
                                <li>✔ Ideal para delivery</li>
                            </ul>
                            <a href="https://wa.me/5521994663622" className="btn btn-warning mt-5">
                                Alugar agora
                            </a>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card bg-dark text-white p-4 h-100 shadow">
                            <h4>Plano 90 dias</h4>
                            <h2 className="text-warning mt-3">R$50</h2>
                            <p>Por diária</p>
                            <ul className="list-unstyled mt-3">
                                <li>✔ Seguro incluso</li>
                                <li>✔ Moto revisada</li>
                                <li>✔ Melhor custo-benefício</li>
                                <li>✔ Prioridade de suporte</li>
                                <li>✔ Ideal para motoristas de aplicativo</li>
                            </ul>
                            <a href="https://wa.me/5521994663622" className="btn btn-warning ">
                                Alugar Agora
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}