const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

let messages = []
app.use(express.static('public'));
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages)

    socket.on('new-message', data => {
        messages.push(data)
        io.sockets.emit('message',messages)
    })
})




const routerProductos = require('./src/routes/productos')
app.use('/api/productos', routerProductos);

const Contenedor = require('./src/class/main');
const contenedor = new Contenedor('productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* ---------- EJS ------------- */

// Configuracion de EJS
app.set('views', './views');
app.set('view engine', 'ejs');

// Ruta de productos
app.get('/productos', async (req, res) => {

    const productos = await contenedor.getAll();

    res.render("vista", { productos });
    
});

/* ---------------------------- */

const PORT = process.env.PORT || 8080;

const srv = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${srv.address().port} | Modo EJS`));
srv.on('error', error => console.log(`Error en servidor ${error}`));