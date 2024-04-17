"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import Link from "next/link";

export default function NovoLote() {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [dataInicioVenda, setIniVenda] = useState("");
    const [dataFimVenda, setFimVenda] = useState("");
    const [valor, setValor] = useState("");
    const [evento, setEvento] = useState("");
    const [categoria, setCategoria] = useState("");
    const [ingresso, setIngresso] = useState("");

    const [categorias, setCategorias] = useState([]);
    const [ingressos, setIngressos] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getIngressos();
        getCategorias();
    }, []);

    const getCategorias = async () => {
        try {
            const res = await axios.get("/api/categorias");
            setCategorias(res.data);
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    const getIngressos = async () => {
        try {
            const res = await axios.get("/api/ingressos");
            setIngressos(res.data);
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    const onSubmit = async () => {
        const lote = { nome, quantidade, valor, ingresso, dataInicioVenda, categoria, dataFimVenda, evento };
        try {
            let res = await axios.post("/api/lote", lote);
            router.push("/lote");
            toast.success("Lote Cadastrado");
        } catch (err) {
            toast.error("Houve um erro")
            console.error("Erro na requisicao");
        } finally {
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }

    const capturarSelect = (IngressoIdSelecionado) => {
        const selectIngresso = ingressos.find((ingresso) => ingresso._id === IngressoIdSelecionado);
        if (selectIngresso) {
            setIngresso(selectIngresso._id);
            setEvento(selectIngresso.eventoAssociado._id);
        }
    }

    const RegisterSchema = yup.object().shape({
        nome: yup.string()
            .required("Nome é obrigatório."),
        quantidade: yup.number()
            .required("Quantidade é obrigatório.")
            .min(0,"Quantidade deve ser maior que 0"),
        dataVendaIni: yup.date()
            .required("Data Inicial é obrigatório."),
        dataVendaFin: yup.date()
            .required("Data Inicial é obrigatório."),
        categoria: yup.string()
            .required("Categoria é obrigatório"),
        ingresso: yup.string()
            .required("Ingresso é obrigatório"),
        valor: yup.number()
            .required("Valor é obrigatório.")
            .min(0,"Valor não pode ser negativo"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(RegisterSchema) });

    return (
        <div className="flex justify-center mt-10 mx-auto sm:max-w-[800px]">

            <div className="bg-slate-50 border rounded shadow w-full max-w-4xl">
                <form className="space-y-6 mx-5 my-10" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center text-xl font-bold">
                        <Toaster />
                        <h1>Novo Lote</h1>
                    </div>

                    <div className="flex text-sm">
                        <div className="w-1/2">
                            <div className="my-5 grid w-3/3">
                                <span className="pr-2">Nome:</span>
                                <input
                                    {...register("nome")}
                                    onChange={(e) => setNome(e.target.value)}
                                    type="text"
                                    placeholder=""
                                    className="grid w-3/4"
                                />
                                {errors.nome && <p className="mt-2 text-sm text-red-600">{errors.nome.message}</p>}
                            </div>
                            <div className="grid my-5">
                                <span className="pr-2">Quantidade Disponivel: </span>
                                <input
                                    {...register("quantidade")}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    className="w-6/12"
                                />
                                {errors.quantidade && <p className="mt-2 text-sm text-red-600">{errors.quantidade.message}</p>}
                            </div>
                            <div className="grid my-5">
                                <span className="pr-2">Data Inicio Venda:</span>
                                <input
                                    {...register("dataVendaIni")}
                                    onChange={(e) => setIniVenda(e.target.value)}
                                    type="date"
                                    placeholder=""
                                    className="w-1/2"
                                />
                                {errors.dataVendaIni && <p className="mt-2 text-sm text-red-600">{errors.dataVendaIni.message}</p>}
                            </div>
                            <div className="grid my-5">
                                <span className="pr-2">Data Final Venda: </span>
                                <input
                                    {...register("dataVendaFin")}
                                    onChange={(e) => setFimVenda(e.target.value)}
                                    type="date"
                                    placeholder=""
                                    className="w-1/2"
                                />
                                {errors.dataVendaFin && <p className="mt-2 text-sm text-red-600">{errors.dataVendaFin.message}</p>}
                            </div>
                        </div>

                        <div className="w-1/2">
                            <div className="grid my-5">
                                <span className="pr-2">Valor R$:</span>
                                <input
                                    {...register("valor")}
                                    onChange={(e) => setValor(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    step="0.01"
                                    className="w-4/12"
                                />
                                {errors.valor && <p className="mt-2 text-sm text-red-600">{errors.valor.message}</p>}
                            </div>

                            <div className="my-5 grid w-3/4">
                                <span className="pr-2">Categoria: </span>
                                <select
                                    {...register("categoria")}
                                    onChange={(e) => {
                                        setCategoria(e.target.value);
                                    }}>
                                    <option></option>
                                    {categorias.map((cat, idx) => (
                                        <option key={idx} value={cat._id}>{cat.nome}</option>
                                    ))}
                                </select>
                                {errors.categoria && <p className="mt-2 text-sm text-red-600">{errors.categoria.message}</p>}
                            </div>

                            <div className="my-5 grid w-3/4">
                                <span className="pr-2">Ingresso: </span>
                                <select
                                    {...register("ingresso")}
                                    onChange={(e) => { capturarSelect(e.target.value) }}>
                                    <option></option>
                                    {ingressos.map((ing, idx) => (
                                        <option key={idx} value={ing._id}>{ing.nome}</option>
                                    ))}
                                </select>
                                {errors.ingresso && <p className="mt-2 text-sm text-red-600">{errors.ingresso.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mt-4">
                            <button type="submit" className="bg-blue-500 flex text-white px-2 py-2 rounded-md hover:bg-blue-700">
                                Cadastrar
                            </button>
                        </div>

                        <div className="mt-4 ml-auto">
                            <Link href="/lote/listar">
                                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex">
                                    <ListBulletIcon className="mt-0.5 h-5 w-5 text-white-500"></ListBulletIcon>Listar
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}