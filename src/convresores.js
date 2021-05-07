class Conversor {
    
    converter(dados) {
        if(this.camposPublicos.indexOf('*') === -1) {
            dados = this.filtrar(dados)
        }

        if(this.tipoDeConteudo === 'json') {
            return this.json(dados)
        }
    }

    json(dados) {
        return JSON.stringify(dados)
    }

    filtrar(dados) {
        if(Array.isArray(dados)) {
            dados = dados.map((post) => this.filtrarObjeto(post))
        }else {
            dados = this.filtrarObjeto(dados);
        }

        return dados;
    }

    filtrarObjeto(objeto) {
        console.log('############################ ',objeto);
        const objetoFiltrado = {}


        this.camposPublicos.forEach((campo) => {
            if(Reflect.has(objeto, campo)) {
                objetoFiltrado[campo] = objeto[campo];
            }
        })
        return objetoFiltrado
    }
}

class ConversorPost extends Conversor{
    constructor(tipoDeConteudo, camposExtras = []) {
        super();
        this.tipoDeConteudo = tipoDeConteudo;
        this.camposPublicos = ['titulo', 'conteudo'].concat(camposExtras)
    }
}

class ConversorUsuario extends Conversor{
    constructor(tipoDeConteudo, camposExtras = []) {
        super();
        this.tipoDeConteudo = tipoDeConteudo;
        this.camposPublicos = ['nome'].concat(camposExtras)
    }
}

class ConversorErro extends Conversor{
    constructor(tipoDeConteudo) {
        super();
        this.tipoDeConteudo = tipoDeConteudo;
        this.camposPublicos = ['message', 'mensagem']
    }
}


module.exports = {ConversorPost, ConversorUsuario, ConversorErro};