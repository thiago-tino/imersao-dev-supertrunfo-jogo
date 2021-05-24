// cartas
const cartas = [
    {
        nome: "Seiya de Pegaso",
        imagem: "./assets/seiya.jpg",
        atributos: {
            ataque: 80,
            defesa: 60,
            magia: 90
        }
    },
    {
        nome: "Bulbasauro",
        imagem: "./assets/bulbasauro.png",
        atributos: {
            ataque: 70,
            defesa: 65,
            magia: 85
        }
    },
    {
        nome: "Lorde Darth Vader",
        imagem: "./assets/vader.jpg",
        atributos: {
            ataque: 88,
            defesa: 62,
            magia: 90
        }
    },
    {
        nome: "Caitlyn",
        imagem: "./assets/caitlyn.jpg",
        atributos: {
            ataque: 95,
            defesa: 40,
            magia: 10
        }
    },
    {
        nome: "Naruto",
        imagem: "./assets/naruto.png",
        atributos: {
            ataque: 80,
            defesa: 60,
            magia: 100
        }
    },
    {
        nome: "Harry Potter",
        imagem: "./assets/potter.jpg",
        atributos: {
            ataque: 70,
            defesa: 50,
            magia: 95
        }
    },
    {
        nome: "Batman",
        imagem: "./assets/batman.png",
        atributos: {
            ataque: 95,
            defesa: 70,
            magia: 0
        }
    },
    {
        nome: "Capitã Marvel",
        imagem: "./assets/capitamarvel.jpg",
        atributos: {
            ataque: 90,
            defesa: 80,
            magia: 0
        }
    }
]

let pontosJogador = 0;
let pontosMaquina = 0;

let cartaJogador
let cartasMaquina

DomInit = {
    atualizaPlacar() {
        
        document.getElementById('placar')
        .innerHTML = `Jogador ${pontosJogador} x ${pontosMaquina} Máquina`
    },

    atualizaQuantidadeDeCartas() {
        
        document.getElementById('quantidade-cartas')
        .innerHTML = `Quantidade de cartas no jogo: ${cartas.length}`
    },

    limpaTela() {
        const limpaCartas = document.getElementById('cartas')

        limpaCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> 
                            <div id="carta-maquina" class="carta"></div>`

        document.getElementById('btnSortear').disabled = false
        document.getElementById('btnJogar').disabled = true
        document.getElementById('btnProximaRodada').disabled = true

        document.getElementById('resultado').innerHTML = ""
    }
}

DOM = {
    exibeCartaJogador() {
        
        const divCartaJogador = document.getElementById("carta-jogador")
        
        const moldura = '<img src="./assets/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
        
        divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
        const nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
        
        let opcoesTexto = ""

        for (let atributo in cartaJogador.atributos) {
            opcoesTexto += `<input type="radio" name="atributo" value="${atributo}">${atributo}: ${cartaJogador.atributos[atributo]}<br>`
        }

        const html = "<div id='opcoes' class='carta-status'>"

        divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
    },

    exibeCartaMaquina() {
        
        const divCartaMaquina = document.getElementById("carta-maquina")
        
        const moldura = '<img src="./assets/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
        
        divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
        const nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
        
        let opcoesTexto = ""

        for (let atributo in cartaMaquina.atributos) {
            opcoesTexto += `<p type="text" name="atributo" value="${atributo}">${atributo}: ${cartaMaquina.atributos[atributo]}</p>`
        }

        const html = "<div id='opcoes' class='carta-status --spacing'>"

        divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
    },

    exibeResultado() {
        const divResultado = document.getElementById("resultado")
        const atributoSelecionado = Event.obtemAtributoSelecionado()

        if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
            htmlResultado = '<p class="resultado-final">OPONENTE DERROTADO!!! :)</p>'
            pontosJogador++
        } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
            htmlResultado = '<p class="resultado-final">Seu oponente é mais forte :/</p>'
            pontosMaquina++
        } else {
            htmlResultado = '<p class="resultado-final">EMPATE! Jogue outra vez!</p>'
        }
        
        divResultado.innerHTML = htmlResultado
    },

    resultadoFinal() {
        Event.obtemAtributoSelecionado()
        
        const divResultado = document.getElementById("resultado")
        
        if (pontosJogador > pontosMaquina) {
            htmlResultado = `<p class="resultado-final">VOCÊ VENCEU!!! o/ Placar: ${pontosJogador} x ${pontosMaquina}</p>`
        } else if (pontosMaquina > pontosJogador) {
            htmlResultado = `<p class="resultado-final">Você perdeu :/ Placar: ${pontosJogador} x ${pontosMaquina}</p>`
        } else {
            htmlResultado = `<p class="resultado-final">Rolou um empate! Placar: ${pontosJogador} x ${pontosMaquina}</p>`
        }

        divResultado.innerHTML = htmlResultado
    }
}

Event = {
    sortearCarta() {
        numeroCartaMaquina = parseInt(Math.random() * cartas.length)
        cartaMaquina = cartas[numeroCartaMaquina]
        cartas.splice(numeroCartaMaquina, 1)

        numeroCartaJogador = parseInt(Math.random() * cartas.length)
        cartaJogador = cartas[numeroCartaJogador]
        DOM.exibeCartaJogador()
        cartas.splice(numeroCartaJogador, 1)

        document.getElementById('btnSortear').disabled = true
        document.getElementById('btnJogar').disabled = false
    },

    obtemAtributoSelecionado() {
        const radioAtributo = document.getElementsByName('atributo')

        for (var i = 0; i < radioAtributo.length; i++) {
            if (radioAtributo[i].checked) {

                return radioAtributo[i].value
            } 
        }
       
        throw new Error("Selecione um atributo!")
    },

    jogar() {
        
        try {
            
            if (cartas.length !== 0){
                
                DOM.exibeResultado()

                document.getElementById('btnJogar').disabled = true
                document.getElementById('btnProximaRodada').disabled = false
                

            } else {

                DOM.exibeResultado()
                DOM.resultadoFinal()

                document.getElementById('btnJogar').disabled = true
                document.getElementById('btnProximaRodada').disabled = false
            }

            DomInit.atualizaPlacar()
            DomInit.atualizaQuantidadeDeCartas()
            DOM.exibeCartaMaquina()

        } catch (error) {
            alert(error.message)
        }
    },

    proximaRodada() {
        
        if (cartas.length !== 0) {

            DomInit.limpaTela()

        } else {

            alert('Suas cartas acabaram! Clique em "Ok" e comece novamente.')
            location.reload();
        }
    }
}

// init
DomInit.atualizaPlacar()
DomInit.atualizaQuantidadeDeCartas()