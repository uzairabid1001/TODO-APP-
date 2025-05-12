const firebaseConfig = {
    apiKey: "AIzaSyADV_A9V7qnjWmdtehgQMdl-wa8S0kLkCk",
    authDomain: "todo-app-df2ea.firebaseapp.com",
    databaseURL: "https://todo-app-df2ea-default-rtdb.firebaseio.com",
    projectId: "todo-app-df2ea",
    storageBucket: "todo-app-df2ea.firebasestorage.app",
    messagingSenderId: "777567362528",
    appId: "1:777567362528:web:0b944bf4cb6fc03bca5f85",
 
  };
  
 
  var app = firebase.initializeApp(firebaseConfig);
  
  firebase
    .database()
    .ref("todos")
    .on("child_added", function (data) {
      // console.log(data.val());
  
      var liELement = document.createElement("li");
  
      var ulElement = document.getElementById("items_data");
  
      //   create delete button element with DOM
  
      var DelbtnElement = document.createElement("button");
  
      var DelbtnText = document.createTextNode("DELETE");
  
      DelbtnElement.setAttribute("onclick", "deleteSingleTodo(this)");
  
      DelbtnElement.setAttribute("id", data.val().id);
  
      DelbtnElement.setAttribute("class", "deletebtn");
  
      DelbtnElement.appendChild(DelbtnText);
  
      //   create Edit button element with DOM
  
      var EditbtnElement = document.createElement("button");
  
      var EditbtnText = document.createTextNode("EDIT");
  
      EditbtnElement.appendChild(EditbtnText);
  
      EditbtnElement.setAttribute("onclick", "EditSingleTodo(this)");
  
      EditbtnElement.setAttribute("id", data.val().id);
  
      EditbtnElement.setAttribute("class", "Editbtn");
  
      var liText = document.createTextNode(data.val().todo_value);
  
      liELement.appendChild(liText);
  
      ulElement.appendChild(liELement);
      liELement.appendChild(EditbtnElement);
      liELement.appendChild(DelbtnElement);
  
  
      // console.log(liELement);
    });
  
  function addTodo() {
    try {
      var todoInput = document.getElementById("todoInput");
      const taskText = todoInput.value.trim();
        if (taskText === "") {
          alert("Please enter a task.");
          return;
        }
      
      var id = firebase.database().ref("todos").push().key;
  
      var obj = {
        todo_value: todoInput.value,
        id: id,
      };
  
      firebase.database().ref(`todos/${id}`).set(obj);
  
      todoInput.value = "";
  
    todoInput.innerText=""
    } catch (error) {
      console.log(error);
    }
  }
  
  function deleteAllTodos() {
    var ulElement = document.getElementById("items_data");
    ulElement.innerHTML = "";
  
    firebase.database().ref("todos").remove();
  }
  
  function deleteSingleTodo(e) {
    e.parentNode.remove();
  
    firebase.database().ref(`todos/${e.id}`).remove();
  }
  
  function EditSingleTodo(e) {
    var userInput = prompt("Edit your task:", e.parentNode.firstChild.nodeValue);
  
    e.parentNode.firstChild.nodeValue = userInput;
  
    var obj = {
      todo_value: userInput,
      id: e.id,
    };
  
    firebase.database().ref(`todos/${e.id}`).set(obj);
  }