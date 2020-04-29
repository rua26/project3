from django.test import TestCase, Client
from .models import Order, Regular_pizza, Sicilian_pizza
from django.contrib.auth.models import User
# Create your tests here.
class ProductTestCase(TestCase):

	def setUp(self):
		
		#Create Product
		p1 = Regular_pizza.objects.create(name='A', small=12.50,large=17.50)
		p2 = Sicilian_pizza.objects.create(name='B', small=13.00, large=15.00)

		#Create User
		u1 = User.objects.create(username="C", email="user@gmail.com",password='abc')
		#Create Order
		o1 = Order.objects.create(user = u1, product=p1, price=12.50)
		o2 = Order.objects.create(user = u1, product=p2, price=13.00)

	def test_Userorder_count(self):
		o = User.objects.get(username="C")
		self.assertEqual(o.orders.count(), 2)

	def test_authentication(self):
		u = User.objects.get(username='C')
		self.assertEqual(u.is_authenticated, True)

	def test_index(self):
		u = User.objects.get(username="C")
		c = Client()
		response = c.post('/login/', {'username':"Tony", "password":'T1234567u'})
		self.assertEqual(response.status_code, 200)
		response = c.get('/', follow=True)
		# response.redirect_chain
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.context["user"].username,"Tony")
		

