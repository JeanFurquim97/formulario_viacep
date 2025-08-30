const cepInput = document.getElementById('cep');
const addressForm = document.getElementById('addressForm');

cepInput.addEventListener('input', function () {
    const value = cepInput.value;

    // Remove estados anteriores
    cepInput.classList.remove('is-invalid', 'is-valid');

    // Se encontrar caractere diferente de número → erro imediato
    if (/[^0-9]/.test(value)) {
        markInvalid(cepInput, 'Digite apenas números no CEP.');
        return;
    }

    // Marca como válido provisório quando atingir 8 dígitos
    if (value.length === 8) {
        cepInput.classList.add('is-valid');
    }
});

cepInput.addEventListener('blur', function () {
    const cep = cepInput.value.replace(/\D/g, ''); // Remove não numéricos

    // Limpa estados anteriores
    cepInput.classList.remove('is-invalid', 'is-valid');

    // Valida quantidade de dígitos
    if (cep.length !== 8) {
        markInvalid(cepInput, 'CEP inválido. Informe 8 dígitos.');
        clearAddressFields();
        return;
    }

    // URL da API ViaCEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    cepInput.classList.add('is-valid');

    fetch(url, { mode: 'cors' })
        .then(response => {
            if (!response.ok) throw new Error('Falha na resposta da API');
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                markInvalid(cepInput, 'CEP não encontrado.');
                clearAddressFields();
                return;
            }
            document.getElementById('logradouro').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';

            cepInput.classList.remove('is-invalid');
            cepInput.classList.add('is-valid');
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            markInvalid(cepInput, 'Erro ao buscar CEP. Tente novamente.');
            clearAddressFields();
        });
});

addressForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const cep = cepInput.value.replace(/\D/g, '');
    const numeroInput = document.getElementById('numero');

    if (cep.length !== 8) {
        markInvalid(cepInput, 'CEP é obrigatório e deve ter 8 dígitos.');
        return;
    }

    if (!numeroInput.value.trim()) {
        markInvalid(numeroInput, 'Número é obrigatório.');
        return;
    }

    alert('Endereço cadastrado com sucesso!');
});


/**
 * Marca um campo como inválido e exibe mensagem de erro (Bootstrap 5)
 * @param {HTMLElement} inputElement - Campo de entrada
 * @param {string} message - Mensagem de erro a ser exibida
 */
function markInvalid(inputElement, message) {
    inputElement.classList.remove('is-valid');
    inputElement.classList.add('is-invalid');

    // Remove mensagens anteriores
    const existingFeedback = inputElement.parentNode.querySelector('.invalid-feedback');
    if (existingFeedback) existingFeedback.remove();

    // Cria nova mensagem
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    inputElement.parentNode.appendChild(feedback);
}

function clearAddressFields() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}
