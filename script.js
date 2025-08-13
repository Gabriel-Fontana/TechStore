// === Dados iniciais ===
const produtos = [
  {
    id: 1,
    nome: "iPhone 15 Pro",
    categoria: "smartphones",
    preco: 7999,
    precoOriginal: 8999,
    desconto: 11,
    imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    descricao: "Smartphone Apple com câmera avançada"
  },
  {
    id: 2,
    nome: "MacBook Air M2",
    categoria: "laptops",
    preco: 8999,
    precoOriginal: 10999,
    desconto: 18,
    imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    descricao: "Notebook Apple ultrafino e potente"
  },
  {
    id: 3,
    nome: "AirPods Pro",
    categoria: "headphones",
    preco: 1899,
    precoOriginal: 2299,
    desconto: 17,
    imagem: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
    descricao: "Fones sem fio com cancelamento de ruído"
  },
  {
    id: 4,
    nome: "Samsung Galaxy S24",
    categoria: "smartphones",
    preco: 5499,
    precoOriginal: 6299,
    desconto: 13,
    imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
    descricao: "Smartphone Samsung com tela AMOLED"
  },
  {
    id: 5,
    nome: "Apple Watch Series 9",
    categoria: "smartwatch",
    preco: 3299,
    precoOriginal: 3799,
    desconto: 13,
    imagem: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400",
    descricao: "Relógio inteligente com monitoramento"
  },
  {
    id: 6,
    nome: "Teclado Mecânico",
    categoria: "accessories",
    preco: 499,
    precoOriginal: null,
    desconto: null,
    imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    descricao: "Teclado mecânico RGB para gamers"
  },
  {
    id: 7,
    nome: "Sony WH-1000XM5",
    categoria: "headphones",
    preco: 2499,
    precoOriginal: 2999,
    desconto: 17,
    imagem: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    descricao: "Fone com cancelamento de ruído"
  },
  {
    id: 8,
    nome: "Dell XPS 13",
    categoria: "laptops",
    preco: 7999,
    precoOriginal: null,
    desconto: null,
    imagem: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
    descricao: "Notebook Windows premium"
  }
];

// === Elementos DOM principais ===
const containerProdutos = document.querySelector(".products-container");
const btnCategorias = document.querySelectorAll(".category-btn");
const inputBusca = document.querySelector(".search-input");

// Criar modal de carrinho
const modalCarrinho = document.createElement("div");
modalCarrinho.id = "modal-carrinho";
modalCarrinho.style.cssText = `
  position: fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.5);
  display: none; justify-content: center; align-items: center;
  z-index: 1000;
`;
modalCarrinho.innerHTML = `
  <div style="
    background:#fff; padding: 1rem; width: 90%; max-width: 500px; max-height: 80vh;
    overflow-y: auto; border-radius: 8px; position: relative;
  ">
    <button id="fechar-carrinho" style="
      position: absolute; top: 8px; right: 8px; cursor: pointer;
      font-size: 1.5rem; border:none; background:none;">&times;</button>
    <h2>Carrinho de Compras</h2>
    <div id="itens-carrinho"></div>
    <div style="margin-top: 1rem; font-weight: bold;">
      Total: R$ <span id="total-carrinho">0.00</span>
    </div>
    <div style="margin-top: 1rem;">
      <label><input type="radio" name="forma-pagamento" value="Cartão" checked /> Cartão de Crédito</label><br/>
      <label><input type="radio" name="forma-pagamento" value="Boleto" /> Boleto Bancário</label><br/>
      <label><input type="radio" name="forma-pagamento" value="PIX" /> PIX</label>
    </div>
    <div style="margin-top:1rem; font-weight: 600;">
      Forma de Pagamento Selecionada: <span id="pagamento-selecionado">Cartão de Crédito</span>
    </div>
  </div>
`;
document.body.appendChild(modalCarrinho);

