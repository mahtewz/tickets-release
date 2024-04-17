import mongoose from "mongoose";
import "@/bd";

var Schema = mongoose.Schema;

var ClientesSchema = new Schema(
    {
        nome: String,
        email: String,
        telefone: Number
    },
    {  collection: "clientes", versionKey: false }
);

var LoteSchema = new Schema(
    {   
        nome: String,
        quantidade: Number,
        dataInicioVenda: Date,
        dataFimVenda: Date,
        valor: Number,
        ingresso: { type: Schema.Types.ObjectId, ref: 'Ingresso' },
        categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
        evento: { type: Schema.Types.ObjectId, ref: 'Evento' }
    },
    {  collection: "lote", versionKey: false }
);

var IngressosSchema = new Schema(
  {
      nome: String,
      descricao: String,
      evento: { type: Schema.Types.ObjectId, ref: 'Evento' }
  },
  {  collection: "ingressos", versionKey: false }
);

var CategoriasSchema = new Schema(
    {
        nome : String,
        descricao : String
    },
    {  collection: "categorias", versionKey: false }
);

var EventosSchema = new Schema(
    {
        nome : String, 
        data : Date, 
        local : String, 
        descricao : String
    },
    {  collection: "eventos", versionKey: false }
);

var VendasSchema = new Schema(
    {
        cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
        clienteSemCadastro: String,
        emailSemCadastro : String,
        lote: { type: Schema.Types.ObjectId, ref: 'Lote' },
        categoria : { type: Schema.Types.ObjectId, ref: 'Categoria' },
        ingresso : { type: Schema.Types.ObjectId, ref: 'Categoria' },
        quantidade : Number,
        desconto : Number,
        valorBruto : Number,
        valorLiquido : Number,
        data: {
            type: Date,
            default: Date.now
        }
    },
    {  collection: "vendas", versionKey: false }
);

export const Cliente = mongoose.models.Cliente || mongoose.model("Cliente", ClientesSchema);
export const Ingresso = mongoose.models.Ingresso || mongoose.model("Ingresso", IngressosSchema);
export const Categoria = mongoose.models.Categoria || mongoose.model("Categoria", CategoriasSchema);
export const Evento = mongoose.models.Evento || mongoose.model("Evento", EventosSchema);
export const Venda = mongoose.models.Venda || mongoose.model("Venda", VendasSchema);
export const Lote = mongoose.models.Lote || mongoose.model("Lote", LoteSchema);