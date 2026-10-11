export const routes = {
    usuario: {
        criar: "/usuario",
        listar: "/usuarios",
        editar: `/usuario/:id`,
        login: "/usuario/login",
    },
    moto: {
        criar: "/moto",
        listar: "/motos",
        editar: "/moto/:id",
        deletar: "/moto/:id",
    },
    aluguel: {
        criar: "/aluguel",
        listar: "/alugueis",
        alugueis_usuario: "/alugueis/usuario/:id",
        editar: "/aluguel/:id",
        deletar: "/aluguel/:id",
        buscar_aluguel_id: '/aluguel/:id',
    },
    revisao: {
        criar: "/revisao",
        listar: "/moto/:id/revisao",
        editar: "/revisao/:id",
        deletar: "/revisao/:id",

    },
    pagamento: {
        listar: '/pagamentos',
        listarPorId: '/pagamento/usuario/:id',
        criarPagamento: '/pagamento',
    },
    imagem: {
        rota: "http://localhost:3000",
        criar_imagem: "/moto/:id/imagem",
        imagens_moto: "/moto/:id/imagem",
        imagem_destaque: "/imagem/destaque",
        editar_imagem: "/imagem/:id",
        deletar_imagem: "/imagem/:id"
    },
    comentario: {
        criar: "/comentario",
        buscar: "/comentarios",
        buscar_aprovado: "/comentarios/aprovado",
        mudarStatus: "/comentario/:id/status",
    }
}