// === Estado do carrinho ===
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Função para salvar carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para mostrar produtos na tela
function mostrarProdutos(listaProdutos) {
  let htmlprodutos = "";
  listaProdutos.forEach(produto => {
    htmlprodutos += `
      <div class="products-card" data-id="${produto.id}">
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <div class="products-info">
          <h3 class="products-name">${produto.nome}</h3>
          <p class="products-description">${produto.descricao}</p>
          <p class="products-price">R$ ${produto.preco.toLocaleString('pt-BR')}</p>
          <button class="btn-adicionar" data-id="${produto.id}">Adicionar ao Carrinho</button>
        </div>
      </div>
    `;
  });
  containerProdutos.innerHTML = htmlprodutos;

  // Adiciona eventos para os botões "Adicionar ao Carrinho"
  const botoesAdd = document.querySelectorAll(".btn-adicionar");
  botoesAdd.forEach(botao => {
    botao.addEventListener("click", () => {
      const idProduto = parseInt(botao.dataset.id);
      adicionarAoCarrinho(idProduto);
    });
  });
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(idProduto) {
  const produtoExistente = carrinho.find(item => item.id === idProduto);
  if (produtoExistente) {
    produtoExistente.quantidade++;
  } else {
    const produto = produtos.find(p => p.id === idProduto);
    carrinho.push({ ...produto, quantidade: 1 });
  }
  salvarCarrinho();
  alert("Produto adicionado ao carrinho!");
  atualizarResumoCarrinho();
  atualizarContadorCarrinho();
}

// Função para atualizar resumo do carrinho e mostrar modal
function atualizarResumoCarrinho() {
  const itensCarrinhoContainer = document.getElementById("itens-carrinho");
  const totalCarrinhoSpan = document.getElementById("total-carrinho");
  const pagamentoSelecionadoSpan = document.getElementById("pagamento-selecionado");

  if (!itensCarrinhoContainer || !totalCarrinhoSpan) return;

  if (carrinho.length === 0) {
    itensCarrinhoContainer.innerHTML = "<p>Carrinho vazio.</p>";
    totalCarrinhoSpan.textContent = "0.00";
    return;
  }

  let htmlItens = "";
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    htmlItens += `
      <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 10px;">
        <div>
          <strong>${item.nome}</strong><br />
          R$ ${item.preco.toLocaleString('pt-BR')} x 
          <input type="number" min="1" value="${item.quantidade}" data-id="${item.id}" class="input-quantidade" style="width: 50px;" />
          = R$ ${subtotal.toLocaleString('pt-BR')}
        </div>
        <button data-id="${item.id}" class="btn-remover" style="background:#FF4111; border:none; color:#fff; border-radius: 5px; cursor:pointer; padding: 4px 8px;">Remover</button>
      </div>
    `;
  });

  itensCarrinhoContainer.innerHTML = htmlItens;
  totalCarrinhoSpan.textContent = total.toLocaleString('pt-BR');

  // Atualiza forma de pagamento selecionada no resumo
  const formaPagamento = document.querySelector('input[name="forma-pagamento"]:checked');
  if (formaPagamento) {
    pagamentoSelecionadoSpan.textContent = formaPagamento.value;
  }

  // Adiciona evento para remover item
  document.querySelectorAll(".btn-remover").forEach(botao => {
    botao.addEventListener("click", () => {
      const id = parseInt(botao.dataset.id);
      removerDoCarrinho(id);
    });
  });

  // Evento para alterar quantidade
  document.querySelectorAll(".input-quantidade").forEach(input => {
    input.addEventListener("change", e => {
      const novaQtde = parseInt(e.target.value);
      const id = parseInt(e.target.dataset.id);
      if (novaQtde < 1) {
        e.target.value = 1;
        return;
      }
      alterarQuantidade(id, novaQtde);
    });
  });

  // Evento mudança na forma de pagamento
  document.querySelectorAll('input[name="forma-pagamento"]').forEach(radio => {
    radio.addEventListener("change", () => {
      pagamentoSelecionadoSpan.textContent = document.querySelector('input[name="forma-pagamento"]:checked').value;
    });
  });
}

// Função remover produto do carrinho
function removerDoCarrinho(idProduto) {
  carrinho = carrinho.filter(item => item.id !== idProduto);
  salvarCarrinho();
  atualizarResumoCarrinho();
  atualizarContadorCarrinho();
}

// Alterar quantidade no carrinho
function alterarQuantidade(idProduto, novaQtde) {
  const item = carrinho.find(i => i.id === idProduto);
  if (item) {
    item.quantidade = novaQtde;
    salvarCarrinho();
    atualizarResumoCarrinho();
    atualizarContadorCarrinho();
  }
}

// Mostrar modal carrinho
function mostrarModalCarrinho() {
  modalCarrinho.style.display = "flex";
  atualizarResumoCarrinho();
}

// Fechar modal carrinho
document.getElementById("fechar-carrinho").addEventListener("click", () => {
  modalCarrinho.style.display = "none";
});

// Criar botão carrinho no header
const btnAbrirCarrinho = document.createElement("button");
btnAbrirCarrinho.id = "btn-carrinho-header";
btnAbrirCarrinho.textContent = "Carrinho (0)";
btnAbrirCarrinho.style.cssText = `
  position: fixed; top: 1rem; right: 1rem; background: var(--primary-color); color: white;
  border:none; padding: 0.7rem 1rem; border-radius: 6px; cursor:pointer; z-index: 1000;
`;
document.body.appendChild(btnAbrirCarrinho);

