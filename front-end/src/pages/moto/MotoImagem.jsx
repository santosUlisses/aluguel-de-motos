
import { useEffect, useState } from "react"
import { routes } from "../../config/routes"
import { api } from "../../services/api"
import { Link, useParams } from "react-router-dom"


export default function MotoImagens() {
    const { id } = useParams();
    const [imagens, setImagens] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [classMensagem, setClassMensagem] = useState("");
    const [dados_imagem, setDados_imagem] = useState({});
    const url_imagem = routes.imagem.rota;

    async function buscarImagens() {
        const url = routes.imagem.imagens_moto.replace(":id", id);
        try {
            const res = await api.get(url);
            setImagens(res.data.imagem);


        } catch (error) {
            setMensagem(error.response?.data?.message);
            setClassMensagem("danger");
        }
    }

    async function editarDestaque(e, id_imagem) {
        e.preventDefault();

        const url = routes.imagem.editar_imagem.replace(":id", id_imagem);

        try {
            const res = await api.put(url, dados_imagem);
            if (res.status == 200) {
                setMensagem(res.data.message);
                setClassMensagem("success");
                const novoDestaque = parseInt(dados_imagem.destaque);
                setImagens(prev => prev.map(
                    img => img.id == id_imagem ? { ...img, destaque: novoDestaque } : img
                ));
            }


        } catch (error) {
            setMensagem(error.response?.data?.message);
            setClassMensagem("danger");
        }
    }

    const botaoFechar = () => {
        setMensagem("");
        setClassMensagem("");
    }

    async function deletarImagem(id) {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja excluir esta moto?"
        );
        if (!confirmDelete) return;

        const url = routes.imagem.deletar_imagem.replace(":id", id);
        try {
            const res = await api.delete(url);
            if (res.status == 200) {
                setMensagem(res.data.message);
                setClassMensagem("success");
                setImagens(prev => prev.filter(img => img.id !== id));
            }
        } catch (error) {
            setMensagem(error.response?.data?.message);
            setClassMensagem("danger");
        }
    }

    useEffect(() => {
        buscarImagens();
    }, [])

    return (

        <div className="container">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div>
                    <h4 className="mb-2 mt-2 text-white">Imagens da moto</h4>
                    <Link to={`/moto/${id}/add-imagem`} className="btn btn-sm btn-success mt-2 ">+ Adicionar imagem</Link>
                </div>
            </div>

            <div className="row g-4 mt-2">
                {mensagem ?
                    <div className={`alert alert-${classMensagem} alert-dismissible fade show text-center`}>
                        {mensagem}
                        <button type="button" className="btn-close" onClick={(e) => botaoFechar()} data-bs-dismiss="alert"></button>
                    </div> : ""}


                {imagens.length > 0 ? imagens.map(imagem => (
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
                                    Exibir no site?
                                    <form onSubmit={(e) => editarDestaque(e, imagem.id)}>

                                        <select name="destaque" className="form-control mb-2" onChange={(e) => setDados_imagem({ ...dados_imagem, destaque: e.target.value })} >
                                            <option >Selecione</option>
                                            <option value="1">Sim</option>
                                            <option value="0">Não</option>
                                        </select>
                                        <button className="btn btn-primary mb-2">aplicar</button>
                                    </form>

                                    <button className="btn btn-danger w-100" onClick={(e) => deletarImagem(imagem.id)}>
                                        Excluir
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                ))
                    :

                    <div className="alert alert-warning text-center">
                        Nenhuma imagem cadastrada
                    </div>
                }

            </div>

            <Link to={'/motos'} className="btn btn-secondary mb-2 mt-4">
                Voltar
            </Link>
        </div >

    )
}