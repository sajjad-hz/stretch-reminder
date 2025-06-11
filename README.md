# 💪 Stretch Reminder App

A simple desktop application that reminds you to take breaks and do stretches throughout your workday. Perfect for maintaining good posture and preventing work-related muscle strain.

## Features

- ⏰ **Customizable Reminder Intervals**: Set reminders from 5 minutes to 2 hours
- 🕐 **Work Hours Configuration**: Only receive reminders during your specified work hours
- 💡 **Stretch Suggestions**: Built-in list of helpful stretch exercises
- 💾 **Settings Persistence**: Your preferences are saved between sessions
- 🎨 **Modern GUI**: Clean, user-friendly interface
- 🔔 **Desktop Notifications**: Pop-up reminders that appear on top of other windows

## Requirements

- Windows 10 or later
- Python 3.6 or later
- tkinter (usually comes with Python)

## Installation

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd stretch-reminder
   ```

2. **Install dependencies** (optional - tkinter is usually included with Python)
   ```bash
   pip install -r requirements.txt
   ```

## How to Run

1. **Open Command Prompt or PowerShell**
2. **Navigate to the project directory**
   ```bash
   cd C:\Projects\stretch-reminder
   ```
3. **Run the application**
   ```bash
   python stretch_reminder.py
   ```

## Usage

1. **Configure Settings**:
   - Set your preferred reminder interval (default: 30 minutes)
   - Set your work hours (default: 9:00 AM - 5:00 PM)

2. **Start Reminders**:
   - Click the "Start Reminders" button
   - The app will run in the background and show pop-up reminders

3. **Stop Reminders**:
   - Click the "Stop Reminders" button to pause notifications
   - Or close the app (it will ask for confirmation if reminders are running)

## Stretch Suggestions Included

The app includes helpful stretch suggestions such as:
- Neck stretches
- Shoulder rolls
- Wrist stretches
- Standing stretches
- Leg stretches
- Eye exercises
- Deep breathing
- Walking breaks

## Settings

Your settings are automatically saved to `stretch_reminder_settings.json` and will be restored when you restart the app.

## Tips for Best Results

- Set reminders for every 30-60 minutes during long work sessions
- Take the full break time to do stretches
- Adjust work hours to match your actual schedule
- Keep the app running in the background during work hours

## Troubleshooting

- **App won't start**: Make sure Python is installed and in your PATH
- **No reminders**: Check that you're within the configured work hours
- **Reminders too frequent**: Increase the interval in settings
- **App closes unexpectedly**: Check Windows Event Viewer for error details

## System Requirements

- **OS**: Windows 10/11
- **Python**: 3.6 or later
- **Memory**: Minimal (less than 50MB)
- **Storage**: Less than 1MB

## License

This project is open source and available under the MIT License.

---

**Stay healthy and productive! 💪** 