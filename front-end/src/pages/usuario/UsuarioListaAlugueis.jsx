import { useEffect, useState } from "react"
import { routes } from "../../config/routes"
import { api } from "../../services/api"
import { Link } from "react-router-dom"
import { Calendar, Clock, Wallet, Bike, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import MensagemErro from "../../components/MensagemErro";





export default function UsuarioListaAlugueis() {
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    const [alugueis, setAlugueis] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [mensagemErro, setMensagemErro] = useState("")
    const [classMensagemErro, setClassMensagemErro] = useState("danger")

    async function buscarAlugueis() {
        const rota = routes.aluguel.alugueis_usuario.replace(":id", usuario.id);
        try {
            const res = await api.get(rota, { params: { page: currentPage } });
            setAlugueis(res.data.alugueis);
            setTotalPages(res.data.totalPages)
            setCurrentPage(res.data.currentPage);
        } catch (error) {
            setMensagemErro(error.response?.data?.message);
        }
    }



    useEffect(() => {
        buscarAlugueis();
    }, [currentPage]);

    return (

        <div className="container mt-4">

            <h4 className="mb-4 fw-bold">Meus Aluguéis</h4>

            {mensagemErro && (
                <MensagemErro mensagem={mensagemErro} setMensagem={setMensagemErro} classMensagem={classMensagemErro} />
            )}

            {alugueis && alugueis.length > 0 ? (

                <div className="row g-4">

                    {alugueis.map(a => (
                        <div className="col-md-6 col-lg-4" key={a.id}>
                            <div className="card h-100 shadow-sm border-0">

                                <div className="card-body">


                                    <h5 className="fw-bold mb-2">{a.nome_moto}</h5>

                                    <p className="text-muted mb-3">Placa: {a.placa}</p>


                                    <p className="mb-1">
                                        📅 <strong>Início:</strong>{" "}
                                        {new Date(a.data_inicio).toLocaleDateString("pt-BR")}
                                    </p>

                                    <p className="mb-2">
                                        ⏳ <strong>Vencimento:</strong>{" "}
                                        {new Date(a.data_vencimento).toLocaleDateString("pt-BR")}
                                    </p>


                                    <p className="mb-2">
                                        💰 <strong>Valor:</strong> R$ {Number(a.valor_aluguel).toFixed(2)}
                                    </p>


                                    <span className={`badge 
                  ${a.status === "ativo" ? "bg-success" : ""}
                  ${a.status === "inativo" ? "bg-secondary" : ""}
                  ${a.status === "vencido" ? "bg-danger" : ""}
                  `}>
                                        {a.status}
                                    </span>

                                </div>
                            </div>
                        </div>
                    ))}


                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                        <button
                            className="btn btn-light border d-flex align-items-center px-3"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}>
                            <ChevronLeft size={16} className="me-1" />
                            Anterior
                        </button>

                        <span className="text-muted small fw-medium">
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            className="btn btn-light border d-flex align-items-center px-3"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}>
                            Próxima
                            <ChevronRight size={16} className="ms-1" />
                        </button>
                    </div>

                </div>
            ) : (
                <div className="alert alert-secondary text-center">
                    Nenhum aluguel encontrado
                </div>
            )}

            <Link to={"/painel/usuario"} className="btn btn-secondary mt-2">Voltar</Link>

        </div>
    )
}