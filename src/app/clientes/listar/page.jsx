"use client"

import { useState, useEffect } from "react";
import axios from "axios";

export default function listarClientes() {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        getClientes();
    }, []);


    const getClientes = async () => {
        try {
            const res = await axios.get("/api/clientes");
            setClientes(res.data);
        } catch (error) {
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    return (
        <div>
            <div className="mt-10 flex justify-center">
                <h1 className="text-2xl font-extrabold">Clientes</h1>
            </div>
            <div className="flex justify-center">
                <div className="mt-8 sm:w-1/2 border border-black rounded bg-white">
                    <table className="border sm:w-full">
                        <thead>
                            <tr className="border">
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Nome do Cliente</th>
                                <th className="border bg-gray-600 text-white border-gray-300 p-1">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((item, index) => (
                                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                    <td className="border border-gray-300 p-1">{item.nome}</td>
                                    <td className="border border-gray-300 p-1">{item.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}