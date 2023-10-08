

// o filter atua sobre o Array
let funcionarios = [
    { nome: 'Fernanda', cargo: 'Analista de RH', salario: 3100, status: 'Ativo' },
    { nome: 'Miguel', cargo: 'Assistente ADM', salario: 1700, status: 'inativo' },
    { nome: 'Rosa', cargo: 'Auxiliar de Contabilidade', salario: 1600, status: 'Ativo' },
    { nome: 'Roberto', cargo: 'Programador PHP', salario: 4500, status: 'Ativo' },
    { nome: 'Maria', cargo: 'Engenheira Mecânica', salario: 7500, status: 'inativo' }
]



// aqui vamos receber uma função de callback
funcionarios = funcionarios.filter(f => f.salario < 2000).filter(f => f.status == 'Ativo')

console.log(funcionarios)
