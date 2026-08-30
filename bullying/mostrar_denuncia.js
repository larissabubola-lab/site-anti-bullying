// traduz os valores que vem em maiusculo do servidor para um texto normal
const traducoes = {
    "EU": "Eu mesmo(a)",
    "SIM": "Sim",
    "NAO": "Não",
    "NAO_MEDO": "Não, com medo",
    "UMA_VEZ": "Uma vez",
    "HOJE": "Hoje",
    "URGENTE": "Urgente",
    "ALTA": "Alta",
    "MEDIA": "Média",
    "MODERADA": "Moderada",
    "BAIXA": "Baixa",
    "UM_ALUNO": "Um aluno",
    "DENTRO_DA_ESCOLA": "Dentro da escola",
    "FORA_DA_ESCOLA": "Fora da escola",
    "MEDO_OU_INSEGURANCA": "Medo ou insegurança",
    "BULLYING": "Bullying"
};

const cores_prioridade = {
    "URGENTE": "#e8484f",
    "ALTA": "#e08a2b",
    "MEDIA": "#d0a412",
    "MODERADA": "#d0a412",
    "BAIXA": "#2fae8f"
};

function traduzir(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return "";
    }
    if (traducoes[valor]) {
        return traducoes[valor];
    }
    const texto = valor.toString().toLowerCase().split("_").join(" ");
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// junta uma lista de valores em um texto só, separado por vírgula
function traduzirLista(lista) {
    if (!lista || lista.length === 0) {
        return "não informado";
    }
    return lista.map(traduzir).join(", ");
}

function textoOuPadrao(valor, padrao) {
    const traduzido = traduzir(valor);
    return traduzido === "" ? padrao : traduzido;
}

// para campos de texto livre (escritos pela pessoa), sem mexer nas letras
function textoLivreOuPadrao(valor, padrao) {
    if (valor === null || valor === undefined || valor === "") {
        return padrao;
    }
    return valor;
}

function formatarData(data) {
    if (!data) {
        return "não informado";
    }
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function textoSimNao(valor) {
    if (valor === null || valor === undefined) {
        return "não informado";
    }
    return valor ? "Sim" : "Não";
}

function preencher(id, texto) {
    document.getElementById(id).textContent = texto;
}

function mostrarDenuncia(dados) {
    document.getElementById("conteudo").style.display = "block";

    preencher("campo_id", dados.id);
    preencher("campo_data", formatarData(dados.dataCriacao));

    const campoPrioridade = document.getElementById("campo_prioridade");
    campoPrioridade.textContent = textoOuPadrao(dados.prioridade, "não informado");
    campoPrioridade.style.color = cores_prioridade[dados.prioridade] || "#008080";

    const responsavel = (dados.responsavelDenunciaResponseDTOList && dados.responsavelDenunciaResponseDTOList[0]) || {};
    preencher("campo_nucleo", responsavel.nomeOrgaoCompetenteResponsavel || "não informado");
    preencher("campo_email", responsavel.emailOrgaoCompetenteResponsavel || "não informado");
    preencher("campo_numero", responsavel.numeroOrgaoCompetenteResponsavel || "não informado");

    preencher("campo_codigo", dados.codigoAcesso || "não informado");
    preencher("campo_senha", dados.senhaAcesso || "não informado");

    // parte que só aparece quando a pessoa clica em "ver denúncia completa"
    preencher("campo_relato", textoLivreOuPadrao(dados.oqueAconteceu, "nada foi escrito aqui."));

    preencher("campo_escola", dados.nomeEscola || "não informado");
    preencher("campo_quando", textoOuPadrao(dados.quandoOcorreu, "não informado"));
    preencher("campo_frequencia", textoOuPadrao(dados.frequenciaOcorre, "não informado"));
    preencher("campo_continua", textoSimNao(dados.continuaAcontecendo));
    preencher("campo_afetados", textoOuPadrao(dados.afetados, "não informado"));
    preencher("campo_seguro", textoSimNao(dados.senteSeguroNaEscola));
    preencher("campo_onde", traduzirLista(dados.ondeOcorreuList));
    preencher("campo_situacao", traduzirLista(dados.situacaoDenunciadaList));
    preencher("campo_quempraticou", traduzirLista(dados.quemPraticaList));
    preencher("campo_comoafetou", traduzirLista(dados.comoTeAfetouList));

    preencher("campo_testemunha", textoOuPadrao(dados.possuiTestemuna, "não informado"));
    preencher("campo_relatado", textoOuPadrao(dados.relatadoParaOResponsavel, "não informado"));

    if (dados.detalhesTestemunha) {
        preencher("campo_detalhes_testemunha", "Sobre a testemunha: " + dados.detalhesTestemunha);
    }
    if (dados.detalhesAgressores) {
        preencher("campo_detalhes_agressores", "Sobre quem praticou: " + dados.detalhesAgressores);
    }

    preencher("campo_pedido", textoLivreOuPadrao(dados.pedidoOuInformacaoExtra, "nenhum pedido foi feito."));
    preencher("campo_resultado", textoLivreOuPadrao(dados.resultadoRelato, "ainda sem resultado registrado."));

    const status = dados.statusDenunciaResponseDTOList || [];
    preencher("campo_status", status.length > 0 ? `${status.length} atualização(ões) registrada(s).` : "ainda não há atualizações.");

    const mensagens = dados.mensagensDenunciaResponseDTOList || [];
    preencher("campo_mensagens", mensagens.length > 0 ? `${mensagens.length} mensagem(ns) por aqui.` : "nenhuma mensagem por aqui ainda.");
}

function ver_denuncia_completa() {
    const detalhes = document.getElementById("detalhes");
    const botao = document.getElementById("botao_ver_mais");
    const abrindo = detalhes.style.display !== "block";

    detalhes.style.display = abrindo ? "block" : "none";
    botao.classList.toggle("aberto", abrindo);
    botao.querySelector("span").textContent = abrindo ? "Ocultar denúncia completa" : "Ver denúncia completa";
}

window.onload = function () {
    const dadosSalvos = sessionStorage.getItem("denuncia_dados");

    if (!dadosSalvos) {
        document.getElementById("erro").style.display = "block";
        return;
    }

    try {
        const dados = JSON.parse(dadosSalvos);
        mostrarDenuncia(dados);
    } catch (erro) {
        console.error("Erro ao ler os dados da denúncia:", erro);
        document.getElementById("erro").style.display = "block";
    }
};