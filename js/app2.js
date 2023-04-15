let articulosCarrito =[] ;
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector ('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector ('#eliminar-compra');
const carrito = document.querySelector('#carrito');


listaProductos.addEventListener('click',agregarProducto)
carrito.addEventListener('click', eliminarProducto)
vaciarCarritoBtn.addEventListener ('click', vaciarCarrito)



function eliminarProducto (evt){
    evt.preventDefault();
    if (evt.target.classList.contains ('borrar-producto')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute ('data-id');
        
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
        carritoHTML();
        guardarProductosLocalStorage();     
    }
    sumarCarrito();
}

function agregarProducto(evt){
    evt.preventDefault()

    if(evt.target.classList.contains('agregar-carrito')) {
        const producto = evt.target.parentElement.parentElement;
        leerDatosProducto(producto)
    }
    sumarCarrito();
}

function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h2').textContent,
        precio: producto.querySelector('.precio').textContent,  
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    if(articulosCarrito.some ( producto => producto.id === infoProducto.id)){
        const productos = articulosCarrito.map ( producto => {
            if (producto.id === infoProducto.id){
                let cantidad = parseInt(producto.cantidad);
                cantidad +=1;
                producto.cantidad = cantidad;
                return producto
            } else {
                return producto
            }
        })
        articulosCarrito = productos.slice ()
    } else {
        articulosCarrito.push(infoProducto)
    }
    carritoHTML();
    guardarProductosLocalStorage();
    sumarCarrito();
}

function carritoHTML (){
    vaciarCarrito ();
    articulosCarrito.forEach ( producto =>{
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width="100" />
        </td>
        <td> ${producto.titulo}</td>
        <td> ${producto.precio}</td>
        <td> ${producto.cantidad}</td>
        <td>
         <a href= "#" class= "borrar-producto" data-id="${producto.id}">x</a>
        </td>            
        `;
        contenedorCarrito.appendChild(row);
    })
}


function vaciarCarrito(){ 
    while(contenedorCarrito.firstChild) { 
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
} 

function guardarProductosLocalStorage(){
    localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito));
}

function obtenerProductosLocalStorage(){
    if(localStorage.getItem('articulosCarrito')){
        articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito'));
        carritoHTML();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerProductosLocalStorage();
});

function sumarCarrito() {
    let total = 0;
    articulosCarrito.forEach((producto) => {
      let precio = parseInt(producto.precio.replace('$', ''));
      let cantidad = parseInt(producto.cantidad);
      total += precio * cantidad;
    });
  
   
    const totalCarrito = document.querySelector('#total');
    totalCarrito.textContent = `Total=$${total}`;
  }






  const apiKey = '144598ebfcd15ae9ccee435cc4efe87f';

  
  const formulario = document.querySelector('form');
  const nombreInput = formulario.elements.nombre;
  const descripcionEl = document.getElementById('weather-description');
  const temperaturaEl = document.getElementById('temperatura');
  const botonActualizar = document.getElementById('boton');
  
  
  
  formulario.addEventListener('submit', (event) => {
    
    event.preventDefault();
  
    
    const city = nombreInput.value;
  
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
      .then(response => response.json())
      .then(data => {
        
        const weatherDescription = data.weather[0].description;
        const weatherCode = data.weather[0].icon
        const temperature = data.main.temp + ' °C';
        
        const imageUrl = `https://openweathermap.org/img/w/${weatherCode}.png`;
        const clima = document.querySelector("#clima")

         clima.style.backgroundImage = `url(${imageUrl})`
  
        descripcionEl.innerHTML = weatherDescription;
        temperaturaEl.innerHTML = temperature;
      })
      .catch(error => console.error(error));
  });
  
  
  botonActualizar.addEventListener('click', () => {
    
    formulario.dispatchEvent(new Event('submit'));
  });