# 🥊 **RamMuay**  

![Logo](/public/readme/RamMuay_banner.png) <!-- Substitua # pelo caminho do banner da sua logo -->
![Logo](/public/readme/Capa.png) <!-- Substitua # pelo caminho do banner da sua logo -->

Uma plataforma para a visibilidade de lutadores de Muay Thai.  

---

## 📜 **Justificativa**  
A RamMuay foi idealizada por mim, Gabriel de Lima Dutra, ao perceber um problema enfrentado por muitos lutadores enquanto eu treinava Muay Thai. Entre os desafios relatados, destacam-se:  
- 🚫 **Falta de patrocínio**: Muitos lutadores não possuem uma maneira fácil de divulgar seu trabalho ou atrair patrocinadores.  
- 🏆 **Acesso limitado a eventos**: Lutadores frequentemente são excluídos de eventos por não fazerem parte de academias renomadas.  

Essas dificuldades prejudicam a carreira de atletas talentosos, limitando suas oportunidades de crescimento e reconhecimento no esporte.  

---

## 🎯 **Objetivo**  
A RamMuay tem como objetivo ser uma central de apoio para lutadores de Muay Thai, oferecendo ferramentas que:  
- 🌟 Aumentem a **visibilidade** dos lutadores para patrocinadores, academias e organizadores de eventos.  
- 🗂️ Facilitem o **cadastro e participação em eventos**, democratizando o acesso para atletas de todos os níveis.  
- 💬 Forneçam um espaço de **interação e engajamento** por meio de fóruns e desafios entre lutadores.  

---

## 📝 **Sobre o Projeto**  
Este projeto é o meu Trabalho de Conclusão de Curso (TCC), e me sinto muito feliz em compartilhar esta versão da plataforma que foi submetida e aprovada pela banca.  

![Capa do TCC](#) <!-- Substitua # pelo caminho da imagem da capa do TCC -->

Apesar de ter cumprido todas as funcionalidades propostas, acredito firmemente na frase de Paul Leary:  
> “Não existe tal coisa como um programa finalizado; sempre há algo mais a adicionar, corrigir ou melhorar.”  

### 📸 Foto da Banca  
![Foto da Banca](#) <!-- Substitua # pelo caminho da imagem da banca -->

Caso queira acessar a parte escrita do meu trabalho, basta clicar [aqui](#) (substituir o link pelo real).  

---

## 🚀 **Funcionalidades Principais**  
![Demonstração Funcionalidades](#) <!-- Substitua # pelo caminho da imagem demonstrativa das funcionalidades -->

- 📋 Fórum para discussões sobre Muay Thai.  
- 🎴 Sistema de desafios entre lutadores.  
- 📆 Cadastro e gerenciamento de eventos.  
- 🔒 Autenticação e gerenciamento de usuários.  

---

## 🏗️ **Arquitetura da Aplicação**  
A plataforma RamMuay foi construída com a seguinte arquitetura:  
![Arquitetura da Aplicação](#) <!-- Substitua # pelo caminho da imagem da arquitetura -->

- **Front-end**:  
  - Cascading Style Sheets (CSS) em conjunto com o framework Tailwind CSS.  
- **Back-end**:  
  - Node.js com a biblioteca Express.  
  - Banco de dados relacional MySQL para armazenamento das informações.  

---

## 📊 **Modelo da Aplicação**  
Abaixo está uma ilustração que demonstra o funcionamento do modelo da aplicação:  
![Modelo da Aplicação](#) <!-- Substitua # pelo caminho da imagem do modelo da aplicação -->

O modelo considera três tipos principais de usuários:  
1. **Lutador (Usuário Comum):**  
   - Pode cadastrar-se, realizar login e atualizar suas informações pessoais.  
   - Possui acesso limitado às funcionalidades da plataforma.  
   - Pode criar e responder publicações no fórum, visualizar eventos e desafiar outros lutadores.  
2. **Mestre:**  
   - Possui todas as permissões do lutador.  
   - Pode criar eventos de luta, que ficam visíveis para todos os usuários da plataforma.  
3. **Administrador:**  
   - Pode visualizar todos os conteúdos postados.  
   - Possui permissão para apagar qualquer conteúdo na plataforma.  

---

## 📜 **Casos de Uso**  
Os casos de uso principais da plataforma são ilustrados na imagem abaixo:  
![Casos de Uso](#) <!-- Substitua # pelo caminho da imagem dos casos de uso -->

1. **Lutador:**  
   - Visualizar eventos.  
   - Participar do fórum criando tópicos e respondendo publicações.  
   - Desafiar outros lutadores e gerenciar seus desafios.  
2. **Mestre:**  
   - Criar eventos.  
   - Gerenciar interações no fórum e desafios.  
3. **Administrador:**  
   - Monitorar e gerenciar todos os conteúdos da plataforma.  

---

## 📐 **Diagrama ER**  
Abaixo está o diagrama de Entidade-Relacionamento (ER) que ilustra o banco de dados utilizado pela plataforma:  
![Diagrama ER](#) <!-- Substitua # pelo caminho do diagrama ER -->

As tabelas principais incluem:  
- **Tb_Evento:** Armazena dados de eventos, como nome, descrição, preço de ingresso e local.  
- **Tb_Usuario:** Gerencia os usuários da plataforma, com informações como nome, e-mail e tipo de usuário (Lutador, Mestre ou Administrador).  
- **Tb_Postagem:** Contém as postagens feitas no fórum, incluindo descrições e imagens.  
- **Tb_Topico:** Representa os tópicos criados no fórum, vinculados às postagens.  
- **Tb_Categoria:** Organiza os lutadores por categoria de peso.  
- **Tb_Comentario:** Gerencia os comentários feitos nas postagens.  
- **Tb_Desafio:** Contém informações sobre desafios entre lutadores.  

---

## 🛠️ **Tecnologias Utilizadas**  
- **Back-end**: Node.js, Express, Sequelize (ORM).  
- **Banco de Dados**: MySQL.  
- **Front-end**: EJS e Tailwind CSS.  

---

## 🥋 **Sobre o Nome "RamMuay"**  
O nome da plataforma é inspirado na tradicional dança ritual Ram Muay, realizada pelos lutadores de Muay Thai antes das lutas. Ele reflete a essência e a cultura do esporte.  

---

## 🤝 **Contribuições**  
Sinta-se à vontade para sugerir melhorias, relatar problemas ou contribuir com novas funcionalidades.  

**Vamos juntos fortalecer a comunidade do Muay Thai!** 🥊🔥  
