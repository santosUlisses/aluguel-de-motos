import { TbBrandCashapp } from "react-icons/tb";
import { FiTool } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { FaRegClock, FaHeadphonesAlt } from "react-icons/fa";
import { LuFileCheck } from "react-icons/lu";

export default function Vantagens() {

    return (
        <section id="vantagens-aluguel-motos"
            className="py-5 bg-black text-white"
            aria-labelledby="vantagens-heading">
            <div className="container">

                <header className="text-center mb-5">
                    <h2 id="vantagens-heading">
                        Por que escolher nosso <span className="text-warning">Aluguel de Motos</span> ?
                    </h2>
                    <p className="mt-3 mx-auto" style={{ maxWidth: "700px" }}>
                        Oferecemos aluguel de motos com segurança, economia e total
                        transparência. Conheça os diferenciais que fazem nossos clientes
                        escolherem nossos serviços.
                    </p>
                </header>

                <div className="row g-4">


                    <div className="col-md-4">
                        <article className="card h-100 text-center border-0 shadow-sm bg-dark text-white">
                            <div className="card-body">
                                <TbBrandCashapp size={42} className="text-warning mb-3" />
                                <h3 className="h5 fw-bold">Preço justo e transparente</h3>
                                <p>
                                    Aluguel de motos com valores acessíveis,
                                    sem taxas escondidas e com contrato claro.
                                </p>
                            </div>
                        </article>
                    </div>


                    <div className="col-md-4">
                        <article className="card h-100 text-center border-0 shadow-sm bg-dark text-white">
                            <div className="card-body">
                                <FiTool size={42} className="text-warning mb-3" />
                                <h3 className="h5 fw-bold">Motos revisadas e seguras</h3>
                                <p>
                                    Todas as motos passam por manutenção preventiva
                                    garantindo segurança e desempenho.
                                </p>
                            </div>
                        </article>
                    </div>


                    <div className="col-md-4">
                        <article className="card h-100 text-center border-0 shadow-sm bg-dark text-white">
                            <div className="card-body">
                                <GoShieldCheck size={42} className="text-warning mb-3" />
                                <h3 className="h5 fw-bold">Seguro incluso no aluguel</h3>
                                <p>
                                    Proteção durante todo o período do aluguel
                                    para sua tranquilidade.
                                </p>
                            </div>
                        </article>
                    </div>


                    <div className="col-md-4">
                        <article className="card h-100 text-center border-0 shadow-sm bg-dark text-white">
                            <div className="card-body">
                                <FaRegClock size={42} className="text-warning mb-3" />
                                <h3 className="h5 fw-bold">Planos flexíveis</h3>
                                <p>
                                    Alugue de acordo com sua necessidade.
                                    Ideal para entregadores e uso pessoal.
                                </p>
                            </div>
                        </article>
                    </div>


                    <div className="col-md-4">
                        <article className="card h-100 text-center border-0 shadow-sm bg-dark text-white">
                            <div className="card-body">
                                <FaHeadphonesAlt size={42} className="text-warning mb-3" />
                                <h3 className="h5 fw-bold">Suporte 24 horas</h3>
                                <p>
                                    Atendimento e assistência sempre que precisar
                                    durante o período do aluguel.
                                </p>
                            </div>
                        </article>
                    </div>


                    <div className="col-md-4">
                        <article className="card h-100 text-center border-0 shadow-sm bg-dark text-white">
                            <div className="card-body">
                                <LuFileCheck size={42} className="text-warning mb-3" />
                                <h3 className="h5 fw-bold">Processo sem burocracia</h3>
                                <p>
                                    Documentação simples e aprovação rápida
                                    para você começar a usar sua moto.
                                </p>
                            </div>
                        </article>
                    </div>

                </div>
            </div>
        </section>
    )
}
