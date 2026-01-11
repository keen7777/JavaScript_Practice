const todo_list = [];
console.log("JS loaded", document.querySelector('.js-todo-list'));


// this function is to generating the html

function renderTodoList() {
    let todo_list_html = '';
    // for each
    todo_list.forEach((todo_object, index) => {
        const html_todo = `
        <div> ${todo_object.name} </div>
        <div> ${todo_object.dueDate} </div>
        <button class="delete-todo-btn" data-index="${index}" >Delete</button> 
        `;
        todo_list_html = todo_list_html + html_todo;
    });

    // console.log(todo_list_html);
    document.querySelector('.js-todo-list').innerHTML = todo_list_html;
}

/*
function renderTodoList() {
    let html = '';

    todo_list.forEach((todo, index) => {
        html += `
        <div class="todo-gird">
            <div class="todo-name">${todo.name}</div>
            <div class="todo-date">${todo.dueDate}</div>
            <button class="delete-todo-btn" data-index="${index}">Delete</button>
        </div>
        `;
    });

    document.querySelector('.js-todo-list').innerHTML = html;
}
*/



function addTodo() {
    const input_name = document.querySelector('.js-name-input');
    const todo_name = input_name.value;

    const input_due_date = document.querySelector('.js-due-date-input');
    const todo_due_date = input_due_date.value;
    // empty input do not add!
    if (todo_name != '') {
        todo_list.push({
            name: todo_name,
            dueDate: todo_due_date
        }
        );
        // console.log(todo_list);
    }
    // clear the input field
    input_name.value = '';
    input_due_date.value = '';
    renderTodoList();
}

function deleteTodo(idx) {
    todo_list.splice(idx, 1);
    renderTodoList();
    // console.log(todo_list);
}


document.body.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    // only for buttons.
    if (!button) {
        return;
    }

    const id = button.id;

    if (id === 'add-todo-btn') {
        addTodo();
        // put render inside addTodo functions
        // renderTodoList();
    }

    if (button.classList.contains('delete-todo-btn')) {
        const idx = Number(button.dataset.index);
        deleteTodo(idx);
    }
});

// use enter to submit new todo item.
document.querySelector('.js-name-input')
    .addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTodo();
    });