$(document).ready(() => {
    /**
     * registering event handler function so that when user will click
     * submit, an HTTP POST call can be trigerred to save burger name.
     * It also reloads the page to reflect new list of burgers.
     */
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
            $("#burger-modal-status").modal();
        }
    });

    /**
     * registering a event handler for click on devour it button event
     * so that burger devour falg can be updated via an HTTP PUT call
     * and then relaod the page so that burgers appear in correct list.
     */
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