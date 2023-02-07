const hostUrl = window.location.protocol + "//" + window.location.host;

const socket = io.connect(hostUrl);

const input = document.getElementById('input-msg');
const btn = document.getElementById('send');
const recieveMsg = document.getElementById('rMsg');
const panel = document.getElementById('panel');
const feedback = document.getElementById('feedback');
const form = document.querySelector('form');

const userJoined = document.getElementById('user-joined');
const user = document.getElementById('userName');

autosize(document.getElementById('input-msg'));

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(position);
    panel.append(messageElement);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value;
    append(message, 'send-msg')
    socket.emit('recieve', {
        user: user.value,
        input: input.value   
    });
    input.value = "";
    input.style.height = "45px";
    feedback.innerHTML = "";
})


input.addEventListener('keypress', () => {
    socket.emit('typing', user.value);
    feedback.innerHTML = "";
})

socket.on('typing', (data) => {
    feedback.innerHTML = "<p><strong>" + data + "</strong> typing...</p>";
})

socket.on('recieve', (data) => {
  append(`${data.user}: ${data.input}`, 'recieve-msg')
})