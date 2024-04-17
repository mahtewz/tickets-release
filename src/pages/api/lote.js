import { Lote,Evento } from "@/bd/vendaIngressos.model";

export default async function handler(req, res) {
    Lote.aggregate();

    switch(req.method) {
        case 'GET':
            // res.status(200).json({ nome: "GET"});
            getLotes(req, res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postLotes(req, res);
            break;
        case 'PUT':
            // res.status(200).json({ nome: "PUT"});
            updateLote(req, res);
            break;
        default:
            res.status(405).json({});
    }
}

async function postLotes(req, res) {
    const {nome,quantidade,valor,ingresso,dataInicioVenda,categoria,dataFimVenda,evento} = req.body;
    let lote = new Lote({nome,quantidade,valor,ingresso,dataInicioVenda,categoria,dataFimVenda,evento});
    await lote.save();
    res.status(201).json(lote);
}

async function updateLote(req, res) {
    try {
        const { _id, qtAtual } = req.body;

        if (!_id || qtAtual === undefined) {
            return res.status(400).json({ mensagem: 'Parâmetros inválidos' });
        }

        const lote = await Lote.findOneAndUpdate(
            { _id },
            { $set: { quantidade: qtAtual } },
            { new: true }
        );

        if (!lote) {
            return res.status(404).json({ mensagem: 'Lote não encontrado' });
        }

        res.status(200).json(lote);
    } catch (error) {
        console.error('Erro ao atualizar lote:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}


async function getLotes(req, res) {
    try {
        const lotes = await Lote.aggregate([
            {
                $lookup: {
                    from: "eventos",
                    localField: "evento",
                    foreignField: "_id",
                    as: "eventoAssociado"
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
                    eventoAssociado: { $arrayElemAt: ["$eventoAssociado", 0] },
                    ingressoAssociado: { $arrayElemAt: ["$ingressoAssociado", 0] },
                    categoriaAssociada: { $arrayElemAt: ["$categoriaAssociada", 0] }
                }
            }
        ]);
        res.status(200).json(lotes);
    } catch (error) {
        console.error('Erro ao obter lotes:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

