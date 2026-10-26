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