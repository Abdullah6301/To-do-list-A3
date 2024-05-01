#! usr/bin/ env node
import inquirer from 'inquirer';
type TodoItem = { task: string; completed: boolean };

const todoList: TodoItem[] = [];

function addItem(task: string) {
    const newItem: TodoItem = { task, completed: false };
    todoList.push(newItem);
}

function markComplete(index: number) {
    if (index >= 0 && index < todoList.length) {
        todoList[index].completed = true;
    }
}

function removeItem(index: number) {
    if (index >= 0 && index < todoList.length) {
        todoList.splice(index, 1);
    }
}

function display() {
    console.log("To-Do List:");
    todoList.forEach((item, index) => {
        const status = item.completed ? "[x]" : "[ ]";
        console.log(`${index + 1}. ${status} ${item.task}`);
    });
}

async function main() {
    while (true) {
        const { choice } = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: 'Options:',
            choices: [
                { name: 'Add a new task', value: 'add' },
                { name: 'Mark a task as completed', value: 'mark' },
                { name: 'Remove a task', value: 'remove' },
                { name: 'Display the to-do list', value: 'display' },
                { name: 'Exit', value: 'exit' }
            ]
        });

        switch (choice) {
            case 'add':
                const { taskToAdd } = await inquirer.prompt({
                    type: 'input',
                    name: 'taskToAdd',
                    message: 'Enter the task to add:'
                });
                addItem(taskToAdd);
                break;
            case 'mark':
                display();
                const { indexToMark } = await inquirer.prompt({
                    type: 'number',
                    name: 'indexToMark',
                    message: 'Enter the index of the task to mark as completed:',
                    validate: (input) => !isNaN(input) && input >= 1 && input <= todoList.length
                });
                markComplete(indexToMark - 1);
                break;
            case 'remove':
                const { indexToRemove } = await inquirer.prompt({
                    type: 'number',
                    name: 'indexToRemove',
                    message: 'Enter the index of the task to remove:',
                    validate: (input) => !isNaN(input) && input >= 1 && input <= todoList.length
                });
                removeItem(indexToRemove - 1);
                break;
            case 'display':
                display();
                break;
            case 'exit':
                console.log("Exiting...");
                return;
            default:
                console.log("Invalid choice. Please select again.");
        }
    }
}

main();