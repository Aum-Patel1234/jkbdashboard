# JKB Dashboard

JKB Dashboard is a web application that allows users to view, add, edit, and delete student records. It is built using **Express.js** for the backend and utilizes **Sequelize** as the ORM with **PostgreSQL** as the database.

## 🚀 Features
- View all students
- Add new students
- Edit student details
- Delete students
- Organized API structure

## 🛠️ Technologies Used
- **Node.js** (Express.js)
- **Sequelize** (ORM for database interaction)
- **PostgreSQL** (Database)
- **EJS** (Templating engine)
- **Tailwind** (stling version=3.91)

## 🏗️ Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/jkb-dashboard.git
   cd jkb-dashboard
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up PostgreSQL and configure the `.env` file:
   ```sh
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=jkb_dashboard
   DB_PORT=5432
   ```

4. Run database migrations:
   ```sh
   npx sequelize db:migrate
   ```

5. Start the application:
   ```sh
   npm start
   ```

## 📝 License
This project is licensed under the MIT License.

<a href="https://www.flaticon.com/free-icons/dashboard" title="dashboard icons">Dashboard icons created by Pixel perfect - Flaticon</a>