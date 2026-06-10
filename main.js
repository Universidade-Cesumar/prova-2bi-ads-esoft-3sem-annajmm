// Arquivo para código javascript

const API_URL = "https://6a29e488f59cb8f65f1db731.mockapi.io/materiais";

async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);
        const materiais = await resposta.json();

        const tbody = document.querySelector("#lista-materiais tbody");
        tbody.innerHTML = "";

        materiais.forEach(material => {
            tbody.innerHTML += `
                <tr>
                    <td>${material.nome}</td>
                    <td>${material.quantidade}</td>
                </tr>
            `;
        });

    } catch (erro) {
        alert("Erro ao carregar materiais");
        console.log(erro);
    }
}

document.getElementById("btn-cadastrar").addEventListener("click", async () => {

    const nome = document.getElementById("input-nome").value;
    const quantidade = document.getElementById("input-quantidade").value;

    if (!nome || !quantidade) {
        alert("Preencha todos os campos");
        return;
    }

    try {

        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                quantidade
            })
        });

        alert("Material cadastrado com sucesso!");

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar");
        }

        alert("Material cadastrado com sucesso!");

        document.getElementById("input-nome").value = "";
        document.getElementById("input-quantidade").value = "";

        carregarMateriais();

    } catch (erro) {
        alert("Falha ao cadastrar material");
        console.log(erro);
    }
});

document.getElementById("btn-mostrar").addEventListener("click", () => {
    document.getElementById("lista-materiais").style.display = "table";
    carregarMateriais();
});