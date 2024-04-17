import { Venda } from "@/bd/vendaIngressos.model";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            // res.status(200).json({ nome: "GET"});
            getVendas(req,res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postVendas(req, res);
            break;
        default:
            res.status(405).json({});
    }
}

async function postVendas(req, res) {
    const {cliente,clienteSemCadastro,emailSemCadastro,lote,categoria,ingresso,quantidade,desconto,valorBruto,valorLiquido} = req.body;
    let venda = new Venda({cliente,clienteSemCadastro,emailSemCadastro,lote,categoria,ingresso,quantidade,desconto,valorBruto,valorLiquido});
    await venda.save();
    res.status(201).json(venda);
}

async function getVendas(req, res) {
    try {
        const vendas = await Venda.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "clienteAssociado"
                }
            },
            {
                $lookup: {
                    from: "lotes",
                    localField: "lote",
                    foreignField: "_id",
                    as: "loteAssociado"
                }
            },
            {
                $lookup: {
                    from: "ingressos",
                    localField: "ingresso",
                    foreignField: "_id",
                    as: "ingressoAssociado"
                }
            },
            {
                $lookup: {
                    from: "categorias",
                    localField: "categoria",
                    foreignField: "_id",
                    as: "categoriaAssociada"
                }
            },
            {
                $project: {
                    nomeLote: "$nome",
                    quantidade: "$quantidade",
                    valor: "$valor",
                    valorLiquido: "$valorLiquido",
                    data: "$data",
                    desconto: "$desconto",
                    valorBruto: "$valorBruto",
                    clienteSemCadastro: "$clienteSemCadastro",
                    clienteAssociado: { $arrayElemAt: ["$clienteAssociado", 0] },
                    eventoAssociado: { $arrayElemAt: ["$loteAssociado", 0] },
                    ingressoAssociado: { $arrayElemAt: ["$ingressoAssociado", 0] },
                    categoriaAssociada: { $arrayElemAt: ["$categoriaAssociada", 0] }
                }
            }
        ]);
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro ao obter lotes:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}


