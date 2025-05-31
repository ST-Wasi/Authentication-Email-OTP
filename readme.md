# 🔐 Node.js OTP Authentication System

A robust and secure authentication system built with Node.js, featuring email-based OTP verification for both registration and login processes.

## 🌟 Features

- 📧 Email-based OTP Authentication
- 🔒 Secure Registration Flow
- 🔑 OTP-based Login System
- ⏰ Time-based OTP Expiry (10 minutes)
- 🎨 Beautiful Email Templates
- 🛡️ Input Validation
- ✨ Professional Error Handling

## 🏗️ Project Structure

```
login-signup-otp-node/
├── controllers/
│   └── user.controller.js     # Request handling and response formatting
├── models/
│   ├── index.js              # Models aggregator
│   └── User.js               # User schema definition
├── routes/
│   ├── index.js              # Routes aggregator
│   └── user.routes.js        # Authentication routes
├── services/
│   └── user.service.js       # Business logic implementation
├── utils/
│   ├── emailService.js       # Email sending functionality
│   ├── generateOtp.js        # OTP generation
│   └── verifyOtp.js         # OTP verification
├── constants/
│   └── messages.js          # Response messages
├── .env.example             # Environment variables template
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB
- Gmail Account (for sending OTP emails)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd login-signup-otp-node
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in .env:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/auth_db
   EMAIL_USER=your.email@gmail.com
   EMAIL_APP_PASSWORD=your_app_password_here
   ```

### 📧 Setting up Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to [App Passwords](https://myaccount.google.com/apppasswords)
5. Select 'Mail' and your device
6. Click 'Generate'
7. Copy the 16-character password
8. Paste it in your .env file as EMAIL_APP_PASSWORD

## 🛣️ API Routes

### Registration Flow

1. **Register User** - \`POST /auth/register\`
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "+1234567890"
   }
   ```
   - Creates new user
   - Sends OTP to email
   - Returns userId for verification

2. **Verify Registration** - \`POST /auth/verify-registration\`
   ```json
   {
     "userId": "user_id_from_registration",
     "otp": "123456"
   }
   ```
   - Verifies OTP
   - Activates user account

### Login Flow

1. **Login Request** - \`POST /auth/login\`
   ```json
   {
     "identifier": "john@example.com" // email or phone
   }
   ```
   - Validates user existence
   - Sends OTP to registered email
   - Returns userId for verification

2. **Verify Login** - \`POST /auth/verify-login\`
   ```json
   {
     "userId": "user_id_from_login",
     "otp": "123456"
   }
   ```
   - Verifies OTP
   - Returns user details on success

## 📁 File Descriptions

### Models
- **User.js**: Defines user schema with fields for name, email, phone, OTP, and verification status
- **index.js**: Aggregates and exports all models

### Controllers
- **user.controller.js**: Handles HTTP requests, validates inputs, and formats responses

### Services
- **user.service.js**: Contains core business logic for:
  - User registration
  - OTP verification
  - Login processing
  - Account verification

### Utils
- **emailService.js**: Handles email sending using nodemailer
- **generateOtp.js**: Generates secure 6-digit OTPs
- **verifyOtp.js**: Validates OTPs with expiry checking

### Routes
- **user.routes.js**: Defines API endpoints
- **index.js**: Route aggregation and middleware setup

## 🔒 Security Features

- OTP Expiry after 10 minutes
- Secure email delivery
- Input validation
- No OTP exposure in responses
- Unique email and phone validation
- Account verification status tracking

## 🌟 Best Practices

- Modular architecture
- Error handling
- Environment variable usage
- Code organization
- Async/await implementation
- Professional logging

## 📝 Response Format

Success Response:
```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

Error Response:
```json
{
  "success": false,
  "message": "Error message"
}
```

## 🤝 Contributing

Feel free to contribute to this project by creating issues or submitting pull requests.

## 📄 License

This project is licensed under the MIT License.
