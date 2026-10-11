import { Link } from "react-router-dom";
import { FaMotorcycle } from "react-icons/fa";

export default function Pagerror() {
    return (
        <div className="container text-center d-flex flex-column justify-content-center align-items-center vh-100">

            <div className="mb-4 text-success">
                <FaMotorcycle size={80} />
            </div>

            <h1 className="display-1 fw-bold text-dark">404</h1>

            <h3 className="mb-3">Oops! Página não encontrada</h3>

            <p className="text-muted mb-4" style={{ maxWidth: "500px" }}>
                Parece que você pegou a estrada errada
                A página que você está procurando não existe ou foi movida.
            </p>

            <Link to="/" className="btn btn-success btn-lg">
                Voltar para a página inicial
            </Link>

        </div>
    );
}