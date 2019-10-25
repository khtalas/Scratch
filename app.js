function app() {
    // Tyhjät listat aluksi
    const todoItems = [], doneItems = [];
    
    // Asioiden lisääminen listaan
    const newItemForm = document.getElementById('newItem');
    newItemForm.onsubmit = function (event) {
        // Ei ladata sivua uudestaan kun lomake lähetetään
        event.preventDefault();
        const itemTextInput = event.target.querySelector('input');
        const itemText = itemTextInput.value;
        todoItems.push(itemText);
        updateTodoItems();
        toggleDoneButton();
        itemTextInput.value = '';
    };

    // Listan asioiden valitseminen ja poisto
    const todoItemsForm = document.getElementById('todoItems');
    todoItemsForm.onsubmit = function (event) {
        // Ei ladata sivua uudestaan kun lomake lähetetään
        event.preventDefault();
        const itemTextSelect = event.target.querySelector('select');
        const removedItem = parseInt(itemTextSelect.value.split('_')[1]);
        doneItems.push(todoItems[removedItem]);
        todoItems.splice(removedItem, 1);
        updateTodoItems();
        updateDoneItems();
        toggleDoneButton();
    };
    toggleDoneButton();

    // Saa poistaa vain, jos listassa on asioita
    function toggleDoneButton() {
        const btn = todoItemsForm.querySelector("button");
        btn.disabled = todoItems.length === 0;
    }

    // Päivitetään tehtävien asioiden lista
    function updateTodoItems() {
        const todoItemList = document.getElementById('todoItemList');
        todoItemList.innerHTML = '';
        for (let i = 0; i < todoItems.length; i++) {
            let option = document.createElement('option');
            let textNode = document.createTextNode(todoItems[i]);
            option.appendChild(textNode);
            option.value = `v_${i}`;
            todoItemList.appendChild(option);
        }
    }

    // Päivitetään tehtyjen asioiden lista
    function updateDoneItems() {
        const doneItemsList = document.querySelector('#doneItems ul');
        doneItemsList.innerHTML = '';
        for (let i = 0; i < doneItems.length; i++) {
            let option = document.createElement('li');
            let textNode = document.createTextNode(doneItems[i]);
            option.appendChild(textNode);
            doneItemsList.appendChild(option);
        }
    }
}

// Suoritetaan Javascript-koodi vasta kun koko ikkuna on latautunut
window.onload = app;
