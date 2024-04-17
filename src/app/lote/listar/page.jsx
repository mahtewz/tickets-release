"use client"

import { useState, useEffect } from "react";
import axios from "axios";

export default function listarLotes() {

    const [lotes, setLotes] = useState([]);

    useEffect(() => {
        getLotes();
    }, []);


    const getLotes = async () => {
        try {
            const res = await axios.get("/api/lote");
            setLotes(res.data);
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    return (
        <div>
            <div className="mt-10 flex justify-center">
                <h1 className="text-2xl font-extrabold">Lotes</h1>
            </div>
            <div className="flex justify-center">
                <div className="mt-8 sm:w-1/2 border border-black rounded bg-white">
                    <table className="border sm:w-full">
                        <thead>
                            <tr className="border">
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Nome do Lote</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Quantidade</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Preço</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Evento</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Categoria</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Ingresso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lotes.map((item, index) => (
                                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                    <td className="border border-gray-300 p-1">{item.nomeLote}</td>
                                    <td className="border border-gray-300 p-1">{item.quantidade}</td>
                                    <td className="border border-gray-300 p-1">{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td className="border border-gray-300 p-1">{item.eventoAssociado.nome}</td>
                                    <td className="border border-gray-300 p-1">{item.categoriaAssociada.nome}</td>
                                    <td className="border border-gray-300 p-1">{item.ingressoAssociado.nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}