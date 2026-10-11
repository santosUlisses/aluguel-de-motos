import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { routes } from "../../config/routes";




export default function UsuarioListaPagamentos() {
    const [pagamentos, setPagamentos] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = ("secondary");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const user = JSON.parse(localStorage.getItem("usuario"));
    const id = user.id;
    const rota = routes.pagamento.listarPorId.replace(":id", id);


    async function buscarPagamentos() {
        try {
            const res = await api.get(rota, { params: { page: currentPage } });
            setPagamentos(res.data.pagamentos);
            setTotalPages(res.data.totalPages == 0 ? 1 : res.data.totalPages)

        } catch (error) {
            setClassMensagem("danger")
            setMensagem(error.response?.data?.message)
        }
    }

    useEffect(() => {
        buscarPagamentos();
    }, [currentPage]);

    return (
        <div className="container mt-4">


            <div className="card shadow-sm">

                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0"> Histórico de pagamentos do Usuário</h5>
                </div>
                <div className="mb-1">
                    <p className="fw-bold mt-2 ms-2">Pagamentos de <strong>{user.nome}</strong></p>
                </div>

                {pagamentos && pagamentos.length > 0 ? (
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
                                        {pagamentos.map(p => (
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
                        {mensagem ? <p>{mensagem}</p> : <p>Nenhum pagamento encontrado</p>}
                    </div>
                )}
                <div className="card-footer d-flex justify-content-between align-items-center">

                    <Link to="/painel/usuario" className="btn btn-outline-secondary btn-sm">
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


        </div >


    )
}