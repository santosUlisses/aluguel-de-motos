import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Faq() {
    const [ativo, setAtivo] = useState(null);

    const perguntas = [
        {
            pergunta: "Quais documentos são necessários para alugar uma moto?",
            resposta: "CNH em dia com a categoria A e comprovante de residência "
        },
        {
            pergunta: "Preciso de cartão de crédito para alugar uma moto?",
            resposta: "Não. Nosso serviço de aluguel de motos aceita Pix e outras formas de pagamento. Não exigimos cartão de crédito, facilitando o acesso para entregadores e clientes que precisam de agilidade."
        },
        {
            pergunta: "Posso pagar o caução com cartão de crédito?",
            resposta: "Sim, aceitamos cartão ou pix na hora de pagar o caução."
        },
        {
            pergunta: "O seguro está incluso no aluguel da moto?",
            resposta: "Sim. Todas as motos disponíveis para aluguel já incluem seguro no valor do contrato, garantindo mais segurança e tranquilidade durante o período de uso."
        },
        {
            pergunta: "Existe limite de quilometragem no aluguel?",
            resposta: "Não há limite de quilometragem. No momento da reserva, informamos todas as condições para que você escolha a melhor opção."
        },

    ];

    const toggle = (index) => {
        setAtivo(ativo === index ? null : index);
    };

    return (
        <section
            className="py-5 bg-dark text-white"
            id="faq-aluguel-motos"
            aria-labelledby="faq-heading">
            <div className="container">

                <header className="text-center mb-5">
                    <h2 id="faq-heading">
                        Perguntas frequentes sobre <span className="text-warning">Aluguel de Motos</span>
                    </h2>
                    <p className="mt-3 mx-auto" style={{ maxWidth: "700px" }}>
                        Tire suas dúvidas sobre nosso serviço de aluguel de motos,
                        formas de pagamento, seguro, planos e condições.
                    </p>
                </header>

                {perguntas.map((item, index) => (
                    <article
                        key={index}
                        className="border rounded mb-3 p-3 shadow-sm bg-dark"
                        style={{ cursor: "pointer" }}>
                        <div className="d-flex justify-content-between align-items-center"
                            onClick={() => toggle(index)}>
                            <h3 className="h6 mb-0">{item.pergunta}</h3>

                            <FaChevronDown className={`transition ${ativo === index ? "rotate" : ""}`} />

                        </div>

                        {ativo === index && (
                            <p className="mt-3 mb-0">
                                {item.resposta}
                            </p>
                        )}
                    </article>
                ))}

            </div>
        </section>
    );
}
