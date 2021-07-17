# MERN Notes Keeper  

[![N|Solid](https://res.cloudinary.com/dsohtcuy3/image/upload/v1626470356/button_demo_1_k6is2z.png)](https://mernstore-app.herokuapp.com/)

![image](https://res.cloudinary.com/dsohtcuy3/image/upload/v1626556553/Screenshot_8_gy94os.png)

#

### Features:
- Product list and details
- Product search and pagination
- Product reviews and rating
- Registration and authorization
- Shopping cart
- Checkout (shippin, payment etc.)
- User profile management
- User orders
- Liqpay and paypal payment

### Stack:

##### Client:
- HTML
- CSS + SASS ( SCSS )
- ES6+
- React ( Functional component, React-Bootstrap )
- Redux + Thunk
- Axios

##### Server:
- NodeJS
- Express
- RestAPI architecture
- JWT
- MongoDB + Mongoose

#

### Environment:

Create a .env file in then root:

```sh
NODE_ENV = development
PORT = 5001
MONGO_URI = your mongo uri
JWT_SECRET = abc123
PAYPAL_CLIENT_ID = your paypal id
LIQPAY_PUBLIC_KEY = your liqpay public key
LIQPAY_PRIVATE_KEY = your liqpay private key
```
### Install (Frontend and Backend):

```sh
npm install
cd frontend
npm install
```
### Run app:

```sh
npm run dev
```

### Run only server:

```sh
npm run server
```


