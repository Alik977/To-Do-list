const form = document.forms[0];
const todoBlock = document.getElementById("toDoBlock");
const modalContainer = document.getElementById("modalContainer");
const modal = document.getElementById("modal");
const deleteItem = document.getElementById("deleteItem");
const closeMod = document.getElementById("closeMod");
const closeModal = document.getElementById("closeModal");
const btnOther = document.getElementById("btnother");
const jsonOutput = document.getElementById("jsonOutput");
const jsonBlock = document.getElementById("jsonBlock");
const btnclose = document.getElementsByClassName("btnClose");

let todos = [];


form.onsubmit = function (event) {
  event.preventDefault();
  if (!event.target[0].value) {
    return;
  }
  todos.push({
    id: new Date().getTime(),
    todoContent: event.target[0].value,
    isChecked: false,
  });
  event.target[0].value = "";
  addTodos();
};


function saveData(e) {
  let myBlock = e.target.closest(".todo").children;
  todos.find((elm) => elm.id == myBlock[1].dataset.id).todoContent =
    myBlock[2].value;
  addTodos();
}


function hideModal() {
  modalContainer.style.cssText = "";
  modal.style.cssText = "";
}


function drawTodo(obj) {
  const div = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("p");
  const todoEdit = document.createElement("p");
  const todoDelete = document.createElement("p");
  const saveButton = document.createElement("p");

  todoDelete.textContent = `❌`;
  todoEdit.textContent = "✏️";
  todoText.textContent = obj.todoContent;
  saveButton.textContent = "💾";

  div.classList.add("todo");
  todoText.dataset.id = obj.id;

  checkbox.type = "checkbox";
  checkbox.checked = obj.isChecked;
  todoText.style.textDecoration = obj.isChecked ? "line-through" : "";

 
  checkbox.addEventListener("click", () => {
    obj.isChecked = checkbox.checked;
    todoText.style.textDecoration = checkbox.checked ? "line-through" : "";
  });


  todoDelete.addEventListener("click", () => {
    modalContainer.style.cssText = "opacity: 1; transform: translateY(0%)";
    modal.style.cssText = "opacity: 1;transform: translateY(0%)";
    deleteItem.onclick = () => {
      deleteTodo(obj.id);
      hideModal();
    };
    closeMod.onclick = hideModal;
    closeModal.onclick = hideModal;
  });


  todoEdit.addEventListener("click", (e) => {
    let previousEl = e.target.previousSibling;
    const input = document.createElement("input");
    input.type = "text";
    previousEl.style.display = "none";
    previousEl.after(input);
    todoEdit.style.display = "none";
    todoEdit.after(saveButton);
    input.style.cssText = "display: flex; flex-grow: 1";
    input.value = previousEl.textContent;
    input.focus();

    saveButton.style.display = "block";
    saveButton.addEventListener("click", saveData);
  });

  div.append(checkbox, todoText, todoEdit, todoDelete);
  return div;
}


function deleteTodo(id) {
  todos = todos.filter((elm) => elm.id !== id);
  addTodos();
}


function addTodos() {
  todoBlock.innerHTML = "";
  todos.forEach((elm) => todoBlock.append(drawTodo(elm)));
}


btnOther.addEventListener("click", () => {
  if (!todos.length) {
  let method='GET'
    let url = "https://jsonplaceholder.typicode.com/users";
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status === 200) {
        const apiData = JSON.parse(xhr.response); 
     
        jsonOutput.textContent = JSON.stringify(apiData, null,2);
      
      } else {
        jsonTitle.textContent = "Տվյալները բեռնել չհաջողվեց";
        jsonOutput.textContent = "";
        
      }
    };

    return; 
  }

 

});
btnClose.addEventListener("click", () => {
  jsonOutput.textContent = "";
  jsonTitle.textContent = "";
});