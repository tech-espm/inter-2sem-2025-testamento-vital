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



router.get("/meutestamento-antigo", wrap(async (req, res) => {

		let produtos;

	await sql.connect(async sql => {
		//tudo aqui dentro é executado com a conexão aberta.
	//produtos = await sql.query("select id, nome, email, telefone, endereco, uf, representante_nome, representante_parentesco, 
	// representante_telefone, doenca_terminal, estado_vegetativo, condicao_irreversivel, outros, rcp, nutricao_artificial, 
	// valores_prioridades, aspectos_religiosos, doacao_orgaos, testemunha1_nome, testemunha1_cpf, testemunha2_nome, 
	// testemunha2_cpf from testamento");
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
		produtos: produtosVindosDoBanco,
		testamento: null,
	};

	res.render("index/meutestamento", opcoes);
}));


router.get("/meutestamento", wrap(async (req, res) => {

	let lista;

	await sql.connect(async sql => {
		lista = await sql.query("select id, nome, email, cpf, date_format(nascimento, '%Y-%m-%d') nascimento, telefone, endereco, uf, representante_nome, representante_parentesco, representante_telefone, doenca_terminal, estado_vegetativo, condicao_irreversivel, incapacidade_temporaria, rcp, nutricao_artificial, valores_prioridades, aspectos_religiosos, doacao_orgaos, testemunha1_nome, testemunha1_cpf, testemunha2_nome, testemunha2_cpf from testamento");
	});

	let testamento = null;

	if (lista.length > 0) {
		testamento = lista[0];
	}

	let opcoes = {
		titulo: "Meu Testamento",
		testamento: testamento,
	};

	res.render("index/meutestamento", opcoes);
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

	if(!testamento.cpf){
		res.status(400).json("CPF inválido!");
		return;
	}
	if(!testamento.nascimento){
		res.status(400).json("Data de nascimento inválida!");
		return;
	}

	if(!testamento.telefone){
		res.status(400).json("Telefone inválido!");
		return;
	}

	if(!testamento.endereco){
		res.status(400).json("Endereço inválido!");
		return;
	}

	if(!testamento.uf){
		res.status(400).json("Estado inválido!");
		return;
	}

	if(!testamento.representante_nome){
		res.status(400).json("Nome de representante inválido!");
		return;
	}
	if(!testamento.representante_parentesco){
		res.status(400).json("Parentesco de representante inválido!");
		return;
	}

	if(!testamento.representante_telefone){
		res.status(400).json("Telefone de representante inválido!");
		return;
	}
	if(!testamento.testemunha1_nome){
		res.status(400).json("Nome da 1ª testemunha inválido!");
		return;
	}

	if(!testamento.testemunha1_cpf){
		res.status(400).json("CPF da 1ª testemunha inválido!");
		return;
	}

	if(!testamento.testemunha2_nome){
		res.status(400).json("Nome da 2ª testemunha inválido!");
		return;
	}

	if(!testamento.testemunha2_cpf){
		res.status(400).json("CPF da 2ª testemunha inválido!");
		return;
	}



	await sql.connect(async sql => {
		//tudo aqui dentro é executado com a conexão aberta.
		let parametros = [
			testamento.nome,
			testamento.email,
			testamento.cpf,
			testamento.nascimento,
			testamento.telefone,
			testamento.endereco,
			testamento.uf,
			testamento.representante_nome,
			testamento.representante_parentesco,
			testamento.representante_telefone,
			testamento.doenca_terminal,
			testamento.estado_vegetativo,
			testamento.condicao_irreversivel,
			testamento.incapacidade_temporaria,
			testamento.rcp,
			testamento.nutricao_artificial,
			testamento.valores_prioridades,
			testamento.aspectos_religiosos,
			testamento.doacao_orgaos,
			testamento.testemunha1_nome,
			testamento.testemunha1_cpf,
			testamento.testemunha2_nome,
			testamento.testemunha2_cpf
			
		];

		if (testamento.id) {
			parametros.push(testamento.id);

			await sql.query("update testamento set nome = ?, email = ?, cpf = ?, nascimento = ?, telefone = ?, endereco = ?, uf = ?, representante_nome = ?, representante_parentesco = ?, representante_telefone = ?, doenca_terminal = ?, estado_vegetativo = ?, condicao_irreversivel = ?, incapacidade_temporaria = ?, rcp = ? , nutricao_artificial = ?, valores_prioridades = ?, aspectos_religiosos = ?, doacao_orgaos = ?, testemunha1_nome = ?, testemunha1_cpf = ?, testemunha2_nome = ?, testemunha2_cpf = ? where id = ?", parametros);
		} else {
			await sql.query("insert into testamento (nome, email,  cpf, nascimento, telefone, endereco, uf, representante_nome, representante_parentesco, representante_telefone, doenca_terminal, estado_vegetativo, condicao_irreversivel, incapacidade_temporaria, rcp, nutricao_artificial, valores_prioridades, aspectos_religiosos, doacao_orgaos, testemunha1_nome, testemunha1_cpf, testemunha2_nome, testemunha2_cpf) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", parametros);
			let lista = await sql.query("select last_insert_id() id");
			testamento.id = lista[0].id;
		}
	});

	res.json(testamento.id);
}));

module.exports = router;
