import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { jwtSecret, saltRounds } from "../config.js";

export const cadastrarUsuario = (req, res) => {
  const { nome, email, senha, role } = req.body;
  console.log("[REGISTER] Tentando cadastrar usuário:", email);

  // Por padrão, o role será "user"
  let novoRole = "user";

  // Se o body enviar um role e o request possuir token, verifique se o usuário logado é admin.
  if (role) {
    const token = req.header("Authorization");
    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        // Apenas admin pode definir roles diferentes
        if (decoded.role === "admin") {
          novoRole = role;
        } else {
          console.warn("[REGISTER] Usuário não autorizado para definir role:", role);
        }
      } catch (err) {
        console.error("[REGISTER] Erro ao verificar token para role:", err);
      }
    }
  }

  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) {
      console.error("[REGISTER] Erro ao criptografar senha para", email, ":", err);
      return res.status(500).json({ msg: "Erro ao criptografar senha" });
    }

    const sql = "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, email, hash, novoRole], (erro, results) => {
      if (erro) {
        console.error("[REGISTER] Erro ao cadastrar usuário", email, ":", erro);
        return res.status(500).json({ msg: "Erro ao cadastrar usuário" });
      }
      console.log("[REGISTER] Usuário cadastrado com sucesso:", results);
      res.status(201).json({ msg: "Usuário cadastrado com sucesso!", role: novoRole });
    });
  });
};

export const login = (req, res) => {
  const { email, senha } = req.body;
  console.log("[LOGIN] Tentando login para:", email);

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (erro, resultados) => {
    if (erro) {
      console.error("[LOGIN] Erro ao buscar usuário:", erro);
      return res.status(401).json({ msg: "Credenciais inválidas" });
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

      // Incluímos o role no payload do token
      const tokenPayload = { id: usuario.id, role: usuario.role };
      const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "24h" });
      console.log("[LOGIN] Usuário logado com sucesso:", email);
      res.json({ token, role: usuario.role });
    });
  });
};

export const obterConta = (req, res) => {
  // O middleware de autenticação já adicionou req.usuario com o ID do usuário
  const userId = req.usuario.id;
  console.log("[USUARIO] Buscando dados da conta para o usuário com id:", userId);

  // Consulta apenas os campos necessários, sem a senha
  const sql = "SELECT id, nome, email, role FROM usuarios WHERE id = ?";
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
