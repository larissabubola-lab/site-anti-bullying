// const botao_login = document.getElementById("login");
// const botao_cadastro = document.getElementById("cadastro");

const cadastro_pagina = document.getElementById("pagina_cadastro");

function abrir_cadastro(){
    cadastro_pagina.style.display = "flex";
}

function fechar_cadastro(){
    cadastro_pagina.style.display = "none";
}

const login_pagina = document.getElementById("pagina_login");

function abrir_login(){
    login_pagina.style.display = "flex";
}

function fechar_login(){
    login_pagina.style.display = "none";
}

const pagina_inicio = document.getElementById("inicio");
const pagina_sobre_nos = document.getElementById("sobre_nos");
const pagina_como_denunciar = document.getElementById("como_denunciar");
const pagina_contatos = document.getElementById("contatos");

function abrir_inicio(){
    pagina_inicio.style.display = "flex";
    pagina_sobre_nos.style.display = "none";
    pagina_como_denunciar.style.display = "none";
    pagina_contatos.style.display = "none";
}

function abrir_sobre_nos(){
    pagina_inicio.style.display = "none";
    pagina_sobre_nos.style.display = "flex";
    pagina_como_denunciar.style.display = "none";
    pagina_contatos.style.display = "none";
}

function abrir_como_denunciar(){
    pagina_inicio.style.display = "none";
    pagina_sobre_nos.style.display = "none";
    pagina_como_denunciar.style.display = "flex";
    pagina_contatos.style.display = "none";
}

function abrir_contatos(){
    pagina_inicio.style.display = "none";
    pagina_sobre_nos.style.display = "none";
    pagina_como_denunciar.style.display = "none";
    pagina_contatos.style.display = "flex";
}