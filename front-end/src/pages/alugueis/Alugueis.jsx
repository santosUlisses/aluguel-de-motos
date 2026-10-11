import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../services/api"
import { routes } from "../../config/routes"
import { useEffect, useState } from "react";
import MensagemErro from "../../components/MensagemErro";

export default function Alugueis() {
    const [alugueis, setAlugueis] = useState([]);
    const [status, setStatus] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mensagem, setMensagem] = useState("")
    const [classMensagem, setClassMensagem] = useState("danger")

    async function buscarAlugueis() {
        try {
            const response = await api.get(routes.aluguel.listar, { params: { page: currentPage } });
            setAlugueis(response.data.alugueis);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setMensagem(error.response?.data?.message);
        }
    }
    async function alugueisFiltro(e) {
        e.preventDefault();
        try {
            const response = await api.get(routes.aluguel.listar, {
                params: { status, page: currentPage }
            });
            setSearchParams({ status });
            setAlugueis(response.data.alugueis);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setMensagem(error.response?.data?.message);
        }
    }
    useEffect(() => {
        buscarAlugueis();
    }, [currentPage]);

    return (
        <div className="container mt-4">
            {mensagem && (
                <MensagemErro mensagem={mensagem} setMensagem={setMensagem} classMensagem={classMensagem} />
            )}
            
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div>
                    <h4 className="mb-2 text-white">Lista de aluguéis</h4>
                </div>


                <div className="text-white mt-3 mt-md-0 d-flex align-items-center gap-2">
                    <span>Organizar por</span>
                    <form onSubmit={alugueisFiltro} className="d-flex align-items-center gap-2">
                        <select name="organizar" className="form-select form-select-sm w-auto" onChange={(e) => setStatus(e.target.value)}>
                            <option value="todos">Todos</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                        <button className="btn btn-success btn-sm">
                            Aplicar
                        </button>
                    </form>
                </div>

            </div>

            {alugueis && alugueis.length ? (

                <div className="card border-0 shadow">
                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Usuário</th>
                                    <th>Moto</th>
                                    <th>Placa</th>
                                    <th>Valor</th>
                                    <th>Início</th>
                                    <th>Vencimento</th>
                                    <th>Status</th>

                                </tr>
                            </thead>

                            <tbody>
                                {alugueis.map(aluguel => (
                                    <tr key={aluguel.id}>
                                        <td className="text-capitalize">{aluguel.usuario}</td>
                                        <td className="text-uppercase">{aluguel.moto}</td>
                                        <td className="text-uppercase">{aluguel.placa}</td>
                                        <td>R$ {Number(aluguel.valor_aluguel).toFixed(2)}</td>
                                        <td>{aluguel.data_inicio}</td>
                                        <td>{aluguel.data_vencimento}</td>
                                        <td>
                                            <span className={`badge 
                ${aluguel.status === "ativo" && "bg-success"}
                ${aluguel.status === "vencido" && "bg-danger"}
                ${aluguel.status === "inativo" && "bg-warning text-dark"} `}>
                                                {aluguel.status}
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                            <span className="text-muted">
                                Página {currentPage} de {totalPages}
                            </span>
                            <div>
                                <button className="btn btn-outline-primary btn-sm me-2"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}>
                                    Anterior
                                </button>

                                <button className="btn btn-primary btn-sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}>
                                    Próxima
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="alert alert-warning">
                    Nenhum aluguel encontrado
                </div>
            )
            }
            <Link to="/painel/admin" className="btn btn-secondary mt-3">
                Voltar
            </Link>
        </div >

    )
}