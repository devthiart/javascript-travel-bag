const list = document.getElementById('lista');
const form = document.getElementById('novoItem');
const items = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = event.target.elements['nome'];
  const quantity = event.target.elements['quantidade'];

  createElement(name.value, quantity.value);

  name.value = '';
  quantity.value = '';
});

function createElement(name, quantity) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const itemQuantity = document.createElement('strong');
  itemQuantity.innerHTML = quantity;

  newItem.appendChild(itemQuantity);
  newItem.innerHTML += name;
  
  list.appendChild(newItem);

  const currentItem = {
    'nome': name,
    'quantidade': quantity,
  }

  items.push(currentItem);

  localStorage.setItem('items', JSON.stringify(items));
}
