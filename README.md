# 🏡 Airbnb Clone  

A simple **Airbnb-like web application** built using **HTML, CSS, JavaScript, MongoDB, and Express.js**.  
This project focuses on displaying property listings with details such as title, description, price, and images.  

---

## 🚀 Features  

- 🏠 **Property Listings** – Add, view, update, and delete listings  
- 📷 **Image Support** – Upload property images  
- 💲 **Price Display** – Show price for each listing  
- 🔎 **Basic Search/Filter** (if implemented)  
- 📱 **Responsive UI** – Designed using HTML & CSS  

---

## 🛠️ Tech Stack  

**Frontend:**  
- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  

**Backend:**  
- Node.js  
- Express.js  

**Database:**  
- MongoDB (with Mongoose)  

**Other Tools / Libraries:**  
- Multer (for image uploads, if used)  
- EJS (for rendering templates, if used)  

---

## 📂 Project Structure  

Airbnb-Clone/
│── public/ # Static files (CSS, JS, images)
│── views/ # Templates (EJS / HTML)
│── routes/ # Express routes
│── models/ # MongoDB schemas
│── app.js # Main app entry point
│── package.json


---

## ⚡ Installation & Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/airbnb-clone.git
   cd airbnb-clone

    Install dependencies

npm install

Setup environment variables
Create a .env file and add:

PORT=3000
MONGO_URI=your_mongodb_connection_string

Run the server

npm start

Visit 👉 http://localhost:3000