btnAbrirCarrinho.addEventListener("click", () => {
  mostrarModalCarrinho();
});

// Atualiza o número de itens no botão do header
function atualizarContadorCarrinho() {
  const totalQtde = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  btnAbrirCarrinho.textContent = `Carrinho (${totalQtde})`;
}

// === Filtro por categoria ===
btnCategorias.forEach(botao => {
  botao.addEventListener("click", () => {
    const categoria = botao.dataset.category;
    if (categoria === "all") {
      mostrarProdutos(produtos);
    } else {
      const filtrados = produtos.filter(p => p.categoria === categoria);
      mostrarProdutos(filtrados);
    }
  });
});

// === Busca de produtos ===
inputBusca.addEventListener("input", () => {
  const textoBusca = inputBusca.value.trim().toLowerCase();

  if (textoBusca === "") {
    mostrarProdutos(produtos); // mostra todos se busca vazia
  } else {
    const produtosFiltrados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(textoBusca) ||
      produto.descricao.toLowerCase().includes(textoBusca)
    );
    mostrarProdutos(produtosFiltrados);
  }
});

// === Login Simulado ===

// Criar modal login
const modalLogin = document.createElement("div");
modalLogin.id = "modal-login";
modalLogin.style.cssText = `
  position: fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.5);
  display: none; justify-content: center; align-items: center;
  z-index: 1001;
`;
modalLogin.innerHTML = `
  <div style="
    background:#fff; padding: 2rem; border-radius: 10px; width: 90%; max-width: 400px; position: relative;
  ">
    <button id="fechar-login" style="
      position: absolute; top: 10px; right: 10px; border:none; background:none; font-size: 1.5rem; cursor:pointer;
    ">&times;</button>
    <h2>Login / Criar Conta</h2>
    <form id="form-login">
      <label for="login-usuario">Usuário</label><br/>
      <input type="text" id="login-usuario" required style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;" /><br/>
      <label for="login-senha">Senha</label><br/>
      <input type="password" id="login-senha" required style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;" /><br/>
      <button type="submit" style="
        background: var(--primary-color); color: white; border:none; padding: 0.7rem 1rem; cursor:pointer; border-radius: 5px;
      ">Entrar</button>
    </form>
    <button id="btn-criar-conta" style="
      margin-top: 1rem; background: var(--accent-color); color: white; border:none; padding: 0.7rem 1rem; cursor:pointer; border-radius: 5px;
    ">Criar Conta</button>
    <p id="msg-login" style="color:red; margin-top: 1rem;"></p>
  </div>
`;
document.body.appendChild(modalLogin);

// Abrir modal login ao clicar no logo (exemplo)
document.querySelector(".logo").addEventListener("click", () => {
  modalLogin.style.display = "flex";
});

// Fechar modal login
document.getElementById("fechar-login").addEventListener("click", () => {
  modalLogin.style.display = "none";
  document.getElementById("msg-login").textContent = "";
});

// Array simples de usuários simulados
const usuarios = [
  { usuario: "admin", senha: "123456" }
];

// Submeter formulário login
document.getElementById("form-login").addEventListener("submit", (e) => {
  e.preventDefault();
  const usuarioInput = document.getElementById("login-usuario").value.trim();
  const senhaInput = document.getElementById("login-senha").value;

  const usuarioEncontrado = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInput);

  if (usuarioEncontrado) {
    alert("Login efetuado com sucesso!");
    modalLogin.style.display = "none";
    document.getElementById("msg-login").textContent = "";
  } else {
    document.getElementById("msg-login").textContent = "Usuário ou senha inválidos.";
  }
});

// Criar conta simulada (apenas adiciona no array)
document.getElementById("btn-criar-conta").addEventListener("click", () => {
  const usuarioInput = prompt("Digite o nome de usuário:");
  if (!usuarioInput) return alert("Usuário inválido.");

  const senhaInput = prompt("Digite a senha:");
  if (!senhaInput) return alert("Senha inválida.");

  const existeUsuario = usuarios.find(u => u.usuario === usuarioInput);
  if (existeUsuario) {
    return alert("Usuário já existe.");
  }

  usuarios.push({ usuario: usuarioInput, senha: senhaInput });
  alert("Conta criada com sucesso!");
});

// === Inicialização ===
mostrarProdutos(produtos);
atualizarContadorCarrinho();
