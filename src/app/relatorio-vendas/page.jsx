"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns';

export default function Vendas() {

    const [Vendas, setVendas] = useState([]);

    useEffect(() => {
        getVendas();
    }, []);


    const getVendas = async () => {
        try {
            const res = await axios.get("/api/vendas");
            setVendas(res.data);
            console.log(Vendas)
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    var total = 0;

    return (
        <div>
            <div className="mt-10 flex justify-center">
                <h1 className="text-2xl font-extrabold">Relatório de Vendas</h1>
            </div>
            <div className="flex justify-center">
                <div className="mt-8 sm:w-1/2 border rounded bg-white">
                    <table className="border sm:w-full">
                        <thead>
                            <tr className="border">
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Data da Venda</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Nome do Cliente</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Ingresso</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Categoria</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Quantidade</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Valor Bruto</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Desconto</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Valor Liquido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Vendas.map((item, index) => {

                                const valorLiquido = item.valorLiquido;
                                total += valorLiquido;
                                return (
                                    <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                        <td className="border border-gray-300 p-1">{format(new Date(item.data), 'dd/MM/yyyy')}</td>
                                        <td className="border border-gray-300 p-1">{item.clienteAssociado ? item.clienteAssociado.nome : (item.clienteSemCadastro)}</td>
                                        <td className="border border-gray-300 p-1">{item.ingressoAssociado.nome}</td>
                                        <td className="border border-gray-300 p-1">{item.categoriaAssociada.nome}</td>
                                        <td className="border border-gray-300 p-1">{item.quantidade}</td>
                                        <td className="border border-gray-300 p-1">{item.valorBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td className="border border-gray-300 p-1">{item.desconto}</td>
                                        <td className="border border-gray-300 p-1">{valorLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan="7" className="text-right font-bold">Total:</td>
                                <td className="border bg-gray-600 text-white border-gray-300 p-1 font-bold">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}