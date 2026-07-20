# 🚀 Blockeum

<p align="center">
  <b>A next-generation visual programming environment that bridges the gap between blocks and real code.</b>
</p>

---

## 📖 About Blockeum

Blockeum is a modern visual programming IDE designed to make software development more accessible while keeping the power of traditional programming languages.

Unlike traditional block editors that only create simple visual programs, Blockeum is built around a compiler-style architecture using **AST (Abstract Syntax Tree)** as the core communication layer.

The main idea:

> Create software visually with blocks, generate real code, and convert code back into blocks.

Blockeum aims to provide a development experience where beginners can learn programming visually while advanced users can work with generated source code.

---

# ✨ Features

## 🧩 Visual Programming

Blockeum uses a Blockly-based visual programming system.

Users can create programs using:

- Variables
- Functions
- Conditions
- Loops
- Logic operations
- Mathematical operations
- UI elements

without writing every line manually.

---

## 🔄 Block ↔ Code Conversion

One of the main goals of Blockeum is bidirectional programming.

### Block → Code

Example:

```
[ Print ]
     |
 "Hello World"
```

Generates:

```javascript
console.log("Hello World");
```

---

### Code → Block

Example:

```javascript
let x = 10;

console.log(x);
```

Can be converted into:

```
Create Variable
       |
       x = 10


Print
       |
       x
```

This allows users to switch between visual programming and normal coding.

---

# 🧠 AST Architecture

Blockeum uses an Abstract Syntax Tree as the middle layer between blocks and programming languages.

Architecture:

```
             Blockly Blocks
                   |
                   |
                   v
          Abstract Syntax Tree
                   |
        +----------+----------+
        |          |          |
        v          v          v
   JavaScript    Python      C#
   Generator    Generator  Generator
```

Using AST provides:

- Better code generation
- Multi-language support
- Easier parser development
- Cleaner architecture
- Future compiler features

---

# 🏗️ Project Architecture

```
Blockeum
│
├── blocks/
│   ├── definitions.js
│   └── toolbox.js
│
│   Blockly block definitions
│
├── core/
│
│   ├── ast/
│   │   ├── ASTBuilder.js
│   │   ├── ASTNode.js
│   │   ├── ASTTypes.js
│   │   ├── BlockToAST.js
│   │   └── ASTToBlock.js
│   │
│   │   AST management system
│   │
│   ├── parser/
│   │   ├── JavaScriptParser.js
│   │   └── tokenizer.js
│   │
│   │   Code parsing system
│   │
│   └── runtime.js
│
├── generator/
│   ├── ASTGenerator.js
│   ├── JavaScriptASTGenerator.js
│   ├── javascript.js
│   ├── python.js
│   └── csharp.js
│
│   Code generation system
│
├── storage/
│   └── projectStore.js
│
│   Project management
│
├── ui/
│   └── ide.js
│
│   IDE interface
│
└── index.html
```

---

# 🛠️ Technologies

Blockeum is built using modern web technologies:

## Frontend

- JavaScript
- HTML5
- CSS3

## Editor

- Blockly
- Monaco Editor

## Architecture

- AST-based compiler design
- Modular JavaScript system
- Code generation pipeline

---

# 🌎 Supported Languages

Current:

| Language | Status |
|---|---|
| JavaScript | ✅ Active |
| HTML/CSS/JS | ✅ Active |
| Python | 🚧 Development |
| C# | 🚧 Development |

Future plans:

- Java
- C++
- Custom programming languages
- Blockeum scripting language

---

# 🎯 Goals

The long-term goal of Blockeum is creating a complete programming environment that combines:

- The simplicity of visual programming
- The power of traditional IDEs
- The flexibility of compiler architectures

Possible future features:

- Advanced debugger
- Extension system
- Package manager
- Online collaboration
- Cloud projects
- AI programming assistant
- Custom language support

---

# 📌 Development Status

Blockeum is currently under active development.

Current progress:

✅ Blockly editor  
✅ Custom blocks  
✅ Project system  
✅ AST system  
✅ JavaScript generation  
✅ Code editor integration  

Work in progress:

🚧 Better parser  
🚧 More AST nodes  
🚧 Advanced generators  
🚧 Debugging system  

---

# 🤝 Contributing

Contributions, ideas, and feedback are welcome.

If you want to help:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 📄 License

Blockeum is released under the MIT License.

You are free to:

- Use it
- Modify it
- Share it
- Build projects with it

---

# 👨‍💻 Developer

Created by **Ege Dev**

Project: **Blockeum**

Building the future between visual programming and real code.

---

⭐ If you like the project, consider giving it a star!
