"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns';

export default function listarEventos() {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        getEventos();
    }, []);


    const getEventos = async () => {
        try {
            const res = await axios.get("/api/eventos");
            setEventos(res.data);
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    return (
        <div>
            <div className="mt-10 flex justify-center">
                <h1 className="text-2xl font-extrabold">Eventos</h1>
            </div>
            <div className="flex justify-center">
                <div className="mt-8 sm:w-1/2 border border-black rounded bg-white">
                    <table className="border sm:w-full">
                        <thead>
                            <tr className="border">
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Nome do Evento</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Data</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Local</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.map((item, index) => (
                                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                    <td className="border border-gray-300 p-1">{item.nome}</td>
                                    <td className="border border-gray-300 p-1">{format(new Date(item.data), 'dd/MM/yyyy')}</td>
                                    <td className="border border-gray-300 p-1">{item.local}</td>
                                    <td className="border border-gray-300 p-1">{item.descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}