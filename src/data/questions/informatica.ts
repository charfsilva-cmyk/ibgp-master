import type { Question } from "../../types/question";

export const informaticaQuestions: Question[] = [
  {
    id: 201,
    materia: "Informática",
    assunto: "Windows",
    banca: "IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No sistema operacional Windows, qual atalho é utilizado para copiar um arquivo ou texto selecionado?",
    alternativas: ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
    correta: 1,
    explicacao:
      "O atalho Ctrl + C é utilizado para copiar. Ctrl + X recorta, Ctrl + V cola e Ctrl + Z desfaz a última ação.",
  },
  {
    id: 202,
    materia: "Informática",
    assunto: "Windows",
    banca: "IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No Windows, qual atalho abre diretamente o Gerenciador de Tarefas?",
    alternativas: [
      "Ctrl + Alt + T",
      "Ctrl + Shift + Esc",
      "Windows + E",
      "Alt + F4",
    ],
    correta: 1,
    explicacao:
      "Ctrl + Shift + Esc abre diretamente o Gerenciador de Tarefas do Windows.",
  },
  {
    id: 203,
    materia: "Informática",
    assunto: "Internet",
    banca: "IBGP",
    dificuldade: "Fácil",
    pergunta:
      "Qual dos programas abaixo é utilizado para navegar na internet?",
    alternativas: [
      "Microsoft Word",
      "Google Chrome",
      "Microsoft Excel",
      "Paint",
    ],
    correta: 1,
    explicacao:
      "O Google Chrome é um navegador de internet. Word e Excel são aplicativos de escritório, e o Paint é um editor de imagens.",
  },
  {
    id: 204,
    materia: "Informática",
    assunto: "Segurança da Informação",
    banca: "IBGP",
    dificuldade: "Média",
    pergunta:
      "O programa malicioso que bloqueia arquivos ou o computador e exige pagamento para liberação é chamado de:",
    alternativas: ["Firewall", "Ransomware", "Backup", "Navegador"],
    correta: 1,
    explicacao:
      "Ransomware é um tipo de malware que bloqueia ou criptografa dados e exige pagamento para restaurar o acesso.",
  },
  {
    id: 205,
    materia: "Informática",
    assunto: "Segurança da Informação",
    banca: "IBGP",
    dificuldade: "Média",
    pergunta:
      "Uma mensagem falsa enviada para induzir o usuário a informar senhas e dados bancários caracteriza:",
    alternativas: ["Phishing", "Backup", "Compactação", "Atualização"],
    correta: 0,
    explicacao:
      "Phishing é uma técnica de fraude que tenta enganar a vítima para obter senhas, dados bancários ou outras informações pessoais.",
  },
  {
    id: 206,
    materia: "Informática",
    assunto: "Microsoft Word",
    banca: "IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No Microsoft Word em português, qual atalho aplica negrito ao texto selecionado?",
    alternativas: ["Ctrl + N", "Ctrl + B", "Ctrl + I", "Ctrl + S"],
    correta: 0,
    explicacao:
      "Na versão em português do Word, Ctrl + N aplica negrito, Ctrl + I aplica itálico e Ctrl + S aplica sublinhado.",
  },
  {
    id: 207,
    materia: "Informática",
    assunto: "Microsoft Excel",
    banca: "IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No Microsoft Excel, as fórmulas normalmente são iniciadas pelo símbolo:",
    alternativas: ["#", "@", "=", "%"],
    correta: 2,
    explicacao:
      "As fórmulas do Excel são iniciadas pelo sinal de igual (=).",
  },
  {
    id: 208,
    materia: "Informática",
    assunto: "Microsoft Excel",
    banca: "IBGP",
    dificuldade: "Média",
    pergunta:
      "Qual função do Excel é utilizada para somar os valores de várias células?",
    alternativas: ["MÉDIA", "SOMA", "SE", "CONT.SE"],
    correta: 1,
    explicacao:
      "A função SOMA adiciona os valores das células ou intervalos informados.",
  },
  {
    id: 209,
    materia: "Informática",
    assunto: "Armazenamento",
    banca: "IBGP",
    dificuldade: "Fácil",
    pergunta:
      "Qual unidade de medida é maior?",
    alternativas: ["Kilobyte", "Megabyte", "Gigabyte", "Byte"],
    correta: 2,
    explicacao:
      "Entre as opções apresentadas, Gigabyte é a maior unidade.",
  },
  {
    id: 210,
    materia: "Informática",
    assunto: "Correio eletrônico",
    banca: "IBGP",
    dificuldade: "Média",
    pergunta:
      "No envio de e-mails, o campo CCO é utilizado para:",
    alternativas: [
      "Enviar cópia visível a todos",
      "Ocultar os destinatários dos demais destinatários",
      "Anexar arquivos automaticamente",
      "Bloquear o recebimento da mensagem",
    ],
    correta: 1,
    explicacao:
      "CCO significa cópia carbono oculta e permite enviar a mensagem sem revelar os endereços dos destinatários aos demais.",
  },
  {
    id: 211,
    materia: "Informática",
    assunto: "Windows",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No Windows, o atalho Windows + E é utilizado para abrir:",
    alternativas: [
      "O Gerenciador de Tarefas",
      "O Explorador de Arquivos",
      "O menu Executar",
      "As configurações de impressão",
    ],
    correta: 1,
    explicacao:
      "Windows + E abre o Explorador de Arquivos.",
  },
  {
    id: 212,
    materia: "Informática",
    assunto: "Windows",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "Qual atalho do Windows abre a janela Executar?",
    alternativas: [
      "Windows + R",
      "Windows + D",
      "Windows + L",
      "Windows + P",
    ],
    correta: 0,
    explicacao:
      "Windows + R abre a janela Executar, usada para iniciar programas, pastas e comandos.",
  },
  {
    id: 213,
    materia: "Informática",
    assunto: "Windows",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Ao pressionar Shift + Delete sobre um arquivo no Windows, o usuário normalmente:",
    alternativas: [
      "Copia o arquivo",
      "Exclui o arquivo sem enviá-lo para a Lixeira",
      "Renomeia o arquivo",
      "Cria um atalho",
    ],
    correta: 1,
    explicacao:
      "Shift + Delete realiza a exclusão direta, sem enviar o item para a Lixeira.",
  },
  {
    id: 214,
    materia: "Informática",
    assunto: "Windows",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "O atalho Alt + Tab permite:",
    alternativas: [
      "Alternar entre janelas abertas",
      "Fechar o Windows",
      "Abrir o Explorador de Arquivos",
      "Bloquear o computador",
    ],
    correta: 0,
    explicacao:
      "Alt + Tab permite alternar entre os aplicativos e janelas que estão abertos.",
  },
  {
    id: 215,
    materia: "Informática",
    assunto: "Windows",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "No Windows, uma pasta pode conter:",
    alternativas: [
      "Somente arquivos de texto",
      "Arquivos e outras pastas",
      "Somente imagens",
      "Apenas atalhos",
    ],
    correta: 1,
    explicacao:
      "Uma pasta pode armazenar arquivos de diferentes tipos e também outras pastas, chamadas subpastas.",
  },
  {
    id: 216,
    materia: "Informática",
    assunto: "Microsoft Word",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No Microsoft Word, o alinhamento que deixa o texto ajustado às margens esquerda e direita é denominado:",
    alternativas: [
      "Centralizado",
      "Justificado",
      "Alinhado à esquerda",
      "Alinhado à direita",
    ],
    correta: 1,
    explicacao:
      "O alinhamento justificado distribui o texto entre as margens esquerda e direita.",
  },
  {
    id: 217,
    materia: "Informática",
    assunto: "Microsoft Word",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "O recurso do Word que permite corrigir automaticamente determinados erros de digitação é chamado de:",
    alternativas: [
      "AutoCorreção",
      "Mala Direta",
      "Controle de Alterações",
      "Quebra de Página",
    ],
    correta: 0,
    explicacao:
      "A AutoCorreção pode substituir automaticamente erros comuns e textos previamente configurados.",
  },
  {
    id: 218,
    materia: "Informática",
    assunto: "Microsoft Word",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "No Word, cabeçalho e rodapé são áreas localizadas:",
    alternativas: [
      "Nas margens superior e inferior das páginas",
      "Somente na primeira linha do documento",
      "Exclusivamente dentro das tabelas",
      "Apenas na área de comentários",
    ],
    correta: 0,
    explicacao:
      "Cabeçalhos aparecem na parte superior e rodapés na parte inferior das páginas.",
  },
  {
    id: 219,
    materia: "Informática",
    assunto: "Microsoft Excel",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No Excel, o encontro de uma linha com uma coluna recebe o nome de:",
    alternativas: [
      "Planilha",
      "Célula",
      "Pasta de trabalho",
      "Intervalo",
    ],
    correta: 1,
    explicacao:
      "A célula é formada pela interseção de uma linha com uma coluna.",
  },
  {
    id: 220,
    materia: "Informática",
    assunto: "Microsoft Excel",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "A referência A1, no Excel, identifica:",
    alternativas: [
      "A coluna 1 e a linha A",
      "A coluna A e a linha 1",
      "A primeira planilha da pasta",
      "Um arquivo externo",
    ],
    correta: 1,
    explicacao:
      "Nas referências de células, a letra indica a coluna e o número indica a linha.",
  },
  {
    id: 221,
    materia: "Informática",
    assunto: "Microsoft Excel",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Qual fórmula calcula a média dos valores existentes entre as células A1 e A5?",
    alternativas: [
      "=SOMA(A1:A5)",
      "=MÉDIA(A1:A5)",
      "=CONT.SE(A1:A5)",
      "=SE(A1:A5)",
    ],
    correta: 1,
    explicacao:
      "A função MÉDIA calcula a média aritmética dos valores contidos no intervalo informado.",
  },
  {
    id: 222,
    materia: "Informática",
    assunto: "Microsoft Excel",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Difícil",
    pergunta:
      "Na referência absoluta $A$1, os sinais de cifrão indicam que:",
    alternativas: [
      "A coluna e a linha permanecem fixas ao copiar a fórmula",
      "A fórmula possui erro",
      "A célula contém moeda",
      "A coluna e a linha serão alteradas automaticamente",
    ],
    correta: 0,
    explicacao:
      "A referência absoluta fixa tanto a coluna quanto a linha durante a cópia da fórmula.",
  },
  {
    id: 223,
    materia: "Informática",
    assunto: "Microsoft PowerPoint",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "No PowerPoint, cada página individual de uma apresentação é denominada:",
    alternativas: [
      "Planilha",
      "Slide",
      "Célula",
      "Documento",
    ],
    correta: 1,
    explicacao:
      "As páginas que compõem uma apresentação do PowerPoint são chamadas de slides.",
  },
  {
    id: 224,
    materia: "Informática",
    assunto: "Microsoft PowerPoint",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "No PowerPoint, uma transição é um efeito aplicado:",
    alternativas: [
      "Na passagem de um slide para outro",
      "Apenas às palavras do título",
      "Somente às imagens",
      "Exclusivamente ao plano de fundo",
    ],
    correta: 0,
    explicacao:
      "Transições são efeitos visuais exibidos durante a mudança entre slides.",
  },
  {
    id: 225,
    materia: "Informática",
    assunto: "Internet",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "A sigla URL representa:",
    alternativas: [
      "O endereço de um recurso na internet",
      "Um tipo de antivírus",
      "Um dispositivo de armazenamento",
      "Uma linguagem exclusiva do Excel",
    ],
    correta: 0,
    explicacao:
      "URL é o endereço usado para localizar páginas e outros recursos na internet.",
  },
  {
    id: 226,
    materia: "Informática",
    assunto: "Internet",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "O protocolo HTTPS indica que a comunicação entre navegador e site:",
    alternativas: [
      "Utiliza mecanismos de criptografia",
      "Não possui qualquer proteção",
      "Funciona somente sem internet",
      "Não permite envio de dados",
    ],
    correta: 0,
    explicacao:
      "O HTTPS protege a comunicação utilizando criptografia e certificados digitais.",
  },
  {
    id: 227,
    materia: "Informática",
    assunto: "Navegadores",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "Nos navegadores, os favoritos são utilizados para:",
    alternativas: [
      "Guardar atalhos para páginas da internet",
      "Eliminar permanentemente o histórico",
      "Bloquear todos os anúncios",
      "Instalar o sistema operacional",
    ],
    correta: 0,
    explicacao:
      "Os favoritos permitem salvar endereços de páginas para acesso posterior.",
  },
  {
    id: 228,
    materia: "Informática",
    assunto: "Segurança da Informação",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Um firewall tem como função principal:",
    alternativas: [
      "Controlar e filtrar comunicações de rede",
      "Criar cópias de segurança automaticamente em qualquer situação",
      "Editar documentos de texto",
      "Compactar arquivos",
    ],
    correta: 0,
    explicacao:
      "O firewall controla o tráfego de rede conforme regras de segurança, permitindo ou bloqueando conexões.",
  },
  {
    id: 229,
    materia: "Informática",
    assunto: "Backup",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "A principal finalidade de um backup é:",
    alternativas: [
      "Permitir a recuperação de dados em caso de perda",
      "Aumentar obrigatoriamente a velocidade do computador",
      "Eliminar a necessidade de antivírus",
      "Substituir a senha do usuário",
    ],
    correta: 0,
    explicacao:
      "Backup é uma cópia de segurança utilizada para recuperar dados perdidos, apagados ou danificados.",
  },
  {
    id: 230,
    materia: "Informática",
    assunto: "Computação em nuvem",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "O armazenamento em nuvem permite:",
    alternativas: [
      "Guardar dados em servidores acessíveis pela internet",
      "Armazenar arquivos somente na memória RAM",
      "Usar arquivos apenas quando o computador estiver desligado",
      "Eliminar completamente a necessidade de autenticação",
    ],
    correta: 0,
    explicacao:
      "Serviços de nuvem armazenam dados em servidores remotos, permitindo acesso pela internet conforme as permissões do usuário.",
  },
];