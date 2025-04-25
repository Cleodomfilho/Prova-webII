// 1. Callback
function saudacao(nome, callback) {
    console.log("Callback:");
    console.log("Olá, " + nome + "!");
    callback();
  }

  function despedida() {
    console.log("Até mais!\n");
  }

  saudacao("Ana", despedida);

  // 2. Promise
  function buscarDados() {
    return new Promise((resolve, reject) => {
      const sucesso = true;

      setTimeout(() => {
        if (sucesso) {
          resolve("Promise: Dados carregados com sucesso.\n");
        } else {
          reject("Erro ao carregar os dados.");
        }
      }, 2000);
    });
  }

  buscarDados()
    .then(resultado => console.log(resultado))
    .catch(erro => console.error(erro));

  // 3. Async/Await
  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function executar() {
    console.log("Async/Await:");
    console.log("Esperando 2 segundos...");
    await esperar(2000);
    console.log("Pronto!\n");
  }

  executar();

  // 4. Fetch API com Async/Await
  async function buscarUsuario() {
    try {
      console.log("API com Fetch:");
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const usuario = await resposta.json();
      console.log(usuario);
    } catch (erro) {
      console.error("Erro ao buscar usuário:", erro);
    }
  }

  buscarUsuario();