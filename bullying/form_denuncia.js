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