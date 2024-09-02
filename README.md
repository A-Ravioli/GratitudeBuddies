# **Gratitude Buddies**

A simple Progressive Web App (PWA) designed for daily gratitude journaling. The app allows users to jot down what went well each day, share their notes with a friend, and review past entries—all within a clean, minimalist interface.

## **Features**

- **Daily Journaling**: Write a gratitude journal entry each day, reflecting on positive experiences.
- **Single Entry per Day**: Users can submit one entry per day and are allowed to edit it afterward.
- **Bullet Point Notes**: Journal entries are formatted as bullet points for clarity and simplicity.
- **Friend Sharing**: Choose a friend to share your daily entries with and see their entries.
- **View History**: Access and review all past journal entries.
- **Notifications**: Receive reminders to fill out your daily journal and notifications when your friend completes theirs.
- **Offline Access**: As a PWA, the app works offline, storing notes on the user's device.

## **Tech Stack**

- **Frontend**: React with React Router for navigation.
- **Styling**: Bootstrap for UI components and custom CSS for a dark theme.
- **Local Storage**: Browser `localStorage` is used to store journal entries locally on the device.
- **Backend**: Node.js and Express server (if connecting to MongoDB for username storage).
- **Database**: MongoDB to store unique usernames and friend relationships.
- **Deployment**: Vite for building the app and Supabase for deployment.

## **Setup Instructions**

Follow these steps to run the app locally on your machine:

### **Prerequisites**

- Node.js and npm installed on your system.
- MongoDB database set up (local or cloud-based, e.g., MongoDB Atlas).
- Supabase account for deployment (optional).

### **Installation**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/gratitude-journal-app.git
   cd gratitude-journal-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   If you're using MongoDB, create a `.env` file in the root directory and add your MongoDB connection string:

   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gratitudeJournal?retryWrites=true&w=majority
   ```

4. **Run the App Locally**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000`.

### **Deployment**

To deploy the app to Supabase, follow these steps:

1. **Build the App**

   ```bash
   npm run build
   ```

2. **Deploy Using Supabase**

   - Install the Supabase CLI:

     ```bash
     npm install -g supabase
     ```

   - Initialize and deploy:

     ```bash
     supabase init
     supabase deploy
     ```

   Ensure to set up any necessary environment variables in your Supabase project settings.

## **Usage**

- **Sign Up**: Enter a unique username upon your first visit.
- **Daily Entry**: Go to the "Today's Journal" page, write your daily gratitude notes in bullet points, and save.
- **Edit Entry**: If you've already submitted an entry for today, you can edit it.
- **View History**: Go to the "History" tab to see all your past entries.
- **Friend Sharing**: Enter your friend's username to link and view their journal entries.
- **Notifications**: Receive reminders to fill out your daily journal and notifications when your friend completes theirs.

## **Contributing**

Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## **Acknowledgments**

- Thanks to all the contributors who helped build this project.
- Inspired by the benefits of daily gratitude journaling for mental well-being.

---

Happy journaling! ✨

---