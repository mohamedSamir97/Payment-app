## 🌟 Project Overview

The core of this system is a secure API-driven payment gateway for processing card payments, built with adherence to industry best practices for data security. Coupled with this is a user-friendly and interactive reporting dashboard that visualizes payment data, offering valuable business insights through various reports and data visualizations. The application is designed with a Clean Architecture approach to ensure scalability, maintainability, and testability for future growth and enhancements.

## ✨ Key Features

* **Secure Payment Gateway:** A highly secure API-driven platform for processing card payments, incorporating Luhn algorithm checks, expiry date validation, and simulated bank checks.
* **Automated Payment Confirmation:** A background process to automatically confirm "Held" transactions.
* **Refund Processing:** An API for processing refunds for held payments with a unique refund code validation.
* **Comprehensive Reporting Dashboard:** A web-based interface providing paginated reports for:
    * Payment Transactions (with filtering by status, start date, end date)
    * Card Balances (with filtering by card number)
* **Data Visualization:** Interactive charts (via Chart.js) to visually represent payment data and trends.
* **Clean Architecture:** Structured codebase with distinct layers (Domain, Application, Infrastructure, Presentation) for clear separation of concerns, maintainability, and testability.

## 🛠️ Technologies Used

### Backend (ASP.NET Core 8)

* **Framework:** ASP.NET Core 8 Web API
* **Database:** Microsoft SQL Server (via Entity Framework Core)
* **Language:** C#
* **Development Environment:** Visual Studio

### Frontend (React JS v18)

* **Framework:** React JS v18 (Single-Page Application - SPA)
* **Tooling:** Vite
* **Language:** TypeScript
* **HTTP Client:** Axios
* **Charting Library:** Chart.js
* **Development Environment:** Node.js

## 📂 Project Structure

The project is logically divided into two main directories:

* `Front-end/`: Contains the complete React application.
* `Back-end/`: Contains the ASP.NET Core 8 Web API project.

## 🤝 Tools & Contributors

This project was developed with the assistance of:

* **Google Gemini:** Used for backend development.
* **Copilot:** Utilized for fixing small errors.
* **Lovable:** Contributed to the frontend development.

**Note:** The frontend application includes mock data for initial development and testing purposes.

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Visual Studio](https://visualstudio.microsoft.com/downloads/) (Recommended for Backend)
* [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or SQL Server Express)
* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/getting-started/install)

### Backend Setup (ASP.NET Core 8 API)

1.  **Navigate to the Backend Directory:**

    ```bash
    cd Back-end
    ```

2.  **Configure Database Connection:**

    * Open the `appsettings.json` file in the `Back-end` project.
    * Locate the `ConnectionStrings` section and update the `DefaultConnection` string to point to your SQL Server instance.

    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=PaymentAppDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
      },
      // ... other settings
    }
    ```

    *Replace `YOUR_SERVER_NAME` with your actual SQL Server instance name (e.g., `.` for localdb, `localhost\SQLEXPRESS`).*

3.  **Apply Migrations and Update Database (First Time Only):**

    * Open a terminal in the `Back-end` directory or use the Package Manager Console in Visual Studio.
    * Run the following commands to create the database and apply migrations:

    ```bash
    dotnet ef database update
    ```

    *If you haven't added migrations, you might need to run `dotnet ef migrations add InitialCreate` first, then `dotnet ef database update`.*

4.  **Run the Backend API:**

    ```bash
    dotnet run
    ```

    The API will typically run on `https://localhost:7xxx` (e.g., `https://localhost:7001`). Note this URL, as you'll need it for the frontend configuration.

### Frontend Setup (React JS)

1.  **Navigate to the Frontend Directory:**
    Open a *new* terminal window and navigate to the frontend project:

    ```bash
    cd Front-end
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Update Backend API URL:**

    * Open the `src/config/api.ts` file in your `Front-end` project.
    * Update the `API_BASE_URL` constant to the URL where your backend API is running (e.g., `https://localhost:7001`).

    ```typescript
    // src/config/api.ts
    export const API_BASE_URL = 'YOUR_BACKEND_API_URL_HERE'; // e.g., 'https://localhost:7001'
    ```

4.  **Run the Frontend Application:**

    ```bash
    npm run dev
    # OR
    yarn dev
    ```

    The React application will usually open in your browser at `http://localhost:8080` (or a similar port) based on vite configuration.

You should now have both the backend API and the frontend application running!
