export default function MotoristaApp() {
    return (
        <section id="motorista-app" className="py-5 bg-dark text-white">
            <div className="container">
                <div className="row align-items-center">


                    <div className="col-lg-6 mb-4">
                        <h2 className="fw-bold mb-3">
                            Aluguel de Moto para <span className="text-warning">Trabalhar com Aplicativos</span>
                        </h2>

                        <p className="fs-5">
                            Comece a trabalhar com aplicativos de entrega e transporte
                            sem precisar financiar ou comprar uma moto.
                        </p>

                        <p>
                            Ideal para quem deseja gerar renda trabalhando com apps de entrega
                            e transporte urbano.
                        </p>

                        <ul className="mt-3 list-unstyled">
                            <li className="mb-2">✔ Sem cartão de crédito</li>
                            <li className="mb-2">✔ Seguro incluso</li>
                            <li className="mb-2">✔ Planos semanais e mensais</li>
                            <li className="mb-2">✔ Pronta para trabalhar</li>
                        </ul>

                        <a
                            href="https://wa.me/5521994663622"
                            className="btn btn-warning btn-lg mt-3 fw-bold">
                            Quero alugar minha moto
                        </a>

                    </div>


                    <div className="col-lg-6">
                        <div className="bg-black p-4 rounded shadow">
                            <h4 className="fw-bold mb-3 text-warning">
                                Por que alugar pode ser melhor que financiar?
                            </h4>

                            <ul className="list-unstyled">
                                <li className="mb-2">💰 Sem entrada alta</li>
                                <li className="mb-2">🔧 Sem preocupação com altor valor de manutenção</li>
                                <li className="mb-2">📉 Sem dívida de longo prazo</li>
                                <li className="mb-2">⚡ Comece a trabalhar imediatamente</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>


    )
}