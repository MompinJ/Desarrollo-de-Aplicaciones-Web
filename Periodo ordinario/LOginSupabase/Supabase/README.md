# 🔐 Supabase Authentication with Node.js - Easy Login & Signup Tutorial  

This project demonstrates how to create a **Login & Signup system** using **Node.js and Supabase**. It allows users to **register, verify their email, log in, and log out securely**.  

---  

## 🎬 Watch the Tutorial  
Step-by-step guide on how to build this project:  
📺 **[Watch the Video](https://youtu.be/zBHzhaQg3tk)**  

---  

## 📝 Features  
✅ **User registration with email verification**  
✅ **Secure login & logout system**  
✅ **Authentication powered by Supabase**  
✅ **Simple and effective Node.js implementation**  

---

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase
1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to **Settings > API**
3. Copy the **Project URL** and **anon/public key**
4. Update the `.env` file with your credentials:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

### 3. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

---

## 📁 Project Structure
```
├── server.js          # Main Express server
├── private.html       # Protected page (user dashboard)
├── public/
│   ├── index.html     # Login & Signup forms
│   ├── error.html     # Error page
│   └── signup_success.html # Success page
├── package.json       # Dependencies
└── .env              # Supabase credentials
```

---

## 🔧 Usage
1. Open `http://localhost:3000` in your browser
2. Create a new account using the signup form
3. Check your email for verification link
4. Login with your credentials
5. Access the private dashboard

---  

## 📢 Stay Connected!  
If you love coding tutorials, subscribe to my YouTube channel **Turtle Code** for more fun tech content!  
📌 **[Visit My Channel](https://www.youtube.com/@TurtleCode)**  
