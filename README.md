# Testes de Performance da API do banco com Grafana K6

Testes de performance da API do banco, escritos em JavaScript e executados com [K6](https://k6.io/).

## 📌 Introdução

Este repositório reúne os testes de performance (carga, estresse, pico, etc.) desenvolvidos para validar o comportamento da API de banco sob diferentes volumes de requisições. Os scripts medem tempo de resposta, taxa de erros e vazão (throughput), com **thresholds** que definem os critérios de aceitação de cada cenário.

O projeto foi organizado de forma modular, separando os cenários de teste, os dados de entrada e as funções reutilizáveis, para facilitar a manutenção e a evolução dos testes.

## 🛠️ Tecnologias utilizadas

| Tecnologia                   | Uso no projeto                              |
| ---------------------------- | ------------------------------------------- |
| [Grafana K6](https://k6.io/) | Ferramenta de testes de performance e carga |
| JavaScript (ES6)             | Linguagem utilizada na escrita dos scripts  |
| Git / GitHub                 | Versionamento e hospedagem do código        |

## 📁 Estrutura do repositório

```
banco-api-performance/
├── fixtures/     # Dados de entrada
├── helpers/      # Funções auxiliares reutilizáveis nos testes
├── tests/        # Scripts de teste de performance (cenários K6)
├── utils/        # Utilitários gerais (configurações, variáveis de ambiente)
├── .gitignore
└── README.md
```

## 🎯 Objetivo de cada grupo de arquivos

### `tests/`
Contém os scripts de teste executados pelo K6. Cada arquivo representa um cenário de performance, com suas opções de execução (`options`), como estágios de carga, número de usuários virtuais (VUs), duração e thresholds.

### `fixtures/`
Armazena os dados estáticos usados pelos testes, como massas de dados, payloads e credenciais de teste. Mantê-los separados dos scripts permite alterar os dados sem mexer na lógica dos cenários.

### `helpers/`
Reúne funções reutilizáveis que encapsulam ações comuns da API, como autenticação, chamadas a endpoints e validações (`check`), evitando repetição de código entre os cenários.

### `utils/`
Concentra utilitários de apoio ao projeto, como configurações globais, leitura de variáveis de ambiente (ex.: URL base da API).

## ⚙️ Modo de instalação

### Pré-requisitos

- [Git](https://git-scm.com/)
- [K6](https://grafana.com/docs/k6/latest/set-up/install-k6/) instalado na máquina

> Os scripts são executados diretamente pelo K6, portanto **não é necessário** instalar dependências com `npm` para rodar os testes.> 

### Clonando o repositório

```bash
git clone https://github.com/lucasscaratti/banco-api-performance.git
cd banco-api-performance
```

## ▶️ Modo de execução

### Variável de ambiente obrigatória: `BASEURL`

Os testes dependem da variável de ambiente `BASEURL`, que define a URL base da API que será testada. Ela **precisa ser informada em toda execução** do K6, por meio da flag `-e`:

```bash
-e BASEURL=http://localhost:3000
```

Dentro dos scripts, o valor é lido com `__ENV.BASEURL`.

> ⚠️ Sem a `BASEURL`, as requisições serão enviadas por padrão para http://localhost:3000

### Execução simples

Execute um cenário informando o caminho do script e a `BASEURL`:

```bash
k6 run -e BASEURL=http://localhost:3000 tests/nome-do-teste.test.js
```

### Execução com acompanhamento em tempo real e exportação do relatório

O K6 possui um **web dashboard** nativo, que permite acompanhar as métricas em tempo real pelo navegador e exportar o relatório ao final da execução. Ele é habilitado por meio de variáveis de ambiente do próprio K6:

- `K6_WEB_DASHBOARD=true`: ativa o dashboard em tempo real (por padrão, em `http://localhost:5665`).
- `K6_WEB_DASHBOARD_EXPORT=html-report.html`: exporta o relatório em HTML ao término do teste.

**Windows (PowerShell):**
```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="html-report.html"; k6 run -e BASEURL=http://localhost:3000 tests/nome-do-teste.test.js
```

**Windows (CMD):**
```cmd
set K6_WEB_DASHBOARD=true && set K6_WEB_DASHBOARD_EXPORT=html-report.html && k6 run -e BASEURL=http://localhost:3000 tests/nome-do-teste.test.js
```

Com o teste em execução, abra [http://localhost:5665](http://localhost:5665) no navegador para acompanhar o relatório em tempo real. Ao final, o arquivo `html-report.html` será gerado na raiz do projeto e poderá ser aberto em qualquer navegador.

> 💡 O dashboard web está disponível a partir do K6 v0.49.0. Caso use uma versão anterior, atualize o K6.

---

Desenvolvido por [Lucas Scaratti](https://github.com/lucasscaratti)
