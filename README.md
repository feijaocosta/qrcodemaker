# QR Code Maker - Kingdom Apps

Sistema simples e seguro para geração de QR Codes para links.

## 🚀 Funcionalidades

- ✅ Geração de QR Code para URLs
- ✅ Validação e sanitização de entrada
- ✅ Três tamanhos disponíveis (200x200, 300x300, 400x400)
- ✅ Download de QR Code como PNG
- ✅ Interface responsiva e moderna
- ✅ Sem armazenamento de dados (privacidade garantida)

## 🛡️ Segurança

- **Content Security Policy (CSP)**: Proteção contra XSS
- **Validação de entrada**: Apenas URLs válidas (http/https)
- **Sanitização**: Remoção de caracteres perigosos
- **Sem persistência**: Nenhum dado é armazenado

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com separação clara de domínios:

### Camadas

```
js/
├── domain/           # Lógica de negócio
│   ├── URLValidator.js
│   └── QRCodeService.js
├── infrastructure/   # Dependências externas
│   └── QRCodeGenerator.js
├── presentation/     # Interface do usuário
│   └── UIController.js
└── app.js           # Ponto de entrada
```

### Princípios

- **Domain Layer**: Lógica de negócio pura, sem dependências externas
- **Infrastructure Layer**: Integração com bibliotecas externas (QRCode.js)
- **Presentation Layer**: Controle da interface do usuário

## 🚀 Deploy

O projeto é automaticamente deployado no GitHub Pages através de GitHub Actions.

### CI/CD Pipeline

- **CI**: Validação de código, estrutura e segurança
- **CD**: Deploy automático para GitHub Pages no push para `main`

### Configuração do GitHub Pages

1. Acesse: `Settings` → `Pages`
2. Source: `GitHub Actions`
3. O site estará disponível em: `https://<username>.github.io/qrcodemaker`

## 💻 Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/feijaocosta/qrcodemaker.git
cd qrcodemaker
```

2. Abra o arquivo `index.html` em um navegador ou use um servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve
```

3. Acesse: `http://localhost:8000`

## 📦 Dependências

- **QRCode.js** (v1.5.3): Biblioteca para geração de QR Codes
- **Google Fonts - Inter**: Tipografia moderna

## 🎨 Design

- Design responsivo (mobile-first)
- Paleta de cores moderna (Indigo/Purple)
- Animações suaves
- Acessibilidade (ARIA labels)

## 📝 Como Usar

1. Digite uma URL válida (com http:// ou https://)
2. Escolha o tamanho desejado
3. Clique em "Gerar QR Code"
4. Baixe o QR Code gerado ou gere um novo

## 🔒 Privacidade

- **Nenhum dado é enviado para servidores**: Toda a geração acontece no navegador
- **Sem cookies**: Não utilizamos cookies
- **Sem tracking**: Não há rastreamento de usuários

## 📄 Licença

Este projeto faz parte do bundle **Kingdom Apps**.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📧 Contato

Desenvolvido por Kingdom Apps

---

**Kingdom Apps** - Bundle de aplicações simples e eficientes
