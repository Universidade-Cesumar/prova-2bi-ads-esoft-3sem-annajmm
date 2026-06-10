// Arquivo para código javascript

const API_URL = "https://mockapi.io/clone/6a29e488f59cb8f65f1db732";

async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);
        const materiais = await resposta.json();

        const tbody = document.querySelector("#lista-materiais tbody");
        tbody.innerHTML = "";

        materiais.forEach(material => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.quantidade}</td>
            `;

            tbody.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
    }
}

document.getElementById("btn-cadastrar").addEventListener("click", async () => {

    const nome = document.getElementById("input-nome").value;
    const quantidade = document.getElementById("input-quantidade").value;

    if (nome === "" || quantidade === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const material = {
        nome: nome,
        quantidade: quantidade
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(material)
        });

        document.getElementById("input-nome").value = "";
        document.getElementById("input-quantidade").value = "";

        carregarMateriais();

    } catch (erro) {
        console.error("Erro ao cadastrar material:", erro);
    }
});

window.onload = carregarMateriais;