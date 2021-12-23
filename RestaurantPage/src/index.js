// import url from './restaurant.jpeg'
// const url = require('./restaurant.jpeg');

temp = document.querySelector('#content')
test = document.createElement('h1')
test.innerHTML = 'Test of Restaurant Page'

// // image
const img = document.createElement('img')
img.className = 'image'
img.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80'


temp.appendChild(img)
temp.appendChild(test)