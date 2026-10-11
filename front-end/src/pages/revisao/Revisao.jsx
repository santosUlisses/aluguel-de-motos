import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { routes } from "../../config/routes";


export default function Revisao() {
    const { id } = useParams();
    const [revisao, setRevisao] = useState([]);
    const [expandidoId, setExpandidoId] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    async function buscarRevisao(id) {
        const route = routes.revisao.listar.replace(":id", id)
        const res = await api.get(route);
        setRevisao(res.data.revisoes);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
    }

    async function deletarRevisao(id) {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja excluir esta moto?"
        );
        if (!confirmDelete) return;

        try {
            const routeDelete = routes.revisao.deletar.replace(':id', id)
            await api.delete(routeDelete);
            setRevisao((prevRevisao) => prevRevisao.filter((r) => r.id !== id));
        } catch (error) {
            setMensagem(error.response?.data?.message);

        }
    }

    useEffect(() => {
        buscarRevisao(id);
    }, []);

    return (
        <div className="container mt-4">

            {mensagem ? (
                <div className={`position-fixed alert alert-danger alert-dismissible top-10 start-50 translate-middle`} role="alert">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setMensagem("")}></button>
                    <p>Não foi possível deletar, erro : {mensagem} </p>
                </div>
            ) : ""}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-white">Revisões</h4>

                <Link to={`/moto/${id}/revisao/criar`}
                    className="btn btn-success btn-sm">
                    + Adicionar revisão
                </Link>
            </div>

            {revisao && revisao.length ? (
                <div className="card border-0 shadow">

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-dark">
                                <tr>
                                    <th>Moto</th>
                                    <th>Placa</th>
                                    <th>KM</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                    <th>Detalhes</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {revisao.map(rev => {
                                    const expandido = expandidoId === rev.id;
                                    const limite = 60;

                                    const texto = expandido
                                        ? rev.detalhes
                                        : rev.detalhes.substring(0, limite);

                                    return (
                                        <tr key={rev.id}>
                                            <td className="fw-semibold">{rev.nome}</td>
                                            <td>{rev.placa}</td>
                                            <td>{rev.quilometragem} km</td>
                                            <td>R$ {Number(rev.valor).toFixed(2)}</td>
                                            <td>
                                                {new Date(rev.data_revisao).toLocaleDateString("pt-BR")}
                                            </td>

                                            <td style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                                                {texto}

                                                {rev.detalhes.length > limite && (
                                                    <>
                                                        {!expandido && "... "}
                                                        <button
                                                            className="btn btn-link btn-sm p-0 ms-1 mb-1"
                                                            onClick={() =>
                                                                setExpandidoId(expandido ? null : rev.id)}>
                                                            {expandido ? "Ver menos" : "Ver mais"}
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex flex-nowrap">

                                                    <Link to={`/revisao/${rev.id}`} className="btn btn-sm btn-outline-primary">Editar</Link>
                                                    <Link className="btn btn-sm btn-outline-danger ms-2" onClick={() => deletarRevisao(rev.id)}>Excluir</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
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

            ) : (
                <div className="alert alert-warning text-center">
                    Nenhuma revisão cadastrada
                </div>
            )}
            <Link to="/motos" className="btn btn-secondary mt-1 mb-3">
                Voltar
            </Link>
        </div>
    );
}