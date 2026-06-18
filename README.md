# 🚀 VectorShift Workflow Builder

A visual workflow builder built using **React Flow** and **FastAPI** as part of the VectorShift Frontend Technical Assessment.

This project enables users to create AI workflows using a drag-and-drop interface instead of writing code. Users can visually connect nodes, define dynamic variables, and validate workflow structures through backend DAG analysis.

---

## 📸 Project Workflow

![Project Workflow](./assets/Project_Workflow.png)

---

## 📸 Final Output

![Final Output](./assets/final_output.png)

---

# ✨ Features

## Part 1: Node Abstraction

Implemented a reusable `BaseNode` component that eliminates duplicated node logic.

### Supported Nodes

- Input Node
- Output Node
- Text Node
- LLM Node

### Additional Custom Nodes

- API Node
- Math Node
- Filter Node
- Delay Node
- Email Node

Benefits:

- Reusable architecture
- Consistent styling
- Easy scalability
- Faster creation of future node types

---

## Part 2: Modern UI & Styling

Designed a modern workflow builder interface with:

- Gradient toolbar
- Interactive node cards
- Consistent design system
- Responsive layout
- Hover effects and shadows
- Colored node categories
- React Flow MiniMap support

---

## Part 3: Dynamic Text Node

The Text Node supports:

### Auto Resizing

The node automatically expands as users type more content.

Example:

```text
Hello {{userName}}

Welcome to VectorShift!
```

### Dynamic Variable Detection

Variables wrapped in double curly braces are automatically detected:

```text
{{userName}}
{{email}}
{{company}}
```

For every detected variable:

- A new input handle is generated
- Handles update in real-time
- Removed variables automatically remove corresponding handles

---

## Part 4: Backend Integration

Frontend sends pipeline data to FastAPI:

```http
POST /pipelines/parse
```

Payload:

```json
{
  "nodes": [...],
  "edges": [...]
}
```

Backend returns:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

### DAG Validation

Implemented cycle detection using **Kahn's Algorithm**.

The backend verifies:

- Total Nodes
- Total Edges
- Whether the workflow is a valid Directed Acyclic Graph (DAG)

---

# 🏗️ Architecture

```text
Input
   │
   ▼
Text
   │
   ▼
LLM
   │
   ▼
Output
```

All node implementations inherit from:

```text
BaseNode
   ├── InputNode
   ├── OutputNode
   ├── TextNode
   ├── LLMNode
   ├── APINode
   ├── MathNode
   ├── FilterNode
   ├── DelayNode
   └── EmailNode
```

---

# 🛠️ Tech Stack

## Frontend

- React
- React Flow
- JavaScript
- CSS3

## Backend

- Python
- FastAPI
- Pydantic

---

# 📂 Project Structure

```text
DAG-Project
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── BaseNode.jsx
│   │   │   └── PipelineModal.jsx
│   │   │
│   │   ├── nodes
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── textNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── apiNode.js
│   │   │   ├── mathNode.js
│   │   │   ├── filterNode.js
│   │   │   ├── delayNode.js
│   │   │   └── emailNode.js
│   │   │
│   │   ├── styles
│   │   ├── toolbar.js
│   │   ├── submit.js
│   │   └── ui.js
│
├── backend
│   └── main.py
│
└── assets
    ├── Project_Workflow.png
    └── final_output.png
```

---

# 🚀 Running the Project

## Frontend

```bash
cd frontend
npm install
npm start
```

Runs on:

```text
http://localhost:3000
```

---

## Backend

```bash
cd backend
uvicorn main:app --reload
```

Runs on:

```text
http://localhost:8000
```

---

# 🧪 Sample Workflow

1. Create an Input Node
2. Create a Text Node
3. Enter:

```text
Hello {{userName}}

Welcome to VectorShift!
```

4. Create an LLM Node
5. Create an Output Node
6. Connect:

```text
Input → Text → LLM → Output
```

7. Click **Analyze Pipeline**

Example Result:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

---

# 👨‍💻 Author

**Ravi Kumar Tiwari**

B.Tech Computer Science & Engineering  
Galgotias University

Frontend Technical Assessment Submission for VectorShift
