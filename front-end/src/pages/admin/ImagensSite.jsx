import { Link } from "react-router-dom"
import { api } from "../../services/api"
import { routes } from "../../config/routes"
import { useEffect, useState } from "react"
import MensagemErro from "../../components/MensagemErro"



export default function ImagensSite() {
    const [imagens, setImagens] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("danger")
    const url_imagem = routes.imagem.rota;

    async function buscarImagens() {
        try {
            const res = await api.get(routes.imagem.imagem_destaque);
            setImagens(res.data.imagens);
        } catch (error) {
            setClassMensagem("danger");
            setMensagem(error.response?.data?.message);
        }

    }

    useEffect(() => {
        buscarImagens();
    }, [])
    return (
        <div className="container">

            {mensagem && (
                <MensagemErro mensagem={mensagem} setMensagem={setMensagem} classMensagem={classMensagem} />
            )}

            <h1 className="text-white">Imagens do site</h1>
            <div className="row g-4 mt-2">
                {imagens && imagens.length > 0 ? imagens.map(imagem => (
                    <div key={imagem.id} className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <img src={`${url_imagem}${imagem.url}`}
                                alt="Imagem da moto"
                                className="card-img-top img-padrao"
                                loading="lazy" />

                            <div className="card-body d-flex flex-column">

                                <p className={`badge ${imagem.destaque == 1 ? 'bg-success' : 'bg-secondary'}`}>
                                    {imagem.destaque == 1 ? 'Exibindo no site' : 'Não exibido'}
                                </p>

                                <div className="mt-auto">

                                    Retirar exibição do site ?

                                    <Link to={`/moto/${imagem.id_moto}/imagem`} className="btn btn-primary w-100 mt-2">
                                        Editar imagem
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>

                )) :
                    <div className={`alert alert-warning text-center`}>
                        <p>Nenhuma imagem exibida no site</p>
                    </div>
                }
            </div>
            < Link to={"/painel/admin"} className="btn btn-secondary mt-2">Voltar</Link>
        </div >
    )
}