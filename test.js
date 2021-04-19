const button = document.querySelector('.submit')

button.addEventListener('click', e => {
    const title = document.querySelector('#title')
    console.log(title.value)
    title.value = ''
});