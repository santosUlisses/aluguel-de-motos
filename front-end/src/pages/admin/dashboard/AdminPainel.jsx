import { Link } from "react-router-dom"
import { FaUserEdit, FaTools } from "react-icons/fa";
import { PiMotorcycleFill } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
import { BsCashCoin } from "react-icons/bs";
import { FaImages } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";




export default function AdminPainel() {

    const numeros = [];

    function gerarNumeros() {
        const n = Math.floor(Math.random() * 25);
        return n;
    }

    for (let i = 1; numeros.length < 15; i++) {
        const n = gerarNumeros();
        if (!numeros.includes(n) && n != 0) {
            numeros.push(n);
        }
        numeros.sort()
    }


    console.log(numeros);

    return (
        <div>
            <div className="container my-5">
                <h2 className="fw-bold text-center mb-4 text-warning">
                    <FaTools className="iconUser" size={'50px'} />
                    Painel do admin
                </h2>

                <div className="row g-4 justify-content-center">

                    <div className="col-md-4">
                        <Link className="card-link" to={"/admin/usuarios"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <FaUserEdit className="card-icon" size={50} color="#0d6efd" />
                                <h5 className="fw-bold text-dark mt-3">Usuários</h5>
                                <p className="text-muted">
                                    Lista de usuários
                                </p>
                            </div>

                        </Link>
                    </div>


                    <div className="col-md-4">
                        <Link className="card-link" to={"/motos"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <PiMotorcycleFill size={'50px'} />
                                <h5 className="fw-bold text-dark mt-3">Motos</h5>
                                <p className="text-muted">
                                    Lista de motos
                                </p>
                            </div>

                        </Link>

                    </div>


                    <div className="col-md-4">
                        <Link className="card-link" to={"/admin/alugueis"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <GoChecklist size={'50px'} color="gold" />
                                <h5 className="fw-bold text-dark mt-3">Alugueis</h5>
                                <p className="text-muted">
                                    Lista de alugueis
                                </p>
                            </div>

                        </Link>
                    </div>


                    <div className="col-md-4">
                        <Link className="card-link" to={"/admin/imagem-site"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <FaImages size={'50px'} />


                                <h5 className="fw-bold text-dark mt-3">Imagens do site</h5>
                                <p className="text-muted">
                                    Imagens do catálogo de motos da página web
                                </p>
                            </div>

                        </Link>
                    </div>


                    <div className="col-md-4">
                        <Link className="card-link" to={"/pagamentos"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <BsCashCoin size={'50px'} color="green" />
                                <h5 className="fw-bold text-dark mt-3">Financeiro</h5>
                                <p className="text-muted">
                                    Lista de pagamentos recebidos
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link className="card-link" to={"/admin/comentarios"}>
                            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow card-menu">
                                <IoChatbubbleEllipsesOutline size={'50px'} color="grey" />
                                <h5 className="fw-bold text-dark mt-3">Seção Comentários</h5>
                                <p className="text-muted">
                                    Gerencie quais comentários irão aparecer na página web
                                </p>
                            </div>

                        </Link>

                    </div>

                </div>
            </div>

        </div>
    )
}

