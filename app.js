// load the things we need
var express = require('express');
var app = express();
const cookieParser = require('cookie-parser')

// set the view engine to ejs
app.set('views', './view');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser())
const {middleware} = require('./middleware/middlewareadmingeneral')
const {middlewareadmincentre} = require('./middleware/middlewareadmincentre')

// use res.render to load up an ejs view file

// index page
app.get('/dashboard', middleware,function(req, res) {
    res.render('dashboard');
});

//page authentification admin genaral
app.get('/authentificationadmingeneral',function(req, res) {
    res.render('authentificationadmingeneral');
});


//page authentification admin centre
app.get('/authentificationadmincentre', function(req, res) {
  res.render('authentificationadmincentre');
});

//page authentification reseponsable rayon
app.get('/authentificationresponsablerayon', function(req, res) {
  res.render('authentificationresponsablerayon');
});


//page register admin centre 
app.get('/register',middleware, function(req, res) {
  res.render('register');
});


//page charts
app.get('/charts',middleware, function(req, res) {
  res.render('charts');
});


// //page tables
// app.get('/tables', function(req, res) {
//   res.render('tables');
// });

//page centres
app.get('/centres',middleware, function(req, res) {
  res.render('centres');
});


//page categories
app.get('/categories',middleware, function(req, res) {
  res.render('categories');
});

//page produits
app.get('/produits',middleware, function(req, res) {
  res.render('produits');
});

//page registeradmincentre
app.get('/registeradmin',middleware, function(req, res) {
  res.render('registeradmin');
});

//page responsable rayon
app.get('/registerresponsable',middleware, function(req, res) {
  res.render('registerresponsable');
});

//page promotion
app.get('/promotions',middleware, function(req, res) {
  res.render('promotions');
});

app.listen(4000);
console.log('4000 is the magic port');