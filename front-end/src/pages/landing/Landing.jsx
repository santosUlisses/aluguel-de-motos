import './landing.css'
import Inicio from './sections/Inicio'
import ComoTrabalhamos from './sections/ComoTrabalhamos'
import Vantagens from './sections/Vantagens'
import Faq from './sections/Faq'
import Footer from './sections/Footer'
import Catalogo from './sections/Catalogo'
import MotoristaApp from './sections/MotoristaApp'
import Comentarios from './sections/Comentarios'
import Planos from './sections/Planos'

export default function Landing() {
    return (
        <>
            <Inicio />
            <ComoTrabalhamos />
            <Vantagens />
            <MotoristaApp />
            <Catalogo />
            <Planos />
            <Faq />
            <Comentarios />
            <Footer />
        </>

    )
}