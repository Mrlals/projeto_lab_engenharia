document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded");
});

class Pessoa {
    constructor(nome, email, telefoneFixo, telefoneCelular, dataNascimento) {
        this.nome = nome;
        this.email = email;
        this.telefoneFixo = telefoneFixo;
        this.telefoneCelular = telefoneCelular;
        this.dataNascimento = dataNascimento;
    }

    validarNome() {
        const regex = /^[A-Za-z]+ [A-Za-z]+$/;
        return regex.test(this.nome);
    }

    validarEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(this.email);
    }

    validarTelefoneFixo() {
        const regex = /^\(\d{2}\)\d{4}-\d{4}$/;
        return regex.test(this.telefoneFixo);
    }

    validarTelefoneCelular() {
        const regex = /^\(\d{2}\)\d{5}-\d{4}$/;
        return regex.test(this.telefoneCelular);
    }

    validarDataNascimento() {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(this.dataNascimento);
    }
}


class Aluno extends Pessoa {
    constructor(nome, email, telefoneFixo, telefoneCelular, dataNascimento, curso, matricula) {
        super(nome, email, telefoneFixo, telefoneCelular, dataNascimento);
        this.curso = curso;
        this.matricula = matricula;
    }

    validarMatricula() {
        return this.matricula.length === 10;
    }

    validarCurso() {
        return this.curso !== '';
    }
}

class Professor extends Pessoa {
    constructor(nome, email, telefoneFixo, telefoneCelular, dataNascimento, areaAtuacao, matricula, lattes) {
        super(nome, email, telefoneFixo, telefoneCelular, dataNascimento);
        this.areaAtuacao = areaAtuacao;
        this.matricula = matricula;
        this.lattes = lattes;
    }

    validarMatricula() {
        return this.matricula.length === 5;
    }

    validarAreaAtuacao() {
        return this.areaAtuacao !== '';
    }

}

function validarFormulario() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefoneFixo = document.getElementById("telefoneFixo").value;
    let telefoneCelular = document.getElementById("telefoneCelular").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let perfil = document.querySelector('input[name="perfil"]:checked').value;
    let matricula = document.getElementById("matricula").value;

    if (perfil === "Aluno") {
        let curso = document.getElementById("curso").value;
        let aluno = new Aluno(nome, email, telefoneFixo, telefoneCelular, dataNascimento, curso, matricula);

        if (!aluno.validarNome()) {
            alert("Nome inválido!");
            return false;
        }
        if (!aluno.validarEmail()) {
            alert("Email inválido!");
            return false;
        }
        if (!aluno.validarMatricula()) {
            alert("Matrícula inválida!");
            return false;
        }
    } else if (perfil === "Professor") {
        let areaAtuacao = document.getElementById("areaAtuacao").value;
        let lattes = document.getElementById("lattes").value;
        let professor = new Professor(nome, email, telefoneFixo, telefoneCelular, dataNascimento, areaAtuacao, matricula, lattes);

        if (!professor.validarNome()) {
            alert("Nome inválido!");
            return false;
        }
        if (!professor.validarEmail()) {
            alert("Email inválido!");
            return false;
        }
        if (!professor.validarMatricula()) {
            alert("Matrícula inválida!");
            return false;
        }
        if (!professor.validarLattes()) {
            alert("Lattes inválido!");
            return false;
        }
    }
    return true;
}

function mostrarCamposAdicionais() {
    let perfil = document.querySelector('input[name="perfil"]:checked').value;
    if (perfil === "Aluno") {
        document.getElementById("campoCurso").style.display = "block";
        document.getElementById("campoArea").style.display = "none";
        document.getElementById("campoLattes").style.display = "none"; // Esconde o campo Lattes
    } else if (perfil === "Professor") {
        document.getElementById("campoCurso").style.display = "none";
        document.getElementById("campoArea").style.display = "block";
        document.getElementById("campoLattes").style.display = "block"; // Mostra o campo Lattes
    }
}
