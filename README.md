# Processador de CNAB

## 📌 Descrição  
O **CNAB MarinAPI** é um sistema desenvolvido para processar arquivos CNAB, armazenar transações em um banco de dados e calcular o saldo de cada loja. A API valida e organiza os dados extraídos, garantindo que lojas duplicadas não sejam criadas e consolidando as informações de saldo para cada estabelecimento.  

## 💻Interface

![Interface Do Sistema](https://i.imgur.com/RtQQlaH.png "Marin CNAB")


## 🚀 Tecnologias Utilizadas  
### Backend:
- **.NET 9** – Framework principal da aplicação  
- **C#** - Linguagem de programação do backend  
- **Entity Framework Core** – ORM para manipulação do banco de dados  
- **SQL Server** – Banco de dados utilizado no desenvolvimento  
- **ASP.NET Core** – Para criação dos endpoints da API  
- **Swagger** – Para documentação dos endpoints  

### Frontend:
- **React** - Framework principal do frontend  
- **TailwindCSS** - Estilização do frontend  
- **TypeScript** - Linguagem de programação do frontend  
- **Vite** - Bundler utilizado no frontend 

### Outros:
- **Docker** - Virtualização tipo contêiner
- **Nginx** - Configuração de proxies

## 🐳 Construir e Rodar o Docker para a API

### Passos para Construir e Executar

1. **Clonar o Repositório**:
Primeiro, a pessoa precisa clonar seu repositório usando o Git. Isso pode ser feito com o seguinte comando:

```sh
git clone https://github.com/caiomoreiradc/CNAB-MarinAPI.git
```

2. **Executar o Docker Compose**:
Com o arquivo `docker-compose.yml` configurado corretamente, você pode iniciar todos os serviços com o seguinte comando:

```sh
docker-compose up -d
```

O parâmetro `-d` executa os contêineres em segundo plano.
4. **Verificar se os Serviços Estão Rodando**:
- **API**: Acesse [http://localhost:5097](http://localhost:5097) para verificar se a API está funcionando.
- **Frontend**: Acesse [http://localhost:3333](http://localhost:3333) para verificar se o frontend está funcionando.
- **SQL Server**: Você pode usar ferramentas como SQL Server Management Studio ou `sqlcmd` para se conectar ao servidor na porta **1433**.
## 📌 Endpoints da API  

### 📂 Upload de Arquivo CNAB  
**Rota:** `POST /api/cnab/upload`  
**Descrição:** Faz o upload de um arquivo CNAB para processamento.  

#### 📌 Exemplo de Requisição
```http
POST /api/cnab/upload
Content-Type: multipart/form-data
```

#### 📌 Parâmetros
| Nome | Tipo | Descrição |
|------|------|-----------|
| file | `file` | Arquivo CNAB a ser processado |

#### 📌 Exemplo de Resposta
```json
{
  "processedCount": 50
}
```

---

### 📂 Listar Todas as Transações  
**Rota:** `GET /api/transacoes`  
**Descrição:** Retorna todas as transações cadastradas no banco de dados.  

#### 📌 Exemplo de Requisição
```http
GET /api/transacoes
```

#### 📌 Exemplo de Resposta
```json
[
  {
    "id": 1,
    "lojaId": 10,
    "loja": {
      "id": 10,
      "nome": "Supermercado ABC",
      "dono": "Carlos Souza",
      "saldo": 1500.75,
      "transacoes": []
    },
    "tipo": "Venda",
    "dataHoraMovimentacao": "2025-03-21T00:12:38.287Z",
    "valor": 200.50,
    "cpf": "12345678901",
    "cartao": "1234-****-****-5678",
    "natureza": "Entrada",
    "sinal": "+"
  }
]
```

---

### 📂 Listar Lojas com Saldo  
**Rota:** `GET /api/lojas/saldo`  
**Descrição:** Retorna todas as lojas com seus respectivos saldos.  

#### 📌 Exemplo de Requisição
```http
GET /api/lojas/saldo
```

#### 📌 Exemplo de Resposta
```json
[
  {
    "nomeLoja": "Supermercado ABC",
    "dono": "Carlos Souza",
    "saldo": 1500.75
  }
]
```
## 📌 Testes  
Para rodar os testes unitários do backend, utilize o comando:
```sh
dotnet test
```

---


