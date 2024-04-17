import mongoose from "mongoose";

const mongoURI = `mongodb+srv://ingressos:5w6TOpdyJBoXvREh@cluster0.wievyat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão bem-sucedida com o MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

mongoose.connect(mongoURI);


export const db = mongoose.connection;
