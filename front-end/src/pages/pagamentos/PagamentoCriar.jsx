import { useEffect, useState } from "react"
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import { Link, useParams } from "react-router-dom";


export default function PagamentoCriar() {
    const [aluguel, setAluguel] = useState({});
    const { id } = useParams();
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");
    const [novaDataVencimento, setNovaDataVencimento] = useState("");

    async function buscarDados() {
        const rota = routes.aluguel.buscar_aluguel_id.replace(":id", id)
        try {
            const res = await api.get(rota);
            setAluguel(res.data)
            mudarVencimento();
        } catch (error) {
            setClassMensagem("danger")
            setMensagem(error.response?.data?.message || "Erro inesperado")
        }
    }
    const data = new Date().toISOString();

    function mudarVencimento() {
        const data = new Date();
        data.setDate(data.getDate() + 7);
        const dataFormatada = data.toISOString().split('T')[0];
        setNovaDataVencimento(dataFormatada);
        setAluguel(prev => (
            { ...prev, novo_vencimento: dataFormatada }
        ))
    }

    async function enviarDados(e) {
        e.preventDefault();
        try {
            const res = await api.post(routes.pagamento.criarPagamento, aluguel);
            setClassMensagem("success");
            setMensagem(res.data.message);
        } catch (error) {
            setClassMensagem("danger");
            setMensagem(error.response?.data?.message);
        }


    }


    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0"> Adicionar pagamento</h5>
                </div>

                <div className="card-body">
                    <p className="fw-semibold mb-4">
                        Usuário: <span className="text-primary">{aluguel.usuario}</span>
                    </p>

                    <form onSubmit={enviarDados}>
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Moto</label>
                                <input type="text" className="form-control" required disabled value={aluguel.moto || ""} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Placa</label>
                                <input type="text" className="form-control" required disabled value={aluguel.placa || ""} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Data de vencimento</label>
                                <input
                                    type="date"
                                    name="data_vencimento"
                                    className="form-control"
                                    min="2026-01-01"
                                    max="2050-12-31"
                                    required
                                    value={aluguel.data_vencimento || ""}
                                    disabled />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Valor pago</label>
                                <div className="input-group">
                                    <span className="input-group-text">R$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="valor_aluguel"
                                        className="form-control"
                                        required
                                        value={aluguel.valor_aluguel ?? ""}
                                        onChange={(e) => setAluguel({ ...aluguel, valor_aluguel: e.target.value })} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Novo vencimento</label>
                                <input
                                    type="date"
                                    name="novo_vencimento"
                                    className="form-control"

                                    required
                                    value={novaDataVencimento || ""}
                                    onChange={(e) => {
                                        const data = e.target.value;
                                        setNovaDataVencimento(data)
                                        setAluguel({ ...aluguel, novo_vencimento: data });
                                    }} />
                            </div>



                        </div>
                        {mensagem ? (
                            <div className={`alert alert-${classMensagem} text-center mt-4 fw-bold mx-auto w-50`} >
                                <p>{mensagem} </p>
                            </div>
                        ) : ""}

                        <div className="d-flex justify-content-between mt-4">
                            <Link to={`/admin/usuario/${aluguel.UserId}/alugueis`} className="btn btn-outline-secondary btn-sm">
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