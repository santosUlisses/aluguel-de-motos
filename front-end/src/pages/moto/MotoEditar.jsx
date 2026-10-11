import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../services/api"
import { routes } from "../../config/routes"



export default function MotoEditar() {
    const { id } = useParams();
    const [moto, setMoto] = useState({});
    const disponibilidade = ["disponivel", "alugada", "indisponivel"]
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");
    const routeUpdate = routes.moto.editar.replace(":id", id)



    const formData = new FormData()

    async function buscarMoto() {
        try {
            const res = await api.get(routeUpdate);
            setMoto(res.data);
        } catch (error) {
            setClassMensagem("danger")
            setMensagem(error.response?.data?.message)
        }
    }

    async function enviarDados(e) {
        e.preventDefault();
        if (moto.descricao.length > 120) {
            setMensagem("Limite de caracteres atingido")
            setClassMensagem("danger");
            return
        }
        try {
            const res = await api.put(routeUpdate, moto);
            if (res.status == 200) {
                setMensagem(res.data.message);
                setClassMensagem("success")
            }
        } catch (error) {
            const mensagem = error.response?.data?.message || "Erro ao comunicar com o servidor";
            setMensagem(mensagem);
            setClassMensagem("danger");
        }
    }

    useEffect(() => {
        buscarMoto();
    }, [id])



    return (
        <>
            {moto && moto ?
                (
                    <div className="row justify-content-center">

                        <div className="col-md-6">

                            <div className="card shadow-sm mt-2">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0 fw-semibold">
                                        Edição de dados da moto
                                    </h6>
                                </div>

                                <div className="card-body">




                                    <form onSubmit={enviarDados} >
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Nome da moto
                                                </label>
                                                <input type="text" value={moto.nome || ""}
                                                    onChange={(e) => setMoto({ ...moto, nome: e.target.value })} required
                                                    className="form-control" />

                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Cor
                                                </label>
                                                <input type="text" value={moto.cor || ""}
                                                    onChange={(e) => setMoto({ ...moto, cor: e.target.value })}
                                                    className="form-control" />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Marca
                                                </label>
                                                <input type="text" value={moto.marca || ""}
                                                    onChange={(e) => setMoto({ ...moto, marca: e.target.value })}
                                                    className="form-control" />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Placa
                                                </label>

                                                <input type="text" className="form-control" name="placa"
                                                    value={moto.placa || ""}
                                                    onChange={(e) => {
                                                        const valor = e.target.value;
                                                        if (/^[a-zA-Z0-9]*$/.test(valor)) {
                                                            setMoto({ ...moto, placa: valor });
                                                        }
                                                    }}
                                                    placeholder="Ex: ABC1234" required minLength={7} maxLength={7} />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Disponibilidade
                                                </label>

                                                <select value={moto.disponibilidade} onChange={(e) => setMoto({ ...moto, disponibilidade: e.target.value })}
                                                    className="form-control">
                                                    {disponibilidade.map((op, index) =>
                                                        <option key={index} value={op}>{op}</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">
                                                    Descrição para o site <span className="text-muted">(máx 120 caracteres)</span>
                                                </label>

                                                <textarea type="text" value={moto.descricao || ""}
                                                    onChange={(e) => setMoto({ ...moto, descricao: e.target.value })}
                                                    className="form-control" maxLength={120} />
                                                <p>
                                                    {120 - (moto.descricao?.length || 0)} caracteres restantes
                                                </p>
                                            </div>

                                        </div>


                                        <div className="d-flex justify-content-end gap-2 mt-4">
                                            <Link to={'/motos'} className="btn btn-outline-secondary">Voltar</Link>
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


                        </div >
                    </div >



                ) :
                (
                    <>
                        <p>Carregando...</p>
                    </>
                )
            }
        </>
    )
}