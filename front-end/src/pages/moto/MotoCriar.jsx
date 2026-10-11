import { Link } from "react-router-dom"
import { api } from "../../services/api"
import { routes } from "../../config/routes"
import { useState } from "react";


export default function MotoCriar() {
    const [mensagem, setMensagem] = useState("");
    const [moto, setMoto] = useState({});
    const [classMensagem, setClassMensagem] = useState("danger");

    async function enviarDados(e) {
        e.preventDefault();
        try {
            const res = await api.post(routes.moto.criar, moto);
            if (res.status == 201) {
                setClassMensagem("success");
                setMensagem(res.data.message);
            }

        } catch (error) {
            if (error.response?.status === 409) {
                setClassMensagem("danger");
                setMensagem(error.response?.data.message);
            } else {
                setClassMensagem("danger");
                setMensagem("Erro inesperado");
            }
        }


    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow-sm mt-3">
                        <div className="card-header bg-light">
                            <h6 className="mb-0 fw-semibold">
                                Adicionar moto
                            </h6>
                        </div>

                        <div className="card-body">
                            <form onSubmit={enviarDados}>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Nome da moto
                                        </label>
                                        <input type="text" className="form-control" pattern="^[A-Za-z0-9]+( [A-Za-z0-9]+)*$"
                                            title="Apenas letras e 1 espaço entre os nomes são permitidos" name="nome"
                                            onChange={(e) => setMoto({ ...moto, nome: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Marca
                                        </label>
                                        <input type="text" className="form-control" pattern="[a-zA-Z]+" name="marca"
                                            onChange={(e) => setMoto({ ...moto, marca: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Cor
                                        </label>
                                        <input type="text" className="form-control" pattern="[a-zA-Z]+" name="cor"
                                            onChange={(e) => setMoto({ ...moto, cor: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Placa
                                        </label>
                                        <input type="text" className="form-control" name="placa"
                                            value={moto.placa}
                                            onChange={(e) => {
                                                const valor = e.target.value;
                                                if (/^[a-zA-Z0-9]*$/.test(valor)) {
                                                    setMoto({ ...moto, placa: valor });
                                                }
                                            }}
                                            placeholder="Ex: ABC1234" required minLength={7} maxLength={7} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Descrição para exibir no site
                                        </label>
                                        <textarea className="form-control" pattern="[a-zA-Z]+" name="cor"
                                            onChange={(e) => setMoto({ ...moto, descricao: e.target.value })} required />
                                    </div>
                                </div>

                                <hr />




                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <Link to={'/motos'} className="btn btn-outline-secondary">Voltar</Link>
                                    <button type="submit" className="btn btn-success px-4">
                                        Adicionar
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
        </>
    )
}