# Plus

A Twitter-esque app for gratitude journaling with your friends. It's like BeReal + bullet journaling where you have positive journals with your friends in a Twitter-like feed.

## Features

- Create daily gratitude journal entries in a bullet-point format
- Add images to your gratitude points
- View your friends' gratitude journals after you've posted your own
- Simple, clean dark-themed UI

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo Go app on your mobile device or iOS/Android emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plus.git
cd plus
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Scan the QR code with the Expo Go app on your mobile device, or press 'i' or 'a' in the terminal to open in an iOS or Android emulator.

## How It Works

1. Each day, you can create a new gratitude journal entry
2. Add bullet points of things you're grateful for
3. Optionally add images to your bullet points
4. Submit your entry
5. After posting, you can see your friends' gratitude journals
6. The app resets daily, allowing for a new entry each day

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage for local data persistence
- Expo Image Picker for image selection