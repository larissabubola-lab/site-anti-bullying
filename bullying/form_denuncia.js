const continua = document.getElementById("pergunta_continua");
const aparece = document.querySelectorAll(".aparecer");
const nao_aparece = document.querySelectorAll(".nao_aparecer");

aparece.forEach((aparece_selecionado)=>{
    aparece_selecionado.addEventListener("change", ()=>{
        continua.style.display = "grid";
    })
})

nao_aparece.forEach((nao_aparece_selecionado)=>{
    nao_aparece_selecionado.addEventListener("change", ()=>{
        continua.style.display = "none";
    })
})

const situacao_contada = document.getElementById("relato_feito");
const foi_contado = document.querySelectorAll(".contou");
const nao_foi_contado = document.querySelectorAll(".nao_contou");

foi_contado.forEach((contado)=>{
    contado.addEventListener("change",()=>{
        situacao_contada.style.display = "grid";
    })
})

nao_foi_contado.forEach((nao_contado)=>{
    nao_contado.addEventListener("change",()=>{
        situacao_contada.style.display = "none";
    })
})

let lista_de_escolas = [];

async function buscar_escolas(){
    const caminho = "https://sida-server-test.loca.lt/escolas/todas";

    try{
        let resposta = await fetch(caminho, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                'bypass-tunnel-reminder': 'true',
                'User-Agent': 'Localtunnel-Client'
            }
        })

        if(!resposta.ok){
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        let dados = await resposta.json();
        lista_de_escolas = dados;

        console.log(dados);
        document.getElementById("escolas").innerHTML = dados.map((escola) => `<option value="${escola.nome}">${escola.nome}</option>`).join("");
    }

    catch(erro){
        console.error("Erro ao buscar escolas:", erro);
    }
}

buscar_escolas();

const formulario_denuncia = document.querySelector("form");

