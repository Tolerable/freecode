import fnmatch

# Test both patterns
test_files = [
    'index-0001.html',
    'index-0042.html',
    'aichat-0084-!!WORKING!!.html',
    'deepthink-0068-!!WORKING!!.html',
    'quickmeals-0026-!!WORKING-REGISTERED!!.html',
    'index.html',
    'normal.html',
    'multi-word-title.html',  # Legitimate hyphenated filename
    'archive-gate.html',  # Another real file from your repo
]

# Current pattern (exact 4 digits)
pattern1 = '*-[0-9][0-9][0-9][0-9].html'
pattern1_extra = '*-[0-9][0-9][0-9][0-9]-*.html'  # For files like -0084-!!WORKING!!

# Your suggested pattern (any hyphen)
pattern2 = '*-*.html'

print('=== PATTERN COMPARISON ===')
print()
print('CURRENT APPROACH: *-[0-9][0-9][0-9][0-9].html + *-[0-9][0-9][0-9][0-9]-*.html')
print('  (Matches: filename-0001.html AND filename-0001-WORKING.html)')
print()
for f in test_files:
    match1 = fnmatch.fnmatch(f, pattern1)
    match2 = fnmatch.fnmatch(f, pattern1_extra)
    result = 'IGNORE' if (match1 or match2) else 'KEEP'
    print(f'  {f:45s} -> {result}')

print()
print('YOUR SUGGESTED: *-*.html')
print('  (Matches: ANY file with hyphen)')
print()
for f in test_files:
    match = fnmatch.fnmatch(f, pattern2)
    result = 'IGNORE' if match else 'KEEP'
    print(f'  {f:45s} -> {result}')

print()
print('PROBLEM: *-*.html would ALSO ignore legitimate files like:')
print('  - archive-gate.html')
print('  - multi-word-title.html')
print('  - Any hyphenated filename')
