const express = require("express");
const wrap = require("express-async-error-wrapper");
const sql = require("../data/sql");

const router = express.Router();

router.get("/", wrap(async (req, res) => {
	res.render("index/index");
}));

router.get("/sobre", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Sobre"
	};

	res.render("index/sobre", opcoes);
}));



router.get("/meutestamento", wrap(async (req, res) => {

		let produtos;

	await sql.connect(async sql => {
		//tudo aqui dentro é executado com a conexão aberta.
	produtos = await sql.query("select id, nome, email, telefone from pessoa");
	});

	let produtoA = {
		id: 1,
		nome: "Produto A",
		valor: 25
	};

	let produtoB = {
		id: 2,
		nome: "Produto B",
		valor: 15
	};

	let produtoC = {
		id: 3,
		nome: "Produto C",
		valor: 100
	};

	let produtosVindosDoBanco = [ produtoA, produtoB, produtoC ];

	let opcoes = {
		titulo: "Listagem de Produtos",
		produtos: produtosVindosDoBanco
	};

	res.render("index/meutestamento", opcoes);
}));


router.get("/criartestamento", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Criar Testamento"
	};

	res.render("index/criartestamento", opcoes);
}));

router.post("/api/criartestamento", wrap(async (req, res) => {
	let testamento = req.body;

	if(!testamento.nome){
		res.status(400).json("Nome inválido!");
		return;
	}

	if(!testamento.email){
		res.status(400).json("Email inválido!");
		return;
	}


	await sql.connect(async sql => {
		//tudo aqui dentro é executado com a conexão aberta.

		let parametros = [
			testamento.nome,
			testamento.email
		];
		await sql.query("insert into testamento(nome, email) values (?, ?)", parametros);
	});

	res.json(true);
}));

module.exports = router;
