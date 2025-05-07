# 🏋️ Lift Logger  

A **modern workout tracking application** designed for **scalability, performance, and cloud-first deployment**. Originally built as a **MERN stack app** with plain JavaScript, Lift Logger has been **rewritten** using:  
- **🐳 Dockerized Postgres** for a robust, scalable database  
- **🛠️ Ruby on Rails** for an opinionated MVC backend  
- **⚡ React + TypeScript (Vite)** for a dynamic, responsive frontend  

---

## 🚧 Project in Transition  
This project is currently undergoing a **major architectural upgrade** to improve scalability, maintainability, and cloud-first deployment. Depending on when you view it, some features may be incomplete or in progress.  

The transition includes migrating from a **MERN stack** to a **Dockerized Rails + Postgres backend**, a **TypeScript-based React frontend**, and **cloud deployment on AWS & Google Cloud Run**.  

If you're interested in the evolution of the project, check out the [Roadmap](ROADMAP.md) for details on completed, ongoing, and future improvements. 🚀  

---

## 📜 Table of Contents  
1. [Project Overview](#-project-overview)  
2. [Project Evolution](#-project-evolution)  
3. [Technology Stack](#-technology-stack)  
4. [Installation](#-installation)  
5. [Project Structure](#-project-structure)  
6. [Docker Setup](#-docker-setup)  
7. [Useful Commands](#-useful-commands)  
8. [Roadmap](#-roadmap)  
9. [Contributing](#-contributing)  
10. [License](#-license)  

---

## 🎯 Project Overview  

Lift Logger is a **full-stack workout tracking application** that allows users to **log, view, update, and delete workouts** while leveraging **cloud-first deployment** for scalability.  

### 🔥 **Why the Rewrite?**  
The original **MERN stack** implementation was functional but lacked:  
✅ **Type safety** → Migrated frontend to **React + TypeScript**  
✅ **Scalability** → Switched from **MongoDB** to **Postgres**  
✅ **Cloud-first architecture** → Learning **AWS RDS, container deployment, and CI/CD**  
✅ **Opinionated MVC structure** → Improved backend design knowledge by using **Ruby on Rails**

This transition is a **personal challenge** to deepen my expertise in **modern web development, cloud deployment, and scalable architecture**. 🚀  

---

## 🏗️ Technology Stack  

### **🖥️ Local Development Stack**  
For **local development**, all services run in **Docker containers**:  
- **Backend:** Ruby on Rails
- **Database:** PostgreSQL (Dockerized)
- **Frontend:** React + TypeScript (Vite)
- **Containerization:** Docker + Docker Compose

### **☁️ Cloud Production Stack**  
For **production**, the architecture is **cloud-first**:
- **Backend:** Deployed on **Google Cloud Run**
- **Database:** Hosted on **AWS RDS (Postgres)**
- **Frontend:** Deployed on **AWS Amplify**

Currently, I'm working on **backend container deployment** and ensuring **seamless communication** between all services. I may **rewrite the backend** in **Go** or **.NET serverless**, depending on which best fits the project’s needs.

---

## ⚙️ Installation  

### **Clone the repository**  
```bash
git clone https://github.com/samuelberven/lift-logger.git
cd lift-logger
```
### Run the application (Dockerized development)
```bash
docker-compose up --build
```

## 📂 Project Structure
```bash
lift-logger/
│
├── backend/              # Ruby on Rails API
│   ├── app/              # Rails MVC structure
│   ├── config/           # Database & environment settings
│   ├── db/               # Migrations & schema
│   └── Dockerfile        # Backend container setup
│
├── frontend/             # React + TypeScript (Vite)
│   ├── src/              # React components & pages
│   ├── public/           # Static assets
│   ├── vite.config.ts    # Vite configuration
│   └── Dockerfile        # Frontend container setup
│
├── docker-compose.yml    # Multi-container setup
├── ROADMAP.md            # Project roadmap
└── README.md             # Documentation
```

## 🐳 Docker Setup
- Run all services in Docker (development)
```bash
docker-compose up --build
```
- Access Rails container
```bash
docker exec -it rails_container bash
```
- Run Rails console
```bash
rails console
```
## 🔧 Useful Commands
- Rails Database Management
- Generate table (example with foreign keys)
```bash
rails generate migration CreateUserExercises user:references exercise:references weight:float reps:integer sets:integer
```
- Generate table AND model
```bash
rails generate model CreateUserExercises user:references exercise:references weight:float reps:integer sets:integer
```
- Migrate database
```bash
rails db:migrate
```
- Drop table migration
```bash
rails generate migration DropTableName
```

## 🛣️ Roadmap

### ✅ Completed
- Frontend deployed on AWS Amplify
- AWS RDS database setup
- Dockerized development environment
### 🔄 In Progress
- Backend container deployment on Google Cloud Run
- Ensuring seamless communication between frontend, backend, and database

## 🚀 Future Plans
- Rewrite backend in .NET serverless or Go (evaluating best fit)
- Implement JWT-based authentication
- Add user profile customization (personalized workout plans & progress tracking)
- Mobile version (React Native)

## 🤝 Contributing
Contributions are welcome! To contribute:
- Fork the repository
- Create a new branch:
```bash
git checkout -b feature-branch
```
- Make your changes
- Commit your changes:
```bash
git commit -m "Add new feature"
```
- Push to the branch:
```bash
git push origin feature-branch
```
-Create a pull request to merge your changes into the main branch

## 📜 License
This project is licensed under the MIT License.
Copyright © 2025 Samuel Berven