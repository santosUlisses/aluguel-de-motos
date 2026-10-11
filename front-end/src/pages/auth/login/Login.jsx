import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { VscLoading } from "react-icons/vsc";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../services/api";
import { routes } from "../../../config/routes";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [dadosLogin, setDadosLogin] = useState({});
    const [entrar, setEntrar] = useState("Entrar");
    const [msgError, setMsgError] = useState(null);
    const navigate = useNavigate();

    async function formulario(e) {
        e.preventDefault();
        setEntrar(<VscLoading className="loading" />)

        try {
            const res = await api.post(routes.usuario.login, dadosLogin);
            login(res.data.usuario, res.data.token);
            navigate("/painel/usuario")
        } catch (error) {
            setMsgError(error.response?.data?.message);
            const tempo = setTimeout(() => {
                setMsgError(null)
            }, 3000)
            setEntrar('Entrar')
            return () => clearTimeout(tempo);
        }

    }

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>

                <form onSubmit={formulario}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            name="email"
                            onChange={(e) => setDadosLogin({ ...dadosLogin, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            required
                            name="senha"
                            onChange={(e) => setDadosLogin({ ...dadosLogin, senha: e.target.value })}
                        />
                    </div>
                    {msgError ? (
                        <div className="alert alert-danger text-center mt-4 fw-bold" >
                            {msgError}
                        </div>
                    ) : ""}

                    <button className="btn btn-primary w-100">{entrar}</button>
                </form>
            </div>
        </div>

    )
}