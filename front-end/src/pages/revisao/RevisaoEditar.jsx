import { Link, useParams } from "react-router-dom"
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import { useEffect, useState } from "react";



export default function RevisaoEditar() {
    const { id } = useParams();
    const [revisao, setRevisao] = useState({});
    const rota = routes.revisao.editar.replace(":id", id);
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");


    async function buscarRevisao() {
        try {
            const response = await api.get(rota);
            setRevisao(response.data.revisao);
        } catch (error) {
            console.log(error.response?.data);
        }
    }

    async function enviarDados(e) {
        e.preventDefault();
        if (revisao.detalhes.length > 255) {
            setMensagem("Limite de caracteres atingido");
            setClassMensagem("danger");
            return
        }
        try {
            const response = await api.post(rota, revisao);
            if (response.status === 200) {
                setMensagem(response.data.message);
                setClassMensagem("success");
            }

        } catch (error) {
            setClassMensagem("danger")
            setMensagem(error.response?.data?.message);
        }
    }
    useEffect(() => {
        buscarRevisao();
    }, []);

    return (
        <div className="row justify-content-center">

            <div className="col-md-6">

                <div className="card shadow-sm mt-2">
                    <div className="card-header bg-light">
                        <h6 className="mb-0 fw-semibold">
                            Edição de revisão
                        </h6>
                    </div>

                    <div className="card-body">

                        <form onSubmit={enviarDados}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        Data da revisão
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        required
                                        name="data_revisao"
                                        value={revisao.data_revisao || ""}
                                        onChange={(e) => setRevisao({ ...revisao, data_revisao: e.target.value })} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">
                                        Valor da revisão (R$)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        required
                                        name="valor"
                                        value={revisao.valor || ""}
                                        onChange={(e) => setRevisao({ ...revisao, valor: e.target.value })} />
                                </div>

                                <div className=" mb-3">
                                    <label className="form-label fw-semibold">
                                        Quilometragem
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        required
                                        name="quilometragem"
                                        value={revisao.quilometragem || ""}
                                        onChange={(e) => setRevisao({ ...revisao, quilometragem: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Detalhes <span className="text-muted">máx. 255 caracteres</span>
                                    </label>
                                    <textarea name="detalhes" className="form-control" value={revisao.detalhes || ""}
                                        onChange={(e) => setRevisao({ ...revisao, detalhes: e.target.value })} maxLength={255} />
                                    <p>{255 - (revisao.detalhes?.length) || 0} caracteres restante</p>
                                </div>
                            </div>


                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <Link to={`/moto/${revisao.MotoId}/revisao`} className="btn btn-outline-secondary">Voltar</Link>
                                <button type="submit" className="btn btn-success px-4">
                                    Salvar alterações
                                </button>
                            </div>
                        </form>
                    </div>

                    {mensagem ? (
                        <div className={`alert alert-${classMensagem} text-center mt-4 fw-bold mx-auto w-50`} >
                            <p>{mensagem || "Erro inesperado"} </p>
                        </div>
                    ) : ""}

                </div>


            </div>
        </div >
    )
}