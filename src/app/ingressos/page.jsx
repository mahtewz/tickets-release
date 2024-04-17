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

export default function NovoIngresso() {

    const [nome, setNome] = useState("");
    const [evento, setEvento] = useState("");
    const [descricao, setDescricao] = useState("");

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        getEventos();
    }, []);

    const getEventos = async () => {
        try {
            const res = await axios.get("/api/eventos");
            setEventos(res.data);
        } catch (error) {
            toast.error("Houve um erro")
            console.error("Erro na comunicação com o Backend", error);
        }
    }

    const onSubmit = async () => {
        const ingressos = { nome, evento, descricao };
        try {
            let res = await axios.post("/api/ingressos", ingressos);
            router.push("/ingressos");
            toast.success("Ingresso Cadastrado")
            setTimeout(() => {
                location.reload();
            }, 2000);
        } catch (err) {
            toast.error("Houve um erro")
            console.error("Erro na requisicao");
        } finally {
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }
    const RegisterSchema = yup.object().shape({
        nome: yup.string()
            .required("Nome é obrigatório."),
        evento: yup.string()
            .required("Evento é obrigatório"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(RegisterSchema) });
    const router = useRouter();

    return (
        <div className="flex justify-center mt-10 mx-auto sm:max-w-[480px]">
            <div className="bg-slate-50 border rounded shadow w-full max-w-4xl">
                <form id="IngressosForm" className="space-y-6 mx-5 my-10" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center text-xl font-bold">
                        <Toaster />
                        <h1>Novo Ingresso</h1>
                    </div>

                    <div className="text-sm">
                        <div className="grid">
                            <span className="pr-2">Nome: </span>
                            <input
                                {...register("nome")}
                                onChange={(e) => setNome(e.target.value)}
                                type="text"
                                placeholder=""
                                className="w-1/2"
                            />
                            {errors.nome && <p className="mt-2 text-sm text-red-600">{errors.nome.message}</p>}
                        </div>
                        <div className="my-3 grid w-3/4">
                            <span className="pr-2">Evento: </span>
                            <select
                                {...register("evento")}
                                onChange={(e) => {
                                    setEvento(e.target.value);
                                }}>
                                <option></option>
                                {eventos.map((eve, idx) => (
                                    <option key={idx} value={eve._id}>{eve.nome}</option>
                                ))}
                            </select>
                            {errors.evento && <p className="mt-2 text-sm text-red-600">{errors.evento.message}</p>}
                        </div>

                        <div>
                            <span className="pr-2">Descricao: </span>
                            <textarea
                                rows="4"
                                cols="30"
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        <div className="flex">
                            <div className="mt-4">
                                <button type="submit" className="bg-blue-500 flex text-white px-2 py-2 rounded-md hover:bg-blue-700">
                                    Cadastrar
                                </button>
                            </div>

                            <div className="mt-4 ml-auto">
                                <Link href="/ingressos/listar">
                                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex">
                                        <ListBulletIcon className="h-5 w-5 text-white-500"></ListBulletIcon>Listar
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}