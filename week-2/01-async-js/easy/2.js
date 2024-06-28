
function counter() {
    const date = new Date();
    console.log(date.toLocaleTimeString());
}

for (let i = 0; i < 10000; i++) {
    setTimeout(counter, i*1000);
}