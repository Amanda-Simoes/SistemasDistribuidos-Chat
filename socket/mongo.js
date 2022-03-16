const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const server = new MongoClient(url);

const connectSockets = async (io) => {
    /* Banco */
    await server.connect();
    const db = server.db('chat');
    const collection = db.collection('mensagens');

    io.on('connection', async (socket) => {
        let messages = await collection.find().sort(
            {time: 1}
        ).toArray();
        socket.emit("previousMessages", messages);
    
        socket.on("sendMessage", async (data) => {
            await collection.insertOne(
                { ...data }
            );
            socket.broadcast.emit('receivedMessage', data);
        });
    })
}

module.exports = {connectSockets}
