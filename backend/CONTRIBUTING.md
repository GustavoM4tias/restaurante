# Contributing to Eatzy Backend

Obrigado por seu interesse em contribuir para o **Eatzy Backend**! Abaixo estão diretrizes para garantir um fluxo de colaboração eficiente e de alta qualidade.

---

## Como Começar

1. **Fork** este repositório para sua conta GitHub.
2. Crie uma **branch** para sua feature ou correção:

   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Instale** as dependências e rode o ambiente local:

   ```bash
   npm install
   npm run dev
   ```
4. Certifique-se de que todas as **variáveis de ambiente** necessárias estejam definidas em um arquivo `.env`.

---

## Padrões de Commits

Adote o [Conventional Commits](https://www.conventionalcommits.org/) para facilitar o histórico:

* `feat:` Adição de novo recurso
* `fix:` Correção de bug
* `docs:` Mudanças na documentação
* `style:` Formatação de código (sem alterar lógica)
* `refactor:` Refatoração de código
* `test:` Adição ou correção de testes
* `chore:` Atualização de tarefas de build, CI etc.

Exemplo:

```
feat(auth): adicionar login via Google OAuth2
```

---

## Pull Requests

1. Garanta que sua branch esteja atualizada com a `main`:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. Rode **todos** os testes locais:

   ```bash
   npm test
   ```
3. **Abra** um Pull Request direcionado para a branch `main` do repositório original.
4. No PR, descreva:

   * **O que** você está mudando
   * **Por que** essa mudança é necessária
   * **Como** testar manualmente, se aplicável

---

## Código e Estilo

* Utilize **ESLint** e **Prettier** para formatação; rode `npm run lint` antes de commitar.
* Siga os padrões de estilo já existentes no código.
* Escreva código **limpo** e **legível**, com nomes de variáveis claros.

---

## Testes

* Todo bug fix ou feature nova deve ter **cobertura de testes**.
* Use frameworks como **Jest** e simule integrações com o banco usando **SQLite** ou **mocks**.
* Execute:

  ```bash
  npm run test:watch
  ```

---

## GitHub Actions

* Para cada PR, o CI irá rodar lint, testes e build. Aguarde o CI passar antes de solicitar revisão.
* Mantenha PRs pequenos e focadas para facilitar a revisão.

---

## Contato

Se precisar de ajuda, abra uma **issue** descrevendo o problema ou fale com o time no canal #backend.

Obrigado por tornar o Eatzy melhor! 🎉
