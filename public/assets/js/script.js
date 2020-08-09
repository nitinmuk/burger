$(document).ready(() => {
    $(document).on("click", ".burger-submit-btn", (event) => {
        event.preventDefault();
        const providedBurgerName = $("#burger-name").val().trim();
        if (providedBurgerName && providedBurgerName.length) {
            const newBurger = {
                burger_name: providedBurgerName,
                devoured: 0
            };
            $.ajax("/burgers", {
                type: "POST",
                data: newBurger
            }).then(() => location.reload())
                .catch(error => console.log(error));
        } else {
            $("#burger-status-header").text("Burger Name is Missing");
            $("#burger-status-content").text("Please enter a valid burger name.");
        }
        $(".create-form").trigger("reset");
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