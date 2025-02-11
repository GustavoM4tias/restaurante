import db from "../db.js";

// Retorna todos os produtos
export const listarProdutos = (req, res) => {
  db.query("SELECT * FROM produtos", (erro, resultados) => {
    if (erro) {
      console.error("[PRODUTO] Erro ao buscar produtos:", erro);
      return res.status(500).json({ msg: "Erro ao buscar produtos" });
    }
    console.log("[PRODUTO] Produtos retornados:", resultados);
    res.json(resultados);
  });
};

// Cria um novo produto
export const criarProduto = (req, res) => {
  const { nome, preco, descricao } = req.body;
  console.log("[PRODUTO] Tentando criar produto:", req.body);
  const sql = "INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)";
  db.query(sql, [nome, preco, descricao], (erro, resultado) => {
    if (erro) {
      console.error("[PRODUTO] Erro ao criar produto:", erro);
      return res.status(500).json({ msg: "Erro ao adicionar produto" });
    }
    console.log("[PRODUTO] Produto adicionado com sucesso:", resultado);
    res.status(201).json({ msg: "Produto adicionado com sucesso!" });
  });
};

// Retorna os detalhes de um produto pelo ID
export const obterProduto = (req, res) => {
  const { id } = req.params;
  console.log("[PRODUTO] Buscando produto com id:", id);
  db.query("SELECT * FROM produtos WHERE id = ?", [id], (erro, resultados) => {
    if (erro) {
      console.error("[PRODUTO] Erro ao buscar produto:", erro);
      return res.status(500).json({ msg: "Erro ao buscar produto" });
    }
    if (resultados.length === 0) {
      console.warn("[PRODUTO] Produto não encontrado com id:", id);
      return res.status(404).json({ msg: "Produto não encontrado" });
    }
    console.log("[PRODUTO] Produto encontrado:", resultados[0]);
    res.json(resultados[0]);
  });
};
