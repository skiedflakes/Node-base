# 🚀 NodeTest Project

A backend server built with **Node.js**, **Express**, and support for **MySQL** and **OracleDB**. This project handles authentication, file uploads, and environment-based configuration.

---

## 📦 Project Information

- **Name:** nodetest  
- **Version:** 1.0.0  
- **Entry Point:** `app.js`  
- **Environment Variables:** Managed via `.env`  
- **License:** ISC  

---

## 📁 Scripts

| Script   | Description                      |
|----------|----------------------------------|
| `start`  | Runs the server using `node`     |
| `dev`    | Starts the server using `nodemon` for auto-reload |

---

## 🔧 Dependencies

### 🔐 Security

- **bcryptjs**: For hashing passwords securely  
- **jsonwebtoken**: For issuing and verifying JWT tokens  

### 🌐 Server

- **express**: Minimal and flexible Node.js web application framework  

### ⚙️ Environment

- **dotenv**: Loads environment variables from `.env` file into `process.env`  

### 🗃 Database

- **mysql2**: MySQL client for Node.js with Promise support  
- **oracledb**: Oracle Database driver for Node.js  

### 📂 File Uploads

- **multer**: Middleware for handling multipart/form-data (file uploads)  

---

## 🛠 Dev Dependencies

- **nodemon**: Utility that automatically restarts the server on file changes  

---

## 📁 Suggested Folder Structure

