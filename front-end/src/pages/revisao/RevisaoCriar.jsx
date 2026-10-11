import { useState } from "react"
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { routes } from "../../config/routes";



export default function RevisaoCriar() {
    const { id } = useParams();
    const [dados, setDados] = useState({ "MotoId": id });
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");

    async function enviarDados(e) {
        e.preventDefault();
        if (dados.detalhes.length > 255) {
            setMensagem("detalhe máximo de caracteres atingido")
            setClassMensagem("danger")
            return
        }
        try {
            const response = await api.post(routes.revisao.criar, dados);
            if (response.status == 200) {
                setMensagem(response.data.message);
                setClassMensagem("success");
                setDados("");
            }

        } catch (error) {
            setMensagem(error.response?.data?.message);
            setClassMensagem("danger");
            console.log(error.response?.data)
        }

    }
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">

                        <div className="card-header bg-light">
                            <h6 className="mb-0 fw-semibold">
                                Adicionar revisão
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
                                            value={dados.data_revisao || ""}
                                            onChange={(e) => setDados({ ...dados, data_revisao: e.target.value })} />
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
                                            value={dados.valor || ""}
                                            onChange={(e) => setDados({ ...dados, valor: e.target.value })} />
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
                                            value={dados.quilometragem || ""}
                                            onChange={(e) => setDados({ ...dados, quilometragem: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Detalhes
                                        </label>
                                        <textarea name="detalhes" className="form-control" value={dados.detalhes || ""}
                                            onChange={(e) => setDados({ ...dados, detalhes: e.target.value })} maxLength={255} />
                                        <p>{255 - (dados.detalhes?.length || 0)} caracteres</p>
                                    </div>
                                </div>


                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <Link to={`/moto/${id}/revisao`} className="btn btn-outline-secondary">Voltar</Link>
                                    <button type="submit" className="btn btn-success px-4">
                                        Salvar alterações
                                    </button>
                                </div>
                            </form>
                        </div>
                        {mensagem ? (
                            <div className={`alert alert-${classMensagem} text-center mt-4 fw-bold mx-auto w-50`} >
                                <p>{mensagem} </p>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </div>

        </div>
    )
}