import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { jwtSecret, saltRounds } from "../config.js";

// Função auxiliar para extrair o token, removendo o prefixo "Bearer " se presente
const extractToken = (header) => {
  if (!header) return null;
  return header.startsWith("Bearer ") ? header.slice(7).trim() : header;
};

export const cadastrarUsuario = (req, res) => {
  const { nome, email, senha, tipo_usuario } = req.body;
  console.log("[REGISTER] Tentando cadastrar usuário:", email);

  // Validação básica dos campos obrigatórios
  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: "Nome, email e senha são obrigatórios" });
  }

  // Verifica se o email já está cadastrado
  db.query("SELECT id FROM usuarios WHERE email = ?", [email], (erro, resultados) => {
    if (erro) {
      console.error("[REGISTER] Erro ao verificar existência do usuário:", erro);
      return res.status(500).json({ msg: "Erro interno" });
    }
    if (resultados.length > 0) {
      console.warn("[REGISTER] Email já cadastrado:", email);
      return res.status(409).json({ msg: "Email já cadastrado" });
    }

    // Por padrão, o tipo_usuario será "user"
    let novoTipo = "user";

    // Se o body enviar um tipo_usuario e houver token, tenta verificar se o usuário logado é admin
    if (tipo_usuario) {
      const tokenHeader = req.header("Authorization");
      const token = extractToken(tokenHeader);
      if (token) {
        try {
          const decoded = jwt.verify(token, jwtSecret);
          // Apenas admin pode definir tipo_usuarios diferentes
          if (decoded.tipo_usuario === "admin") {
            novoTipo = tipo_usuario;
          } else {
            console.warn("[REGISTER] Usuário não autorizado para definir tipo_usuario:", tipo_usuario);
          }
        } catch (err) {
          console.error("[REGISTER] Erro ao verificar token para tipo_usuario:", err);
          // Se houver erro na verificação do token, mantém o tipo_usuario padrão
        }
      }
    }

    // Criptografa a senha antes de salvar
    bcrypt.hash(senha, saltRounds, (err, hash) => {
      if (err) {
        console.error("[REGISTER] Erro ao criptografar senha para", email, ":", err);
        return res.status(500).json({ msg: "Erro ao criptografar senha" });
      }

      const sql = "INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)";
      db.query(sql, [nome, email, hash, novoTipo], (erro, results) => {
        if (erro) {
          console.error("[REGISTER] Erro ao cadastrar usuário", email, ":", erro);
          return res.status(500).json({ msg: "Erro ao cadastrar usuário" });
        }
        console.log("[REGISTER] Usuário cadastrado com sucesso:", results);
        res.status(201).json({ msg: "Usuário cadastrado com sucesso!", tipo_usuario: novoTipo });
      });
    });
  });
};

export const login = (req, res) => {
  const { email, senha } = req.body;
  console.log("[LOGIN] Tentando login para:", email);

  // Validação dos campos de login
  if (!email || !senha) {
    return res.status(400).json({ msg: "Email e senha são obrigatórios" });
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (erro, resultados) => {
    if (erro) {
      console.error("[LOGIN] Erro ao buscar usuário:", erro);
      return res.status(500).json({ msg: "Erro interno" });
    }
    if (resultados.length === 0) {
      console.warn("[LOGIN] Usuário não encontrado para o email:", email);
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const usuario = resultados[0];
    bcrypt.compare(senha, usuario.senha, (err, resultado) => {
      if (err) {
        console.error("[LOGIN] Erro ao comparar senha para", email, ":", err);
        return res.status(500).json({ msg: "Erro interno" });
      }
      if (!resultado) {
        console.warn("[LOGIN] Senha inválida para:", email);
        return res.status(401).json({ msg: "Credenciais inválidas" });
      }

      // Gera o token incluindo o id e o tipo_usuario do usuário
      const tokenPayload = { id: usuario.id, tipo_usuario: usuario.tipo_usuario };
      const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "14d" });
      console.log("[LOGIN] Usuário logado com sucesso:", email);
      res.json({ token, tipo_usuario: usuario.tipo_usuario });
    });
  });
};

export const obterConta = (req, res) => {
  // O middleware de autenticação já adicionou req.usuario com o ID do usuário
  const userId = req.usuario.id;
  console.log("[USUARIO] Buscando dados da conta para o usuário com id:", userId);

  // Consulta apenas os campos necessários, sem a senha
  const sql = "SELECT id, nome, email, tipo_usuario, tema FROM usuarios WHERE id = ?";
  db.query(sql, [userId], (erro, resultados) => {
    if (erro) {
      console.error("[USUARIO] Erro ao buscar dados da conta:", erro);
      return res.status(500).json({ msg: "Erro ao buscar dados da conta" });
    }
    if (resultados.length === 0) {
      console.warn("[USUARIO] Conta não encontrada para o id:", userId);
      return res.status(404).json({ msg: "Conta não encontrada" });
    }
    console.log("[USUARIO] Dados da conta encontrados:", resultados[0]);
    res.json(resultados[0]);
  });
};
 
export const editarConta = (req, res) => {
  const userId = req.usuario.id; // Obtido via middleware de autenticação
  const { nome, email, senha, tema } = req.body;

  // Cria arrays para armazenar os campos a serem atualizados e seus valores
  const campos = [];
  const valores = [];

  if (nome) {
    campos.push("nome = ?");
    valores.push(nome);
  }

  if (email) {
    campos.push("email = ?");
    valores.push(email);
  }

  if (tema !== undefined && tema !== null) {
    campos.push("tema = ?");
    valores.push(tema);
  }  

  // Se a senha for informada, precisamos criptografá-la antes
  if (senha) {
    // Caso esteja atualizando a senha, faz o hash e prossegue com o update
    return bcrypt.hash(senha, saltRounds, (err, hash) => {
      if (err) {
        console.error("[EDIT] Erro ao criptografar senha:", err);
        return res.status(500).json({ msg: "Erro interno" });
      }
      campos.push("senha = ?");
      valores.push(hash);

      // Monta a query de update e adiciona atualizado_em explicitamente (apesar de já ser automático)
      const sql = `UPDATE usuarios SET ${campos.join(", ")}, atualizado_em = CURRENT_TIMESTAMP WHERE id = ?`;
      valores.push(userId);

      db.query(sql, valores, (erro, resultados) => {
        if (erro) {
          console.error("[EDIT] Erro ao atualizar conta:", erro);
          return res.status(500).json({ msg: "Erro ao atualizar conta" });
        }
        console.log("[EDIT] Conta atualizada com sucesso para o id:", userId);
        res.json({ msg: "Conta atualizada com sucesso" });
      });
    });
  }

  // Se nenhum campo for enviado para atualização
  if (campos.length === 0) {
    return res.status(400).json({ msg: "Nenhum dado para atualizar" });
  }

  // Monta a query de update (caso não esteja atualizando a senha)
  const sql = `UPDATE usuarios SET ${campos.join(", ")}, atualizado_em = CURRENT_TIMESTAMP WHERE id = ?`;
  valores.push(userId);

  db.query(sql, valores, (erro, resultados) => {
    if (erro) {
      console.error("[EDIT] Erro ao atualizar conta:", erro);
      return res.status(500).json({ msg: "Erro ao atualizar conta" });
    }
    console.log("[EDIT] Conta atualizada com sucesso para o id:", userId);
    res.json({ msg: "Conta atualizada com sucesso" });
  });
};