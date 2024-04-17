"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import Link from "next/link";

export default function NovaCategoria() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");


    const onSubmit = async () => {
        const categoria = { nome, descricao };
        try {
            let res = await axios.post("/api/categorias", categoria);
            router.push("/categorias");
            toast.success('Categoria Cadastrada');
        } catch (err) {
            toast.error('Houve um erro');
            console.error("Erro na requisicao");
        } finally {
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }

    const RegisterSchema = yup.object().shape({
        nome: yup.string()
            .required("Nome é obrigatório.")
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
                <form id="CategoriasForm" className="space-y-6 mx-5 my-10" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="flex justify-center text-xl font-bold">
                            <Toaster />
                            <h1>Nova Categoria</h1>
                        </div>
                        <div className="text-sm mt-10">
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
                            <div className="grid">
                                <span className="pr-2">Descrição: </span>
                                <textarea
                                    rows="4"
                                    cols="30"
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="" />
                            </div>

                            <div className="flex">
                                <div className="mt-4">
                                    <button type="submit" className="bg-blue-500 flex text-white px-2 py-2 rounded-md hover:bg-blue-700"> 
                                    Cadastrar
                                    </button>
                                </div>

                                <div className="mt-4 ml-auto">
                                    <Link href="/categorias/listar">
                                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex">
                                            <ListBulletIcon className="h-5 w-5 text-white-500"></ListBulletIcon>Listar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}