const chat = require('../model/chat/chat.model')

module.exports.handleSockets = async (io, email) => {
    
io.on('connection',  async socket => {
    socket._maxListeners = 2
    const data = chat.find()
    data.then(results => { 
        io.sockets.emit('tabla', JSON.parse(JSON.stringify(results)));
    })
    .catch(err => console.log(err))
    
    const getMensajes =chat.find();
    getMensajes.then ( res => {
        mensajesDatabase = res
        socket.emit('mensajes', mensajesDatabase);
    })
    
    
    socket.on('new-message', async data => {
        await  chat.insertMany(data)
        const getMensajes = chat.find();
        getMensajes.then ( res => {
            mensajesDatabase = res
            io.sockets.emit('mensajes', mensajesDatabase) 
        })
    });
    socket.on('disconnecting',(reason) => {
        console.log(reason)
        
    })
    
   
});

}