/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import fs from "node:fs";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export const chatSession = model.startChat({
  generationConfig,
  safetySettings,
  history: [],
});

export const GenAiCode = model.startChat({
  generationConfig: CodeGenerationConfig,
  safetySettings,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a todo app: You are an AI model tasked with generating a complete React project. 
    GUIDELINES:
    - Generate a React project with the following structure:
      - Provide a project title and a brief explanation.
      - Include all necessary files for a React project.
      - Return the response in JSON format with the following schema:
        {
          "projectTitle": "string",
          "explanation": "string",
          "files": {
            "app.js": { "code": "string" },
            "otherFile.js": { "code": "string" },
            ...
          },
          "generatedFiles": ["string", "string", ...]
        }
    - Ensure the code is functional and adheres to React best practices`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `Here's a breakdown of the thought process to generate the React Todo App:

1.  **Understand the Goal:** The request is to create a *complete* React project for a simple Todo application. The output must be in a specific JSON format, including project title, explanation, file contents, and a list of generated files. The code should be functional and follow React best practices.

2.  **Choose the Tooling/Approach:**
    *   Since it's a simple React app, \`create-react-app\` (CRA) is the standard and easiest starting point. Although CRA is evolving (Vite is becoming more popular), for a basic example, CRA's structure is well-understood and sufficient. I'll simulate the key files CRA would generate.
    *   I need to provide the *content* of the files, not just the structure.
    *   The core functionality is CRUD (Create, Read, Update - marking as done, Delete) for todos.

3.  **Define the Project Structure (Simulating CRA):**
    *   \`public/index.html\`: The main HTML entry point.
    *   \`src/index.js\`: The JavaScript entry point, renders the root component (\`App\`) into the DOM.
    *   \`src/App.js\`: The main application component, will contain the state and logic for the todo list.
    *   \`src/App.css\`: Basic styling for the \`App\` component.
    *   \`src/components/TodoList.js\`: A component to display the list of todos.
    *   \`src/components/TodoItem.js\`: A component for a single todo item (text, complete button, delete button).
    *   \`src/components/AddTodoForm.js\`: A component for the input field and add button.
    *   \`package.json\`: Essential for defining dependencies and scripts.
    *   \`.gitignore\`: Standard Git ignore file for Node/React projects.
    *   \`README.md\`: Basic project description.

4.  **Design the Components and State Management:**
    *   **\`App.js\` (Container Component):**
        *   Will hold the main state: \`todos\` (an array of todo objects). Each todo object should have at least \`id\`, \`text\`, and \`completed\` properties.
        *   Needs functions to handle:
            *   \`addTodo(text)\`: Creates a new todo object and adds it to the \`todos\` state. Needs a way to generate unique IDs (timestamp or a simple counter, though UUID is better in real apps).
            *   \`toggleComplete(id)\`: Finds the todo by ID and flips its \`completed\` status.
            *   \`deleteTodo(id)\`: Filters the \`todos\` array, removing the one with the matching ID.
        *   Will render \`AddTodoForm\` and \`TodoList\`.
        *   Should use \`useState\` for managing the \`todos\` array.
        *   Consider using \`useEffect\` for potential future features like saving to \`localStorage\`, but for this basic version, it's not strictly necessary.
    *   **\`AddTodoForm.js\` (Presentational Component):**
        *   Needs an input field and a submit button.
        *   Will manage its own input state (\`inputText\`) using \`useState\`.
        *   On form submission, it will call the \`addTodo\` function passed down as a prop from \`App.js\`, preventing the default form submission behavior. It should clear the input field after adding.
    *   **\`TodoList.js\` (Presentational Component):**
        *   Receives the \`todos\` array, \`toggleComplete\`, and \`deleteTodo\` functions as props.
        *   Maps over the \`todos\` array and renders a \`TodoItem\` for each todo, passing the necessary data and functions down.
    *   **\`TodoItem.js\` (Presentational Component):**
        *   Receives a single \`todo\` object, \`toggleComplete\`, and \`deleteTodo\` as props.
        *   Displays the todo text. Apply a different style (e.g., line-through) if \`todo.completed\` is true.
        *   Has a button/checkbox to call \`toggleComplete(todo.id)\`.
        *   Has a button to call \`deleteTodo(todo.id)\`.

5.  **Implement the Code (File by File):**

    *   **\`package.json\`:** Define basic metadata (name, version), dependencies (\`react\`, \`react-dom\`), devDependencies (\`react-scripts\`), and scripts (\`start\`, \`build\`, \`test\`, \`eject\`).
    *   **\`.gitignore\`:** Standard CRA \`.gitignore\` contents (node_modules, build, .env, etc.).
    *   **\`README.md\`:** Simple title and setup instructions.
    *   **\`public/index.html\`:** Basic HTML structure with a \`<div id="root"></div>\`.
    *   **\`src/index.js\`:** Import React, ReactDOM, \`App\`, and \`App.css\`. Render \`<App />\` into the \`root\` div. Use \`React.StrictMode\` for development checks.
    *   **\`src/App.css\`:** Add basic styling for layout, todo items (completed state), buttons, input field. Keep it simple but functional.
    *   **\`src/App.js\`:**
        *   Import \`useState\`, \`AddTodoForm\`, \`TodoList\`, \`./App.css\`.
        *   Initialize \`todos\` state with \`useState([])\`.
        *   Implement \`addTodo\`, \`toggleComplete\`, \`deleteTodo\` functions using state setter. Use \`Date.now()\` for simple unique IDs.
        *   Render the main structure: title, \`AddTodoForm\`, \`TodoList\`. Pass props correctly.
    *   **\`src/components/AddTodoForm.js\`:**
        *   Import \`useState\`.
        *   Initialize \`inputText\` state.
        *   Handle input changes (\`onChange\`).
        *   Handle form submission (\`onSubmit\`): call \`addTodo\` prop, clear input, prevent default.
        *   Render the form with input and button.
    *   **\`src/components/TodoList.js\`:**
        *   Import \`TodoItem\`.
        *   Receive props: \`todos\`, \`toggleComplete\`, \`deleteTodo\`.
        *   Map \`todos\` to \`TodoItem\` components, passing necessary props and a unique \`key\`.
        *   Render the list (\`ul\` or \`div\`).
    *   **\`src/components/TodoItem.js\`:**
        *   Receive props: \`todo\`, \`toggleComplete\`, \`deleteTodo\`.
        *   Render the todo item structure (\`li\`).
        *   Apply conditional styling based on \`todo.completed\`.
        *   Add buttons/checkbox for toggling and deleting, attaching the correct event handlers (\`onClick\`) that call the prop functions with \`todo.id\`.

6.  **Format the Output:**
    *   Create the main JSON object.
    *   Set \`projectTitle\` and \`explanation\`.
    *   Create the \`files\` object. For each file generated:
        *   Create a key (e.g., \`"src/App.js"\`).
        *   Create a nested object with a \`"code"\` key holding the generated code string for that file.
    *   Create the \`generatedFiles\` array by listing all the file keys from the \`files\` object.

7.  **Review and Refine:**
    *   Check if all required files are present.
    *   Verify the JSON structure matches the schema.
    *   Read through the generated code:
        *   Is it functional?
        *   Does it use hooks correctly (\`useState\`)?
        *   Is props drilling appropriate for this scale? (Yes, context or state management libraries are overkill here).
        *   Are keys used correctly in lists?
        *   Is the CSS basic but functional?
        *   Are event handlers set up correctly?
        *   Does it adhere to basic React best practices (component separation, clear state management)?
    *   Ensure the explanation is clear and concise.

This systematic approach ensures all requirements are met, the code is logical and functional, and the output format is correct.`,
        },
        {
          text: `\`\`\`json
{
  "projectTitle": "React Todo App",
  "explanation": "A simple yet functional Todo application built with React. It allows users to add new tasks, mark tasks as completed (toggling their status), and delete tasks. State is managed locally within the main App component using the useState hook. Components are structured for clarity: App (main container), AddTodoForm (input), TodoList (list container), and TodoItem (individual task). Basic CSS is included for styling.",
  "files": {
    "package.json": {
      "code": "{\\n  \\"name\\": \\"react-todo-app\\",\\n  \\"version\\": \\"0.1.0\\",\\n  \\"private\\": true,\\n  \\"dependencies\\": {\\n    \\"react\\": \\"^18.2.0\\",\\n    \\"react-dom\\": \\"^18.2.0\\",\\n    \\"react-scripts\\": \\"5.0.1\\"\\n  },\\n  \\"scripts\\": {\\n    \\"start\\": \\"react-scripts start\\",\\n    \\"build\\": \\"react-scripts build\\",\\n    \\"test\\": \\"react-scripts test\\",\\n    \\"eject\\": \\"react-scripts eject\\"\\n  },\\n  \\"eslintConfig\\": {\\n    \\"extends\\": [\\n      \\"react-app\\",\\n      \\"react-app/jest\\"\\n    ]\\n  },\\n  \\"browserslist\\": {\\n    \\"production\\": [\\n      \\">0.2%\\",\\n      \\"not dead\\",\\n      \\"not op_mini all\\"\\n    ],\\n    \\"development\\": [\\n      \\"last 1 chrome version\\",\\n      \\"last 1 firefox version\\",\\n      \\"last 1 safari version\\"\\n    ]\\n  }\\n}"
    },
    ".gitignore": {
      "code": "# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\\n\\n# dependencies\\n/node_modules\\n/.pnp\\n.pnp.js\\n\\n# testing\\n/coverage\\n\\n# production\\n/build\\n\\n# misc\\n.DS_Store\\n.env.local\\n.env.development.local\\n.env.test.local\\n.env.production.local\\n\\nnpm-debug.log*\\nyarn-debug.log*\\nyarn-error.log*\\n"
    },
    "README.md": {
      "code": "# React Todo App\\n\\nA simple Todo application built with React.\\n\\n## Features\\n\\n- Add new tasks\\n- Mark tasks as complete/incomplete\\n- Delete tasks\\n- Basic styling\\n\\n## Available Scripts\\n\\nIn the project directory, you can run:\\n\\n### \`npm start\` or \`yarn start\`\\n\\nRuns the app in the development mode.\\nOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.\\n\\nThe page will reload if you make edits.\\nYou will also see any lint errors in the console.\\n\\n### \`npm test\` or \`yarn test\`\\n\\nLaunches the test runner in the interactive watch mode.\\n\\n### \`npm run build\` or \`yarn build\`\\n\\nBuilds the app for production to the \`build\` folder.\\nIt correctly bundles React in production mode and optimizes the build for the best performance.\\n\\nThe build is minified and the filenames include the hashes.\\nYour app is ready to be deployed!"
    },
    "public/index.html": {
      "code": "<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"utf-8\\" />\\n    <link rel=\\"icon\\" href=\\"%PUBLIC_URL%/favicon.ico\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\" />\\n    <meta name=\\"theme-color\\" content=\\"#000000\\" />\\n    <meta\\n      name=\\"description\\"\\n      content=\\"Simple Todo App created using React\\"\\n    />\\n    <link rel=\\"apple-touch-icon\\" href=\\"%PUBLIC_URL%/logo192.png\\" />\\n    <link rel=\\"manifest\\" href=\\"%PUBLIC_URL%/manifest.json\\" />\\n    <title>React Todo App</title>\\n  </head>\\n  <body>\\n    <noscript>You need to enable JavaScript to run this app.</noscript>\\n    <div id=\\"root\\"></div>\\n  </body>\\n</html>\\n"
    },
    "public/manifest.json": {
      "code": "{\\n  \\"short_name\\": \\"Todo App\\",\\n  \\"name\\": \\"React Todo App\\",\\n  \\"icons\\": [\\n    {\\n      \\"src\\": \\"favicon.ico\\",\\n      \\"sizes\\": \\"64x64 32x32 24x24 16x16\\",\\n      \\"type\\": \\"image/x-icon\\"\\n    },\\n    {\\n      \\"src\\": \\"logo192.png\\",\\n      \\"type\\": \\"image/png\\",\\n      \\"sizes\\": \\"192x192\\"\\n    },\\n    {\\n      \\"src\\": \\"logo512.png\\",\\n      \\"type\\": \\"image/png\\",\\n      \\"sizes\\": \\"512x512\\"\\n    }\\n  ],\\n  \\"start_url\\": \\".\\",\\n  \\"display\\": \\"standalone\\",\\n  \\"theme_color\\": \\"#000000\\",\\n  \\"background_color\\": \\"#ffffff\\"\\n}\\n"
    },
    "src/index.js": {
      "code": "import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport './index.css'; // Optional global styles\\nimport App from './App';\\n\\nconst root = ReactDOM.createRoot(document.getElementById('root'));\\nroot.render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);\\n"
    },
    "src/index.css": {
      "code": "body {\\n  margin: 0;\\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\\n    sans-serif;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n  background-color: #f4f4f4;\\n  color: #333;\\n}\\n\\ncode {\\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\\n    monospace;\\n}\\n"
    },
    "src/App.js": {
      "code": "import React, { useState, useCallback } from 'react';\\nimport AddTodoForm from './components/AddTodoForm';\\nimport TodoList from './components/TodoList';\\nimport './App.css';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState([]);\\n\\n  // Use useCallback to prevent unnecessary re-renders of child components\\n  const addTodo = useCallback((text) => {\\n    const newTodo = {\\n      id: Date.now(), // Simple unique ID using timestamp\\n      text: text,\\n      completed: false,\\n    };\\n    setTodos((prevTodos) => [newTodo, ...prevTodos]); // Add new todo to the beginning\\n  }, []); // Empty dependency array means this function is created once\\n\\n  const toggleComplete = useCallback((id) => {\\n    setTodos((prevTodos) =>\\n      prevTodos.map((todo) =>\\n        todo.id === id ? { ...todo, completed: !todo.completed } : todo\\n      )\\n    );\\n  }, []);\\n\\n  const deleteTodo = useCallback((id) => {\\n    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));\\n  }, []);\\n\\n  return (\\n    <div className=\\"app-container\\">\\n      <h1>React Todo App</h1>\\n      <AddTodoForm onAddTodo={addTodo} />\\n      <TodoList\\n        todos={todos}\\n        onToggleComplete={toggleComplete}\\n        onDeleteTodo={deleteTodo}\\n      />\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n"
    },
    "src/App.css": {
      "code": ".app-container {\\n  max-width: 600px;\\n  margin: 40px auto;\\n  padding: 30px;\\n  background-color: #fff;\\n  border-radius: 8px;\\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\\n  text-align: center;\\n}\\n\\nh1 {\\n  color: #333;\\n  margin-bottom: 20px;\\n}\\n\\n/* Styling for AddTodoForm */\\n.add-todo-form {\\n  display: flex;\\n  margin-bottom: 20px;\\n}\\n\\n.add-todo-form input[type='text'] {\\n  flex-grow: 1;\\n  padding: 10px 15px;\\n  border: 1px solid #ccc;\\n  border-radius: 4px 0 0 4px;\\n  font-size: 1rem;\\n}\\n\\n.add-todo-form button {\\n  padding: 10px 20px;\\n  background-color: #5cb85c;\\n  color: white;\\n  border: none;\\n  border-radius: 0 4px 4px 0;\\n  cursor: pointer;\\n  font-size: 1rem;\\n  transition: background-color 0.2s ease;\\n}\\n\\n.add-todo-form button:hover {\\n  background-color: #4cae4c;\\n}\\n\\n/* Styling for TodoList */\\n.todo-list {\\n  list-style: none;\\n  padding: 0;\\n  margin: 0;\\n}\\n\\n/* Styling for TodoItem */\\n.todo-item {\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  padding: 12px 15px;\\n  border-bottom: 1px solid #eee;\\n  background-color: #fff; /* Ensure item background contrasts with container */\\n}\\n\\n.todo-item:last-child {\\n  border-bottom: none;\\n}\\n\\n.todo-item span {\\n  flex-grow: 1;\\n  margin: 0 10px;\\n  cursor: pointer;\\n  text-align: left;\\n  word-break: break-word; /* Prevent long text from overflowing */\\n}\\n\\n.todo-item span.completed {\\n  text-decoration: line-through;\\n  color: #aaa;\\n}\\n\\n.todo-item .actions button {\\n  background: none;\\n  border: none;\\n  cursor: pointer;\\n  padding: 5px;\\n  font-size: 1.1rem;\\n  margin-left: 8px;\\n  transition: color 0.2s ease;\\n}\\n\\n.todo-item .actions .toggle-btn {\\n    color: #5bc0de; /* Info color */\\n}\\n.todo-item .actions .toggle-btn:hover {\\n    color: #31b0d5;\\n}\\n\\n.todo-item .actions .delete-btn {\\n  color: #d9534f; /* Danger color */\\n}\\n\\n.todo-item .actions .delete-btn:hover {\\n  color: #c9302c;\\n}\\n"
    },
    "src/components/AddTodoForm.js": {
      "code": "import React, { useState } from 'react';\\n\\nfunction AddTodoForm({ onAddTodo }) {\\n  const [inputText, setInputText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault(); // Prevent page reload\\n    if (!inputText.trim()) return; // Don't add empty todos\\n    onAddTodo(inputText);\\n    setInputText(''); // Clear input field after adding\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"add-todo-form\\">\\n      <input\\n        type=\\"text\\"\\n        placeholder=\\"Add a new task...\\"\\n        value={inputText}\\n        onChange={(e) => setInputText(e.target.value)}\\n      />\\n      <button type=\\"submit\\">Add Todo</button>\\n    </form>\\n  );\\n}\\n\\nexport default AddTodoForm;\\n"
    },
    "src/components/TodoList.js": {
      "code": "import React from 'react';\\nimport TodoItem from './TodoItem';\\n\\nfunction TodoList({ todos, onToggleComplete, onDeleteTodo }) {\\n  if (todos.length === 0) {\\n    return <p>No todos yet! Add one above.</p>;\\n  }\\n\\n  return (\\n    <ul className=\\"todo-list\\">\\n      {todos.map((todo) => (\\n        <TodoItem\\n          key={todo.id} // Key prop is crucial for list rendering performance\\n          todo={todo}\\n          onToggleComplete={onToggleComplete}\\n          onDeleteTodo={onDeleteTodo}\\n        />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;\\n"
    },
    "src/components/TodoItem.js": {
      "code": "import React from 'react';\\n\\nfunction TodoItem({ todo, onToggleComplete, onDeleteTodo }) {\\n  return (\\n    <li className=\\"todo-item\\">\\n      <span\\n        onClick={() => onToggleComplete(todo.id)}\\n        className={todo.completed ? 'completed' : ''}\\n        style={{ cursor: 'pointer' }} // Indicate text is clickable\\n      >\\n        {todo.text}\\n      </span>\\n      <div className=\\"actions\\">\\n         {/* Using a simple button for toggle for consistency */}\\n        <button onClick={() => onToggleComplete(todo.id)} className=\\"toggle-btn\\">\\n          {todo.completed ? 'Undo' : 'Done'}\\n        </button>\\n        <button onClick={() => onDeleteTodo(todo.id)} className=\\"delete-btn\\">\\n          Delete\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;\\n"
    }
  },
  "generatedFiles": [
    "package.json",
    ".gitignore",
    "README.md",
    "public/index.html",
    "public/manifest.json",
    "src/index.js",
    "src/index.css",
    "src/App.js",
    "src/App.css",
    "src/components/AddTodoForm.js",
    "src/components/TodoList.js",
    "src/components/TodoItem.js"
  ]
}
\`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ],
});
