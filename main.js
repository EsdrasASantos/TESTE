
const DATABASE = 'teste';
const ls = localStorage.getItem(DATABASE);

var data = ls ?
    JSON.parse(ls):
    {
    id:0,
    list:[]
}

function render(){
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ''/*limpando registro caso haja */
    data.list.sort((a,b) => a.name <b.name ? -1 : 1).map(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>
            <button class='btn__alt' onclick='editar(${item.id}, "${item.name}")'>Alterar</button>
            <button class='btn__del' onclick='apagar(${item.id})'>Apagar</button>
        </td>
        `
        tbody.appendChild(tr)
    })
}

function adicionar(){/* */
    var value=''
    if(!(value = prompt('Informe o nome',value))) return;
    data.id++;
    data.list.push({
        id:data.id,
        name:value
    })
    render();
    salvar()
}

function editar(id, name){
if(!(name = prompt('Informe o nome',name))) return;
   data.list = data.list.map(item => {
    if(item.id === id)item.name = name;
    return item
    })
    render();
    salvar()
}

function apagar(id){
    if(!confirm('Deseja deletar esse link?')) return;
    data.list = data.list.filter(item => item.id != id)
    render();
    salvar()
}

function salvar(){
    localStorage.setItem(DATABASE, JSON.stringify(data))
}

window.addEventListener('load', e=> {
    render();
})
