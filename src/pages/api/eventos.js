import { Evento } from "@/bd/vendaIngressos.model";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            // res.status(200).json({ nome: "GET"});
            getEventos(req,res);
            break;
        case 'POST':
            // res.status(201).json({ nome: "POST"});
            postEventos(req, res);
            break;
        default:
            res.status(405).json({});
    }
}

async function postEventos(req, res) {
    const { nome, data, local, descricao } = req.body;
    
    const dataHora = new Date(data.replace("T", " ") + ":00.000Z");

    let evento = new Evento({ nome, data: dataHora, local, descricao });
    await evento.save();
    res.status(201).json(evento);
}

async function getEventos(req, res) {
    let Eventos  = await Evento.find({});
    res.status(200).json(Eventos);
}