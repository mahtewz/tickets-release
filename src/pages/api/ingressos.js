import { Ingresso } from "@/bd/vendaIngressos.model";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            // res.status(200).json({ nome: "GET"});
            getIngressos(req,res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postIngressos(req, res);
            break;
        default:
            res.status(405).json({});
    }
}

async function postIngressos(req, res) {
    const {nome,evento,descricao} = req.body;
    let ingresso = new Ingresso({nome,evento,descricao});
    await ingresso.save();
    res.status(201).json(ingresso);
}

async function getIngressos(req, res) {
    let Ingressos  = await Ingresso.aggregate([
        {
            $lookup: {
                from: "eventos",
                localField: "evento",
                foreignField: "_id",
                as: "eventoAssociado"
            }
        },
        {
            $project: {
                nome: "$nome",
                eventoAssociado: { $arrayElemAt: ["$eventoAssociado", 0] },
                ingressoAssociado: { $arrayElemAt: ["$ingressoAssociado", 0] },
                categoriaAssociada: { $arrayElemAt: ["$categoriaAssociada", 0] }
            }
        }
    ]);
    res.status(200).json(Ingressos);
}