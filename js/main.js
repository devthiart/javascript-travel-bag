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

    items[items.findIndex(element => element.id === exist.id)] = currentItem;
  } else {
    currentItem.id = items[items.length -1] ? (items[items.length -1]).id + 1 : 0;

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
  newItem.appendChild(createDeleteButton(item.id));
  
  list.appendChild(newItem);
}

function updateElement(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantity;
}

function createDeleteButton(id) {
  const buttonElement = document.createElement('button');
  buttonElement.innerHTML = 'X';

  // I used regular function because 'this' is dynamic.
  // Read more: https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/
  buttonElement.addEventListener('click', function () {
    console.log(this);
    deleteElement(this.parentNode, id);
  });
  // In arrow function 'this' is always equals 'this' value from the outer function.
  // buttonElement.addEventListener('click',() => {
  //   console.log(this);
  // });

  return buttonElement;
}

function deleteElement(elementTag, elementId) {
  elementTag.remove();

  items.splice(items.findIndex(element => {
    return element.id === elementId;
  }), 1);

  localStorage.setItem('items', JSON.stringify(items));
}
