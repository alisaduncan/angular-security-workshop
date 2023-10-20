const express = require('express')
const cookieParser = require('cookie-parser');
const passportLocal = require('passport-local');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 3000;

const users = [{
  id: 1,
  username: 'member',
  name: 'Happy cookie consumer',
  email: 'cookie@email.fake'
}, {
  id: 2,
  username: 'admin',
  name: 'Happy cookie admin',
  email: 'cookie-admin@email.fake'
}];

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

const LocalStrategy = passportLocal.Strategy;

const checkAuthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) {
    return res.sendStatus(401);
  }
  next();
}

app
.use(cors())
.use(cookieParser())
.use(express.json())
.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'super secret',
  cookie: { http: false }
}))
.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', checkAuthenticated);

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(user => user.username === username) ?? null;
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});

app.post('/api/signin', passport.authenticate('local'), (req, res) => {
  const user = users.find(user => user.username === user.username);
  res.json(user);
});

app.post('/api/signout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err) };
    
  res.sendStatus(204);
  });
});

app.get('/api/xsrfEndpoint', (req, res, next) => {
  const csrfTokenSecret = 'top secret';
  res.cookie('XSRF-TOKEN', csrfTokenSecret, { httpOnly: false, sameSite: 'strict' });
  res.json({});
});

app.route('/api/products')
.get((_, res) => res.json(products))
.post((req, res) => {
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

