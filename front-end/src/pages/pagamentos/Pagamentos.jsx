import { useEffect, useState } from "react"
import { routes } from "../../config/routes"
import { api } from "../../services/api"
import { Link } from "react-router-dom";
import MensagemErro from "../../components/MensagemErro";




export default function Pagamentos() {

    const [pagamentos, setPagamentos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setMensagemErro] = useState("danger");
    const [totalPagamentos, setTotalPagamentos] = useState(0);

    async function buscarPagamentos() {
        try {
            const res = await api.get(routes.pagamento.listar, { params: { page: currentPage } });
            setPagamentos(res.data.pagamentos);
            setTotalPages(res.data.totalPages)
            setTotalPagamentos(res.data.totalPagamentos)
        } catch (error) {
            setMensagem(error.response?.data?.message);
        }
    }

    useEffect(() => {
        buscarPagamentos();
    }, [currentPage])
    return (

        <div className="container mt-4">

            {mensagem && (
                <MensagemErro mensagem={mensagem} setMensagem={setMensagem} classMensagem={classMensagem} />
            )}


            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold text-white mb-1">
                        Pagamentos Recebidos
                    </h2>

                    <p className="text-light opacity-75 mb-0">
                        Histórico completo dos pagamentos realizados.
                    </p>
                </div>

            </div>


            {pagamentos && pagamentos.length > 0 ? (

                <div className="card border-0 shadow-lg">

                    <div className="table-responsive">

                        <table className="table table-hover table-striped align-middle mb-0">

                            <thead className="table-dark">

                                <tr>
                                    <th>Usuário</th>
                                    <th>Data</th>
                                    <th>Valor</th>
                                </tr>

                            </thead>

                            <tbody>

                                {pagamentos.map((p, index) => (

                                    <tr key={p.id}>

                                        <td className="fw-semibold text-uppercase">
                                            {p.usuario}
                                        </td>

                                        <td>
                                            {new Date(p.data_pagamento).toLocaleDateString("pt-BR")}
                                        </td>

                                        <td>

                                            <span className="badge bg-success fs-6 px-3 py-2">
                                                R${" "}
                                                {Number(p.valor_pago).toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                })}

                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    <div className="card-footer bg-light">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <strong>Total Geral:</strong>

                                <span className="text-success fw-bold ms-2">

                                    R${" "}

                                    {Number(totalPagamentos).toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}

                                </span>

                            </div>

                            <div>

                                <small className="text-muted me-3">
                                    Página {currentPage} de {totalPages}
                                </small>

                                <button className="btn btn-outline-secondary me-2" disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}>
                                    Anterior
                                </button>

                                <button className="btn btn-primary" disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}>
                                    Próxima
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            ) : (

                <div className="card shadow border-0">

                    <div className="card-body text-center py-5">
                        <h4>Nenhum pagamento encontrado</h4>
                        <p className="text-muted mb-0">
                            Ainda não existem pagamentos cadastrados.
                        </p>
                    </div>

                </div>

            )}

            <div className="mt-4 mb-2">

                <Link to="/painel/admin" className="btn btn-secondary">
                    Voltar ao Painel
                </Link>

            </div>

        </div>


    )
}