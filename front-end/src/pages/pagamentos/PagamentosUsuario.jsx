import { useEffect, useState } from "react";
import { routes } from "../../config/routes"
import { api } from "../../services/api"
import { useParams, useLocation, Link } from "react-router-dom";


export default function Pagamentos() {
    const { id } = useParams();
    const location = useLocation();
    const { nomeUsuario } = location.state || {};
    const [pagamento, setPagamento] = useState([]);
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [mensagem, setMensagem] = useState("");

    const [classMensagem, setClassMensagem] = useState("secondary");
    const rota = routes.pagamento.listarPorId.replace(':id', id);
    async function buscarPagamentos() {
        try {
            const res = await api.get(rota, {
                params: { page: currentPage }
            });
            setPagamento(res.data.pagamentos);
            setTotalPages(res.data.totalPages == 0 ? 1 : res.data.totalPages);
        } catch (error) {
            setClassMensagem("danger");
            setMensagem(error.response?.data?.message);
        }

    }

    useEffect(() => {
        buscarPagamentos();
    }, [currentPage])

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">

                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0"> Histórico de pagamentos do Usuário</h5>
                </div>
                <div className="mb-1">
                    <p className="fw-bold mt-2 ms-2">Pagamentos de <strong>{nomeUsuario}</strong></p>
                </div>

                {pagamento && pagamento.length > 0 ? (
                    <div className="card shadow-sm">

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0 align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Data do pagamento</th>
                                            <th>Valor pago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagamento.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.data_pagamento}</td>
                                                <td className="fw-semibold">
                                                    R$ {Number(p.valor_pago).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`alert alert-${classMensagem} text-center`}>
                        {mensagem ? <p> {mensagem}</p> : <p> Nenhum pagamento encontrado</p>}
                    </div>
                )}

                <div className="card-footer d-flex justify-content-between align-items-center">
                    <Link to={`/admin/usuario/${id}/alugueis`} className="btn btn-outline-secondary btn-sm">
                        Voltar
                    </Link>

                    <div>
                        <button className="btn btn-outline-primary btn-sm me-2"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}>
                            Anterior
                        </button>

                        <button className="btn btn-outline-primary btn-sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}>
                            Próxima
                        </button>
                    </div>

                    <span className="text-muted">
                        Página {currentPage} de {totalPages}
                    </span>



                </div>
            </div>


        </div>

    )
}