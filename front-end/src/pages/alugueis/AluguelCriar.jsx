import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import { Link } from "react-router-dom";

export default function AluguelCriar() {
    const { id } = useParams();
    const location = useLocation();
    const { nomeUsuario } = location.state || {};
    const [motos, setMotos] = useState([]);
    const [dados, setDados] = useState({ UserId: id });
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");
    const navigate = useNavigate();

    async function buscarMotos() {
        try {
            const response = await api.get(routes.moto.listar);
            setMotos(response.data.motos)
        } catch (error) {
            setClassMensagem("danger")
            setMensagem(error.response?.data?.message)
        }
    }
    useEffect(() => {
        buscarMotos();
    }, []);

    const motosDisponiveis = motos.filter(moto =>
        moto.disponibilidade == "disponivel"
    );

    async function pegarDados(e) {
        e.preventDefault();

        try {
            const res = await api.post(`${routes.aluguel.criar}`, dados);
            setClassMensagem("success")
            setMensagem(res.data.message);
            navigate(`/admin/usuario/${id}/alugueis`);
        } catch (error) {
            setClassMensagem("danger")
            setMensagem(error.response?.data?.message);

        }
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0"> Novo Aluguel</h5>
                </div>

                <div className="card-body">
                    <p className="fw-semibold mb-4">
                        Usuário: <span className="text-primary">{nomeUsuario}</span>
                    </p>

                    <form onSubmit={pegarDados}>
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Data de início</label>
                                <input
                                    type="date"
                                    min="2026-01-01"
                                    max="2050-12-31"
                                    name="data_inicio"
                                    className="form-control"
                                    required
                                    onChange={(e) => setDados({ ...dados, data_inicio: e.target.value })}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Data de vencimento</label>
                                <input
                                    type="date"
                                    name="data_vencimento"
                                    min="2026-01-01"
                                    max="2050-12-31"
                                    className="form-control"
                                    required
                                    onChange={(e) => setDados({ ...dados, data_vencimento: e.target.value })}

                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Valor do aluguel</label>
                                <div className="input-group">
                                    <span className="input-group-text">R$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="valor_aluguel"
                                        className="form-control"
                                        required
                                        onChange={(e) => setDados({ ...dados, valor_aluguel: parseFloat(e.target.value) })}

                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Moto disponível</label>
                                <select
                                    name="MotoId"
                                    className="form-select"
                                    required
                                    defaultValue={""}
                                    onChange={(e) => setDados({ ...dados, MotoId: e.target.value })}>
                                    <option value="#" disabled>
                                        Selecione uma moto
                                    </option>

                                    {motosDisponiveis?.map(m => (
                                        <option key={m.id} value={m.id}>
                                            {m.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        {mensagem ? (
                            <div className={`alert alert-${classMensagem} text-center mt-4 fw-bold mx-auto w-50`} >
                                <p>{mensagem}! </p>
                            </div>
                        ) : ""}

                        <div className="d-flex justify-content-between mt-4">
                            <Link to={`/admin/usuario/${id}/alugueis`} className="btn btn-outline-secondary btn-sm">
                                Voltar
                            </Link>

                            <button type="submit" className="btn btn-primary px-4">
                                Salvar aluguel
                            </button>
                        </div>

                    </form>
                </div>


            </div>
        </div>

    )
}