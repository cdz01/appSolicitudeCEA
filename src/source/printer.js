var dir = "";

$("#btn_dialog").click((e) => {
    e.preventDefault();

    dir = app.open_dialog()[0];
    $("#inp_dir").val(dir);
})

$("#btn_save").click((e) => {
    e.preventDefault();
    
    const name = $("#pdf_name").val();

    app.generate_pdf(dir, name);
})