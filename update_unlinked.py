import os
import re

# Get all HTML files
html_files = []
for root, dirs, files in os.walk('.'):
    # Skip certain directories
    if any(skip in root for skip in ['.git', 'node_modules', '__pycache__']):
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file).replace(chr(92), '/').replace('./', '')
            html_files.append(filepath)

# Read navigation and parody page
with open('components/nav.html', 'r', encoding='utf-8') as f:
    nav_content = f.read()

parody_content = ''
if os.path.exists('parody.html'):
    with open('parody.html', 'r', encoding='utf-8') as f:
        parody_content = f.read()

# Find all href links
nav_links = set(re.findall(r'href=["\']([^"\']*\.html)["\']', nav_content))
parody_links = set(re.findall(r'href=["\']([^"\']*\.html)["\']', parody_content))
all_links = nav_links | parody_links

# Files we've already documented/dealt with
dealt_with = {
    '404.html', 'fibgen.html', 'ftplanner.html', 'cameras.html', 'chatbot.html',
    'for_other_projects/growroom.html', 'archive/deepseek.html', 'archive/deepthink.html',
    'archive/evil.html', 'archive/gpt.html', 'archive/grok.html', 'aichat.html',
    'components/nav.html', 'backups/mistral2.html'
}

# Categorize files
linked = []
unlinked = []

for filepath in sorted(html_files):
    filename = os.path.basename(filepath)

    # Check if linked or dealt with
    is_linked = any(link.endswith(filename) or filename in link for link in all_links)
    is_dealt_with = filepath in dealt_with

    if is_linked or is_dealt_with:
        linked.append(filepath)
    else:
        unlinked.append(filepath)

# Generate HTML
html_output = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unlinked Pages Review - FreeCode</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: 'Arial', sans-serif;
            background-color: #1a1a1a;
            padding: 20px;
            color: #fff;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: #2c2c2c;
            border-radius: 15px;
            padding: 40px;
        }}
        h1 {{
            color: #4a9eff;
            margin-bottom: 20px;
        }}
        .stats {{
            background: #1a1a1a;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }}
        .stats h2 {{
            color: #4a9eff;
            margin-bottom: 10px;
        }}
        .section {{
            margin-bottom: 40px;
        }}
        .section h2 {{
            color: #4a9eff;
            border-bottom: 2px solid #4a9eff;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }}
        ul {{
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }}
        li {{
            display: inline-block;
            padding: 8px 15px;
            background: #1a1a1a;
            border-radius: 5px;
        }}
        a {{
            color: #4a9eff;
            text-decoration: none;
            white-space: nowrap;
        }}
        a:hover {{
            text-decoration: underline;
        }}
        .back-link {{
            display: inline-block;
            margin-bottom: 20px;
            padding: 10px 20px;
            background: #dc2626;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }}
        .back-link:hover {{
            background: #4a9eff;
        }}
    </style>
</head>
<body>
    <div class="container">
        <a href="index.html" class="back-link">← Back to Home</a>

        <h1>Unlinked Pages Review</h1>

        <div class="stats">
            <h2>Statistics</h2>
            <p><strong>Total HTML Files:</strong> {len(html_files)}</p>
            <p><strong>Linked/Dealt With:</strong> {len(linked)}</p>
            <p><strong>Still Need Review:</strong> {len(unlinked)}</p>
            <p><strong>Percentage Remaining:</strong> {(len(unlinked)/len(html_files)*100):.1f}%</p>
        </div>

        <div class="section">
            <h2>Pages Needing Review ({len(unlinked)})</h2>
            <ul>
'''

for filepath in unlinked:
    html_output += f'                <li><a href="{filepath}" target="_blank">{filepath}</a></li>\n'

html_output += '''            </ul>
        </div>
    </div>
</body>
</html>
'''

# Write output
with open('unlinked.html', 'w', encoding='utf-8') as f:
    f.write(html_output)

print(f'[OK] Generated unlinked.html')
print(f'Total: {len(html_files)} | Dealt with: {len(linked)} | Need review: {len(unlinked)}')
