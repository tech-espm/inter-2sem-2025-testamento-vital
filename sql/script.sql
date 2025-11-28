
-- Caso ocorra algum problema no login, executar o código abaixo, para arrumar a senha do usuário root:
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS testamentovital;
CREATE DATABASE IF NOT EXISTS testamentovital DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE testamentovital;

CREATE TABLE testamento (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(150) NOT NULL,
  email varchar(150) NOT NULL,
  cpf varchar(20) NOT NULL,
  nascimento datetime NOT NULL,
  telefone varchar(20) NOT NULL,
  endereco varchar(200) NOT NULL,
  uf char(2) NOT NULL,
  representante_nome varchar(150) NOT NULL,
  representante_parentesco varchar(50) NOT NULL,
  representante_telefone varchar(20) NOT NULL,
  doenca_terminal tinyint NOT NULL,
  estado_vegetativo tinyint NOT NULL,
  condicao_irreversivel tinyint NOT NULL,
  incapacidade_temporaria tinyint NOT NULL,
  rcp tinyint NOT NULL,
  nutricao_artificial tinyint NOT NULL,
  valores_prioridades text NULL,
  aspectos_religiosos text NULL,
  doacao_orgaos tinyint NOT NULL,
  testemunha1_nome varchar(150) NOT NULL,
  testemunha1_cpf varchar(20) NOT NULL,
  testemunha2_nome varchar(150) NOT NULL,
  testemunha2_cpf varchar(20) NOT NULL,
  PRIMARY KEY (id)
);
