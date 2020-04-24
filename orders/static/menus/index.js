
document.addEventListener('DOMContentLoaded', () => {
	updateCart();
	remove();
	updateQuantity();
	let add_cart = document.querySelectorAll('.btn-card');
	add_cart.forEach( btn => {
		btn.onclick = event => {
			let button = event.target;
			let product = button.parentElement.parentElement.querySelector('.card-product-item').innerText;
			let price_item =button.parentElement.parentElement.querySelector('.card-price');
			price = parseFloat(price_item.innerText);
			addItemToCart(product,price);	
			updateCart();	
		}
	})
})

function addItemToCart(product, price) {
	var card = document.createElement('tr');
	card.classList.add('card-rows');
	let card_title = document.querySelectorAll('.card-item-title');
	card_title.forEach( title => {
		if (title.innerText == product ) {
			alert('Product have added to basket.')
			return
		}
	})
	var cardRowContent = `
	     <td scope="row" class="d-flex flex-row jutitfy-content-start align-content-start">
	      	<img src="https://bizweb.dktcdn.net/thumb/large/100/228/168/products/sualai.jpg?v=1573720306000" width="100" height="100" class="image">
	      	<span class="card-item-title">${product}</span>
	     </td>
	     <td class="card-price">${price} USD</td>
	     <td class="card-quantity">
	    	<input type="number" class="card-quantity-input" value="1">
	      	<button class="btn btn-danger">Delete</button>
	     </td>`
	card.innerHTML = cardRowContent;
	document.querySelector('.card-items').append(card);
	remove();
	updateQuantity();
}

function remove() {
	let btn = document.querySelectorAll('.btn-danger');
	btn.forEach( delele => {
		delele.onclick = event => {
			let button = event.target;
			button.parentElement.parentElement.remove();
			updateCart();
		}
	})
} 

function updateQuantity() {
	var quantity = document.querySelectorAll('.card-quantity-input');
	quantity.forEach( quantity => {
		quantity.onchange = event => {
			let input = event.target;
			if (isNaN(input.value) || input.value <= 0){
				input.value = 1;
			}
			updateCart();
		}
	})
}

function updateCart() {
	let total = 0;
	var cart_rows = document.querySelectorAll('.card-rows');
	cart_rows.forEach( cart_row => {
		let price_item = cart_row.querySelector('.card-price');
		let quantity_item = cart_row.querySelector('.card-quantity-input');
		quantity = quantity_item.value;
		price = parseFloat(price_item.innerText);
		total += price*quantity;
	})
	document.querySelector('.card-total-price').innerHTML = total + 'USD';
}

//Websocket
