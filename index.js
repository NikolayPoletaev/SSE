const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const dataField = document.getElementById('data')

startBtn.addEventListener('click',start)
stopBtn.addEventListener('click',stop)



let eventSource

function start() {
    if (!window.EventSource){
        alert('Ваш браузер не поддерживает SSE')
        return
    }

    eventSource = new EventSource('http://localhost:8080/getdata')

    eventSource.onopen = () => {
        log('Событие: open')
    }

    eventSource.onerror = () => {
        log('Событие: error')
        
    }

    eventSource.onmessage = (event) => {
        log('Событие: message, данные:' + event.data)

    }
    eventSource.addEventListener('pokapoka', (event) => {
        log('Событие: pokapoka' + event.data)
    })

}
function stop() {
    eventSource.close()

    log('Соединение закрыто!')
}

function log(data) {
    dataField.innerHTML += data + '<br>'
    document.documentElement.scrollTop = 999999999
}
