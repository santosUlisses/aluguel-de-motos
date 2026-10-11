import { CiSearch, CiLocationOn } from "react-icons/ci";
import { PiCalendarCheckThin } from "react-icons/pi";
import { BiLike } from "react-icons/bi";

export default function ComoTrabalhamos() {
    return (
        <section
            className="py-5 bg-dark text-white"
            id="como_funciona_aluguel_motos"
            aria-labelledby="como-funciona-heading"
        >
            <div className="container">

                <header className="text-center mb-5">
                    <h2 id="como-funciona-heading">
                        Como Funciona o <span className="text-warning">Aluguel de Motos</span>
                    </h2>
                    <p className="mt-3 mx-auto" style={{ maxWidth: "700px" }}>
                        Veja como é simples alugar sua moto conosco. Processo rápido,
                        sem burocracia e com suporte completo durante todo o período.
                    </p>
                </header>

                <div className="row text-center">


                    <div className="col-md-3 mb-4">
                        <article className="d-flex flex-column align-items-center">

                            <div
                                className="icons mb-3 d-flex justify-content-center align-items-center rounded-circle bg-warning"
                                style={{ width: "80px", height: "80px" }}>
                                <CiSearch size={36} />
                            </div>

                            <h3 className="h5 fw-bold">1. Escolha sua moto</h3>
                            <p>
                                Acesse nosso catálogo de motos disponíveis para aluguel
                                e escolha o modelo ideal para trabalho ou lazer.
                            </p>

                        </article>
                    </div>


                    <div className="col-md-3 mb-4">
                        <article className="d-flex flex-column align-items-center">

                            <div
                                className="icons mb-3 d-flex justify-content-center align-items-center rounded-circle bg-warning"
                                style={{ width: "80px", height: "80px" }}>
                                <PiCalendarCheckThin size={36} />
                            </div>

                            <h3 className="h5 fw-bold">2. Faça sua reserva</h3>
                            <p>
                                Entre em contato via WhatsApp e
                                agende a retirada da sua moto de forma rápida e segura.
                            </p>

                        </article>
                    </div>


                    <div className="col-md-3 mb-4">
                        <article className="d-flex flex-column align-items-center">

                            <div
                                className="icons mb-3 d-flex justify-content-center align-items-center rounded-circle bg-warning"
                                style={{ width: "80px", height: "80px" }}>
                                <CiLocationOn size={36} />
                            </div>

                            <h3 className="h5 fw-bold">3. Retire na loja</h3>
                            <p>
                                Compareça à nossa unidade para retirada da moto
                                com contrato simples e seguro incluso.
                            </p>

                        </article>
                    </div>


                    <div className="col-md-3 mb-4">
                        <article className="d-flex flex-column align-items-center">

                            <div
                                className="icons mb-3 d-flex justify-content-center align-items-center rounded-circle bg-warning"
                                style={{ width: "80px", height: "80px" }}>
                                <BiLike size={36} />
                            </div>

                            <h3 className="h5 fw-bold">4. Aproveite sua moto</h3>
                            <p>
                                Utilize sua moto com total segurança,
                                suporte 24h e assistência durante todo o período do aluguel.
                            </p>

                        </article>
                    </div>

                </div>
            </div>
        </section>
    );
}
