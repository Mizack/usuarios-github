function fazerGet(url){
    var httpreq = new XMLHttpRequest(); 
    httpreq.open("GET",url,false);
    httpreq.send(null);
    return httpreq.responseText; 
                    
}
// acessar api para encontrar login dos usuários; coletar o login e acrescenta-lo como argumento na segunda API; adicionar os links da api em uma lista e retorna-los
function gerarUrlUser(){
    let dado = fazerGet("https://api.github.com/orgs/aws/members")
    let usuarios = JSON.parse(dado)
    let lista = []
    usuarios.forEach(element => {
        user = element.login
        api = 'https://api.github.com/users/'+user
        lista.push(api)
    });
    return lista
}
// coletar os links da função 'gerarUrlUser' e fazer separações
function acessarDadosSegundaApi(){
    let listaApi = gerarUrlUser()
    let lista = []
    listaApi.forEach(element => {
        let dado = fazerGet(element)
        let usuarios = JSON.parse(dado)
        lista.push(usuarios)
    });
    
    return lista
}
// verificar se um item é nulo
function conteudo(parametro){
    if (parametro == null){
        return "Null"
    }else{
        return parametro
    }
}
// gerar elementos html com os itens requisitados
function gerarTags(usuario){
    // criando elementos necessários
    let linha = document.createElement("div")

    let login = document.createElement("div")
    let nome = document.createElement("div")
    let divAvatar = document.createElement("div")
    let avatar = document.createElement("div")
    let imagem = document.createElement("img")
    let bio = document.createElement("div")
    let email = document.createElement("div")
    let divRestante = document.createElement("div")
    let container = document.createElement("div")

    // adicionando login e classe
    login.setAttribute('id','login')
    nome.setAttribute('id','nome')
    bio.setAttribute('id','bio')
    email.setAttribute('id','email')
    avatar.setAttribute('id','avatar')
    divAvatar.setAttribute('id','divAvatar')
    divRestante.setAttribute('id','divRestante')
    container.setAttribute('id','container')

    login.setAttribute("class","teste")
    nome.setAttribute("class","teste")
    bio.setAttribute("class","teste")
    email.setAttribute("class","teste")

    // inserindo conteúdo extraído nos elementos
    login.innerHTML = conteudo(usuario.login)
    nome.innerHTML =  conteudo(usuario.name) 
    bio.innerHTML = conteudo(usuario.bio)
    email.innerHTML = conteudo(usuario.email)
    imagem.src = conteudo(usuario.avatar_url)

    // aninhando divs
    divRestante.appendChild(login)
    divRestante.appendChild(nome)
    divRestante.appendChild(email)
    divRestante.appendChild(bio)
    avatar.appendChild(imagem)
    divAvatar.appendChild(avatar)
    container.appendChild(divAvatar)
    container.appendChild(divRestante)
    linha.appendChild(container)

    return linha
}

// acessar dados separados e apresenta-los
function separarDadosUsuarios(id_tabela){
    let lista = acessarDadosSegundaApi()
    let principal = document.getElementById(id_tabela)
    // console.log(lista[0].login)
    lista.forEach(element => {
        // console.log(element.login+'\t'+element.bio)
        let linha = gerarTags(element)
        principal.appendChild(linha)
    });
}

separarDadosUsuarios("principal")