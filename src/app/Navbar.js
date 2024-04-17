"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { TicketIcon } from "@heroicons/react/24/solid";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="flex flex-col sm:flex-row text-center sm:text-left sm:justify-between py-1 px-6 bg-amber-600 shadow border">
                <div className="flex items-center justify-between sm:justify-start">
                    <button className="block sm:hidden text-white hover:text-gray-300 focus:outline-none" onClick={toggleMenu}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <div className={`flex flex-col sm:flex-row items-center sm:items-baseline sm:ml-4 ${isMenuOpen ? '' : 'hidden'} sm:flex`}>
                    <Link href="/eventos" className="px-4 py-2 text-white sm:text-sm dark:hover:text-white hover:bg-amber-700 hover:shadow rounded sm:px-6 sm:py-4 flex gap-2"><CalendarDaysIcon className="mt-0.5 w-4 h-4"/> Evento</Link>

                    <Link href="/clientes" className="px-4 py-2 text-white sm:text-sm dark:hover:text-white hover:bg-amber-700 hover:shadow rounded sm:px-6 sm:py-4 flex gap-2"><UsersIcon className="mt-0.5 w-4 h-4"/>Clientes</Link>

                    <Link href="/categorias" className="px-4 py-2 text-white sm:text-sm dark:hover:text-white hover:bg-amber-700 hover:shadow rounded sm:px-6 sm:py-4 flex gap-2"><PlusCircleIcon className="mt-0.5 w-4 h-4"/>Categoria</Link>
                    <Link href="/ingressos" className="px-4 py-2 text-white sm:text-sm dark:hover:text-white hover:bg-amber-700 hover:shadow rounded sm:px-6 sm:py-4 flex gap-2"><TicketIcon className="mt-0.5 w-4 h-4"/> Ingresso</Link>
                    <Link href="/lote" className="px-4 py-2 text-white sm:text-sm dark:hover:text-white hover:bg-amber-700 hover:shadow rounded sm:px-6 sm:py-4 flex gap-2"><Square3Stack3DIcon className="mt-0.5 w-4 h-4"/>Lote</Link>
                    <Link href="/vendas" className="px-4 py-2 text-white sm:text-sm dark:hover:text-white hover:bg-amber-700 hover:shadow rounded sm:px-6 sm:py-4 flex gap-2"><ShoppingCartIcon className="mt-0.5 w-4 h-4"/>Vendas</Link>
                    <Link href="/relatorio-vendas" className="px-4 py-2 text-white sm:text-sm dark:hover:text-white hover:bg-amber-700 hover:shadow rounded sm:px-6 sm:py-4 flex gap-2"><CurrencyDollarIcon className="mt-0.5 w-4 h-4"/>Relatorio Vendas</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