async function criar_denuncias(evento){
    evento.preventDefault();

    // pegar os checkbox marcados de cada pergunta
    let tipo_de_situacao_marcado = document.querySelectorAll('[data-grupo="tipo_de_situacao"]:checked');
    let local_da_ocorrencia_marcado = document.querySelectorAll('[data-grupo="local_da_ocorrencia"]:checked');
    let quem_praticou_marcado = document.querySelectorAll('[data-grupo="quem_praticou"]:checked');
    let como_isso_te_afetou_marcado = document.querySelectorAll('[data-grupo="como_isso_te_afetou"]:checked');

    // checar se marcou pelo menos um checkbox em cada pergunta
    if(tipo_de_situacao_marcado.length == 0 || local_da_ocorrencia_marcado.length == 0 || quem_praticou_marcado.length == 0 || como_isso_te_afetou_marcado.length == 0){
        alert("Selecione pelo menos uma opção em todas as perguntas de múltipla escolha.");
        return;
    }

    // pegar o nome da escola escrito no campo e achar o id dela na lista que veio da api
    let nome_da_escola = document.getElementById("nome_escola").value;
    let id_da_escola = null;

    for(let i = 0; i < lista_de_escolas.length; i++){
        if(lista_de_escolas[i].nome == nome_da_escola){
            id_da_escola = lista_de_escolas[i].id;
        }
    }

    let quem_esta_sendo_afetado = document.querySelector('input[name="pergunta_afetado"]:checked').value;
    let quando_aconteceu = document.querySelector('input[name="pergunta_quando"]:checked').value;
    let frequencia_que_acontece = document.querySelector('input[name="pergunta_frequencia"]:checked').value;
    let possui_testemunha = document.querySelector('input[name="pergunta_presenciou"]:checked').value;
    let relatado_para_responsavel = document.querySelector('input[name="pergunta_relatada"]:checked').value;

    let resultado_do_relato = null;
    let resultado_do_relato_marcado = document.querySelector('input[name="pergunta_depois"]:checked');
    if(resultado_do_relato_marcado){
        resultado_do_relato = resultado_do_relato_marcado.value;
    }


    let esta_em_perigo = document.querySelector('input[name="pergunta_perigo"]:checked').value == "true";
    let sente_seguro_na_escola = document.querySelector('input[name="pergunta_seguro"]:checked').value == "true";


    let continua_acontecendo = null;
    let continua_acontecendo_marcado = document.querySelector('input[name="pergunta_continua"]:checked');
    if(continua_acontecendo_marcado){
        continua_acontecendo = continua_acontecendo_marcado.value == "true";
    }

    let situacoes_denunciadas = [];
    for(let i = 0; i < tipo_de_situacao_marcado.length; i++){
        situacoes_denunciadas.push(tipo_de_situacao_marcado[i].value);
    }

    let onde_aconteceu = [];
    for(let i = 0; i < local_da_ocorrencia_marcado.length; i++){
        onde_aconteceu.push(local_da_ocorrencia_marcado[i].value);
    }

    let quem_praticou = [];
    for(let i = 0; i < quem_praticou_marcado.length; i++){
        quem_praticou.push(quem_praticou_marcado[i].value);
    }

    let como_isso_te_afetou = [];
    for(let i = 0; i < como_isso_te_afetou_marcado.length; i++){
        como_isso_te_afetou.push(como_isso_te_afetou_marcado[i].value);
    }

    let o_que_aconteceu = document.getElementById("o_que_aconteceu").value;
    let detalhes_do_agressor = document.getElementById("pessoa_praticou").value;
    let detalhes_da_testemunha = document.getElementById("detalhes_testemunha").value;
    let informacoes_adicionais = document.getElementById("mais_infos").value;

    const caminho = "https://sida-server-test.loca.lt/denuncias/criar";


    console.log(id_da_escola, quem_esta_sendo_afetado, o_que_aconteceu, esta_em_perigo, frequencia_que_acontece, quando_aconteceu, continua_acontecendo, detalhes_do_agressor, possui_testemunha, detalhes_da_testemunha, relatado_para_responsavel, resultado_do_relato, sente_seguro_na_escola, informacoes_adicionais, onde_aconteceu, como_isso_te_afetou, quem_praticou, situacoes_denunciadas);

    let denuncia = await fetch(caminho,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            'bypass-tunnel-reminder': 'true',
            'User-Agent': 'Localtunnel-Client'
        },
        body: JSON.stringify({
            idEscola: id_da_escola,  //id da escola
            afetados: quem_esta_sendo_afetado, 
            oqueAconteceu: o_que_aconteceu,
            estaEmPerigo: esta_em_perigo,
            frequenciaOcorre: frequencia_que_acontece,
            quandoOcorreu: quando_aconteceu,
            continuaAcontecendo: continua_acontecendo,
            detalhesAgressores: detalhes_do_agressor,
            possuiTestemunha: possui_testemunha,
            detalhesTestemunha: detalhes_da_testemunha,
            relatadoParaOResponsavel: relatado_para_responsavel,
            resultadoRelato: resultado_do_relato,
            senteSeguroNaEscola: sente_seguro_na_escola, 
            pedidoOuInformacaoExtra: informacoes_adicionais,
            ondeOcorreuList: onde_aconteceu, //lista
            comoTeAfetouList: como_isso_te_afetou, //lista
            quemPratica: quem_praticou, //lista
            situacaoDenunciadas: situacoes_denunciadas //lista
        })
    })

    let resposta = await denuncia.json();
    console.log(resposta);

    if(!denuncia.ok){
        alert("Ocorreu um erro ao enviar sua denúncia. Tente novamente.");
        return;
    }

    // guarda o código e a senha de acesso da denúncia para mostrar na página seguinte
    sessionStorage.setItem("codigoAcesso", resposta.codigoAcesso);
    sessionStorage.setItem("senhaAcesso", resposta.senhaAcesso);

    window.location.href = "denuncia_concluida.html";
}

formulario_denuncia.addEventListener("submit", criar_denuncias);