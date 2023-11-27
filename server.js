const http = require('http')

function sendData(request,response) {
    response.writeHead(200,{
        'Content-type': 'text/event-stream; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    })
    let timer = setInterval(send, 1000)

    let i = 0

    send()

    function send(){
        i++
        if (i === 5) {
            response.write('event: pokapoka\ndata: пока-пока\n\n')
            clearInterval(timer)
            response.end()
            return
        }
        response.write('data:' + i + '\n\n')
    }
}

http.createServer((request,response) => {
    if (request.url == '/getdata') {
        sendData(request,response)
        return
    }
}).listen(8080)

console.log('Работает сервер')