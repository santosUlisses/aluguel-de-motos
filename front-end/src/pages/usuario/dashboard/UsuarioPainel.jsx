import { Link, useParams } from "react-router-dom"
import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { BsCashCoin } from "react-icons/bs";
import { TbContract } from "react-icons/tb";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";








export default function UsuarioPainel() {

    return (
        <div>
            <div className="container my-5">
                <h2 className="fw-bold text-center mb-4 text-primary">
                    <FaUserCircle className="iconUser" size={'50px'} />
                    Painel do Usuário
                </h2>

                <div className="row g-4 justify-content-center">

                    <div className="col-md-4">
                        <Link className="card-link" to={`/usuario/editar-dados`}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <FaUserEdit className="card-icon" size={50} color="#0d6efd" />
                                <h5 className="fw-bold text-dark mt-3">Editar dados</h5>
                                <p className="text-muted">
                                    Atualize seus dados de acesso e informações pessoais.
                                </p>
                            </div>

                        </Link>
                    </div>


                    <div className="col-md-4">
                        <Link className="card-link">
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <TbContract size={'50px'} />
                                <h5 className="fw-bold text-dark mt-3">Contrato</h5>
                                <p className="text-muted">
                                    Veja detalhes do seu contrato
                                </p>
                            </div>

                        </Link>

                    </div>


                    <div className="col-md-4">
                        <Link className="card-link" to={"/usuario/meus-alugueis"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <GoChecklist size={'50px'} color="gold" />
                                <h5 className="fw-bold text-dark mt-3">Alugueis</h5>
                                <p className="text-muted">
                                    Histórico de alugueis
                                </p>
                            </div>

                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link className="card-link" to={"/meus-pagamentos"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <BsCashCoin size={'50px'} color="green" />
                                <h5 className="fw-bold text-dark mt-3">Pagamentos</h5>
                                <p className="text-muted">
                                    Veja o seu histórico de pagamento
                                </p>
                            </div>

                        </Link>

                    </div>

                    <div className="col-md-4">
                        <Link className="card-link" to={"/comentario"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <IoChatbubbleEllipsesOutline size={'50px'} color="grey" />
                                <h5 className="fw-bold text-dark mt-3">Seção Comentários</h5>
                                <p className="text-muted">
                                    Deixe sua opinião sobre sua experiência conosco
                                </p>
                            </div>

                        </Link>

                    </div>
                </div>
            </div>

        </div>
    )
}

