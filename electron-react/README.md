# 💪 Stretch Reminder - Electron React Version

A modern, beautiful desktop application built with Electron and React to remind you to take breaks and do stretches throughout your workday. Features a sleek UI with glassmorphism design and comprehensive functionality.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation & Development
```bash
cd electron-react
npm install
npm run electron-dev
```

### Production Build
```bash
npm run dist-win  # Windows
npm run dist-mac  # macOS
npm run dist-linux  # Linux
```

## ✨ Features

- 🎨 **Modern UI**: Beautiful glassmorphism design with gradient backgrounds
- ⏰ **Customizable Reminders**: Set intervals from 5 minutes to 2 hours
- 🕐 **Work Hours**: Configure specific work hours for reminders
- 🔔 **Desktop Notifications**: Native system notifications
- 🎯 **System Tray**: Minimize to tray with context menu
- 💾 **Settings Persistence**: Automatic saving of preferences
- 📱 **Responsive Design**: Works on different screen sizes
- 🚀 **Cross-platform**: Windows, macOS, and Linux support

## 🛠️ Tech Stack

- **Frontend**: React 18, Styled Components
- **Desktop**: Electron 27
- **Icons**: React Icons
- **Storage**: Electron Store
- **Build**: Electron Builder

## 🎯 Usage

1. **Configure Settings**:
   - Set reminder interval (5 minutes to 2 hours)
   - Set work hours (when to receive reminders)

2. **Start Reminders**:
   - Click the green "Start" button
   - App will run in background and show notifications

3. **System Tray**:
   - Right-click tray icon for quick actions
   - Click tray icon to show/hide app

4. **Minimize to Tray**:
   - Close button minimizes to system tray
   - App continues running in background

## 🎨 UI Features

- **Glassmorphism Design**: Modern translucent cards with blur effects
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Hover effects and transitions
- **Custom Title Bar**: Frameless window with custom controls
- **Responsive Layout**: Adapts to different window sizes

## 🔧 Configuration

The app automatically saves your settings to:
- Windows: `%APPDATA%/stretch-reminder/config.json`
- macOS: `~/Library/Application Support/stretch-reminder/config.json`
- Linux: `~/.config/stretch-reminder/config.json`

## 📦 Build Scripts

```bash
npm start              # Start React dev server
npm run build          # Build React app
npm run electron       # Run Electron in production
npm run electron-dev   # Run in development mode
npm run dist           # Build distributable
npm run dist-win       # Build Windows installer
npm run dist-mac       # Build macOS app
npm run dist-linux     # Build Linux AppImage
```

## 🎯 Stretch Suggestions Included

- Eye exercises (look away from screen)
- Neck stretches
- Shoulder rolls
- Wrist stretches
- Standing stretches
- Walking breaks
- Deep breathing exercises
- Leg stretches

## 🔧 Development

### Adding New Features
1. Modify React components in `src/`
2. Update Electron main process in `public/electron.js`
3. Add new IPC handlers for communication

### Styling
- Uses Styled Components for CSS-in-JS
- Glassmorphism design system
- Responsive breakpoints

### Electron Integration
- IPC communication between main and renderer processes
- System tray integration
- Native notifications
- Settings persistence

## 🚀 Deployment

### Windows
```bash
npm run dist-win
# Creates optimized build in dist/ folder
```

### macOS
```bash
npm run dist-mac
# Creates .dmg file in dist/ folder
```

### Linux
```bash
npm run dist-linux
# Creates AppImage in dist/ folder
```

## 🐛 Troubleshooting

- **App won't start**: Check Node.js version and run `npm install`
- **No notifications**: Check system notification settings
- **Build fails**: Clear `node_modules` and reinstall dependencies
- **Tray not working**: Check if system supports tray icons

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Stay healthy and productive! 💪** 