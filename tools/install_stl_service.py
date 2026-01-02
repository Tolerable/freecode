#!/usr/bin/env python3
"""
Install STL Poller as Windows Service
Run as admin: py install_stl_service.py install
"""

import sys
import os
import subprocess

SERVICE_NAME = "STLPollerService"
DISPLAY_NAME = "3D Pattern STL Generator"
DESCRIPTION = "Polls for image uploads and generates STL files"
SCRIPT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'stl_poller.py')
PYTHON_PATH = sys.executable

def install():
    """Install as Windows service using NSSM"""
    # Check for NSSM
    nssm = r"C:\tools\nssm.exe"
    if not os.path.exists(nssm):
        print("NSSM not found at C:\\tools\\nssm.exe")
        print("Download from: https://nssm.cc/download")
        print("")
        print("Alternative: Use Task Scheduler to run on startup:")
        print(f'  schtasks /create /tn "{SERVICE_NAME}" /tr "{PYTHON_PATH} {SCRIPT_PATH}" /sc onstart /ru SYSTEM')
        return

    # Install service
    cmds = [
        [nssm, 'install', SERVICE_NAME, PYTHON_PATH, SCRIPT_PATH],
        [nssm, 'set', SERVICE_NAME, 'DisplayName', DISPLAY_NAME],
        [nssm, 'set', SERVICE_NAME, 'Description', DESCRIPTION],
        [nssm, 'set', SERVICE_NAME, 'Start', 'SERVICE_AUTO_START'],
        [nssm, 'set', SERVICE_NAME, 'AppStdout', os.path.join(os.path.dirname(SCRIPT_PATH), 'stl_poller_stdout.log')],
        [nssm, 'set', SERVICE_NAME, 'AppStderr', os.path.join(os.path.dirname(SCRIPT_PATH), 'stl_poller_stderr.log')],
    ]

    for cmd in cmds:
        subprocess.run(cmd)

    print(f"Service '{SERVICE_NAME}' installed!")
    print(f"Start with: nssm start {SERVICE_NAME}")
    print(f"Or run: net start {SERVICE_NAME}")

def uninstall():
    """Remove Windows service"""
    nssm = r"C:\tools\nssm.exe"
    if os.path.exists(nssm):
        subprocess.run([nssm, 'stop', SERVICE_NAME])
        subprocess.run([nssm, 'remove', SERVICE_NAME, 'confirm'])
    else:
        subprocess.run(['sc', 'stop', SERVICE_NAME])
        subprocess.run(['sc', 'delete', SERVICE_NAME])
    print(f"Service '{SERVICE_NAME}' removed")

def status():
    """Check service status"""
    result = subprocess.run(['sc', 'query', SERVICE_NAME], capture_output=True, text=True)
    print(result.stdout)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} [install|uninstall|status]")
        print("")
        print("Or run poller directly: py stl_poller.py")
        sys.exit(1)

    action = sys.argv[1].lower()
    if action == 'install':
        install()
    elif action == 'uninstall':
        uninstall()
    elif action == 'status':
        status()
    else:
        print(f"Unknown action: {action}")
