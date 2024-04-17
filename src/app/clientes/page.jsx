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

export default function NovoCliente() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const RegisterSchema = yup.object().shape({
        nome: yup.string()
            .required("Nome é obrigatório."),
        telefone: yup.number()
            .required("Telefone é obrigatório."),
        email: yup.string()
            .email("Informe um email válido.")
            .required("Email é obrigatório")
    });

    const onSubmit = async () => {
        const cliente = { nome, email, telefone };
        try {
            let res = await axios.post("/api/clientes", cliente);
            router.push("/clientes");
            document.getElementById("ClientesForm").reset();
            toast.success('Cliente Cadastrado');
        } catch (err) {
            toast.error('Houve um erro');
            console.error("Erro na requisicao");
        } finally {
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(RegisterSchema) });
    const router = useRouter();

    return (
        <div className="flex justify-center mt-10 mx-auto sm:max-w-[480px]">
            <div className="bg-slate-50 border rounded shadow w-full max-w-4xl">
                <form id="ClientesForm" className="space-y-6 mx-5 my-10" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center text-xl font-bold">
                        <Toaster />
                        <h1>Cadastrar Cliente</h1>
                    </div>
                    <div className="text-sm">
                        <div>
                            <div className="grid">
                                <span className="pr-2">Nome:</span>
                                <div className="justify-self-start">
                                    <input
                                        {...register("nome")}
                                        onChange={(e) => setNome(e.target.value)}
                                        type="text"
                                        placeholder=""
                                        className="w-auto"
                                    />
                                    {errors.nome && <p className="mt-2 text-sm text-red-600">{errors.nome.message}</p>}
                                </div>
                                <span className="pr-2">Telefone:</span>
                                <div>
                                    <input
                                        {...register("telefone")}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        type="number"
                                        placeholder="66986695312"
                                        className="w-auto"

                                    />
                                    {errors.telefone && <p className="mt-2 text-sm text-red-600">{errors.telefone.message}</p>}
                                </div>
                                <span className="pr-2">Email: </span>
                                <div>
                                    <input
                                        {...register("email")}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text" placeholder="exemplo@gmail.com"
                                        className="w-2/3"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mt-4">
                                    <button type="submit" className="bg-blue-500 flex text-white px-2 py-2 rounded-md hover:bg-blue-700">
                                        Cadastrar
                                    </button>
                                </div>

                                <div className="mt-4 ml-auto">
                                    <Link href="/clientes/listar">
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
    );
}