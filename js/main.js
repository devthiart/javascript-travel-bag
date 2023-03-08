const list = document.getElementById('lista');
const form = document.getElementById('novoItem');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  createElement(
    event.target.elements['nome'].value, 
    event.target.elements['quantidade'].value
  );
});

function createElement(name, quantity) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const itemQuantity = document.createElement('strong');
  itemQuantity.innerHTML = quantity;

  newItem.appendChild(itemQuantity);
  newItem.innerHTML += name;
  
  list.appendChild(newItem);
}
