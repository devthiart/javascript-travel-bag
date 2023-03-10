const list = document.getElementById('list');
const form = document.getElementById('newItem');
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach(element => {
  createElement(element);
})

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = event.target.elements['name'];
  const quantity = event.target.elements['quantity'];

  const currentItem = {
    'name': name.value,
    'quantity': quantity.value,
  }

  items.push(currentItem);

  localStorage.setItem('items', JSON.stringify(items));

  createElement(currentItem);

  name.value = '';
  quantity.value = '';
});

function createElement(item) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const itemQuantity = document.createElement('strong');
  itemQuantity.innerHTML = item.quantity;

  newItem.appendChild(itemQuantity);
  newItem.innerHTML += item.name;
  
  list.appendChild(newItem);
}
