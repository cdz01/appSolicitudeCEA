import { getData, DataLocalStorage as dls, keys_article } from './Enums.js'

const table_articles = document.querySelector("table");
const articles = app.getArticles();

const inp_mDepartament = document.querySelector("#inp_mDepartament");

/* FUNCIONALIDADES */

function mClickDelete() {

    function handle_delete() {
        const selected = JSON.parse(localStorage.getItem("article_selected"));
        app.delete_one_article(selected.serial);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    document.querySelector(".btn-warning").addEventListener('click', () => handle_delete());
}

function mClickTakeof() {
    $("#btn_takeof").click(e => {
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
        console.log(formatDate)

        $("#field_takeof strong").text("Entregado");
        $("#field_takeof").attr("style", "background: #45db00");
        const article = getData(dls.article_selected);
        article.takeof = "entregado";
        article.dateof = formatDate;
        localStorage.setItem(dls.article_selected, JSON.stringify(article));
    });
}

function mClickUpdate() {

    const btn_update = document.querySelector("#btn_update");

    function extractFromDataToModalForm() {
        const local_data = getData(dls.article_selected);

        $("#inp_name").val(local_data[keys_article.departament]);
        $(`#inp_mCategory option[value="${local_data[keys_article.category]}"]`).attr("selected", true)
        $(`#inp_mState option[value="${local_data[keys_article.state]}"]`).attr("selected", true)
        $("#inp_marca").val(local_data[keys_article.marca]);
        $("#inp_model").val(local_data[keys_article.model]);
        $("#inp_amount").val(local_data[keys_article.amount]);
        $("#inp_serial").val(local_data[keys_article.serial]);
        $("#inp_view").val(local_data[keys_article.view]);
        $("#inp_lastDate").val(local_data[keys_article.lastDate]);
        if (local_data.takeof === "entregado") {
            $("#field_takeof strong").text("Entregado");
            $("#field_takeof").attr("style", "background: #45db00");
        }
        // $("#inp_state").val(local_data[keys_article.state]);
    }

    function update_file() {

        const data = {
            name: $("#inp_name").val(),
            category: $("#inp_mCategory").val(),
            marca: $("#inp_marca").val(),
            model: $("#inp_model").val(),
            // amount: $("#inp_amount").val(),
            serial: $("#inp_serial").val(),
            // view: $("#inp_view").val(),
            lastDate: $("#inp_lastDate").val(),
            state: $("#inp_mState").val(),
            takeof: getData(dls.article_selected).takeof,
            dateof: getData(dls.article_selected).dateof
        }
        console.log(data);

        const find = articles.filter(art => art.serial !== getData(dls.article_selected).serial);
        find.push(data);

        app.save_articles(find, 's');

    }

    $(".btn-success").click(() => {
        $("#form_update").toggle(500);
        extractFromDataToModalForm();
    })

    document.querySelector("form").addEventListener('submit', e => {
        e.preventDefault();

        update_file(getData(dls.article_selected));

        setTimeout(() => {
            window.location.reload();
        }, 500);
    })

}

/* ENCARGADO DE REALIZAR LOS FILTROS */
function filter_browse() {
    const inp_browse = document.querySelector("#inp_browse");

    function handle_browse(e) {
        const strBrowse = inp_browse.value.toLowerCase();
        const find = articles.filter(art =>
            art.name.toLowerCase() === strBrowse
            || art.category.toLowerCase() === strBrowse
            || art.marca.toLowerCase() === strBrowse
            || art.model.toLowerCase() === strBrowse
            // || art.amount.toLowerCase() === strBrowse
            || art.serial.toLowerCase() === strBrowse
            // || art.view.toLowerCase() === strBrowse
            || art.lastDate.toLowerCase() === strBrowse
            || art.state.toLowerCase() === strBrowse
            || art.takeof.toLowerCase() === strBrowse)

        if (find) {
            clear_table();
            show_articles(find);
        }
        console.log(find);

        if (inp_browse.value === '') {
            show_articles();
        }

    }

    inp_browse.addEventListener('keyup', (e) => handle_browse(e));
}

/* * * * * * * * *  */

function clear_table() {
    // document.querySelector("table").removeChild(document.querySelector("tbody"));
    $("table tbody tr").remove();
}

function show_articles(_arts) {

    if (_arts !== undefined) {

        // MOSTRAR ESOS ELEMENTOS
        _arts.forEach((article, idx) => {
            const tr = document.createElement("tr");

            const td_idx = document.createElement("td");
            const td_depart = document.createElement("td");
            const td_category = document.createElement("td");
            const td_marca = document.createElement("td");
            const td_model = document.createElement("td");
            // const td_amount = document.createElement("td");
            const td_serial = document.createElement("td");
            // const td_view = document.createElement("td");
            const td_lastDate = document.createElement("td");
            const td_state = document.createElement("td");
            const td_takeof = document.createElement("td");
            const td_dateof = document.createElement("td");
            // type="button" data-bs-toggle="modal" data-bs-target="#modelId"
            // tr.setAttribute("type", "button")

            // td_amount.setAttribute("class", "text-center");

            tr.setAttribute("data-bs-toggle", "modal")
            tr.setAttribute("data-bs-target", "#modelId")
            tr.addEventListener('click', () => handle_click_row({
                name: article.name,
                category: article.category,
                marca: article.marca,
                model: article.model,
                // amount: article.amount,
                serial: article.serial,
                // view: article.view,
                lastDate: article.lastDate,
                state: article.state,
                takeof: article.takeof,
                dateof: article.dateof
            }));

            td_idx.innerText = idx + 1;
            td_depart.innerText = article.name;
            td_category.innerText = article.category;
            td_marca.innerText = article.marca;
            td_model.innerText = article.model;
            // td_amount.innerText = article.amount;
            td_serial.innerText = article.serial;
            // td_view.innerText = article.view;
            td_lastDate.innerText = article.lastDate;
            td_state.innerText = article.state;
            td_takeof.innerText = article.takeof === "entregado" ? "✔️" : "Falta"
            td_dateof.innerText = article.dateof === undefined ? "Falta": article.dateof;

            tr.append(
                td_idx,
                td_depart,
                td_category,
                td_marca,
                td_model,
                // td_amount,
                td_serial,
                // td_view,
                td_state,
                td_lastDate,
                td_takeof,
                td_dateof
            );

            document.querySelector("tbody").append(tr);
        });

    }

    if (_arts === undefined) {
        // SOLO MOSTRAR LOS ARTICULOS DEL INVENTARIO (todos)
        articles.forEach((article, idx) => {
            const tr = document.createElement("tr");

            const td_idx = document.createElement("td");
            const td_depart = document.createElement("td");
            const td_category = document.createElement("td");
            const td_marca = document.createElement("td");
            const td_model = document.createElement("td");
            // const td_amount = document.createElement("td");
            const td_serial = document.createElement("td");
            // const td_view = document.createElement("td");
            const td_lastDate = document.createElement("td");
            const td_state = document.createElement("td");
            const td_takeof = document.createElement("td");
            const td_dateof = document.createElement("td");

            // td_amount.setAttribute("class", "text-center");

            tr.setAttribute("data-bs-toggle", "modal")
            tr.setAttribute("data-bs-target", "#modelId")
            // tr.addEventListener('click', () => handle_click_row({serial: article.serial}));
            tr.addEventListener('click', () => handle_click_row({
                name: article.name,
                category: article.category,
                marca: article.marca,
                model: article.model,
                // amount: article.amount,
                serial: article.serial,
                // view: article.view,
                lastDate: article.lastDate,
                state: article.state,
                takeof: article.takeof,
                dateof: article.dateof
            }));

            td_idx.innerText = idx + 1;
            td_depart.innerText = article.name;
            td_category.innerText = article.category;
            td_marca.innerText = article.marca;
            td_model.innerText = article.model;
            // td_amount.innerText = article.amount;
            td_serial.innerText = article.serial;
            // td_view.innerText = article.view;
            td_lastDate.innerText = article.lastDate;
            td_state.innerText = article.state;
            td_takeof.innerText = article.takeof === "entregado" ? "✔️" : "Falta"
            td_dateof.innerText = article.dateof;

            tr.append(
                td_idx,
                td_depart,
                td_category,
                td_marca,
                td_model,
                // td_amount,
                td_serial,
                // td_view,
                td_state,
                td_lastDate,
                td_takeof,
                td_dateof
            );

            document.querySelector("tbody").append(tr);
        });

    }


}




/* HANDLE'S */
function handle_click_row(data) {
    /* GUARDA DATA SOBRE EL ARTICULO SELECCIONADO, PARA CUALQUIER USO DESPUES */
    localStorage.setItem("article_selected", JSON.stringify(data));
    document.querySelector("#mbody_serial").innerText = "Serial: " + data.serial;

}




/* LOGIC */

mClickDelete();
mClickUpdate();
mClickTakeof();
filter_browse();
show_articles();