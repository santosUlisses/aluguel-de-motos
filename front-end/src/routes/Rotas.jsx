import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Loading from '../components/loading/Loading.jsx';
import RotaAdmin from '../middlewares/RotaAdmin.jsx';
import RotaUsuario from '../middlewares/RotaUsuario.jsx';
import RotaLogado from '../middlewares/RotaLogado.jsx';

const App = lazy(() => import('../App.jsx'))
const Pagerror = lazy(() => import('../components/Pagerror.jsx'))
const Layout = lazy(() => import('../pages/landing/layout/Layout.jsx'))
const Landing = lazy(() => import('../pages/landing/Landing.jsx'))

const Usuarios = lazy(() => import('../pages/admin/Usuarios.jsx'))
const Login = lazy(() => import('../pages/auth/login/Login.jsx'))
const Cadastro = lazy(() => import('../pages/auth/cadastro/Cadastro.jsx'))
const AdminPainel = lazy(() => import('../pages/admin/dashboard/AdminPainel.jsx'))
const UsuarioPainel = lazy(() => import('../pages/usuario/dashboard/UsuarioPainel.jsx'))
const UsuarioAlugueis = lazy(() => import('../pages/admin/UsuarioAlugueis.jsx'))
const ImagensSite = lazy(() => import('../pages/admin/ImagensSite.jsx'))
const Comentarios = lazy(() => import('../pages/admin/Comentarios.jsx'))

const UsuarioEditar = lazy(() => import('../pages/usuario/UsuarioEditar.jsx'))
const UsuarioListaAlugueis = lazy(() => import('../pages/usuario/UsuarioListaAlugueis.jsx'))
const UsuarioListaPagamentos = lazy(() => import('../pages/usuario/UsuarioListaPagamentos.jsx'))
const UsuarioComentario = lazy(() => import('../pages/usuario/UsuarioComentario.jsx'))

const Motos = lazy(() => import('../pages/moto/Motos.jsx'))
const MotosCriar = lazy(() => import('../pages/moto/MotoCriar.jsx'))
const MotosEditar = lazy(() => import('../pages/moto/MotoEditar.jsx'))
const MotoImagemCriar = lazy(() => import('../pages/moto/MotoImagemCriar.jsx'))
const MotoImagem = lazy(() => import('../pages/moto/MotoImagem.jsx'))

const Revisao = lazy(() => import('../pages/revisao/Revisao.jsx'))
const RevisaoCriar = lazy(() => import('../pages/revisao/RevisaoCriar.jsx'))
const RevisaoEditar = lazy(() => import('../pages/revisao/RevisaoEditar.jsx'))
const Alugueis = lazy(() => import('../pages/alugueis/Alugueis.jsx'))
const AluguelEditar = lazy(() => import('../pages/alugueis/AluguelEditar.jsx'))
const AluguelCriar = lazy(() => import('../pages/alugueis/AluguelCriar.jsx'))

const Pagamentos = lazy(() => import('../pages/pagamentos/Pagamentos.jsx'))
const PagamentosUsuario = lazy(() => import('../pages/pagamentos/PagamentosUsuario.jsx'))
const PagamentoCriar = lazy(() => import('../pages/pagamentos/PagamentoCriar.jsx'))






export const rota = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<Loading />}>
                <App />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Loading />}>
                <Pagerror />
            </Suspense>
        ),
        children: [

            {
                element: <RotaLogado />,
                children: [
                    { path: '/cadastro', element: <Cadastro /> },
                    { path: '/login', element: <Login /> },

                ]
            },


            {
                element: <RotaAdmin />,
                children: [
                    { path: '/painel/admin', element: <AdminPainel /> },
                    { path: '/admin/usuarios', element: <Usuarios /> },
                    { path: '/admin/usuario/:id/alugueis', element: <UsuarioAlugueis /> },
                    { path: '/admin/imagem-site', element: <ImagensSite /> },
                    { path: '/admin/comentarios', element: <Comentarios /> },

                    { path: '/motos', element: <Motos /> },
                    { path: '/motos/criar', element: <MotosCriar /> },
                    { path: '/moto/:id', element: <MotosEditar /> },
                    { path: '/moto/:id/add-imagem', element: <MotoImagemCriar /> },
                    { path: '/moto/:id/imagem', element: <MotoImagem /> },

                    { path: '/moto/:id/revisao', element: <Revisao /> },
                    { path: '/moto/:id/revisao/criar', element: <RevisaoCriar /> },
                    { path: '/revisao/:id', element: <RevisaoEditar /> },

                    { path: '/admin/alugueis', element: <Alugueis /> },
                    { path: '/aluguel/:id', element: <AluguelEditar /> },
                    { path: '/aluguel/criar/:id', element: <AluguelCriar /> },

                    { path: '/pagamentos', element: <Pagamentos /> },
                    { path: '/pagamento/usuario/:id', element: <PagamentosUsuario /> },
                    { path: '/pagamento/aluguel/:id', element: <PagamentoCriar /> },
                ]
            },

            {
                element: <RotaUsuario />,
                children: [
                    { path: '/usuario/editar-dados', element: <UsuarioEditar /> },
                    { path: '/usuario/meus-alugueis', element: <UsuarioListaAlugueis /> },
                    { path: '/meus-pagamentos', element: <UsuarioListaPagamentos /> },
                    { path: '/comentario', element: <UsuarioComentario /> },
                    { path: '/painel/usuario', element: <UsuarioPainel /> },
                ]
            },

        ],
    },
    {
        path: '/layout',
        element: (
            <Suspense fallback={<Loading />}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: '/layout/page',
                element: <Landing />,
            },
        ],
    },
])
