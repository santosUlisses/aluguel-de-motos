import { useEffect, useState } from "react"
import { routes } from "../../config/routes"
import { api } from "../../services/api"
import { FaStar, FaCheck, FaTimes, FaCommentDots } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import MensagemErro from "../../components/MensagemErro";


export default function Comentarios() {
    const [dados, setDados] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [classMensagemErro, setClassMensagemErro] = useState("");
    const [statusSelecionado, setStatusSelecionado] = useState({});
    const [comentarioEditando, setComentarioEditando] = useState(null);
    const [status, setStatus] = useState("");

    async function buscarComentarios() {

        try {
            const res = await api.get(routes.comentario.buscar, { params: { page: currentPage } });
            setDados(res.data)
            setTotalPages(res.data.totalPaginas)

        } catch (error) {
            setClassMensagemErro("danger");
            setMensagemErro(error.response?.data?.message);
        }
    }
    async function buscarPorStatus(e) {
        e.preventDefault();
        try {
            const res = await api.get(routes.comentario.buscar, { params: { status } });
            setDados(res.data);
            setSearchParams(status);
            setTotalPages(res.data.totalPaginas)

        } catch (error) {
            setClassMensagem("danger");
            setMensagem(error.response?.data?.message);
        }
    }
    async function mudarStatus(status) {
        const rota = routes.comentario.mudarStatus.replace(":id", status.id);

        try {
            const res = await api.put(rota, status);
            setClassMensagem("success");
            setMensagem(res.data.message);
            setDados(prev => ({
                ...prev, comentarios: prev.comentarios.map(comentario => comentario.id === status.id ? { ...comentario, status: status.status } : comentario)
            }));
            setStatusSelecionado({});

        } catch (error) {
            setClassMensagem("danger");
            setMensagem(error.response?.data?.message);
        }
    }

    useEffect(() => {
        buscarComentarios();
    }, [currentPage])

    return (


        <div className="container py-4">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                <div className="mb-4 text-white">
                    <h2 className="fw-bold mb-1 ">
                        <FaCommentDots className="me-2" />
                        Comentários
                    </h2>
                    <p className="mb-0">
                        Gerencie quais comentários aparecem no site.
                    </p>
                </div>

                <div className="text-white mt-3 mt-md-0 d-flex align-items-center gap-2">
                    <span>Listar</span>
                    <form onSubmit={buscarPorStatus} className="d-flex align-items-center gap-2">
                        <select name="buscarPorStatus" className="form-select form-select-sm w-auto" onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="reprovado">Reprovado</option>
                            <option value="pendente">Pendente</option>
                        </select>
                        <button className="btn btn-success btn-sm">
                            Aplicar
                        </button>
                    </form>
                </div>

            </div>

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



            {dados.comentarios?.length > 0 ? (

                <div className="card border-0 shadow-sm tabela-comentarios">

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-dark">

                                    <tr>
                                        <th className="ps-4">Usuário</th>
                                        <th>Comentário</th>
                                        <th>Avaliação</th>
                                        <th>Status</th>
                                        <th className="text-center">Ações</th>
                                    </tr>

                                </thead>


                                <tbody>

                                    {dados.comentarios.map((comentario) => (

                                        <tr key={comentario.id}>

                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-2">

                                                    <span className="fw-semibold">
                                                        {comentario.nome}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="comentario-texto">
                                                    {comentario.comentario}
                                                </div>
                                            </td>

                                            <td>

                                                <div className="estrelas">

                                                    {[1, 2, 3, 4, 5].map((estrela) => (
                                                        <FaStar key={estrela}
                                                            className={estrela <= comentario.nota
                                                                ? "text-warning"
                                                                : "text-secondary opacity-25"
                                                            } />

                                                    ))}

                                                </div>

                                                <small className="text-muted">
                                                    {comentario.nota}/5
                                                </small>

                                            </td>

                                            <td>

                                                <span
                                                    className={`badge rounded-pill ${comentario.status === "pendente"
                                                        ? "bg-warning text-dark"
                                                        : comentario.status === "aprovado"
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                        }`}>
                                                    {comentario.status}
                                                </span>

                                            </td>

                                            <td>

                                                {comentario.status === "pendente" ? (

                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button type="button" className="btn btn-success btn-sm"
                                                            onClick={() => mudarStatus({ id: comentario.id, status: "aprovado" })}>
                                                            <FaCheck className="me-1" />
                                                            Aprovar
                                                        </button>

                                                        <button type="button" className="btn btn-danger btn-sm"
                                                            onClick={() => mudarStatus({ id: comentario.id, status: "reprovado" })}>
                                                            <FaTimes className="me-1" />
                                                            Reprovar
                                                        </button>
                                                    </div>
                                                ) :
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <select className="form-control" value={statusSelecionado.id == comentario.id ? statusSelecionado.status : ""}
                                                            onChange={(e) => setStatusSelecionado(prev =>
                                                                ({ ...prev, id: comentario.id, status: e.target.value }))} required>
                                                            <option value="" disabled>selecione...</option>
                                                            <option value="aprovado">aprovar</option>
                                                            <option value="reprovado">reprovar</option>
                                                        </select>
                                                        <button className="btn btn-primary btn-sm"
                                                            onClick={() => mudarStatus(statusSelecionado)}
                                                            disabled={!statusSelecionado.status} >Aplicar</button>
                                                    </div>
                                                }

                                            </td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">

                                    <small className="text-muted">
                                        Média de avaliação
                                    </small>

                                    <div className="d-flex align-items-center gap-2 mt-2">

                                        <span className="fs-3 fw-bold">
                                            {Number(dados.mediaAvaliacao).toFixed(1)}
                                        </span>

                                        <FaStar className="text-warning fs-4" />

                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">

                                    <small className="text-muted">
                                        Total de comentários
                                    </small>

                                    <h3 className="fw-bold mt-2 mb-0">
                                        {dados.total}
                                    </h3>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card-footer bg-light d-flex justify-content-between align-items-center">

                        <Link to="/painel/admin"
                            className="btn btn-outline-secondary">
                            Voltar
                        </Link>

                        <span className="text-muted">
                            Página {currentPage} de {totalPages}
                        </span>

                        <div>

                            <button
                                className="btn btn-outline-primary me-2"
                                disabled={currentPage == 1}
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

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <FaCommentDots className="text-muted mb-3" size={35} />

                        <h5 className="fw-bold">
                            Nenhum comentário encontrado
                        </h5>

                        <p className="text-muted mb-0">
                            Ainda não existem comentários para serem exibidos.
                        </p>
                        <Link to="/painel/admin"
                            className="btn btn-secondary">
                            Voltar
                        </Link>

                    </div>

                </div>


            )
            }

        </div >
    )
}