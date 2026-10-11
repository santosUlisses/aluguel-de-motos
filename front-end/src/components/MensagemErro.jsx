export default function MensagemErro({ mensagem, setMensagem, classMensagem }) {
    if (!mensagem) {
        return null;
    }
    return (
        <div className={`position-fixed alert alert-${classMensagem} alert-dismissible top-0 start-50 translate-middle-x mt-3 shadow`}
            role="alert"
            style={{ zIndex: 1050 }}>
            <button type="button" className="btn-close"
                data-bs-dismiss="alert" aria-label="Close"
                onClick={() => setMensagem("")}></button>
            <strong>Erro:</strong>  {mensagem}
        </div>
    )
}