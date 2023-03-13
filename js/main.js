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

  const exist = items.find(element => element.name === name.value);

  const currentItem = {
    'name': name.value,
    'quantity': quantity.value,
  }

  if(exist) {
    currentItem.id = exist.id;
    updateElement(currentItem);

    items[exist.id] = currentItem;
  } else {
    currentItem.id = items.length;

    createElement(currentItem);

    items.push(currentItem);
  }

  localStorage.setItem('items', JSON.stringify(items));

  name.value = '';
  quantity.value = '';
});

function createElement(item) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const itemQuantity = document.createElement('strong');
  itemQuantity.innerHTML = item.quantity;
  itemQuantity.dataset.id = item.id;

  newItem.appendChild(itemQuantity);
  newItem.innerHTML += item.name;
  
  list.appendChild(newItem);
}

function updateElement(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantity;
}
