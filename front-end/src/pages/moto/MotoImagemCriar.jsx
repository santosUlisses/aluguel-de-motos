import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../services/api"
import { routes } from "../../config/routes"



export default function MotoImagem() {
    const { id } = useParams();
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");
    const [destaque, setDestaque] = useState();
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const destaqueInput = useRef(null);
    const formData = new FormData();

    async function enviarDados(e) {
        e.preventDefault();
        formData.append("destaque", destaque);
        formData.append("imagem", imagem);
        if (!destaque || !imagem) {
            setMensagem("Algum dado necessário não foi fornecido");
            setClassMensagem("danger");
            return
        }
        const url = routes.imagem.criar_imagem.replace(":id", id);

        try {
            const res = await api.post(url, formData);
            if (res.status == 200) {
                setMensagem(res.data.message);
                setClassMensagem("success")
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                destaqueInput.current.value = "Selecione";
                setDestaque(null)
                setImagem(null)
                setPreview(null);
            }

        } catch (error) {
            setMensagem(error.response?.data?.message || "Erro ao comunicar com o servidor");
            setClassMensagem("danger")
        }
    }

    const removerImagem = () => {
        setImagem(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className="row justify-content-center">

            <div className="col-md-6">

                <div className="card shadow-sm mt-2">
                    <div className="card-header bg-light">
                        <h6 className="mb-0 fw-semibold">
                            Adicionar imagem
                        </h6>
                    </div>

                    <div className="card-body">
                        <form onSubmit={enviarDados} >

                            <div className=" mb-3">
                                <label className="form-label fw-semibold">
                                    Imagem da moto
                                </label>
                                <input type="file" accept="image/*" ref={fileInputRef} className="form-control"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setImagem(file);
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }} />
                                {preview && (
                                    <div style={{ marginTop: "10px" }}>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            style={{ width: "200px", display: "block", marginBottom: "10px" }}
                                        />

                                        <button type="button" className="btn btn-danger" onClick={removerImagem}>
                                            Remover imagem
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Mostrar no site
                                </label>

                                <select onChange={(e) => setDestaque(e.target.value)}
                                    className="form-control" ref={destaqueInput}>
                                    <option value="#">Selecione</option>
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </select>
                            </div>



                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <Link to={`/moto/${id}/imagem`} className="btn btn-outline-secondary">Voltar</Link>
                                <button type="submit" className="btn btn-success px-4">
                                    Adicionar imagem
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
    )
}