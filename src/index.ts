interface Todo {
    text: string;
    completed: boolean;

}
// Create elements
const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todoitems")!;

//Create an array to save items.
const items: Todo[] = readItems();
items.forEach(createItem);

//Load items form local storage
function readItems(): Todo[] {
    const itemsJSON = localStorage.getItem("items");
    if (itemsJSON === null) return [];
    return JSON.parse(itemsJSON);
}

//save item to local storage
function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}

// create new item
function handleSubmit(e: SubmitEvent) {
    if (input.value == "") {
        window.alert("Please add a item");
    } else if (items.length == 8) {
        window.alert("Maximum 8 items are allowed to add in the list.");
    } else {
        e.preventDefault();

        const newItem: Todo = {
            text: input.value,
            completed: false,
        };
        createItem(newItem);
        items.push(newItem);

        saveItems();
        input.value = "";
    }
}


function createItem(item: Todo) {
    const newitem = document.createElement("li");
    const itemText = document.createElement("span");
    const deleteBtn = document.createElement("button");
   
    deleteBtn.textContent = "X";
    itemText.textContent = item.text;
    newitem.append(itemText);
    newitem.append(deleteBtn);
    list.append(newitem);

    newitem.className = "item-list";
    deleteBtn.className = "delete-button";
    itemText.className = "item-text";

    if (item.completed) {
        newitem.style.backgroundColor = "#cfb3cd";
        deleteBtn.style.display = 'none';
    } else {
        newitem.style.backgroundColor = "#493572";
        deleteBtn.style.display = 'block'; 
    }

    newitem.addEventListener("click", function () {
        item.completed = !item.completed;
        if (item.completed) {
            newitem.style.backgroundColor = "#cfb3cd";
            deleteBtn.style.display = 'none';
        } else {
            newitem.style.backgroundColor = "#493572";
            deleteBtn.style.display = 'block'; 
        }
        saveItems();
    });

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const confirmDelete = confirm("Are you sure you want to delete a item?");
        if (confirmDelete) {
            newitem.remove();
            for (let i = 0; i < items.length; i++) {
                if (items[i].text == item.text) {
                    items.splice(i, 1);
                    saveItems();
                }
            }
        }
       
    });
}


form.addEventListener("submit", handleSubmit);