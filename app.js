
// 3º Passo - Criando uma classe que vai receber via construtor os dados de uma despesa cadastrada
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    // 5º Passo - Vamos melhorar criando uma funação que lidar com a questão de validação.
    // function  para  validar se os campos estão chegando valores ou não
    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor() {
        let Id = localStorage.getItem('id')

        if (Id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1

    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuparTodosRegistros() {

        // array de despesas
        let despesas = Array()
        let id = localStorage.getItem('id')

        // // recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {

            // recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // existe a possibilidade de haver índices que foram pulados ou removidos
            // nesste caso nos vamos pular esses indices
            if (despesa === null) {
                continue
            }
            // step final para deletar com base no id
            despesa.id = i
            despesas.push(despesa)
        }
        return (despesas)

    }

    pesquisar(despesa) {

        // localStorage.getItem()
        let despesasFiltradas = Array()

        // 3º passo -  Vamos fazer um filtro agora usando o Array Filter, 
        // mais vamos usar o metedo recuperarTodosOsRegistro, e aqui fazemos uma tratativa
        despesasFiltradas = this.recuparTodosRegistros()

        console.log(despesa)

        console.log(despesasFiltradas)


        // 4º Passo - vamos aplicar o filtro para 

        // ano
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano === despesa.ano)
        }
        // mes
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes === despesa.mes)
        }
        // dia
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia === despesa.dia)
        }
        // tipo
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo === despesa.tipo)
        }
        // descricao
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao === despesa.descricao)
        }
        // valor
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor === despesa.valor)
        }

        // vamos devolver para quem faz a chamada do metedo
        return despesasFiltradas
    }

    removerRegistro(id){
        localStorage.removeItem(id)
    }

}

let db = new Bd()


// 1º Passo - um Criando uma função que é  acionada no click do button
const cadastrarDespesa = () => {

    // 2º Passo - criando variavel que vai receber os elemeneto que vamos acessar pelo DOM.
    // Acessando os atributos html pelo ID
    const ano = document.getElementById('ano')
    const mes = document.getElementById('mes')
    const dia = document.getElementById('dia')
    const tipo = document.getElementById('tipo')
    const descricao = document.getElementById('descricao')
    const valor = document.getElementById('valor')

    // Recuperando os valores de cada atributo html

    // console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    // 4º Passo - Vamos fazer uma referência da classe Despesa passando os valores do formulário
    // Instância da classe despesa
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    if (despesa.validarDados()) {

        db.gravar(despesa)

        // fazendo reuso de codigo do modal deixando mais dinâmico
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-successs'

        // dialog de sucesso
        $('#modalRegistroDespesa').modal('show')

        // 6º Passo - Vamos fazer a limpeza do formulario
        // Apos o cadastro de uma despesa vamos limpar os campos do formulario
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        // fazendo reuso de codigo do modal deixando mais dinâmico
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foi preenchido corretamente.'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        // dialog de erro
        $('#modalRegistroDespesa').modal('show')
    }
}

const carregaListaDespesas = (despesas = Array(), filtro = false) => {

    if (despesas.length == 0 && filtro == false) {
        despesas = db.recuparTodosRegistros()
    }

    // Selecionando o elemnento tbody da tabela
    const listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''


    // percorrer o array despesas, listando cada despesas de forma dinâmica
    despesas.forEach(function (d) {

        // console.log(d)

        // criando a linha  (tr)
        const row = listaDespesas.insertRow()

        // criar as colunas (td)
        row.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` // d.dia + '/' + d.mes + '/' + d.ano; posso usar concatenando e interpolando

        // ajudar o tipo usando o switch
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break

        }
        row.insertCell(1).innerHTML = d.tipo;
        row.insertCell(2).innerHTML = d.descricao;
        row.insertCell(3).innerHTML = d.valor;

        // final step create button delete  despesa, assim ele vai criar um elementro 
        // button dentro de cada interação do nosso forEach
        let btn = document.createElement('button')

        // vamos add uma classes ao button
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        // step final dentro do recuparTodosRegistros() criando um id apos recupar todos os registro
        btn.id = `id_despesa_${d.id}`

        btn.onclick = function () { //remover a despesa

            //   Vamos recuperar agora o id da despesa para fazer o delete.
            db.removerRegistro(d.id)

            // apos o delete vamos fazer um reload na pagina usando o window
            window.location.reload()
        }
        row.insertCell(4).append(btn)
    })

}
// Gravando uma despesa no LocalStorage

// 7º Vamos criar uma nova função que filtrar uma despesa, e envia para a classe db fazendo uma chamada no objeto.
function pesquisarDespesa() {

    // 1º Passo vamos coletar os valores contido nos campos do formulario

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    // 2º Passo - Vamos passar esse objeto para dentro de uma função dentro de Bd que vai buscar no localStorage

    // Aqui eu faço uma instância da classe e acesso o metedo da classe e passo por paramentro um objeto
    const despesas = db.pesquisar(despesa)


    // 5º Passo - vamos adicionar dentro do tbody da nossa view

    carregaListaDespesas(despesas, true)
}