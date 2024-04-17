import { Cliente } from "@/bd/vendaIngressos.model";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            // res.status(200).json({ nome: "GET"});
            getClientes(req,res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postClientes(req, res);
            break;
        default:
            res.status(405).json({});
    }
}

async function postClientes(req, res) {
    const {nome,email,telefone} = req.body;
    let cliente = new Cliente({nome,email,telefone});
    await cliente.save();
    res.status(201).json(cliente);
}

async function getClientes(req, res) {
    let Clientes  = await Cliente.find({});
    res.status(200).json(Clientes);
}