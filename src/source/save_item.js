// const { app } = require("electron");

import { notification_option } from './Enums.js'

const inp_name = document.getElementById("inp_name");
const field_category = document.getElementById("field_category");
const field_state = document.getElementById("field_state");

const btn_departamentMenu = document.querySelectorAll(".btn_departamentMenu");
const btn_categoryMenu = document.querySelectorAll(".btn_categoryMenu");
const btn_estadoMenu = document.querySelectorAll(".btn_estadoMenu");

const btn_save = document.getElementById("btn_save");

const save_article = article => {
    const articles = app.getArticles();
    
    articles.push(article);
    app.save_articles(articles, notification_option.save);
}

btn_departamentMenu.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const field = e.path[0].innerText;
        field_departament.innerText = field;
    })
});

btn_categoryMenu.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const field = e.path[0].innerText;
        field_category.innerText = field;
    })
});

btn_estadoMenu.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const field = e.path[0].innerText;
        field_state.innerText = field;
    })
});

$("#btn_clear").click(e => {
    e.preventDefault();

    $("input").val("");
    $("textarea").val("");
    $("#field_state").text("Selecciona el estado");
    // $("#field_departament").text("Selecciona un Departamento");
    $("#field_category").text("Seleccionar lo Solicitado");
})

btn_save.addEventListener('click', e => {
    e.preventDefault();

    let today = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + today.getDate()).slice(-2);

    // current month
    let month = ("0" + (today.getMonth() + 1)).slice(-2);

    // current year
    let year = today.getFullYear();

    // current hours
    let hours = today.getHours();

    // current minutes
    let minutes = today.getMinutes();

    // current seconds
    let seconds = today.getSeconds();

    const formatDate = date + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

    const article = {
        name: inp_name.value,
        category: field_category.innerText,
        marca: document.getElementById("inp_marca").value,
        model: document.getElementById("inp_model").value,
        // amount: document.getElementById("inp_amount").value,
        serial: document.getElementById("inp_serial").value,
        // view: document.getElementById("inp_view").value,
        lastDate: formatDate, //document.getElementById("inp_date").value,
        state: field_state.innerText,
        takeof: "falta",
        dateof: "falta"
    }

    save_article(article);
    window.location.reload();
})