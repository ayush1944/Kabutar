# Kabutar.io 🕊️✨

Kabutar.io is a collaborative project management platform designed to help users create, organize, and work together on projects seamlessly. With a focus on real-time collaboration and efficient user management, Kabutar.io provides a modern web-based environment for teams to communicate, manage files, and coordinate tasks.

---

![Kabutar.io Banner](assets/banner.png) <!-- Add your banner image to assets/banner.png or change the path -->

## 🎯 Features

- 📝 **Project Creation & Listing**: Easily create new projects and view all your existing collaborations.
- 👥 **Collaborator Management**: Add or remove team members to each project. Manage user roles and permissions for effective teamwork.
- 💬 **Real-Time Messaging**: Communicate instantly with collaborators within each project using built-in chat functionality.
- 🤖 **AI Assistant**: Interact with Google's Gemini AI for smart responses and assistance directly within your project workspace.
- 🗂️ **File Tree Management**: Organize your project files in a hierarchical structure, with the ability to update and save changes.
- 🖥️ **Responsive Interface**: Modern, user-friendly UI built with React and Tailwind CSS for fast and intuitive navigation.

---

## 🛠️ Tech Stack

- **Frontend**: 
  - React 19 with Vite
  - TailwindCSS for styling
  - React Router v7 for navigation
  - Socket.io-client for real-time communication
  - Axios for API requests
  - WebContainer API for in-browser code execution
  - React Hook Form with Zod for form validation

- **Backend**: 
  - Node.js with Express.js
  - Socket.io for real-time updates
  - Google Generative AI (Gemini) integration
  - JWT for authentication
  - Redis for token management

- **Database**: 
  - MongoDB with Mongoose ODM

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+) and npm
- MongoDB
- Redis

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayush1944/Kabutar.io.git
   cd Kabutar.io
   ```

2. **Install server dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup environment variables**
   - Create a `.env` file in `backend` directory:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret_key_here
     MONGODB_URI=mongodb://localhost:27017/your_database_name
     REDIS_HOST=localhost
     REDIS_PORT=6379
     REDIS_PASSWORD=
     GOOGLE_API_KEY=your_google_generative_ai_api_key_here
     NODE_ENV=development
     ```
   - Create a `.env` file in `frontend` directory:
     ```
     VITE_API_URL=http://localhost:3000
     VITE_SOCKET_URL=http://localhost:3000
     ```

5. **Run the application**
   - Start backend server:
     ```bash
     cd backend
     npm run dev
     ```
   - Start frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```

6. **Access Kabutar.io**
   - Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).

---

## 💡 Usage

- 🏗️ **Create a Project**: Use the "New Project" button, provide a name, and start collaborating.
- 👤 **Add/Remove Collaborators**: Manage your teams from the project sidebar or collaborator panel.
- 💬 **Chat & AI**: Send messages and interact with the AI assistant by using @ai in your messages.
- 🗄️ **File Management**: Organize and edit files directly within your project workspace.
- 🧪 **In-Browser Code Execution**: Test and run code directly in the browser using WebContainer API.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📜 License

This project is currently unlicensed. Please contact the repository owner for licensing details.

---

## 👤 Author

- [ayush1944](https://github.com/ayush1944)

---

> Kabutar.io is built for teams who value real-time collaboration and simple project organization. Start collaborating today!

---

## 📸 Screenshots & Stickers

![Project Dashboard](assets/dashboard.png) <!-- Add your screenshot to assets/dashboard.png or change the path -->
![Kabutar.io Sticker](assets/sticker.png) <!-- Add your sticker image to assets/sticker.png or change the path -->

---
