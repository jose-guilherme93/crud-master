# crud-master
the best crud in the world

1. 🔧 Configuração Inicial

        [x] Criar estrutura base com Express

        [x] Configurar dotenv para variáveis de ambiente

        [] Conectar ao Postgree

        [] Criar estrutura de pastas (routes, models, controllers, middleware)

2. 🔐 Autenticação de Usuário
        [] Criar modelo User com username, email, passwordHash
        [] autenticação com google opcional
        [] Implementar rotas:

        [] POST /auth/register

        [x] POST /auth/login

        [x] Gerar JWT
        [] validar JWT

        [] Criar middleware authMiddleware para proteger rotas privadas

3. 📝 Postagens de Jogos
        [] Criar modelo Post com:

        userId, gameId, gameTitle, description, rating, liked, createdAt

        [] Rotas protegidas:

        [] POST /posts → criar avaliação

        [] GET /posts → listar avaliações do usuário

        [] DELETE /posts/:id → remover avaliação

4. 🎮 Integração com API de Jogos
        [] Criar serviço para consumir a API RAWG.io

        [] Implementar rota:

        [] GET /games?search=nome → retorna lista de jogos

        [] Salvar gameId e gameTitle na postagem

5. 👤 Perfil do Usuário
        [] Rota protegida:

        [ ] GET /me → retorna dados do usuário + suas postagens

        [ ] Exibir descrições e notas que ele deu aos jogos

6. 🧪 Testes e Validações
        [] Validar inputs com Joi ou express-validator

        [] Testar rotas com Postman ou Insomnia

        [] Criar mensagens de erro claras

7. 🚀 Deploy (opcional)
        [] Criar arquivo Procfile para Heroku (ou usar Render/Vercel)

        [] Configurar variáveis de ambiente no servidor

        [] Testar endpoints em produção

📚 Documentação da API
Será adicionada após finalização das rotas principais.