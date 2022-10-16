
let socket = io.connect()

socket.on('messages', function(data){
    console.log(data);
    render(data)
})


const render = data => {
    let html = data.map( elem => {
        return( `
        <div>
            <strong> ${elem.author} </strong>:
            <em>${elem.text}</elem>
        </div>
        `)
    }).join(" ")
    document.getElementById('messages').innerHTML = html;
}

const addMessage = () => {
    let mensaje = {
        author: document.getElementById('username').value, // traigo los valores del form
        text: document.getElementById('texto').value
    }

    socket.emit('new-message',{ mensaje})

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false
}