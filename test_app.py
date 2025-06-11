#!/usr/bin/env python3
"""
Simple test script to verify the stretch reminder app works correctly.
"""

import sys
import tkinter as tk

def test_imports():
    """Test that all required modules can be imported."""
    try:
        import threading
        import time
        from datetime import datetime, timedelta
        import json
        import os
        print("✓ All required modules imported successfully")
        return True
    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False

def test_tkinter():
    """Test that tkinter is working."""
    try:
        root = tk.Tk()
        root.withdraw()  # Hide the window
        root.destroy()
        print("✓ Tkinter is working correctly")
        return True
    except Exception as e:
        print(f"✗ Tkinter error: {e}")
        return False

def test_main_app():
    """Test that the main app can be imported."""
    try:
        # This will import the main app but not run it
        import stretch_reminder
        print("✓ Main app module imported successfully")
        return True
    except Exception as e:
        print(f"✗ Main app import error: {e}")
        return False

def main():
    """Run all tests."""
    print("Testing Stretch Reminder App...")
    print("=" * 40)
    
    tests = [
        test_imports,
        test_tkinter,
        test_main_app
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 40)
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! The app should work correctly.")
        print("\nTo run the app, use:")
        print("  python stretch_reminder.py")
        print("  or double-click run_stretch_reminder.bat")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main() 