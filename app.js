var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/primera");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));


//Definir el schema de nuestros productos
var productSchema = {
	title: String,
	description: String,
	imageUrl: String,
	price: Number
}

var Product = mongoose.model("Product", productSchema)

app.set("view engine", "jade");

app.use(express.static("public"));

app.get("/",function(req,res){
	/*var data = {
		title: "Mi primer súper producto",
		description: "Una mega super hiper compra",
		imageUrl: "data.png",
		price: 10
	}

	var product = new Product(data);

	product.save(function(err){
		console.log(product);
	});*/
	
	res.render("index");
});

app.post("/menu", function(req, res){
	if(req.body.password == "123456789"){
		var data = {
			title: req.body.title,
			description: req.body.description,
			imageUrl: "data.png",
			price: req.body.price
		}

		var product = new Product(data);

		product.save(function(err){
			console.log(product);
			res.render("index");
		});
	}
	else{
		res.render("menu/new");
	}
});

app.get("/menu/new", function(req, res){
	res.render("menu/new")
});

app.listen(83);