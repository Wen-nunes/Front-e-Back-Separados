import {ProdutoLista} from "./components/ProdutoLista.tsx";
import {useState} from "react";
import {Modal} from "./components/Modal.tsx";
import {FormularioProduto} from "./components/FormularioProduto.tsx";

function App() {


    const [showForm, setShowForm] = useState(false)

  return (
    <>
        <div>
            <button onClick={() => setShowForm(true)}>Novo Produto</button>
        </div>


        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <FormularioProduto onClose={() => setShowForm(false)}/>
        </Modal>

        <ProdutoLista/>

    </>
  )
}

export default App
