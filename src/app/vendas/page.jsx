"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';

export default function NovaVenda() {


    const [cliente, setCliVenda] = useState(null);
    const [clienteSemCadastro, setCliente] = useState(null);
    const [emailSemCadastro, setEmail] = useState(null);
    const [lote, setLote] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [quantidade, setQuantidade] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [valor, setValor] = useState(null);
    const [ingresso, setIngresso] = useState(null);
    const [categoriaNome, setCatNome] = useState(null);
    const [QuantidadeDisponivel, setQuantidadeDisponivel] = useState(0);

    /*CARREGAR AS VIEWS*/
    const [eventoDataView, setEventoDataView] = useState(null);
    const [ingressoView, setIngressoView] = useState(null);
    const [valorView, setValorView] = useState(null);
    const [quantidadeView, setQuantidadeView] = useState(null);
    const [valorBruView, setBruView] = useState(null);
    const [valorLiqView, setLiqView] = useState(null);
    const [descontoView, setDescontoView] = useState(null);
    const [horarioView, setHorarioView] = useState(null);


    const [eveNome, setEveNome] = useState("");
    const [clienteCadastrado, setClienteCadastrado] = useState(true);

    const [lotes, setLotes] = useState([]);
    const [clientes, setClientes] = useState([]);

    const router = useRouter();

    const toggleClienteCadastrado = () => {
        setClienteCadastrado(!clienteCadastrado);
    };

    useEffect(() => {
        getClientes();
        getLotes();
    }, [lote]);


    const getClientes = async () => {
        try {
            const res = await axios.get("/api/clientes");
            setClientes(res.data);
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    const updateLotes = async () => {
        try {
            let qtAtual = QuantidadeDisponivel - quantidade;
            const novaQt = { _id: lote, qtAtual };
            const res = await axios.put("/api/lote", novaQt);
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    const getLotes = async () => {
        try {
            const res = await axios.get("/api/lote");
            setLotes(res.data);
        } catch (error) {
            console.error("Erro na comunicação com o BackendAA", error);
        }
    }



    const capturarSelect = (loteIdSelecionado) => {
        const selectLote = lotes.find((lote) => lote._id === loteIdSelecionado);
        if (selectLote) {
            setLote(selectLote._id);
            setValor(selectLote.valor);
            setQuantidadeDisponivel(selectLote.quantidade);
            setEveNome(selectLote.eventoAssociado.nome);
            setIngresso(selectLote.ingressoAssociado._id);
            setIngressoView(selectLote.ingressoAssociado.nome);
            setCatNome(selectLote.categoriaAssociada.nome);
            setCategoria(selectLote.categoriaAssociada._id);

            let dataFormatada = format(new Date(selectLote.eventoAssociado.data), 'dd/MM/yyyy');

            setEventoDataView(dataFormatada);

            let Horario;
            Horario = new Date(selectLote.eventoAssociado.data);
            let config = { timeZone: 'UTC', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
            Horario = Horario.toLocaleTimeString('pt-BR', config);
            setHorarioView(Horario);
        }
    }

    const onSubmit = async () => {

        if (QuantidadeDisponivel >= quantidade) {
            updateLotes();
            let valorLiquido = 0;
            let valorBruto = valor * quantidade;

            if (valor !== 0 && quantidade !== 0 && desconto === 0) {
                valorLiquido = valor * quantidade;
            }

            if (valor !== 0 && quantidade !== 0 && desconto !== 0) {
                valorLiquido = valor - (valor * (desconto / 100));
                valorLiquido = valorLiquido * quantidade;
            }


            setBruView(valorBruto);
            setLiqView(valorLiquido);
            setQuantidadeView(quantidade);
            setDescontoView(desconto);
            setValorView(valor);

            const venda = { cliente, clienteSemCadastro, emailSemCadastro, lote, categoria, ingresso, quantidade, desconto, valorBruto, valorLiquido };

            try {
                let res = await axios.post("/api/vendas", venda);
                router.push("/vendas");
                toast.success("Venda aprovada");
            } catch (err) {
                toast.error("Venda negada");
            } finally {
                setTimeout(() => {
                    location.reload();
                }, 4000);
            }

        } else {
            toast.error("Quantidade requisitada é maior que estoque!", { duration: 6000 });
        }
    }

    const RegisterSchema = yup.object().shape({

        loteid: yup.string()
            .required("Evento é obrigatório."),
        quantidade: yup.number()
            .max(QuantidadeDisponivel, "Quantidade requisitada é maior que estoque!")
            .min(1, "Quantidade deve ser maior que 0")
            .required("Informe uma quantidade.")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(RegisterSchema) });

    return (
        <div className="flex justify-center mb-10">
            <div className="mt-10 border rounded max-w-2xl shadow bg-slate-50">

                <div className="flex justify-center">
                    <Toaster />
                    <h1 className="text-xl font-bold mb-4 mx-5 my-10">Lançamento de Vendas</h1>
                </div>
                <div>
                    <form className="space-y-6 mx-5 my-10 text-sm" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-5 align-bottom alin">

                            <div className="flex">
                                <div>
                                    <label>
                                        Cliente sem cadastro:
                                    </label>
                                </div>

                                <div className="ml-1">
                                    <input type="checkbox" onChange={toggleClienteCadastrado} />
                                </div>
                            </div>

                            {clienteCadastrado ? (
                                <div className="">
                                    <div className="">
                                        <label className="">Selecionar cliente</label>
                                    </div>

                                    <select onChange={(e) => setCliVenda(e.target.value)} className="">
                                        <option></option>
                                        {clientes.map((cli, idx) => (
                                            <option key={idx} value={cli._id}>{cli.nome}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className="">
                                    <div className="">
                                        <label>Email:</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="" placeholder="" />
                                    </div>
                                    <div className="">
                                        <label>Nome:</label>
                                        <input onChange={(e) => setCliente(e.target.value)} type="text" className="" placeholder="" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="my-3">
                            <div className="flex col-auto">
                                <h1 className="pr-2">Lote/Evento:</h1>
                            </div>
                            <div>
                                {lotes.length > 0 &&
                                    <select
                                        {...register("loteid")}
                                        onChange={(e) => capturarSelect(e.target.value)}
                                    >
                                        <option></option>
                                        {lotes.map((lote) => (
                                            <option key={lote._id} value={lote._id}>
                                                {lote.nomeLote} - {lote.ingressoAssociado.nome}
                                            </option>
                                        ))}
                                    </select>
                                }
                                {errors.loteid && <p className="mt-2 text-sm text-red-600">{errors.loteid.message}</p>}
                                {valor !== null && (<div className="block mt-2 border-dashed border rounded text-sm">

                                    <p>Evento: {" " + eveNome}</p>
                                    <p>Data Evento:{" " + eventoDataView}</p>
                                    <p>Horario:{" " + horarioView}</p>
                                    <p>Ingresso: {" " + ingressoView}</p>
                                    <p>Categoria: {" " + categoriaNome}</p>
                                    {QuantidadeDisponivel <= 20 && (<p className="text-red-500">Qt Disponível: {" " + QuantidadeDisponivel}</p>)}
                                    {QuantidadeDisponivel > 20 && (<p className="text-green-500">Qt Disponível: {" " + QuantidadeDisponivel}</p>)}
                                    <p>Valor: {"R$ " + valor}</p>
                                </div>)}
                            </div>
                        </div>

                        <div className="">
                            <label>Quantidade:</label>
                            <input
                                {...register("quantidade")}
                                onChange={(e) => setQuantidade(parseInt(e.target.value))}
                                type="number" />
                            {errors.quantidade && <p className="mt-2 text-sm text-red-600">{errors.quantidade.message}</p>}
                        </div>

                        <div className="">
                            <label>Desconto %:</label>
                            <input onChange={(e) => setDesconto(e.target.value)} type="number" />
                            <h1 className="ml-2"></h1>
                        </div>

                        {
                            valorView !== null && quantidadeView !== null && valorLiqView !== null && valorBruView !== null && descontoView !== null &&
                            <div className="text-sm">
                                <h1 className="border-dashed border-gray-200 border-t-2 mt-4">Preço Unidade: R$ {valorView}</h1>
                                <h1 className="border-dashed border-gray-200 border-t-2 mt-4">Quantidade: {quantidadeView}</h1>
                                <h1 className="border-dashed border-gray-200 border-t-2 mt-4">Desconto: {descontoView + " %"}</h1>
                                {valorBruView !== null && <h1 className="border-dashed border-gray-200 border-t-2 mt-4">Valor Bruto: R$ {valorBruView}</h1>}
                                <h1 className="border-dashed border-gray-200 border-t-2 mt-4">Valor Liquido: R$ {valorLiqView}</h1>
                            </div>
                        }
                        <div className="mt-4">
                            <button type="submit" className="bg-blue-500 flex text-white px-2 py-2 rounded-md hover:bg-blue-700">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}