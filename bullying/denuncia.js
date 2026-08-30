function fazer_denuncia(){
    window.location.href = "form_denuncia.html";
}

function mostrar_erro_status(mensagem){
    const erro = document.getElementById("status_erro");
    if(!erro) return;
    erro.textContent = mensagem;
    erro.style.display = "block";
}

function esconder_erro_status(){
    const erro = document.getElementById("status_erro");
    if(!erro) return;
    erro.style.display = "none";
    erro.textContent = "";
}

async function acessar_denuncia(){
    const caminho = "https://sida-server-test.loca.lt/acesso/denuncia/acessar"; 
    const botao = document.getElementById("botao");
    const texto_original_botao = botao.textContent;

    esconder_erro_status();
    botao.disabled = true;
    botao.textContent = "Consultando...";

    try{
        let resposta = await fetch(caminho, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'bypass-tunnel-reminder': 'true',
                'User-Agent': 'Localtunnel-Client'
            },
            body: JSON.stringify({
                codigoAcesso: document.getElementById("codigo").value,
                senhaAcesso: document.getElementById("senha").value
            })
        });

        console.log("Status:", resposta.status);
        console.log("OK:", resposta.ok);

        let texto = await resposta.text();

        console.log("Resposta do servidor:", texto);

        if(!resposta.ok){
            mostrar_erro_status("Não encontramos essa denúncia. Confira o código e a senha.");
            return;
        }

        // O "id" retornado é maior do que o JS consegue representar com
        // precisão como number, então ele é transformado em string antes
        // do parse para não perder dígitos.
        let texto_seguro = texto.replace(/"id":(\d+)/, '"id":"$1"');

        let dados = JSON.parse(texto_seguro);
        dados.senhaAcesso = document.getElementById("senha").value;

        sessionStorage.setItem("denuncia_dados", JSON.stringify(dados));
        window.location.href = "mostrar_denuncia.html";
    } 
    catch (error) {
        console.error("Erro ao acessar denúncia:", error);
        mostrar_erro_status("Não foi possível conectar agora. Tente novamente em instantes.");
    }
    finally {
        botao.disabled = false;
        botao.textContent = texto_original_botao;
    }
}

document.getElementById("form_status").addEventListener("submit", (event) => {
    event.preventDefault();
    acessar_denuncia();
});


//Código de acesso efe03006/2026
//Senha de acesso dcf576a