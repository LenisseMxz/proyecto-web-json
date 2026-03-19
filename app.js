function mostrarComentarios(postId) {
    let divCommentsUsuario = document.getElementById(`comment${postId}`);

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(res => res.json())
        .then(comments => {
            comments.forEach(comment => {
                divCommentsUsuario.innerHTML += `<div class="card">
                                                    <div class="card-header">${comment.email}</div>
                                                    <div class="card-body">
                                                        <h6 class="card-title">${comment.name}</h6>
                                                        <p class="card-text">${comment.body}</p>
                                                    </div>
                                                </div>`;
            })
        })
}
function ocultarComentarios(postId) {
    let divCommentsUsuario = document.getElementById(`comment${postId}`);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(res => res.json())
        .then(comments => {
            divCommentsUsuario.innerHTML = "";
        })
}

function agregarComentario(postId) {
    let divCommentFormulario = document.getElementById(`form${postId}`);
    let divCommentsUsuario = document.getElementById(`comment${postId}`);

    divCommentFormulario.innerHTML = `<form id="form-comment">
                                            <div class="mb-3">
                                                <label for="input-name" class="form-label">Nombre</label>
                                                <input type="text" class="form-control" id="input-name">
                                            </div>
                                            <div class="mb-3">
                                                <label for="input-email" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="input-email">
                                            </div>
                                            <div class="mb-3">
                                                <label class="input-body" for="exampleCheck1">Cuerpo</label>
                                                <input type="text" class="form-control" id="input-body">
                                            </div>
                                            <button type="submit" class="btn btn-primary" id="submit">Enviar</button>
                                        </form>`;

    let formCommment = document.getElementById("form-comment");

    formCommment.addEventListener("submit", () => {

        event.preventDefault();

        let name = document.getElementById("input-name").value;
        let email = document.getElementById("input-email").value;
        let body = document.getElementById("input-body").value;

        fetch(`https://jsonplaceholder.typicode.com/comments`, {
            method: 'POST',
            body: JSON.stringify({
                postId: `${postId}`,
                name: `${name}`,
                email: `${email}`,
                body: `${body}`
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            divCommentsUsuario.innerHTML += `<div class="card">
                                                <div class="card-header">${data.email}</div>
                                                <div class="card-body">
                                                <h6 class="card-title">${data.name}</h6>
                                                <p class="card-text">${data.body}</p>
                                                </div>
                                            </div>`;
        })
        divCommentFormulario.innerHTML = "";
    })
}

window.mostrarComentarios = mostrarComentarios;
window.ocultarComentarios = ocultarComentarios;
window.agregarComentario = agregarComentario;

const btnCargar = document.getElementById("btnCargar");
const slcUsuarios = document.getElementById("slc-usuarios");
const divPostsUsuarios = document.getElementById("div-posts-usuarios");
btnCargar.addEventListener("click", () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(usuarios => {
            usuarios.forEach(usuario => {
                slcUsuarios.innerHTML += `<option id="${usuario.id}" value="${usuario.id}">${usuario.name}</option>`;
            })
        })
})

slcUsuarios.addEventListener("change", () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${slcUsuarios.value}`)
        .then(res => res.json())
        .then(posts => {
            posts.forEach(post => {
                divPostsUsuarios.innerHTML += `<div class="card text-bg-light mb-3" style="max-width: 18rem;">
                                                        <div class="card-body">
                                                            <h5 class="card-title">${post.title}</h5>
                                                            <p class="card-text">${post.body}</p>
                                                            <button type="button" class="btn btn-info" onclick="mostrarComentarios(${post.id})">Ver comentarios</button>
                                                            <button type="button" class="btn btn-info" onclick="ocultarComentarios(${post.id})">Ocultar comentarios</button>
                                                            <button type="button" class="btn btn-info" onclick="agregarComentario(${post.id})">Agregar comentario</button>
                                                            <div id="form${post.id}"></div>
                                                            <div id="comment${post.id}"></div>
                                                        </div>
                                                </div>`;
            })
        })
})