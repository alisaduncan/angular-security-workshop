const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const OktaJwtVerifier = require ('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: "https://{yourOktaDomain}/oauth2/default"
});

const app = express();
const port = 3000;

const products = [{
  id: 1,
  name: 'Chocolate Chip',
  description: 'A soft chewy chocolate cookie',
  imageUrl: 'https://images.unsplash.com/photo-1600147566401-c2056eb69479?auto=format&fit=crop&w=500&q=60'
}, {
  id: 2,
  name: 'Delightful Macaron',
  description: 'Crisp, chewy, and delightful',
  imageUrl: 'https://images.unsplash.com/photo-1596350351182-c2ce5b74a758?auto=format&fit=crop&w=500&q=60',
}, {
  id: 3,
  name: 'Pumpkin Shortbread',
  description: 'Seasonal favorite pumpkin shortbread is back in stock!',
  imageUrl: 'https://images.unsplash.com/photo-1630782622540-26a9f8c7a095?auto=format&fit=crop&w=500&q=60'
}, {
  id: 4,
  name: 'Fudgy Chocolate',
  description: 'Soft, fudgy, chewy',
  imageUrl: 'https://images.unsplash.com/photo-1619149651177-b09092806f1a?auto=format&fit=crop&w=500&q=60'
}];

const checkAuthorized = async(req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) { 
    return res.status(401).send();
  }

  const accessToken = match[1];
  if (!accessToken) {
    return res.status(401).send();
  }

  try {
    await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
  } catch (err) { 
    return res.status(401).send(err.message);
  }

  next();
}

app
.use(cors())
.use(cookieParser())
.use(express.json())
.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/api/xsrfEndpoint', (req, res, next) => {
  const csrfTokenSecret = 'top secret';
  res.cookie('XSRF-TOKEN', csrfTokenSecret, { httpOnly: false, sameSite: 'strict' });
  res.json({});
});

app.route('/api/products')
.get((_, res) => res.json(products))
.post(checkAuthorized, (req, res) => {
    const {name, description, imageUrl} = req.body;
    products.push({
        id: products.length + 1, 
        name, 
        description, 
        imageUrl 
    });
    return res.status(201).json(products[products.length - 1]);
});

app.get('/api/products/featured', (req, res) => {
  const product = products.find(p => p.id === 2);
  return res.json(product);
});

