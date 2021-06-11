$(document).ready(function() {
    $("#cursoselected").change(function(){
        var selectOption = $("#cursoselected option:selected").val();

        console.log(selectOption)
    });
});
