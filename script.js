document.getElementById("formLogin").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email !== "" && senha !== "") {
        window.location.href = "reservas.html";
    } else {
        alert("Preencha o e-mail e a senha!");
    }
}
);


// PESQUISA DAS TABELAS

document.addEventListener("DOMContentLoaded", function () {
    const caminho = window.location.pathname.toLowerCase();

    let campos = [];
    let colunas = [];

    if (caminho.includes("reservas.html")) {
        campos = ["pet", "entrada", "saida", "status"];
        colunas = [0, 2, 3, 4];
    } else if (caminho.includes("pets.html")) {
        campos = ["nome", "tipo", "raca", "tamanho"];
        colunas = [0, 1, 2, 3];
    } else if (caminho.includes("usuarios.html")) {
        campos = ["nome", "email", "funcao"];
        colunas = [0, 1, 2];
    } else {
        return;
    }

    const formulario = document.querySelector("form");
    const tabela = document.querySelector("table");

    if (!formulario || !tabela) {
        return;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const valores = campos.map(function (id) {
            const campo = document.getElementById(id);
            return campo ? campo.value.trim().toLowerCase() : "";
        });

        const linhas = tabela.querySelectorAll("tbody tr");

        linhas.forEach(function (linha) {
            const celulas = linha.querySelectorAll("td");

            const encontrou = valores.every(function (valor, indice) {
                if (valor === "") {
                    return true;
                }

                const coluna = celulas[colunas[indice]];

                if (!coluna) {
                    return false;
                }

                let texto = coluna.textContent.trim().toLowerCase();

                // Permite pesquisar datas digitadas no formato AAAA-MM-DD.
                if (
                    (campos[indice] === "entrada" ||
                     campos[indice] === "saida") &&
                    valor.includes("-")
                ) {
                    const partes = valor.split("-");
                    const dataFormatada =
                        partes[2] + "/" + partes[1] + "/" + partes[0];

                    return texto.includes(dataFormatada);
                }

                return texto.includes(valor);
            });

            linha.style.display = encontrou ? "" : "none";
        });
    });
});