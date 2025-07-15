# Kabutar

Kabutar is a collaborative project management platform designed to help users create, organize, and work together on projects seamlessly. With a focus on real-time collaboration and efficient user management, Kabutar provides a modern web-based environment for teams to communicate, manage files, and coordinate tasks.

## Features

- **Project Creation & Listing**: Easily create new projects and view all your existing collaborations.
- **Collaborator Management**: Add or remove team members to each project. Manage user roles and permissions for effective teamwork.
- **Real-Time Messaging**: Communicate instantly with collaborators within each project using built-in chat functionality.
- **AI Assistant**: Interact with an integrated AI for smart responses and assistance directly within your project workspace.
- **File Tree Management**: Organize your project files in a hierarchical structure, with the ability to update and save changes.
- **Responsive Interface**: Modern, user-friendly UI built with React for fast and intuitive navigation.

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for schema modeling)
- **Socket Communication**: For real-time updates and messaging
- **Authentication**: (Details depend on implementation, but user context and login flows are present)

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayush1944/Kabutar.git
   cd Kabutar
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
   - Create a `.env` file in `backend` for MongoDB URI and other secrets.
   - (Refer to source for required variables.)

5. **Run the application**
   - Start backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start frontend:
     ```bash
     cd ../frontend
     npm start
     ```

6. **Access Kabutar**
   - Open your browser and navigate to the frontend URL (usually `http://localhost:3000`).

## Usage

- **Create a Project**: Use the "New Project" button, provide a name, and start collaborating.
- **Add/Remove Collaborators**: Manage your teams from the project sidebar or collaborator panel.
- **Chat & AI**: Send messages and interact with the AI assistant for enhanced productivity.
- **File Management**: Organize and edit files directly within your project workspace.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is currently unlicensed. Please contact the repository owner for licensing details.

## Author

- [ayush1944](https://github.com/ayush1944)

---

> Kabutar is built for teams who value real-time collaboration and simple project organization. Start collaborating today!
