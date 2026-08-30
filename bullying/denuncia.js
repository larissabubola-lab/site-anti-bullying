function fazer_denuncia(){
    window.location.href = "form_denuncia.html";
}

async function acessar_denuncia(){
    const caminho = "https://sida-server-test.loca.lt/acesso/denuncia/acessar"; 

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
        
        // let dados = await resposta.json(); 
        // console.log(dados);
    } 
    catch (error) {
        console.error("Erro ao acessar denúncia:", error);
    }
}

document.getElementById("form_status").addEventListener("submit", (event) => {
    event.preventDefault();
    acessar_denuncia();
});


//Código de acesso efe03006/2026
//Senha de acesso dcf576a