# Candidatura para criação de conta

**RF**

- O usuário deve poder se candidatar para começar a ser um arrematante somente após uma análise de perfil;
- O usuário deve poder informar seu nome, sobrenome, data de nascimento, gênero, email e senha;
- O usuário deve poder fazer upload do avatar e dos documentos referentes aos campos de cpf_cnpj e rg;
- O usuário deverá fazer enviar um documento de prolabore da sua empresa para ser usado na análise do perfil;
- O usuário deve receber um email de boas vindas informando que a análise de perfil foi encaminhada;

**RNF**

- Utilizar serviços para consultar o cpf ou cnpj do arrematante;

**RN**

- Uma candidatura só pode ser aprovada após uma análise de crédito e consultas no nome do novo arrematante;

# Gerenciamento de candidaturas e novas contas

**RF**

- O usuário admin deverá poder listar as novas candidaturas;
- O usuário admin deverá poder visualizar os detalhes de uma candidatura;
- O usuário admin deverá poder aprovar ou reprovar uma candidatura;
- O usuário arrematante deverá receber um email com informações do resultado da análise de perfil;

**RNF**

**RN**

# Gerenciamento de produtos e leilões

**RF**

- O usuário admin deve poder cadastrar um produto informando lote, peso por kilo ou tonelada, foto, validade, valor;
- O usuário admin deverá poder listar, editar e deletar um produto;
- O usuário admin deverá poder abrir um novo leilão para um produto pré-cadastrado;
- O usuário admin deverá poder fechar um leilão que está em aberto;

**RNF**

- Os lances deverão entrar em uma fila gerenciàvel, onde ... ;

**RN**

# Recuperação de senha

**RF**

- [x] O usuário deve poder recuperar sua senha informando o seu email;
- [x] O usuário deve receber um email com instruções de recuperação de senha;
- [x] O usuário deve poder resetar sua senha;

**RNF**

- [x] Utilizar Mailtrap/Ethereal para testar envios de ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN**

- [x] O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;
- A senha deverá conter no mínimo letras minúsculas, maiúsculas, números e caracteres especiais;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu username apenas uma vez;
- O usuário só pode atualilzar seu cpf_cnpj ou rg mas havendo um processo de análise dessa alteração;
- [x] O usuário deve poder atualizar seu nome, sobrenome, data de nascimento, gênero, avatar, email e senha;
- [/] O usuário poderá realizar o login e visualizar a situação da análise de criação da conta;

**RN**

- [x] O usuário não pode alterar seu email para um email já utilizado por outro usuário;
- [x] Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do arrematante

**RF**

- O usuário deve poder visualizar os leilões que deu algum lance;
- O usuário deve poder visualizar os leilões que irão acontecer que ele esteja acompanhando;
- O usuário deve receber uma notificação sempre que um leilão estiver prestes a dar início;
- O usuário deve poder visualizar as notificações não lidas;

**RNF**

- Os leilões em acompanhamento e os lances devem ser armazenados em cache;
- As notificações do arrematante devem ser armazenadas no MongoDB;
- As notificações do arrematante devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- a notificação deve ter um status de lida ou não lida para que o arrematante possa controlar;

# Gerenciamento de produtos e lances

**RF**

- O usuário deve poder listar todos os produtos disponíveis para lance;
- O usuário deve poder listar os 2 últimos lances feitos para um produto;
- O usuário deve poder realizar um lance para um produto;
- O usuário deve poder adicionar um leilão para acompanhamento;

**RNF**

- A listagem de produtos deve ser armazenada em cache;

**RN**

- O usuário não pode dar lance em um leilão que está fechado;
- O usuário não pode cancelar os lances que foram dados;
