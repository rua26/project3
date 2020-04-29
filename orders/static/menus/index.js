
document.addEventListener('DOMContentLoaded', () => {
	var url = document.querySelectorAll('.menu')[0].dataset.url
	load_menu('regulars_list',url);
	document.querySelectorAll('.menu').forEach( link => {
		link.onclick = () => {
			const items = link.dataset.page;
			const url = link.dataset.url;
			load_menu(items, url);
		}
	})
	remove();
})

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$(document).ready(function() {
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
      beforeSend: function(xhr, settings) {
        	if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          		xhr.setRequestHeader("X-CSRFToken", csrftoken);
        	}
      	}
   	});
});

//Add product to cart
function buttonCard(){
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
}

//Load menu from ajax request
function load_menu(items, url) {
	const template = Handlebars.compile(document.querySelector('#result').innerHTML)
	$.ajax({
		type: "GET",
		url: url,
		dataType: 'json',
		success: items => {
			const content = template(items);
			document.querySelector('#menus').innerHTML = content
			updateCart();
			remove();
			updateQuantity();
			buttonCard();
		}
	})
}

//Check product in cart or not
function addItemToCart(product, price) {
	var card = document.createElement('tr');
	card.classList.add('card-rows');
	let card_title = document.querySelectorAll('.card-item-title');
	for (var i = 0; i < card_title.length; i++) {
	    if (card_title[i].innerText == product) {
	      alert('Product already in cart.')
	      return
	    }
	}
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
	$.ajax({
		type: "GET",
		url: '/ajax/order',
		data: {
			"name": product,
			"price": price,
			"action": "GET"
		},
		success: data => {
			console.log(data);
		}
	})
	document.querySelector('.card-items').append(card);
	remove();
	updateQuantity();
}

//Remove product from cart
function remove() {
	let btn = document.querySelectorAll('.btn-danger');
	btn.forEach( btn => {
		btn.onclick = event => {
			let button = event.target;
			button.parentElement.parentElement.remove();
			updateCart();
			let name = button.parentElement.parentElement.querySelector('.card-item-title').innerText;
			let price = button.parentElement.parentElement.querySelector('.card-price').innerText;
			$.ajax({
				type:"GET",
				url:'/ajax/order',
				data: {
					"name": name,
					"price": parseFloat(price),
					"action": "POST"
				},
				success: data => {
					console.log(data.status)
				}
			});
		}
	})
} 

//Update quantity of product in cart
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

//Update total
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




