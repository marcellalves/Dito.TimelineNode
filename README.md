# 2 - Manipulação de dados

Para o problema proposto, considerando as condições de escalabilidade e tempo de resposta, optei pela utilização de tecnologias distribuídas rodando dentro de containers do Docker:

- Api: NodeJs
- Banco de dados local: MongoDB, utilizando os recursos de aggregate.

A solução foi pensada como um passo intermediário em uma pipeline de extração / visualização de dados. Ao acessar o endpoint (http://localhost:3000/timeline) da aplicação, é feita uma carga dos dados de origem informados no pdf do desafio (https://storage.googleapis.com/dito-questions/events.json) para uma coleção do MongoDB. Caso a coleção já exista, ela será excluída e criada novamente. Dessa forma, temos uma operação atômica e imutável, que poderia rodar dentro de uma function em uma arquitetura serverless. A manipulação de dados fica a cargo dos recursos de aggregation do MongoDB, para melhor desempenho.

# Arquitetura da solução

![Desenho arquitetural da solução](https://drive.google.com/uc?export=view&id=18nVWj0Pwj4Kbi5JgJLaQ7lvOGjDM5OlA)

# Executando a aplicação

### 1 - Rodar os containers:
No diretório raíz da aplicação, executar o comando:

	docker-compose up --build -d

### 2 - Testar a recuperação dos dados:
Abrir a url  no browser, ou executar um curl:

	curl http://localhost:3000/timeline