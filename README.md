# EnqueteDev - Sistema de Enquetes em Tempo Real

Sistema de enquetes com atualização em tempo real usando WebSocket (Pusher) e autenticação.

## 🚀 Funcionalidades

- ✅ Criar enquetes com múltiplas opções
- ✅ Votação em tempo real (WebSocket)
- ✅ Resultados ao vivo com barras de progresso
- ✅ autenticação (Google + Credentials)
- ✅ Dashboard para gerenciar suas enquetes
- ✅ Encerrar/Deletar enquetes
- ✅ Visualização de resultados após encerramento

## 🛠️ Tecnologias

- **Frontend:** Next.js 16, React, Tailwind CSS
- **Backend:** Next.js API Routes, NextAuth.js
- **Banco de dados:** Prisma, SQLite (dev) / PostgreSQL (prod)
- **Real-time:** Pusher
- **Validação:** Zod


## 📁 Estrutura

```
src/
├── app/
│   ├── api/          # Rotas da API
│   ├── dashboard/    # Página do dashboard
│   ├── poll/        # Páginas de votação
│   └── (auth)/      # Páginas de auth
├── components/      # Componentes UI
├── hooks/          # Hooks React
└── lib/             # Configurações (auth, prisma, pusher)
```

## 📝 Licença

MIT
