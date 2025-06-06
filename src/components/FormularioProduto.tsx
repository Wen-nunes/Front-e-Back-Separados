import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import type {Produto} from "../model/Produto.ts";
import {api} from "../service/api.ts";

interface FormularioProdutoProps {
    onClose: () => void
}

export function FormularioProduto({onClose}: FormularioProdutoProps) {

    const queryClient = useQueryClient()


    const [formData, setFormData] = useState<Omit<Produto, 'id'>>({

        nome: '',
        descricao: '',
        preco: 0,
        imagem: '',
        categoria: '',
        disponibilidade: true,
    })

    const mutation = useMutation({
        mutationFn: async (novoProduto: Omit<Produto, 'id'>) => {
            const response = await api.post('/produtos', novoProduto)
            return response.data
        },

        onSuccess: () => {

            queryClient.invalidateQueries({queryKey: ['produtos']})
            alert('Produto cadastrado com sucesso!')
            onClose()
        },
        onError: () => {

            alert('Erro ao cadastrar produto.')
        },
    })


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        mutation.mutate(formData)
    }


    return (
        <form className="formProduto" onSubmit={handleSubmit} style={{margin: '20px'}}>
            <h2>Cadastrar Novo Produto</h2>

            <label>Nome</label>
            <input name="nome" placeholder="Nome" value={formData.nome}
                   onChange={handleChange} required/>

            <label>Descrição</label>
            <input name="descricao" placeholder="Descrição" value={formData.descricao}
                   onChange={handleChange} required/>

            <label>Link Imagem</label>
            <input name="imagem" placeholder="URL da Imagem" value={formData.imagem}
                   onChange={handleChange} required/>

            <label>Categoria</label>
            <input name="categoria" placeholder="Categoria" value={formData.categoria}
                   onChange={handleChange} required/>

            <label>Preço</label>
            <input name="preco" type="number" placeholder="Preço" value={formData.preco}
                   onChange={handleChange} required/>

            <br/>

            <button type="submit">Cadastrar</button>
        </form>
    )
}