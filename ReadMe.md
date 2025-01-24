# Enzygo - The Modern Chat Application

Enzygo is a simple chat app that helps people connect. Users can chat with each other or join groups based on their interests. It’s fast, easy to use, and has a clean design.

---

## How We’ll Work Together

This project is a team effort. Each of us has a role to play:

- **@Salisspro**
- **@Adams009**
- **@codewithkin** (that’s me!)

Here’s what each person will focus on:

### **What You’ll Do**

#### **@Salisspro**  
You will work on the frontend (the part users see and interact with). Tools you’ll use:
- **ReactJS** to build the app interface
- **TailwindCSS** for styling
- **TypeScript** for catching mistakes in your code
- **Vite** to make development faster

Your job is to make the app look nice and work smoothly for users.

#### **@Adams009**  
You will work on the backend (the part that handles data and logic). But since you want to learn full-stack development, you can also:
- Look at the frontend code
- Make small changes to understand how it works

This will help you learn both frontend and backend development.

#### **@codewithkin (Me)**  
I will:
- Guide you both whenever you need help
- Explain how to solve problems
- Show you how to build features step by step

If you’re stuck or confused, just ask me for help.

---

## Why We’re Doing This

This project will help you:
- Improve your coding skills (both frontend and backend)
- Learn how to work as a team
- Get experience building a real-world app

---

# Tasks

## Authentication (Logging In)
**Dates:** 24/01/25 - 27/01/25  
The first thing we’ll build is the login system. This will let users create accounts and log in.

### **What Needs to Happen**

1. **Backend (Adam’s Job):**
   - Create a system that handles logging in and signing up.
   - We’ll use email to log in.

2. **How It Will Work:**
   - **Step 1:** On the frontend, the user enters their email.
   - **Step 2:** The backend checks if the email exists in the database.
     - **If the user exists:**
       - Create a session token (a special code).
       - Save the token in the database.
       - Send the token to the user’s email with a login link (e.g., `https://localhost:5173/login/?token=`).
     - **If the user doesn’t exist:**
       - Show an error message saying the email is not found.
   - **Step 3:** When the user clicks the login link:
     - The frontend takes the token and sends it to the backend to check if it’s valid.
     - **If the token is valid:**
       - Log the user in and redirect them to the homepage.
     - **If the token is invalid or expired:**
       - Show a page saying the token is invalid or expired.

---

### Important Notes
- **Ask Questions:** If you’re unsure about anything, let me know.
- **Write Comments:** Add simple explanations to your code to make it easy to understand.
- **Test Your Work:** Make sure the login system works properly before moving on.