

let articulosCarrito = []; 
const listaProductos = document.querySelector("#lista-productos") 
const contenedorCarrito = document.querySelector('#lista-carrito tbody') 
const vaciarCarritoBtn = document.querySelector('#eliminar-compra') 
const carrito = document.querySelector('#carrito'); 


listaProductos.addEventListener('click', agregarProducto) 


carrito.addEventListener('click', eliminarProducto)


vaciarCarritoBtn.addEventListener('click', vaciarCarrito)


function eliminarProducto(evt){ 
    evt.preventDefault(); 
    if(evt.target.classList.contains('borrar-producto')){ 
        const producto = evt.target.parentElement.parentElement; 
        const productoId = producto.querySelector('a').getAttribute('data-id'); 

        
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId) 
        carritoHTML();
    }
}


function agregarProducto(evt){ 
    evt.preventDefault()

    if(evt.target.classList.contains('agregar-carrito')) {
        const producto = evt.target.parentElement.parentElement; 
        leerDatosProducto(producto) 
    }

}

function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src, 
        titulo: producto.querySelector('h2').textContent, 
        precio: producto.querySelector('.precio').textContent, 
        id: producto.querySelector('a').getAttribute('data-id'), 
        cantidad: 1 
    }

    
    if(articulosCarrito.some( producto => producto.id === infoProducto.id)){ 
        const productos = articulosCarrito.map( producto => { 
            if(producto.id === infoProducto.id){ 
                let cantidad = parseInt(producto.cantidad); 
                cantidad +=1; 
                producto.cantidad = cantidad; 
                return producto 
            }else {
                return producto 
            }
        })
        articulosCarrito = productos.slice() 
    } else {
        articulosCarrito.push(infoProducto) 
    }
    carritoHTML()
}


function carritoHTML(){
    vaciarCarrito(); 
    articulosCarrito.forEach( producto => { 
        const row = document.createElement('tr'); 
        
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100"/>
            </td>
            <td> ${producto.titulo}</td>
            <td> ${producto.precio}</td>
            <td> ${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
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



