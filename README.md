# TuniVibe Website

TuniVibe is a comprehensive event management and booking platform designed to connect event organizers with attendees. The application features a robust backend built with Spring Boot and a modern, responsive frontend developed with React and Vite.

## 🚀 Features

### User Management
- **Authentication**: Secure login and registration system.
- **Roles**:
  - **User**: Can browse events and book tickets.
  - **Organizer**: Can create and manage events (requires admin approval).
  - **Admin**: Manages users, approves organizer accounts, and oversees the platform.

### Event Management
- **Create Events**: Organizers can publish new events with details like date, time, capacity, and ticket price.
- **Browse Events**: Users can view all events or filter them by category.
- **Event Details**: Detailed view of event information.
- **Status Management**: Automatic updates for past events.

### Reservation System
- **Booking**: Users can reserve tickets for available events.
- **Availability Check**: Real-time check for ticket availability.
- **Payment Simulation**: Integrated payment form interface.
- **Vouchers**: Generation of booking vouchers/tickets.

### Admin Dashboard
- **Organizer Approval**: Review and approve pending organizer accounts.
- **Platform Oversight**: Manage events and users.

## 🛠️ Tech Stack

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 4.0.0
- **Database**: MongoDB
- **Dependencies**:
  - Spring Data MongoDB
  - Spring Web MVC
  - Spring Boot Validation

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons, Lucide React
- **Utilities**: QRCode.react

## 📂 Project Structure

```
TuniVibe-Website/
├── backend/                # Spring Boot Application
│   ├── src/main/java/      # Java Source Code
│   │   ├── controller/     # API Controllers
│   │   ├── model/          # Data Models
│   │   └── repository/     # Database Repositories
│   └── src/main/resources/ # Configuration (application.properties)
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Application Pages
│   │   └── services/       # API Service Calls
│   └── public/             # Static Assets
└── photos_events/          # Event Images Storage
```

## ⚙️ Setup & Installation

### Prerequisites
- **Java Development Kit (JDK)** 17 or higher
- **Node.js** and **npm**
- **MongoDB** installed and running locally

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Ensure MongoDB is running on `localhost:27017`.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server will start (typically on `http://localhost:8080`).

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173`.

## 🔌 API Endpoints

### Events (`/api/events`)
- `GET /`: List all events
- `POST /`: Create a new event
- `GET /{id}`: Get event details

### Users (`/api/users`)
- `POST /`: Register a new user
- `POST /login`: User login
- `GET /admin/organisateurs/pending`: List pending organizer requests (Admin)
- `PUT /admin/organisateurs/{id}/approve`: Approve an organizer (Admin)

### Reservations (`/api/reservations`)
- `POST /`: Create a reservation
- `GET /user/{userId}`: Get reservations by user
- `GET /event/{eventId}`: Get reservations by event

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
[Add License Information Here]
