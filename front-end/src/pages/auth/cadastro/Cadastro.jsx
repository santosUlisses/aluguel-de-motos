import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { api } from "../../../services/api";
import { routes } from "../../../config/routes";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erroSenha, setErroSenha] = useState(false);
    const [msgError, setMsgError] = useState(false);
    const [msgSucess, setMsgSuccess] = useState(null);
    const [contagem, setContagem] = useState(null);

    const navigate = useNavigate();

    function mostrarDiv(mensagem) {
        setMsgSuccess(mensagem);
        setContagem(5);
    }

    useEffect(() => {
        if (contagem === 0) {
            return navigate("/login")
        }
        const tempo = setTimeout(() => {
            setContagem(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(tempo);
    }, [contagem])

    async function formulario(e) {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            setErroSenha(true);
            const contador = setTimeout(() => {
                setErroSenha(null);
            }, 3000)
            return () => clearTimeout(contador);
        }

        try {
            const res = await api.post(routes.usuario.criar, {
                nome,
                email,
                senha,
            });
            mostrarDiv(res.data.message);
        } catch (error) {
            if (error.response) {
                setMsgError(error.response.data.message);
                const contador = setTimeout(() => {
                    setMsgError(null);
                }, 3000)
                return () => clearTimeout(contador);
            } else {
                setMsgError("Erro inesperado");
            }
        }


    }

    return (
        <>

            <div className="container my-5 d-flex justify-content-center">
                <div className="card shadow w-100" >
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Criar conta</h5>
                    </div>

                    <div className="card-body">
                        <form onSubmit={formulario} method="post" id="form">
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" name="nome" required
                                    value={nome} onChange={((e) => { setNome(e.target.value) })}></input>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" name="email" required value={email}
                                    onChange={((e) => setEmail(e.target.value))}></input>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="senha" className="form-label"> Senha</label>
                                <input type="password" className="form-control" id="senha" name="senha" placeholder="Digite uma senha" required
                                    value={senha} onChange={((e) => setSenha(e.target.value))}></input>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="senha" className="form-label">Confirme a Senha</label>
                                <input type="password" className="form-control" name="confirmarSenha" placeholder="Confirme a nova senha" required
                                    value={confirmarSenha} onChange={((e) => setConfirmarSenha(e.target.value))}></input>
                            </div>


                            {erroSenha ? (
                                <div className="alert alert-danger text-center mt-4 fw-bold" >
                                    As senhas não se coincidem!
                                </div>
                            ) : ""}
                            {msgError ? (
                                <div className="alert alert-danger text-center mt-4 fw-bold" >
                                    {msgError}
                                </div>
                            ) : ""}
                            {msgSucess ? (
                                <div className="alert alert-success text-center mt-4 fw-bold" >
                                    <p>{msgSucess}! você será redirecionado para o login em {contagem}</p>
                                </div>
                            ) : ""}




                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary"> Cadastrar</button>
                            </div>
                        </form>
                    </div>

                    <div className="card-footer text-end">
                        <a href="/" className="btn btn-outline-secondary btn-sm"> Voltar</a>
                    </div>
                </div>
            </div>




        </>
    )
}