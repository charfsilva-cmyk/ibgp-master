# PCMG Master

Plataforma independente de preparação para concursos da Polícia Civil de Minas Gerais, com foco em Investigador e Escrivão.

## Recursos
- Central de Estudos por disciplina
- Banco de questões autorais/inéditas
- Simulados geral, por matéria, modo prova e caderno de erros
- Revisão inteligente
- Estatísticas por matéria
- Favoritos
- Professor Virtual baseado no desempenho
- Perfil com cargo-alvo e meta diária

## Aviso
O PCMG Master é um projeto independente de estudos. Não é um produto oficial e não representa a Polícia Civil de Minas Gerais nem as bancas organizadoras. Questões inéditas da plataforma não devem ser confundidas com questões oficiais.

## Desenvolvimento
`npm install`
`npm run dev`
`npm run build`

## Atualização de outubro de 2026

- Visual grafite e dourado, tema claro e menu para celular.
- Login e cadastro com Supabase Auth; modo local sem conta.
- Sincronização individual do progresso, favoritos, anotações e simulados com políticas RLS.
- Meta diária calculada pelas respostas registradas.
- Roteiro com checklist por cargo, anotações persistentes, flashcards e prática comentada.
- Simulados configuráveis, seleção aleatória, retomada, cronômetro por prazo absoluto e correção comentada.
- Acertar uma questão retira seu erro pendente; histórico de tentativas permanece.
- Estatísticas de sete dias e orientação baseada nos erros pendentes.

### Banco e autenticação

A tabela e as políticas estão em `supabase/migrations/202610060001_student_workspaces.sql` e já foram aplicadas ao projeto PCMG Master. O frontend utiliza somente uma chave publicável. Nenhuma chave de serviço deve ser exposta no código.

Em uma nova conta, o progresso começa vazio. O modo sem conta mantém seus dados no navegador. O cache de uma conta é limpo ao sair. Sincronização é feita após alterações; dados pendentes são preservados no navegador para a mesma conta até reconectar. Alterações simultâneas em aparelhos diferentes podem substituir o último estado salvo.

O cadastro usa confirmação por e-mail. Para abrir cadastro ao público, configure SMTP próprio, Site URL e Redirect URLs no painel do Supabase. O serviço padrão limita entrega de e-mails e pode restringir destinatários. Há uma alternativa para colar o link de confirmação no aplicativo; se o link já foi usado, basta entrar normalmente. Entrega de e-mail e cadastro com usuário real não foram testados nesta atualização.

A orientação é baseada em regras de desempenho; não há chat de IA nem conteúdo jurídico gerado automaticamente. Os resumos reutilizam comentários do banco. A existência de uma matéria não confirma sua cobrança no próximo edital. O banco continua com 275 questões autorais/adaptadas.

### Verificação

`npm ci`, `npm run lint` e `npm run build`. Testes de navegador cobrem roteiro, anotações, flashcards, respostas, troca de questão, simulado e correção, retomada após recarga, caderno de erros, estatísticas, tema e celular. O isolamento entre duas contas foi verificado em transação revertida no banco. A auditoria de segurança do Supabase retornou zero alertas.
