

# 🎮 Jogo "Stop!" - Disco de Letras

Um jogo simples e interativo inspirado no clássico "Stop!", com um disco circular de letras e um timer de 20 segundos.

---

## 🎯 Visão Geral

O jogo consiste em um disco estilizado com:
- **26 letras do alfabeto** dispostas em círculo na borda
- **Botão central** com ícone de mão aberta
- **Timer regressivo** de 20 segundos

---

## 🎨 Design Visual

- **Esquema de cores**: Vermelho e azul, inspirado no jogo original
- **Disco circular**: Camadas concêntricas em vermelho e azul
- **Botões de letras**: Brancos com letras em preto, dispostos na borda do disco
- **Botão central**: Branco com ícone de mão, destaque ao ser pressionado
- **Timer**: Exibido acima do disco em fonte grande e destacada

---

## ⌨️ Controles do Jogo

| Tecla | Ação |
|-------|------|
| **Espaço** | Inicia o jogo / Reinicia o timer para 20s |
| **A-Z** | Ativa a letra correspondente (feedback visual) |
| **ESC** | Para o jogo e esconde o timer |

---

## 🔄 Fluxo do Jogo

1. **Estado Inicial**: Disco visível, timer oculto, aguardando início
2. **Início (Espaço)**: Timer aparece e começa contagem regressiva de 20s
3. **Durante o Jogo**: 
   - Pressionar letras = feedback visual momentâneo
   - Pressionar espaço = reinicia timer para 20s
4. **Tempo Esgotado**: Exibe mensagem "⏰ Tempo esgotado!" e o timer para
5. **Parar (ESC)**: Timer desaparece e jogo volta ao estado inicial

---

## ✨ Feedback Visual das Letras

Quando uma letra é pressionada:
- Animação de "pulse" ou destaque
- Mudança momentânea de cor (ex: fundo fica azul por 200ms)
- Retorna ao estado normal automaticamente

---

## 📱 Responsividade

O disco será responsivo, ajustando seu tamanho para funcionar bem em diferentes telas (desktop e mobile).

