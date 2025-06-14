import tkinter as tk
from tkinter import ttk, messagebox
import threading
import time
from datetime import datetime, timedelta
import json
import os

class StretchReminder:
    def __init__(self, root):
        self.root = root
        self.root.title("Stretch Reminder")
        self.root.geometry("400x500")
        self.root.resizable(False, False)
        
        # Set window icon and style
        self.root.configure(bg='#f0f0f0')
        
        # Variables
        self.is_running = False
        self.reminder_thread = None
        self.interval_minutes = tk.IntVar(value=30)
        self.work_duration = tk.IntVar(value=8)
        self.start_time = tk.StringVar(value="09:00")
        self.end_time = tk.StringVar(value="17:00")
        
        # Load settings
        self.load_settings()
        
        self.create_widgets()
        
    def create_widgets(self):
        # Main title
        title_label = tk.Label(
            self.root, 
            text="💪 Stretch Reminder", 
            font=("Arial", 18, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50'
        )
        title_label.pack(pady=20)
        
        # Settings frame
        settings_frame = tk.LabelFrame(
            self.root, 
            text="Settings", 
            font=("Arial", 12, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50'
        )
        settings_frame.pack(padx=20, pady=10, fill="x")
        
        # Interval setting
        interval_frame = tk.Frame(settings_frame, bg='#f0f0f0')
        interval_frame.pack(padx=10, pady=5, fill="x")
        
        tk.Label(
            interval_frame, 
            text="Reminder Interval (minutes):", 
            font=("Arial", 10),
            bg='#f0f0f0'
        ).pack(anchor="w")
        
        interval_spinbox = tk.Spinbox(
            interval_frame, 
            from_=5, 
            to=120, 
            textvariable=self.interval_minutes,
            width=10,
            font=("Arial", 10)
        )
        interval_spinbox.pack(anchor="w", pady=2)
        
        # Work hours setting
        hours_frame = tk.Frame(settings_frame, bg='#f0f0f0')
        hours_frame.pack(padx=10, pady=5, fill="x")
        
        tk.Label(
            hours_frame, 
            text="Work Hours:", 
            font=("Arial", 10),
            bg='#f0f0f0'
        ).pack(anchor="w")
        
        time_frame = tk.Frame(hours_frame, bg='#f0f0f0')
        time_frame.pack(anchor="w", pady=2)
        
        tk.Label(time_frame, text="From:", bg='#f0f0f0').pack(side="left")
        start_time_entry = tk.Entry(
            time_frame, 
            textvariable=self.start_time,
            width=8,
            font=("Arial", 10)
        )
        start_time_entry.pack(side="left", padx=5)
        
        tk.Label(time_frame, text="To:", bg='#f0f0f0').pack(side="left", padx=(10, 0))
        end_time_entry = tk.Entry(
            time_frame, 
            textvariable=self.end_time,
            width=8,
            font=("Arial", 10)
        )
        end_time_entry.pack(side="left", padx=5)
        
        # Control buttons
        button_frame = tk.Frame(self.root, bg='#f0f0f0')
        button_frame.pack(pady=20)
        
        self.start_button = tk.Button(
            button_frame,
            text="Start Reminders",
            command=self.start_reminders,
            bg='#27ae60',
            fg='white',
            font=("Arial", 12, "bold"),
            width=15,
            height=2,
            relief="flat"
        )
        self.start_button.pack(side="left", padx=5)
        
        self.stop_button = tk.Button(
            button_frame,
            text="Stop Reminders",
            command=self.stop_reminders,
            bg='#e74c3c',
            fg='white',
            font=("Arial", 12, "bold"),
            width=15,
            height=2,
            relief="flat",
            state="disabled"
        )
        self.stop_button.pack(side="left", padx=5)
        
        # Status display
        status_frame = tk.LabelFrame(
            self.root, 
            text="Status", 
            font=("Arial", 12, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50'
        )
        status_frame.pack(padx=20, pady=10, fill="x")
        
        self.status_label = tk.Label(
            status_frame,
            text="Reminders are stopped",
            font=("Arial", 10),
            bg='#f0f0f0',
            fg='#7f8c8d'
        )
        self.status_label.pack(pady=10)
        
        # Next reminder display
        self.next_reminder_label = tk.Label(
            status_frame,
            text="",
            font=("Arial", 9),
            bg='#f0f0f0',
            fg='#95a5a6'
        )
        self.next_reminder_label.pack(pady=5)
        
        # Stretch suggestions
        suggestions_frame = tk.LabelFrame(
            self.root, 
            text="Stretch Suggestions", 
            font=("Arial", 12, "bold"),
            bg='#f0f0f0',
            fg='#2c3e50'
        )
        suggestions_frame.pack(padx=20, pady=10, fill="both", expand=True)
        
        suggestions_text = tk.Text(
            suggestions_frame,
            height=8,
            font=("Arial", 9),
            bg='#ffffff',
            wrap="word",
            state="disabled"
        )
        suggestions_text.pack(padx=10, pady=10, fill="both", expand=True)
        
        # Add stretch suggestions
        suggestions = [
            "• Neck stretches: Slowly tilt your head side to side",
            "• Shoulder rolls: Roll your shoulders forward and backward",
            "• Wrist stretches: Extend your arms and flex your wrists",
            "• Standing stretches: Reach up and stretch your arms",
            "• Leg stretches: Stand up and do some gentle leg stretches",
            "• Eye exercises: Look away from screen every 20 minutes",
            "• Deep breathing: Take 5 deep breaths",
            "• Walk around: Take a short walk around your workspace"
        ]
        
        suggestions_text.config(state="normal")
        for suggestion in suggestions:
            suggestions_text.insert(tk.END, suggestion + "\n")
        suggestions_text.config(state="disabled")
        
    def start_reminders(self):
        if not self.is_running:
            self.is_running = True
            self.start_button.config(state="disabled")
            self.stop_button.config(state="normal")
            self.status_label.config(text="Reminders are running", fg='#27ae60')
            
            # Start reminder thread
            self.reminder_thread = threading.Thread(target=self.reminder_loop, daemon=True)
            self.reminder_thread.start()
            
            # Save settings
            self.save_settings()
            
    def stop_reminders(self):
        if self.is_running:
            self.is_running = False
            self.start_button.config(state="normal")
            self.stop_button.config(state="disabled")
            self.status_label.config(text="Reminders are stopped", fg='#7f8c8d')
            self.next_reminder_label.config(text="")
            
    def reminder_loop(self):
        while self.is_running:
            current_time = datetime.now()
            
            # Check if we're within work hours
            start_time = datetime.strptime(self.start_time.get(), "%H:%M").time()
            end_time = datetime.strptime(self.end_time.get(), "%H:%M").time()
            current_time_only = current_time.time()
            
            if start_time <= current_time_only <= end_time:
                # Show reminder
                self.show_reminder()
                
                # Calculate next reminder time
                next_reminder = current_time + timedelta(minutes=self.interval_minutes.get())
                self.root.after(0, lambda: self.next_reminder_label.config(
                    text=f"Next reminder: {next_reminder.strftime('%H:%M')}"
                ))
                
                # Wait for the specified interval
                time.sleep(self.interval_minutes.get() * 60)
            else:
                # Outside work hours, wait 1 minute before checking again
                time.sleep(60)
                
    def show_reminder(self):
        # Create a simple notification window
        reminder_window = tk.Toplevel(self.root)
        reminder_window.title("Time to Stretch!")
        reminder_window.geometry("300x200")
        reminder_window.resizable(False, False)
        reminder_window.configure(bg='#3498db')
        
        # Center the window
        reminder_window.transient(self.root)
        reminder_window.grab_set()
        
        # Make window appear on top
        reminder_window.lift()
        reminder_window.attributes('-topmost', True)
        
        # Reminder content
        tk.Label(
            reminder_window,
            text="💪 Time to Stretch!",
            font=("Arial", 16, "bold"),
            bg='#3498db',
            fg='white'
        ).pack(pady=20)
        
        tk.Label(
            reminder_window,
            text="Take a break and do some stretches!",
            font=("Arial", 10),
            bg='#3498db',
            fg='white'
        ).pack(pady=10)
        
        # OK button
        ok_button = tk.Button(
            reminder_window,
            text="OK, I'll stretch!",
            command=reminder_window.destroy,
            bg='#2ecc71',
            fg='white',
            font=("Arial", 12, "bold"),
            width=15,
            relief="flat"
        )
        ok_button.pack(pady=20)
        
        # Auto-close after 30 seconds
        reminder_window.after(30000, reminder_window.destroy)
        
    def save_settings(self):
        settings = {
            'interval_minutes': self.interval_minutes.get(),
            'start_time': self.start_time.get(),
            'end_time': self.end_time.get()
        }
        
        try:
            with open('stretch_reminder_settings.json', 'w') as f:
                json.dump(settings, f)
        except Exception as e:
            print(f"Error saving settings: {e}")
            
    def load_settings(self):
        try:
            if os.path.exists('stretch_reminder_settings.json'):
                with open('stretch_reminder_settings.json', 'r') as f:
                    settings = json.load(f)
                    
                self.interval_minutes.set(settings.get('interval_minutes', 30))
                self.start_time.set(settings.get('start_time', '09:00'))
                self.end_time.set(settings.get('end_time', '17:00'))
        except Exception as e:
            print(f"Error loading settings: {e}")

def main():
    root = tk.Tk()
    app = StretchReminder(root)
    
    # Handle window close
    def on_closing():
        if app.is_running:
            if messagebox.askokcancel("Quit", "Reminders are still running. Do you want to stop them and quit?"):
                app.stop_reminders()
                root.destroy()
        else:
            root.destroy()
    
    root.protocol("WM_DELETE_WINDOW", on_closing)
    root.mainloop()

if __name__ == "__main__":
    main() 