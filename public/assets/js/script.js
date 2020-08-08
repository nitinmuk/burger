$(document).ready(() => {
    $(document).on("click", ".burger-submit-btn", (event) => {
        event.preventDefault();
        const newBurger = {
            burger_name: $("#burger-name").val().trim(),
            devoured: 0
        };
        $.ajax("/burgers", {
            type: "POST",
            data: newBurger
        }).then(() => location.reload())
            .catch(error => console.log(error));
    });

    $(document).on("click", ".devour-button", (event) => {
        const id = $(event.target).data("id");
        const newDevourState = {
            devoured: 1
        };
        $.ajax(`/burgers/${id}`, {
            type: "PUT",
            data: newDevourState
        }).then(() => location.reload())
            .catch(error => console.log(error));
    });

});