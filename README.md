# 📝 Todo Web App (Full-Stack)

This is a **Full-Stack Todo Web Application** built with:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Spring Boot + PostgreSQL
- **REST API:** Spring Web + JPA
- **CORS enabled** for local development

---

## ✨ Features

✅ Add, list, edit, and delete todos  
✅ Toggle completion status  
✅ Automatic `createdAt` timestamp  
✅ Fully responsive UI  
✅ Backend with proper `Service` and `Repository` layers

---

## 🏗️ Project Structure

todo-fullstack-app/
├── backend/
│ ├── src/main/java/com/kooshin/todoweb/
│ │ ├── Todo.java # Entity
│ │ ├── TodoRepository.java # Repository
│ │ ├── TodoService.java # Service
│ │ ├── TodoController.java # REST Controller
│ │ └── WebConfig.java # CORS Config
│ └── src/main/resources/
│ ├── application.properties # DB config
├── frontend/
│ ├── src/components/Task.jsx
│ ├── src/pages/Home.jsx
│ ├── .env # VITE_API_BASE_URL
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── vite.config.js
├── README.md

---

## 🧑‍💻 Backend Setup

1. Configure your `application.properties` with DB credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/tododb
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   server.port=8080
   ```

mvn spring-boot:run

VITE_API_BASE_URL=http://localhost:8080

cd frontend
npm install
npm run dev

registry.addMapping("/todo/\*\*").allowedOrigins("http://localhost:5173");
