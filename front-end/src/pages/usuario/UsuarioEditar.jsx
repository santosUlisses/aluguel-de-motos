import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import MensagemErro from "../../components/MensagemErro";



export default function UsuarioEditar() {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const [usuario, setUsuario] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [classMensagemErro, setClassMensagemErro] = useState("danger");
    const rota = routes.usuario.editar.replace(":id", user.id)


    async function buscarDados(id) {
        try {
            const response = await api.get(rota);
            setUsuario(response.data.usuario);
        } catch (error) {
            setMensagemErro(error.response?.data?.message)
        }
    }
    async function enviarDados(e) {
        e.preventDefault();
        if (usuario.senha !== usuario.confirmarSenha) {
            setMensagem("As senhas não coincidem");
            setClassMensagem("danger");
            return
        }

        try {
            const response = await api.put(rota, usuario);
            setMensagem(response.data.message)
            setClassMensagem("success");
        } catch (error) {
            setMensagem(error.response.data.message)
            setClassMensagem("danger");
        }
    }

    useEffect(() => {
        buscarDados(user.id);
    }, []);

    return (
        <div className="row justify-content-center">

            <div className="col-md-6">

                {mensagemErro && (
                    <MensagemErro mensagem={mensagemErro} setMensagem={setMensagemErro} classMensagem={classMensagemErro} />
                )}

                <div className="card shadow-sm mt-2">
                    <div className="card-header bg-light">
                        <h6 className="mb-0 fw-semibold">
                            Editar dados
                        </h6>
                    </div>

                    <div className="card-body">

                        <form onSubmit={enviarDados}>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    name="nome"
                                    value={usuario.nome || ""}
                                    onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    required
                                    name="email"
                                    value={usuario.email || ""}
                                    onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    required
                                    name="senha"
                                    value={usuario.senha || ""}
                                    onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Confirmar senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    required
                                    name="confirmarSenha"
                                    value={usuario.confirmarSenha || ""}
                                    onChange={(e) => setUsuario({ ...usuario, confirmarSenha: e.target.value })} />
                            </div>






                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <Link to={`/painel/usuario`} className="btn btn-outline-secondary">Voltar</Link>
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