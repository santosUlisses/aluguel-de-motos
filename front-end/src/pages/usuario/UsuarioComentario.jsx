import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "../../services/api";
import { routes } from "../../config/routes";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";







export default function UsuarioComentarios() {
    const { user } = useContext(AuthContext)
    const [nota, setNota] = useState(0);
    const [dados, setDados] = useState({ UserId: user?.id });
    const [mensagem, setMensagem] = useState("")
    const [classMensagem, setClassMensagem] = useState("");
    const maxCaracter = 155;


    async function enviarDados(e) {
        e.preventDefault()
        if (!dados.nota || !dados.comentario) {
            alert("selecione uma nota de 1 a 5 estrelas e deixe um comentário");
            return
        }
        try {
            const res = await api.post(routes.comentario.criar, dados);
            setClassMensagem("success");
            setMensagem(res.data.message);
            limparCampos()
        } catch (error) {
            setClassMensagem("danger");
            setMensagem(error.response?.data?.message);
        }

    }

    function limparCampos() {
        setDados({
            UserId: user.id,
            comentario: "",
            nota: 0,
        })
    }
    return (

        <div className="container py-5 ">

            {mensagem ? <div className={`position-fixed alert alert-${classMensagem} alert-dismissible top-0 start-50 translate-middle-x mt-3 shadow`}
                style={{ zIndex: 9999 }}>
                <button type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setMensagem("")}></button>
                <p>{mensagem} </p>
            </div> : ""}

            <div className="row justify-content-center ">

                <div className="card border-0 shadow-sm comentario-card col-md-8 col-lg-6">

                    <div className="card-body p-4 p-md-5">

                        <div className="text-center mb-4">

                            <h2 className="fw-bold mb-2">
                                Deixe seu comentário
                            </h2>

                            <p className="text-muted ">
                                Conte-nos como foi sua experiência conosco.
                                Sua opinião é muito importante para nós!
                            </p>

                        </div>

                        <form onSubmit={enviarDados}>

                            <div className="mb-4">

                                <input type="hidden" onChange={() => setDados({ ...dados, UserId: user.id })} />

                                <div className="mb-4 text-center">

                                    <label className="form-label fw-semibold d-block">
                                        Como você avalia nossa experiência?
                                    </label>

                                    <div>
                                        {[1, 2, 3, 4, 5].map((estrela) => (
                                            <button key={estrela}
                                                type="button"
                                                className="btn p-1"
                                                onClick={() => (setDados({ ...dados, nota: estrela }))}>

                                                <span className={estrela <= dados.nota
                                                    ? "text-warning fs-2"
                                                    : "text-secondary fs-2"}>
                                                    <FaStar />
                                                </span>

                                            </button>
                                        ))}
                                    </div>

                                    <small className="text-muted">
                                        {dados.nota == undefined || 0
                                            ? "Selecione uma nota"
                                            : `${dados.nota} de 5 estrelas`}
                                    </small>

                                </div>


                                <label className="form-label fw-semibold">
                                    Seu comentário
                                </label>


                                <textarea name="comentario"
                                    className="form-control comentario-textarea"
                                    placeholder="Digite aqui seu comentário..."
                                    value={dados.comentario || ""}
                                    onChange={(e) => setDados({ ...dados, comentario: e.target.value })}
                                    rows="6" required minLength={10} maxLength={155}></textarea>

                                <div className="form-text">
                                    <p className="text-muted">{maxCaracter - dados.comentario?.length || 155} caracteres restante</p>
                                    Compartilhe sua experiência de forma respeitosa.
                                </div>

                            </div>

                            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                                Enviar comentário
                            </button>

                        </form>

                    </div>

                </div>

            </div >

            <Link to="/painel/usuario" className="btn btn-secondary mt-3">
                Voltar
            </Link>

        </div >

    )
}