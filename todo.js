const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function filterFn(toDo) {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, isChecked) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("toDoCheck");
  const label = document.createElement("label");
  const newId = getUUID();
  delBtn.innerText = "del";
  delBtn.addEventListener("click", deleteToDo);
  li.appendChild(label);
  label.appendChild(checkbox);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  if (isChecked) {
    label.classList.add("checked");
  }
  const toDoObj = {
    text: text,
    id: newId,
    checked: isChecked
  };
  toDos.push(toDoObj);
  saveToDos();
  checkedToDos();
}

function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 3) | 8;
    return v.toString(16);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue, false);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text, toDo.checked);
    });
  }
}

function checkedToDos() {
  const toDoCheckbox = document.querySelectorAll(".toDoCheck");
  toDoCheckbox.forEach(el => {
    el.addEventListener("change", function() {
      const loadedToDos = localStorage.getItem(TODOS_LS);
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(el => {
        const checkedList = this.parentNode.parentNode.id;
        if (this.checked) {
          this.parentNode.classList.add("checked");
          if (checkedList === el.id) {
            el.checked = true;
          }
        } else {
          this.parentNode.classList.remove("checked");
          if (checkedList === el.id) {
            el.checked = false;
          }
        }
      });
      toDos = parsedToDos;
      saveToDos();
    });
  });
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
