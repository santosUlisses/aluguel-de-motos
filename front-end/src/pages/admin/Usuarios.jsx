import { useState, useEffect } from "react"
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import { Link, useSearchParams } from "react-router-dom";
import MensagemErro from "../../components/MensagemErro";


export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("danger");

    const buscarUsuarios = async () => {
        try {
            const response = await api.get(routes.usuario.listar, { params: { page: currentPage } });
            setUsuarios(response.data.usuarios);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setMensagem(error.response?.data?.message);
        }

    }
    async function aplicarFiltro(e) {
        e.preventDefault();
        const response = await api.get(routes.usuario.listar, {
            params: { filtro, page: currentPage },
        });
        setSearchParams({ filtro });
        setUsuarios(response.data.usuarios);
        setTotalPages(response.data.totalPages);

    }

    useEffect(() => {
        buscarUsuarios();
    }, [currentPage]);


    return (
        <div className="container mt-4">

            {mensagem && (
                <MensagemErro mensagem={mensagem} setMensagem={setMensagem} classMensagem={classMensagem} />
            )}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div>
                    <h4 className="mb-2 text-white">Usuários</h4>
                </div>


                <div className="text-white mt-3 mt-md-0 d-flex align-items-center gap-2">
                    <span>Procurar</span>
                    <form onSubmit={aplicarFiltro} className="d-flex align-items-center gap-2">
                        <input type="text" className="form-control" placeholder="Buscar por nome ou e-mail" value={filtro}
                            onChange={(e) => setFiltro(e.target.value)} />
                        <button className="btn btn-success btn-sm">
                            Buscar
                        </button>
                    </form>
                </div>

            </div>

            {usuarios && usuarios.length > 0 ? (

                <div className="card border-0 shadow">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Usuário</th>
                                    <th>email</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td><Link to={`/admin/usuario/${usuario.id}/alugueis`}>Ver detalhes</Link></td>

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
                    Nenhum usuário encontrado
                </div>
            )}


            <Link to="/painel/admin" className="btn btn-secondary mt-3">
                Voltar
            </Link>
        </div>

    )
}