import { Categoria } from "@/bd/vendaIngressos.model";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            // res.status(200).json({ nome: "GET"});
            getCategorias(req,res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postCategorias(req, res);
            break;
        default:
            res.status(405).json({});
    }
}

async function postCategorias(req, res) {
    const {nome,descricao} = req.body;
    let categoria = new Categoria({nome,descricao});
    await categoria.save();
    res.status(201).json(categoria);
}

async function getCategorias(req, res) {
    let Categorias  = await Categoria.find({});
    res.status(200).json(Categorias);
}