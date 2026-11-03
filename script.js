// LOGIN
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (email !== "" && senha !== "") {
            window.location.href = "reservas.html";
        } else {
            alert("Preencha o e-mail e a senha!");
        }
    });
}


// PESQUISAS DAS TABELAS
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
    }

    if (campos.length > 0) {
        const formulario = document.querySelector("form");
        const tabela = document.querySelector("table");

        if (formulario && tabela) {
            formulario.addEventListener("submit", function(event) {
                event.preventDefault();

                const valores = campos.map(function(id) {
                    const campo = document.getElementById(id);
                    return campo ? campo.value.trim().toLowerCase() : "";
                });

                const linhas = tabela.querySelectorAll("tbody tr");

                linhas.forEach(function(linha) {
                    const celulas = linha.querySelectorAll("td");

                    const encontrou = valores.every(function(valor, indice) {
                        if (valor === "") {
                            return true;
                        }

                        const coluna = celulas[colunas[indice]];

                        if (!coluna) {
                            return false;
                        }

                        let texto = coluna.textContent.trim().toLowerCase();

                        if (
                            (campos[indice] === "entrada" ||
                             campos[indice] === "saida") &&
                            valor.includes("-")
                        ) {
                            const partes = valor.split("-");
                            const data = partes[2] + "/" + partes[1] + "/" + partes[0];
                            return texto.includes(data);
                        }

                        return texto.includes(valor);
                    });

                    linha.style.display = encontrou ? "" : "none";
                });
            });
        }
    }


    // CONFIGURAÇÕES: SALVAR VALOR DA DIÁRIA
    const campoDiaria = document.getElementById("valor_diaria_pet");

    if (campoDiaria) {
        const valorSalvo = localStorage.getItem("valorDiaria");

        if (valorSalvo !== null) {
            campoDiaria.value = valorSalvo;
        }

        const formularioDiaria = campoDiaria.closest("form");

        if (formularioDiaria) {
            formularioDiaria.addEventListener("submit", function(event) {
                event.preventDefault();

                localStorage.setItem("valorDiaria", campoDiaria.value);

                alert("Valor da diária salvo com sucesso!");
            });
        }
    }


    // CONFIGURAÇÕES: SALVAR QUANTIDADE DE VAGAS
    const campoVagas = document.getElementById("vagas");

    if (campoVagas) {
        const vagasSalvas = localStorage.getItem("quantidadeVagas");

        if (vagasSalvas !== null) {
            campoVagas.value = vagasSalvas;
        }

        const formularioVagas = campoVagas.closest("form");

        if (formularioVagas) {
            formularioVagas.addEventListener("submit", function(event) {
                event.preventDefault();

                localStorage.setItem("quantidadeVagas", campoVagas.value);

                alert("Quantidade de vagas salva com sucesso!");
            });
        }
    }

});