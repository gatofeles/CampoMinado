create database campominado;

use campominado;

create table usuarios (
    id int not null auto_increment,
    username varchar(50) not null,
    senha varchar(255) not null,
    dataNascimento date not null,
    nome varchar(255) not null,
    email varchar(255) not null,
    telefone varchar(255) not null,
    cpf varchar(255) not null,
    primary key (id));

create table partidas (
    id int not null auto_increment,
    idUsuario int not null,		
    dimensaoCampo int not null,
    numeroBombas int not null,
    tempoPartida int,
    resultado varchar(1) not null,
    dataDoJogo datetime not null,
    modoDeJogo varchar(1) not null,
    primary key (id),
    foreign key (idUsuario) references usuarios(id));
    
create view top10 as
 select u.username, p.dimensaoCampo, p.numeroBombas, p.tempoPartida, p.dataDoJogo,p.modoDeJogo from partidas p inner join usuarios u on p.idUsuario = u.id
 where resultado = 'V'
 order by dimensaoCampo desc, tempoPartida asc
    limit 10;

DELIMITER $$
CREATE PROCEDURE mostrarHistorico(IN idUser INT)
BEGIN
    select u.username, p.dimensaoCampo, p.numeroBombas, p.modoDeJogo, p.tempoPartida, p.resultado, p.dataDoJogo from partidas p inner join usuarios u
    on p.idUsuario = u.id
    where idUsuario = idUser
    order by dataDoJogo
    limit 20;
END $$
DELIMITER ;

insert into usuarios (username, senha, dataNascimento, nome, email, telefone, cpf) values ('wagner','123','1900-12-31','wagner','wagner@gmail.com', '123456789', '123456789');
insert into usuarios (username, senha, dataNascimento, nome, email, telefone, cpf) values ('gabi', '123', '1900-12-31','gabi', 'gabi@gmail.com', '123456789', '123456789');
insert into usuarios (username, senha, dataNascimento, nome, email, telefone, cpf) values ('nicolas', '123','1900-12-31', 'nicolas', 'nicolas@gmail.com', '123456789', '123456789');
insert into usuarios (username, senha, dataNascimento, nome, email, telefone, cpf) values ('jose', '123','1900-12-31','jose', 'jose@gmail.com', '123456789', '123456789');
insert into usuarios (username, senha, dataNascimento, nome, email, telefone, cpf) values ('rodrigo', '123','1990-01-18','rodrigo', 'rodrigo@gmail.com', '123456789', '123456789');

insert into partidas (idUsuario, dimensaoCampo, numeroBombas,tempoPartida, dataDoJogo, modoDeJogo, resultado) values (1, 20, 5, 100, '2021-12-31 10:30:59', 'R', 'V');
insert into partidas (idUsuario, dimensaoCampo, numeroBombas,tempoPartida, dataDoJogo, modoDeJogo, resultado) values (1, 35, 15, 200, '2021-12-31 11:30:59', 'R', 'P');
insert into partidas (idUsuario, dimensaoCampo, numeroBombas,tempoPartida, dataDoJogo, modoDeJogo, resultado) values (2, 10, 5, 10, '2021-04-31 11:30:59', 'R', 'V');
insert into partidas (idUsuario, dimensaoCampo, numeroBombas,tempoPartida, dataDoJogo, modoDeJogo, resultado) values (3, 50, 35, 350, '2021-05-31 11:31:00','R', 'V');

