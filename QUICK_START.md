# 🚀 Quick Start Guide - Electron React Stretch Reminder

## Prerequisites Check

First, make sure you have Node.js installed:
```bash
node --version
npm --version
```

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org/)

## 🎯 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run electron-dev
```

This will:
- Start the React development server
- Launch Electron with the React app
- Enable hot reloading for development

### 3. Build for Production
```bash
# Build for Windows
npm run dist-win

# Build for macOS
npm run dist-mac

# Build for Linux
npm run dist-linux
```

## 🎨 What You'll See

- **Modern UI**: Beautiful glassmorphism design with gradients
- **Settings Panel**: Configure reminder intervals and work hours
- **Status Display**: See if reminders are running and next reminder time
- **Stretch Suggestions**: Built-in list of helpful exercises
- **System Tray**: App minimizes to system tray with context menu

## 🔧 Key Features

- **Customizable Intervals**: 5 minutes to 2 hours
- **Work Hours**: Set specific times for reminders
- **Desktop Notifications**: Native system notifications
- **Tray Integration**: Right-click tray icon for quick actions
- **Settings Persistence**: Your preferences are automatically saved

## 💡 Pro Tips

- Use `npm run electron-dev` for development with hot reload
- The app minimizes to system tray when closed
- Right-click the tray icon for quick access to controls
- Settings are automatically saved between sessions

## 🐛 Common Issues

- **"npm not found"**: Install Node.js from nodejs.org
- **Build errors**: Run `npm install` again
- **No notifications**: Check your system notification settings
- **App won't start**: Check the console for error messages

---

**That's it! Enjoy your modern stretch reminder app! 💪** 