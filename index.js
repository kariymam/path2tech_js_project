const prompt = require('readline-sync');

const todos = [
  {
    title: "Initial Todo",
    description: "This is the initial todo",
    complete: false,
  }
];

const getAllKeys = (obj) => {
  let keys = []
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterateObj(obj[key]);
    } else {
      keys.push(key);
    }
  }
  return keys
};

function addToDo(title, description, status = false){
  return todos.push({title: title, description: description, complete: status})
}

function editToDo(arr) {
  let selection = prompt.keyInSelect(arr.map((obj, i) => todoFormatting(obj, i)), 'Which todo would you like to edit?')
  return arr.filter((_, index) => index === selection).forEach((obj) => {
    let props = getAllKeys(obj);
    let prop = props[prompt.keyInSelect(props, 'Which property would you like to edit?')]
    if (prop === 'complete') {
      let complete = markTodoComplete(obj);
      obj[prop] = complete
    } else {
      console.log('                                ');
      console.log(`Old ${prop}: ${obj[prop]}`)
      console.log('                                ');
      let newValue = prompt.question(`Change ${prop} to: `);
      obj[prop] = newValue
    }
    console.log('\n================================');
  })
}

function removeTodo(arr){
  let selection = prompt.keyInSelect(arr.map((obj, i) => todoFormatting(obj, i)), 'Which todo would you like to delete?')
  arr.splice(selection, 1);
  return arr
}

function markTodoComplete(obj){
  console.log(`
    title: ${obj.title}
    description: ${obj.description}
    complete?: ${!obj.complete ? "No" : "Yes"}`);
  return prompt.keyInYN('Is this task complete?')
}

function displayTodoLength(arr){
  return console.log(`You have ${arr.length} todos`)
}

function todoFormatting(obj, i){
  return `Todo ${i + 1}
  This title of the todo: ${obj.title} 
  This description of the todo: ${obj.description} 
  ${!obj.complete ? "This todo is not complete" : "This todo is complete"}`
}

function app(){
  console.log('Welcome to the Todo Application');
  console.log('================================');
  
  // You will need to call your methods below this comment to edit the todos array
  addToDo("Second Todo", "This is the second todo", true)
  addToDo("Third Todo", "This is the third todo")
  editToDo(todos)
  removeTodo(todos)
  // You will need to call your methods above this comment to edit the todos array

  // Print the length of the todos array below this comment
  console.log('Here is a list of your todos:');
  displayTodoLength(todos)
  // Print the length of the todos array above this comment

  // Iterate over the todos array and console.log each todo below this comment
  todos.forEach((obj, i) => console.log(todoFormatting(obj, i)))
}

app();