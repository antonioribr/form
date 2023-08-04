/* criando função para limpar formulário */
const limparFormulario = (endereco) => {
    /* usando funções do DOM (Document Object Model) */
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('numero').value = '';
}

/* popular o formulário */
const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

/* validando o cep REGEX*/
const eNumero = (numero) => /^[0-9]+$/;

/* validando cep se tem 8 caracteres */
const cepValido = (cep) =>
    cep.length == 8 && eNumero(numero);

/* fazendo uma requisição para API viaCEP */
const pesquisaCEP = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    /* verificando se o cep é válido */
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById(endereco).value = 'CEP não encontrado.';
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto.';
    }
}

document.getElementById('endereco')
    .addEventListener('focusout', pesquisaCEP);
