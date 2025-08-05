# MyEduMate 📚

**Your Personal Study Companion Powered by AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Rajath-Raj/MyEduMate)
[![Contributors](https://img.shields.io/github/contributors/Rajath-Raj/MyEduMate)](https://github.com/Rajath-Raj/MyEduMate/graphs/contributors)

MyEduMate is an innovative application designed to revolutionize how you interact with educational materials, specifically PDFs. Leveraging the power of the **Google Gemini API**, MyEduMate provides intelligent summaries and answers your questions, transforming static documents into dynamic learning experiences.

---

## 📖 Table of Contents

- [✨ Introduction](#myedumate-)
- [🤔 How It Works](#-how-it-works)
- [🚀 Key Features](#-key-features)
- [📸 Screenshots](#-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💡 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🤔 How It Works

The workflow is simple and user-centric:

1.  **Sign Up / Log In:** Create a secure account or log in using your credentials.
2.  **Upload a PDF:** Select a PDF document from your local machine that you want to study.
3.  **Choose Summary Level:** Specify whether you want a beginner, intermediate, or expert-level summary.
4.  **AI Processing:** Our backend uses the Gemini API to read, analyze, and generate comprehensive summaries of the document.
5.  **Learn & Interact:** View the generated summaries and use the interactive chatbot to ask specific questions about the content. Your progress is saved to your profile.

---

## 🚀 Key Features

-   **🔒 User Authentication:** Secure login and signup with Firebase Authentication, including email/password options.
-   **📊 Intuitive Dashboard:** A welcoming hub with easy access to PDF uploads and your learning history.
-   **📤 Seamless PDF Upload:** Simple drag-and-drop or file-picker interface to upload PDFs and select desired summary levels.
-   **📝 Dynamic Summarized View:** View summarized content organized into digestible sections like 'TL;DR' and section-wise breakdowns.
-   **💬 Interactive Chatbot:** A WhatsApp-style interface powered by Gemini for asking questions about your PDF content, complete with pre-suggested prompts.
-   **📈 Profile & Progress Tracking:** Track your past PDFs and time spent reading, with the option to download summaries.
-   **⚙️ Customizable Settings:** Personalize your experience with features like dark mode, text-to-speech, and history management.

---

## 📸 Screenshots

*(It is highly recommended to add screenshots of your application here to give users a visual preview.)*

| Dashboard                                   | Chat Interface                              |
| ------------------------------------------- | ------------------------------------------- |
| ![Dashboard Screenshot](path/to/dashboard.png) | ![Chat Screenshot](path/to/chat.png)        |

---

## 🛠️ Tech Stack

This project is built with a modern, scalable technology stack:

| Category          | Technology                                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) or ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)                                                                                                |
| **AI** | ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B7?style=for-the-badge&logo=google&logoColor=white)                                                                                      |
| **Services** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) (Authentication, Storage, Firestore)                                                         |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)                                                                                   |

---

## ⚙️ Getting Started

Follow these steps to get MyEduMate running on your local machine.

### Prerequisites

Make sure you have the following installed on your system:
-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Rajath-Raj/MyEduMate.git](https://github.com/Rajath-Raj/MyEduMate.git)
    cd MyEduMate
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of the project and add the following configuration.

    ```env
    # Gemini API Key
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY

    # Firebase Configuration (get this from your Firebase project console)
    REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
    ```
    *Note: If you are not using Create React App, you may need to adjust the `REACT_APP_` prefix.*

4.  **Run the development server:**
    ```bash
    npm run start
    ```
    The application should now be running on `http://localhost:3000`.

---

## 💡 Usage

1.  Navigate to the signup page and create an account.
2.  Once logged in, you will be directed to your dashboard.
3.  Click the 'Upload PDF' button to select a document.
4.  After the upload is complete, you can view the summary or start a chat session.
5.  Use the chat to ask specific questions about the PDF content.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please make sure to update tests as appropriate.

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.
