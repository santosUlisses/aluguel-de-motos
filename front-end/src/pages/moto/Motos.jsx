import { Link, useSearchParams } from "react-router-dom"
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import { useEffect, useState } from "react";
import MensagemErro from "../../components/MensagemErro";




export default function Motos() {
    const [motos, setMotos] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("danger");
    const [filtro, setFiltro] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    async function buscarMotos() {
        try {
            const response = await api.get(routes.moto.listar, {
                params: { page: currentPage },
            });
            setMotos(response.data.motos);
            setTotalPages(response.data.totalPages)
        } catch (error) {
            setMensagem(error.response?.data?.message);
            throw new Error("Erro inesperado");
        }
    }
    async function deletarMoto(id) {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja excluir esta moto?"
        );
        if (!confirmDelete) return;
        const routeDelete = routes.moto.deletar.replace(":id", id)
        try {
            await api.delete(routeDelete);
            setMotos((prevMotos) => prevMotos.filter((t) => t.id !== id));
        } catch (error) {
            setMensagem(error.response?.data?.message);
        }
    }

    async function aplicarFiltro(e) {
        e.preventDefault();
        const response = await api.get(routes.moto.listar, {
            params: { filtro }
        });
        setSearchParams(filtro);
        setMotos(response.data.motos);
        setTotalPages(response.data.totalPages);

    }


    useEffect(() => {
        buscarMotos();
    }, [currentPage]);


    return (

        <div className="container mt-4">

            {mensagem && (
                <MensagemErro mensagem={mensagem} setMensagem={setMensagem} classMensagem={classMensagem} />
            )}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                <div>
                    <h2 className="fw-bold text-white mb-1">
                        Lista de Motos
                    </h2>

                    <p className="text-secondary mb-2">
                        Gerencie as motos cadastradas no sistema
                    </p>

                    <Link to="/motos/criar" className="btn btn-success">
                        + Adicionar Moto
                    </Link>
                </div>

                <div className="mt-3 mt-md-0">
                    <form onSubmit={aplicarFiltro} className="input-group">
                        <input type="text"
                            pattern="^[A-Za-z0-9]+( [A-Za-z0-9]+)*$"
                            title="Apenas letras, números e espaços"
                            className="form-control"
                            placeholder="Buscar por placa ou nome..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)} />

                        <button className="btn btn-success" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>

            </div>

            {motos.length ? (

                <div className="card border-0 shadow">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-dark">
                                <tr>
                                    <th>Nome</th>
                                    <th>Marca</th>
                                    <th>Cor</th>
                                    <th>Placa</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {motos.map((m) => (

                                    <tr key={m.id}>

                                        <td className="text-uppercase">
                                            {m.nome}
                                        </td>

                                        <td className="text-capitalize">
                                            {m.marca}
                                        </td>

                                        <td className="text-uppercase">
                                            {m.cor}
                                        </td>

                                        <td className="text-uppercase">
                                            {m.placa}
                                        </td>

                                        <td>
                                            <span className={`badge rounded-pill text-uppercase ${m.disponibilidade === "disponivel"
                                                ? "bg-success"
                                                : m.disponibilidade === "alugada"
                                                    ? "bg-warning text-dark"
                                                    : "bg-secondary"
                                                }`}>
                                                {m.disponibilidade}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="btn-group btn-group-sm"
                                                role="group">

                                                <Link to={`/moto/${m.id}/revisao`} className="btn btn-outline-dark">
                                                    Revisões
                                                </Link>

                                                <Link to={`/moto/${m.id}`} className="btn btn-outline-primary">
                                                    Editar
                                                </Link>

                                                <Link to={`/moto/${m.id}/imagem`} className="btn btn-outline-success">
                                                    Imagens
                                                </Link>

                                                <button className="btn btn-outline-danger"
                                                    onClick={() => deletarMoto(m.id)}>
                                                    Excluir
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

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

                <div className="alert alert-warning shadow-sm">
                    Nenhuma moto cadastrada.
                </div>

            )}

            <div className="mt-2">
                <Link to="/painel/admin" className="btn btn-secondary mb-2">
                    Voltar ao Painel
                </Link>
            </div>

        </div>
    )
}

