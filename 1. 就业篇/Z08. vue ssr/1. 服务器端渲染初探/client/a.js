const app = document.getElementById('app');

for(let i=0; i<10; i++) {
    const div = document.createElement('div');
    div.innerHTML = i;
    app.appendChild(div);
}