import { Link } from "react-router-dom"
import { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext"

export default function Navbar() {
    const { usuario, logOut } = useContext(AuthContext)
    const [aberto, setAberto] = useState(false);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <div className="container-fluid">


                    <Link to="/layout/page" className="navbar-brand">
                        Página
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setAberto(!aberto)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className={`collapse navbar-collapse ${aberto ? "show" : ""}`}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {usuario && usuario.tipo_usuario == "admin" ?
                                <li className="nav-item">
                                    <Link to="/painel/admin" className="nav-link">
                                        Painel Admin
                                    </Link>
                                </li> : ""}
                        </ul>

                        <ul className="navbar-nav">
                            {usuario ? (
                                <>

                                    <li className="nav-item d-flex align-items-center text-white ">
                                        <strong>Olá, {usuario.nome}</strong>
                                    </li>

                                    <li className="nav-item d-flex align-items-center text-white ">
                                        <Link to="/painel/usuario" className="nav-link">
                                            Painel Usuário
                                        </Link>
                                    </li>


                                    <li className="nav-item d-flex align-items-center me-2 text-white" >
                                        <button
                                            onClick={logOut}
                                            className="btn btn-outline-light btn-sm">
                                            Sair
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/cadastro" className="nav-link">
                                            Cadastro
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}

