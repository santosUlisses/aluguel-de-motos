import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import MensagemErro from "../../components/MensagemErro";



export default function AluguelEditar() {
    const location = useLocation();
    const { id } = useParams();
    const [aluguel, setAluguel] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("")
    const [mensagemErro, setMensagemErro] = useState("");
    const [classMensagemErro, setClassMensagemErro] = useState("")

    const routeGet = routes.aluguel.buscar_aluguel_id.replace(":id", id);
    const routeUpdate = routes.aluguel.editar.replace(":id", id);

    async function buscarAluguel() {
        try {
            const res = await api.get(routeGet);
            setAluguel(res.data);
        } catch (error) {
            setClassMensagemErro("danger")
            setMensagemErro(error.response?.data?.message);
        }

    }
    async function enviarDados(e) {
        e.preventDefault();
        try {
            const res = await api.put(routeUpdate, aluguel);
            setClassMensagem("success");
            setMensagem(res.data.message);
        } catch (error) {
            setClassMensagem("danger");
            setMensagem(error.response?.data?.message);
        }

    }

    useEffect(() => {
        buscarAluguel();
    }, [id]);


    return (
        <div className="container mt-4">

            {mensagemErro && (
                <MensagemErro mensagem={mensagemErro} setMensagem={setMensagemErro} classMensagem={classMensagemErro} />
            )}

            {
                aluguel ? (
                    <div className="row justify-content-center">
                        <div className="col-md-6">

                            <div className="card shadow-sm">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0 fw-semibold">
                                        Edição de Aluguel
                                    </h6>
                                </div>

                                <div className="card-body">


                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <small className="text-muted">Usuário</small>
                                            <p className="fw-semibold mb-1">{aluguel.usuario}</p>
                                        </div>

                                        <div className="col-md-6">
                                            <small className="text-muted">Moto</small>
                                            <p className="fw-semibold mb-1">
                                                {aluguel.moto}
                                                <span className="text-muted ms-2">
                                                    (Placa {aluguel.placa})
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <hr />


                                    <form onSubmit={enviarDados}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Data de vencimento
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    min="2026-01-01"
                                                    max="2050-12-31"
                                                    value={aluguel.data_vencimento || ""}
                                                    required
                                                    name="data_vencimento"
                                                    onChange={(e) => setAluguel({ ...aluguel, data_vencimento: e.target.value })} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Valor do aluguel (R$)
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    className="form-control"
                                                    value={aluguel.valor_aluguel || ""}
                                                    required
                                                    name="valorAluguel"
                                                    onChange={(e) => setAluguel({ ...aluguel, valor_aluguel: e.target.value })} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Status
                                                </label>

                                                <select value={aluguel.status}
                                                    onChange={(e) => setAluguel({ ...aluguel, status: e.target.value })} className="form-control" name="status">
                                                    {aluguel.status == "inativo" ? <option disabled>inativo</option> :
                                                        <>
                                                            <option value={aluguel.status}>{aluguel.status}</option>
                                                            <option value="inativo">inativo</option>
                                                        </>}
                                                    {/* <option value={aluguel.status}>{aluguel.status}</option>
                                                <option value="inativo">inativo</option> */}
                                                </select>

                                            </div>
                                        </div>


                                        <div className="d-flex justify-content-end gap-2 mt-4">
                                            <Link to={location.state?.from || '/admin/usuarios'} className="btn btn-outline-secondary">Voltar</Link>
                                            <button type="submit" className="btn btn-success px-4">
                                                Salvar alterações
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {mensagem ? (
                                    <div className={`alert alert-${classMensagem} text-center mt-4 fw-bold mx-auto w-50`} >
                                        <p>{mensagem}! </p>
                                    </div>
                                ) : ""}

                            </div>


                        </div>
                    </div >
                ) : (
                    <div className="alert alert-danger mt-4">
                        Algo deu errado ao carregar o aluguel
                    </div>
                )
            }
        </div >

    )
}