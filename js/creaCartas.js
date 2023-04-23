const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () =>{
  const response= await fetch("js/data.json");
  const data = await response.json();
  data.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <image src="${product.image}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="price">${product.price} €</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "COMPRAR";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    }
  });
});
}
getProducts();

//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};