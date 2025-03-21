# CNAB MarinAPI  

## 📌 Descrição  
O **CNAB MarinAPI** é uma API desenvolvida para processar arquivos CNAB, armazenar transações em um banco de dados e calcular o saldo de cada loja. A API valida e organiza os dados extraídos, garantindo que lojas duplicadas não sejam criadas e consolidando as informações de saldo para cada estabelecimento.  

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


