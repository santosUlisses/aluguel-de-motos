import { api } from "../../services/api"
import { routes } from "../../config/routes"
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MensagemErro from "../../components/MensagemErro";




export default function UsuarioAlugueis() {
    const { id } = useParams();
    const [dadosUsuario, setDadosUsuario] = useState({})
    const [classMensagem, setClassMensagem] = useState("");
    const [mensagem, setMensagem] = useState("")
    const [classMensagemErro, setClassMensagemErro] = useState("");
    const [mensagemErro, setMensagemErro] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    async function buscarDados() {
        const rota = routes.aluguel.alugueis_usuario.replace(":id", id);
        try {
            const response = await api.get(rota, {
                params: { page: currentPage }
            });
            setDadosUsuario(response.data)
            setTotalPages(response.data.totalPages == 0 ? 1 : response.data.totalPages)
        } catch (error) {
            setClassMensagemErro("danger")
            setMensagemErro(error.response?.data?.message)
        }
    }

    async function deletarAluguel(id) {
        const routeDelete = routes.aluguel.deletar.replace(":id", id);
        const confirmDelete = window.confirm(
            "Tem certeza que deseja excluir esta moto?"
        );
        if (!confirmDelete) return;

        try {
            await api.delete(routeDelete).then(response => {
                setMensagem(response.data.message)
                setClassMensagem("success")
            });
        } catch (error) {
            setClassMensagemErro("danger")
            setMensagemErro(error.response?.data?.message);
        }
        buscarDados();
    }

    useEffect(() => {
        buscarDados();
    }, [currentPage]);

    return (
        <div className="container py-4">

            {mensagemErro && (
                <MensagemErro mensagem={mensagemErro} setMensagem={setMensagemErro} classMensagem={classMensagemErro} />
            )}

            {mensagem && (
                <div className={`alert alert-${classMensagem} alert-dismissible fade show shadow position-fixed top-0 start-50 translate-middle-x mt-3`}
                    style={{ zIndex: 9999 }}>
                    {mensagem}
                    <button type="button" className="btn-close"
                        onClick={() => setMensagem("")}></button>

                </div>
            )}

            {dadosUsuario ? (

                <div className="card shadow border-0">

                    <div className="card-header bg-dark text-white">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>
                                <small className="text-light">
                                    Detalhes do usuário
                                </small>
                            </div>


                        </div>

                    </div>

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-6">
                                <strong>Nome</strong>

                                <p className="text-muted">
                                    {dadosUsuario.usuario?.nome}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <strong>Email</strong>

                                <p className="text-muted">
                                    {dadosUsuario.usuario?.email}
                                </p>
                            </div>

                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-4">

                            <Link to={`/aluguel/criar/${id}`} className="btn btn-success"
                                state={{ nomeUsuario: dadosUsuario.usuario?.nome }}>
                                Novo Aluguel
                            </Link>

                            <Link to={`/pagamento/usuario/${id}`} className="btn btn-outline-success"
                                state={{ nomeUsuario: dadosUsuario.usuario?.nome }}>
                                Pagamentos
                            </Link>

                        </div>

                        <h5 className="fw-bold mb-3">
                            Histórico de Aluguéis
                        </h5>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Moto</th>
                                        <th>Placa</th>
                                        <th>Status</th>
                                        <th>Valor</th>
                                        <th>Início</th>
                                        <th>Vencimento</th>
                                        <th className="text-center">
                                            Ações
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {dadosUsuario.alugueis?.length > 0 ? dadosUsuario.alugueis.map(a => (

                                        <tr key={a.id}>

                                            <td>{a.nome_moto}</td>

                                            <td>{a.placa}</td>

                                            <td>
                                                <span className={`badge rounded-pill
                                                ${a.status === "ativo" ? "bg-success" : ""}
                                                ${a.status === "vencido" ? "bg-danger" : ""}
                                                ${a.status === "inativo" ? "bg-warning text-dark" : ""}`}>
                                                    {a.status}
                                                </span>
                                            </td>

                                            <td>
                                                R$ {Number(a.valor_aluguel).toFixed(2)}
                                            </td>

                                            <td>{a.data_inicio}</td>

                                            <td>{a.data_vencimento}</td>

                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    {a.status === "ativo" && (
                                                        <Link to={`/pagamento/aluguel/${a.id}`}
                                                            className="btn btn-outline-success">
                                                            Pagamento
                                                        </Link>

                                                    )}

                                                    <Link to={`/aluguel/${a.id}`}
                                                        state={{ from: location.pathname }}
                                                        className="btn btn-outline-primary">
                                                        Editar
                                                    </Link>

                                                    <button className="btn btn-outline-danger"
                                                        onClick={() => deletarAluguel(a.id)}>
                                                        Excluir
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )) :
                                        <tr>
                                            <td colSpan={7} className="text-center text-muted py-5">
                                                Nenhum aluguel cadastrado.
                                            </td>
                                        </tr>

                                    }
                                </tbody>

                            </table>

                        </div>

                    </div>

                    <div className="card-footer bg-light d-flex justify-content-between align-items-center">

                        <Link to="/admin/usuarios"
                            className="btn btn-outline-secondary">
                            Voltar
                        </Link>

                        <span className="text-muted">
                            Página {currentPage} de {totalPages}
                        </span>

                        <div>

                            <button
                                className="btn btn-outline-primary me-2"
                                disabled={currentPage === 1}
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

            ) : (

                <div className="alert alert-danger shadow">
                    Não foi possível carregar o usuário.
                </div>

            )}

        </div>

    )
}