import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import os
import requests
import threading
import json
import random
import time

class ComprehensiveMusicQuery:
    def __init__(self, root):
        self.root = root
        self.root.title("Music Style Analyzer")
        self.root.geometry("850x700")
        
        # Set up styles for colored indicators
        self.setup_styles()
        
        # Database file
        self.db_file = "music_styles.json"
        self.load_database()
        
        # Main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Tabs for different query types
        self.notebook = ttk.Notebook(main_frame)
        self.notebook.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        # Create tabs
        self.artist_tab = ttk.Frame(self.notebook)
        self.song_tab = ttk.Frame(self.notebook)
        self.era_tab = ttk.Frame(self.notebook)
        
        self.notebook.add(self.artist_tab, text="Artist/Genre")
        self.notebook.add(self.song_tab, text="Song/Album")
        self.notebook.add(self.era_tab, text="Era/Period")
        
        # Set up each tab
        self.setup_artist_tab()
        self.setup_song_tab()
        self.setup_era_tab()
        
        # Status bar (shared across tabs)
        self.status_var = tk.StringVar(value="Enter query details to analyze musical style")
        status_bar = ttk.Label(main_frame, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W)
        status_bar.pack(fill=tk.X, side=tk.BOTTOM)
        
        # Statistics frame (shared across tabs)
        stats_frame = ttk.LabelFrame(main_frame, text="Database Statistics")
        stats_frame.pack(fill=tk.X, pady=(0, 10))
        
        self.stats_label = ttk.Label(stats_frame, text="Loading database statistics...")
        self.stats_label.pack(fill=tk.X, padx=5, pady=5)
        
        # Set focus to first tab's search entry
        self.artist_entry.focus_set()
        
        # Update statistics
        self.update_statistics()
    
    def setup_styles(self):
        """Set up custom styles for the indicator label"""
        style = ttk.Style()
        
        # Define styles with different background colors
        style.configure("Cached.TLabel", background="#FFD700", foreground="black", font=("Arial", 9, "bold"), 
                      relief="raised", borderwidth=1)  # Gold for cached
        style.configure("Live.TLabel", background="#00CC66", foreground="black", font=("Arial", 9, "bold"), 
                      relief="raised", borderwidth=1)  # Green for live/API
        style.configure("Loading.TLabel", background="#FF9933", foreground="black", font=("Arial", 9, "bold"), 
                      relief="raised", borderwidth=1)  # Orange for loading
        style.configure("Error.TLabel", background="#FF6666", foreground="black", font=("Arial", 9, "bold"), 
                      relief="raised", borderwidth=1)  # Red for error
        style.configure("Ready.TLabel", background="#CCCCCC", foreground="black", font=("Arial", 9, "bold"), 
                      relief="raised", borderwidth=1)  # Gray for ready/idle
    
    def setup_artist_tab(self):
        """Set up the artist/genre tab"""
        # Search section with status indicator
        search_frame = ttk.Frame(self.artist_tab)
        search_frame.pack(fill=tk.X, pady=(10, 10))
        
        # Left side - search controls
        search_controls = ttk.Frame(search_frame)
        search_controls.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        ttk.Label(search_controls, text="Artist/Genre:").pack(side=tk.LEFT, padx=(0, 5))
        
        self.artist_search_var = tk.StringVar()
        self.artist_entry = ttk.Entry(search_controls, textvariable=self.artist_search_var, width=30)
        self.artist_entry.pack(side=tk.LEFT, padx=(0, 5))
        self.artist_entry.bind("<Return>", self.find_artist_style)
        
        ttk.Button(search_controls, text="Find Style", command=self.find_artist_style).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(search_controls, text="Clear", command=self.clear_artist_results).pack(side=tk.LEFT)
        
        # Right side - status indicator
        indicator_frame = ttk.Frame(search_frame)
        indicator_frame.pack(side=tk.RIGHT, padx=(20, 0))
        
        self.artist_source_var = tk.StringVar(value="READY")
        self.artist_indicator = ttk.Label(indicator_frame, textvariable=self.artist_source_var, width=8, 
                                       style="Ready.TLabel", anchor=tk.CENTER)
        self.artist_indicator.pack(side=tk.RIGHT)
        
        # Options section
        options_frame = ttk.Frame(self.artist_tab)
        options_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Left side - checkboxes
        checkbox_frame = ttk.Frame(options_frame)
        checkbox_frame.pack(side=tk.LEFT)
        
        # Force refresh option
        self.artist_force_refresh = tk.BooleanVar(value=False)
        ttk.Checkbutton(checkbox_frame, text="Force New API Query", 
                      variable=self.artist_force_refresh).pack(side=tk.LEFT, padx=(0, 15))
        
        # Random seed option
        self.artist_random_seed = tk.BooleanVar(value=True)
        ttk.Checkbutton(checkbox_frame, text="Use Random Seed", 
                      variable=self.artist_random_seed).pack(side=tk.LEFT)
        
        # Auto-save option
        self.artist_auto_save = tk.BooleanVar(value=True)
        ttk.Checkbutton(checkbox_frame, text="Auto-Save Results", 
                      variable=self.artist_auto_save).pack(side=tk.LEFT, padx=(15, 0))
        
        # Optional era/period specification
        era_frame = ttk.Frame(self.artist_tab)
        era_frame.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(era_frame, text="Specify Era/Period (optional):").pack(side=tk.LEFT, padx=(0, 5))
        
        self.artist_era_var = tk.StringVar()
        era_entry = ttk.Entry(era_frame, textvariable=self.artist_era_var, width=30)
        era_entry.pack(side=tk.LEFT)
        ttk.Label(era_frame, text="e.g., '1980s', 'Early career', 'Recent work'").pack(side=tk.LEFT, padx=(10, 0))
        
        # Results section
        results_frame = ttk.LabelFrame(self.artist_tab, text="Style Description")
        results_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        self.artist_results_text = scrolledtext.ScrolledText(results_frame, wrap=tk.WORD)
        self.artist_results_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # Results action buttons
        action_frame = ttk.Frame(self.artist_tab)
        action_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Left side - save/manage buttons
        manage_frame = ttk.Frame(action_frame)
        manage_frame.pack(side=tk.LEFT)
        
        ttk.Button(manage_frame, text="Save to Database", command=self.save_artist_result).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(manage_frame, text="Remove from Database", command=self.remove_artist_from_db).pack(side=tk.LEFT)
        ttk.Button(manage_frame, text="↻ Refresh Result", command=self.refresh_artist_result).pack(side=tk.LEFT, padx=(15, 0))
        
        # Right side - copy buttons
        copy_frame = ttk.Frame(action_frame)
        copy_frame.pack(side=tk.RIGHT)
        
        ttk.Button(copy_frame, text="Copy MUSICAL STYLE", 
                 command=lambda: self.copy_section(self.artist_results_text, "MUSICAL STYLE")).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(copy_frame, text="Copy LYRICAL GUIDANCE", 
                 command=lambda: self.copy_section(self.artist_results_text, "LYRICAL GUIDANCE")).pack(side=tk.LEFT)
    
    def setup_song_tab(self):
        """Set up the song/album tab"""
        # Search section with status indicator
        search_frame = ttk.Frame(self.song_tab)
        search_frame.pack(fill=tk.X, pady=(10, 10))
        
        # Left side - search controls
        search_controls = ttk.Frame(search_frame)
        search_controls.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        ttk.Label(search_controls, text="Song Title:").pack(side=tk.LEFT, padx=(0, 5))
        
        self.song_title_var = tk.StringVar()
        self.song_entry = ttk.Entry(search_controls, textvariable=self.song_title_var, width=30)
        self.song_entry.pack(side=tk.LEFT, padx=(0, 5))
        self.song_entry.bind("<Return>", self.find_song_style)
        
        ttk.Button(search_controls, text="Find Style", command=self.find_song_style).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(search_controls, text="Clear", command=self.clear_song_results).pack(side=tk.LEFT)
        
        # Right side - status indicator
        indicator_frame = ttk.Frame(search_frame)
        indicator_frame.pack(side=tk.RIGHT, padx=(20, 0))
        
        self.song_source_var = tk.StringVar(value="READY")
        self.song_indicator = ttk.Label(indicator_frame, textvariable=self.song_source_var, width=8, 
                                     style="Ready.TLabel", anchor=tk.CENTER)
        self.song_indicator.pack(side=tk.RIGHT)
        
        # Artist specification
        artist_frame = ttk.Frame(self.song_tab)
        artist_frame.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(artist_frame, text="Artist (recommended):").pack(side=tk.LEFT, padx=(0, 5))
        
        self.song_artist_var = tk.StringVar()
        artist_entry = ttk.Entry(artist_frame, textvariable=self.song_artist_var, width=30)
        artist_entry.pack(side=tk.LEFT)
        
        # Options section
        options_frame = ttk.Frame(self.song_tab)
        options_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Left side - checkboxes
        checkbox_frame = ttk.Frame(options_frame)
        checkbox_frame.pack(side=tk.LEFT)
        
        # Force refresh option
        self.song_force_refresh = tk.BooleanVar(value=False)
        ttk.Checkbutton(checkbox_frame, text="Force New API Query", 
                      variable=self.song_force_refresh).pack(side=tk.LEFT, padx=(0, 15))
        
        # Random seed option
        self.song_random_seed = tk.BooleanVar(value=True)
        ttk.Checkbutton(checkbox_frame, text="Use Random Seed", 
                      variable=self.song_random_seed).pack(side=tk.LEFT)
        
        # Auto-save option
        self.song_auto_save = tk.BooleanVar(value=True)
        ttk.Checkbutton(checkbox_frame, text="Auto-Save Results", 
                      variable=self.song_auto_save).pack(side=tk.LEFT, padx=(15, 0))
        
        # Additional options 
        specific_frame = ttk.Frame(self.song_tab)
        specific_frame.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(specific_frame, text="Album (optional):").pack(side=tk.LEFT, padx=(0, 5))
        
        self.song_album_var = tk.StringVar()
        album_entry = ttk.Entry(specific_frame, textvariable=self.song_album_var, width=30)
        album_entry.pack(side=tk.LEFT)
        
        ttk.Label(specific_frame, text="Year (optional):").pack(side=tk.LEFT, padx=(15, 5))
        
        self.song_year_var = tk.StringVar()
        year_entry = ttk.Entry(specific_frame, textvariable=self.song_year_var, width=10)
        year_entry.pack(side=tk.LEFT)
        
        # Results section
        results_frame = ttk.LabelFrame(self.song_tab, text="Song Style Analysis")
        results_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        self.song_results_text = scrolledtext.ScrolledText(results_frame, wrap=tk.WORD)
        self.song_results_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # Results action buttons
        action_frame = ttk.Frame(self.song_tab)
        action_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Left side - save/manage buttons
        manage_frame = ttk.Frame(action_frame)
        manage_frame.pack(side=tk.LEFT)
        
        ttk.Button(manage_frame, text="Save to Database", command=self.save_song_result).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(manage_frame, text="Remove from Database", command=self.remove_song_from_db).pack(side=tk.LEFT)
        ttk.Button(manage_frame, text="↻ Refresh Result", command=self.refresh_song_result).pack(side=tk.LEFT, padx=(15, 0))
        
        # Right side - copy buttons
        copy_frame = ttk.Frame(action_frame)
        copy_frame.pack(side=tk.RIGHT)
        
        ttk.Button(copy_frame, text="Copy MUSICAL STYLE", 
                 command=lambda: self.copy_section(self.song_results_text, "MUSICAL STYLE")).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(copy_frame, text="Copy PRODUCTION STYLE", 
                 command=lambda: self.copy_section(self.song_results_text, "PRODUCTION STYLE")).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(copy_frame, text="Copy LYRICAL CONTENT", 
                 command=lambda: self.copy_section(self.song_results_text, "LYRICAL CONTENT")).pack(side=tk.LEFT)
    
    def setup_era_tab(self):
        """Set up the era/period tab"""
        # Search section with status indicator
        search_frame = ttk.Frame(self.era_tab)
        search_frame.pack(fill=tk.X, pady=(10, 10))
        
        # Left side - search controls
        search_controls = ttk.Frame(search_frame)
        search_controls.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        ttk.Label(search_controls, text="Era/Period:").pack(side=tk.LEFT, padx=(0, 5))
        
        self.era_search_var = tk.StringVar()
        self.era_entry = ttk.Entry(search_controls, textvariable=self.era_search_var, width=30)
        self.era_entry.pack(side=tk.LEFT, padx=(0, 5))
        self.era_entry.bind("<Return>", self.find_era_style)
        
        ttk.Button(search_controls, text="Find Style", command=self.find_era_style).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(search_controls, text="Clear", command=self.clear_era_results).pack(side=tk.LEFT)
        
        # Right side - status indicator
        indicator_frame = ttk.Frame(search_frame)
        indicator_frame.pack(side=tk.RIGHT, padx=(20, 0))
        
        self.era_source_var = tk.StringVar(value="READY")
        self.era_indicator = ttk.Label(indicator_frame, textvariable=self.era_source_var, width=8, 
                                    style="Ready.TLabel", anchor=tk.CENTER)
        self.era_indicator.pack(side=tk.RIGHT)
        
        # Genre/location specification
        details_frame = ttk.Frame(self.era_tab)
        details_frame.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(details_frame, text="Genre (optional):").pack(side=tk.LEFT, padx=(0, 5))
        
        self.era_genre_var = tk.StringVar()
        genre_entry = ttk.Entry(details_frame, textvariable=self.era_genre_var, width=20)
        genre_entry.pack(side=tk.LEFT, padx=(0, 15))
        
        ttk.Label(details_frame, text="Location (optional):").pack(side=tk.LEFT, padx=(0, 5))
        
        self.era_location_var = tk.StringVar()
        location_entry = ttk.Entry(details_frame, textvariable=self.era_location_var, width=20)
        location_entry.pack(side=tk.LEFT)
        
        # Options section
        options_frame = ttk.Frame(self.era_tab)
        options_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Left side - checkboxes
        checkbox_frame = ttk.Frame(options_frame)
        checkbox_frame.pack(side=tk.LEFT)
        
        # Force refresh option
        self.era_force_refresh = tk.BooleanVar(value=False)
        ttk.Checkbutton(checkbox_frame, text="Force New API Query", 
                      variable=self.era_force_refresh).pack(side=tk.LEFT, padx=(0, 15))
        
        # Random seed option
        self.era_random_seed = tk.BooleanVar(value=True)
        ttk.Checkbutton(checkbox_frame, text="Use Random Seed", 
                      variable=self.era_random_seed).pack(side=tk.LEFT)
        
        # Auto-save option
        self.era_auto_save = tk.BooleanVar(value=True)
        ttk.Checkbutton(checkbox_frame, text="Auto-Save Results", 
                      variable=self.era_auto_save).pack(side=tk.LEFT, padx=(15, 0))
        
        # Results section
        results_frame = ttk.LabelFrame(self.era_tab, text="Era Style Analysis")
        results_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        self.era_results_text = scrolledtext.ScrolledText(results_frame, wrap=tk.WORD)
        self.era_results_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # Results action buttons
        action_frame = ttk.Frame(self.era_tab)
        action_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Left side - save/manage buttons
        manage_frame = ttk.Frame(action_frame)
        manage_frame.pack(side=tk.LEFT)
        
        ttk.Button(manage_frame, text="Save to Database", command=self.save_era_result).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(manage_frame, text="Remove from Database", command=self.remove_era_from_db).pack(side=tk.LEFT)
        ttk.Button(manage_frame, text="↻ Refresh Result", command=self.refresh_era_result).pack(side=tk.LEFT, padx=(15, 0))
        
        # Right side - copy buttons
        copy_frame = ttk.Frame(action_frame)
        copy_frame.pack(side=tk.RIGHT)
        
        ttk.Button(copy_frame, text="Copy MUSICAL CHARACTERISTICS", 
                 command=lambda: self.copy_section(self.era_results_text, "MUSICAL CHARACTERISTICS")).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(copy_frame, text="Copy PRODUCTION TECHNIQUES", 
                 command=lambda: self.copy_section(self.era_results_text, "PRODUCTION TECHNIQUES")).pack(side=tk.LEFT, padx=(0, 5))
        ttk.Button(copy_frame, text="Copy LYRICAL THEMES", 
                 command=lambda: self.copy_section(self.era_results_text, "LYRICAL THEMES")).pack(side=tk.LEFT)
    
    def load_database(self):
        """Load existing style descriptions"""
        try:
            if os.path.exists(self.db_file):
                with open(self.db_file, 'r', encoding='utf-8') as f:
                    self.db = json.load(f)
                    
                    # Ensure all needed categories exist
                    if "artists" not in self.db:
                        self.db["artists"] = {}
                    if "songs" not in self.db:
                        self.db["songs"] = {}
                    if "eras" not in self.db:
                        self.db["eras"] = {}
                    if "genres" not in self.db:
                        self.db["genres"] = {}
                    if "metadata" not in self.db:
                        self.db["metadata"] = {"last_updated": time.strftime("%Y-%m-%d %H:%M:%S")}
            else:
                self.db = {
                    "artists": {},
                    "songs": {},
                    "eras": {},
                    "genres": {},
                    "metadata": {"last_updated": time.strftime("%Y-%m-%d %H:%M:%S")}
                }
        except Exception as e:
            print(f"Error loading database: {e}")
            self.db = {
                "artists": {},
                "songs": {},
                "eras": {},
                "genres": {},
                "metadata": {"last_updated": time.strftime("%Y-%m-%d %H:%M:%S")}
            }
    
    def save_database(self):
        """Save database to file"""
        try:
            # Update metadata
            self.db["metadata"]["last_updated"] = time.strftime("%Y-%m-%d %H:%M:%S")
            
            with open(self.db_file, 'w', encoding='utf-8') as f:
                json.dump(self.db, f, indent=2, ensure_ascii=False)
            
            # Update statistics
            self.update_statistics()
            return True
        except Exception as e:
            print(f"Error saving database: {e}")
            return False
    
    def update_statistics(self):
        """Update database statistics display"""
        artist_count = len(self.db["artists"])
        song_count = len(self.db["songs"])
        era_count = len(self.db["eras"])
        genre_count = len(self.db["genres"])
        total_count = artist_count + song_count + era_count + genre_count
        last_updated = self.db["metadata"].get("last_updated", "Never")
        
        stats_text = f"Total Entries: {total_count} ({artist_count} artists, {song_count} songs, " \
                     f"{era_count} eras, {genre_count} genres) | Last Updated: {last_updated}"
        self.stats_label.config(text=stats_text)
    
    def find_artist_style(self, event=None):
        """Find artist/genre style, querying API if not in database"""
        artist = self.artist_search_var.get().strip()
        era = self.artist_era_var.get().strip()  # May be empty
        
        if not artist:
            messagebox.showwarning("Warning", "Please enter an artist or genre name")
            return
        
        # Update indicator to loading state
        self.artist_source_var.set("LOADING")
        self.artist_indicator.config(style="Loading.TLabel")
        
        # Build cache key - include era if specified
        if era:
            cache_key = f"{artist} ({era})"
        else:
            cache_key = artist
        
        # Check if force refresh is enabled
        force_refresh = self.artist_force_refresh.get()
        
        # Check database first (unless force refresh is enabled)
        found_in_db = False
        
        if not force_refresh:
            # Artists have their own db section, but can also include era-specific entries
            if cache_key.lower() in [k.lower() for k in self.db["artists"]]:
                for key in self.db["artists"]:
                    if key.lower() == cache_key.lower():
                        entry = self.db["artists"][key]
                        self.current_artist_result = {
                            "name": key,
                            "style_description": entry["style_description"],
                            "lyrical_guidance": entry["lyrical_guidance"],
                            "last_updated": entry.get("last_updated", "Unknown")
                        }
                        self.current_artist_query = key
                        self.display_artist_result(key, entry["style_description"], entry["lyrical_guidance"], True)
                        found_in_db = True
                        break
        
        # If not found or force refresh, query API
        if not found_in_db or force_refresh:
            self.status_var.set(f"Querying API for '{cache_key}'...")
            self.current_artist_query = cache_key
            
            # Start API query in separate thread
            threading.Thread(target=self._query_artist_api, 
                           args=(artist, era, self.artist_random_seed.get()), 
                           daemon=True).start()
    
    def _query_artist_api(self, artist, era=None, use_random_seed=True):
        """Thread function to query API for artist style"""
        try:
            # Prepare prompt based on whether era is specified
            system_prompt = """You are a music style analyzer that provides concise, specific descriptions of musical styles without mentioning artist or genre names.
            Focus only on the musical characteristics, sonic qualities, production techniques, instrumentation, vocal approaches, rhythmic patterns, and lyrical themes.
            
            For each request, provide two separate sections:
            1. MUSICAL STYLE: Start immediately with the core musical elements - DO NOT use phrases like "This style is characterized by" or "This genre features." Begin directly with the musical characteristics.
            2. LYRICAL GUIDANCE: Again, start immediately with the core lyrical approach - DO NOT use introductory phrases.
            
            Use confident, definitive statements and specific technical language that accurately captures the musical essence.
            
            Examples of good starts:
            "A fusion of rhythm and blues with..." (not "This style is a fusion of...")
            "Distorted power chords driving through..." (not "This style features distorted power chords...")
            "Introspective narratives exploring..." (not "The lyrics tend to focus on...")
            
            Never mention the artist name in your response. Focus purely on the musical elements that define the sound and artist personally."""
            
            # Add era-specific instructions if provided
            if era:
                user_prompt = f"Describe the musical style and provide lyrical guidance specifically for the artist '{artist}' during their {era} period/era. Focus on the definitive sound from this specific period only."
            else:
                user_prompt = f"Describe the musical style and provide lyrical guidance for the artist '{artist}'. Focus on their most definitive and recognizable sound."
            
            # Call API
            response = self._call_api(system_prompt, user_prompt, use_random_seed)
            
            if response:
                # Process response
                style_description = ""
                lyrical_guidance = ""
                
                # Extract sections
                if "MUSICAL STYLE:" in response and "LYRICAL GUIDANCE:" in response:
                    parts = response.split("LYRICAL GUIDANCE:", 1)
                    style_part = parts[0].replace("MUSICAL STYLE:", "").strip()
                    lyrical_part = parts[1].strip()
                    
                    style_description = style_part
                    lyrical_guidance = lyrical_part
                else:
                    # Fallback if sections aren't clearly marked
                    paragraphs = response.split("\n\n")
                    if len(paragraphs) >= 2:
                        style_description = paragraphs[0]
                        lyrical_guidance = paragraphs[1]
                    else:
                        style_description = response
                        lyrical_guidance = "No specific lyrical guidance provided."
                
                # Format cache key based on whether era was specified
                if era:
                    cache_key = f"{artist} ({era})"
                else:
                    cache_key = artist
                    
                # Store for potential saving
                self.current_artist_result = {
                    "name": cache_key,
                    "style_description": style_description,
                    "lyrical_guidance": lyrical_guidance,
                    "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
                }
                
                # Display result
                self.root.after(0, lambda: self.display_artist_result(
                    cache_key, style_description, lyrical_guidance, False))
                
                # Auto-save if enabled
                if self.artist_auto_save.get():
                    self.root.after(100, self.save_artist_result)
            else:
                self.root.after(0, lambda: self.status_var.set(f"Failed to get style for '{artist}'"))
                self.root.after(0, lambda: self.artist_source_var.set("ERROR"))
                self.root.after(0, lambda: self.artist_indicator.config(style="Error.TLabel"))
        except Exception as e:
            self.root.after(0, lambda: self.status_var.set(f"Error: {str(e)}"))
            self.root.after(0, lambda: self.artist_source_var.set("ERROR"))
            self.root.after(0, lambda: self.artist_indicator.config(style="Error.TLabel"))

    def _call_api(self, system_prompt, user_prompt, use_random_seed=True):
        """Call the Pollinations API with proper authentication"""
        try:
            # Direct standard access to environment variable
            api_token = os.environ["POLLINATIONS_API_TOKEN"]
            
            # Generate random seed if enabled
            seed = None
            if use_random_seed:
                seed = random.randint(1, 1000000)
                print(f"Using random seed: {seed}")
            
            # Prepare request data
            data = {
                "model": "openai",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                "max_tokens": 600  # Increased for more comprehensive responses
            }
            
            # Add seed if we're using one
            if seed is not None:
                data["seed"] = seed
            
            # Set up headers with Bearer token authentication
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_token}"
            }
            
            # Make the API call
            response = requests.post(
                "https://gen.pollinations.ai/text/openai",
                json=data,
                headers=headers
            )
            
            # Check for errors
            response.raise_for_status()
            
            # Parse the response
            result = response.json()
            
            # Extract the generated text
            if "choices" in result and len(result["choices"]) > 0:
                return result["choices"][0]["message"]["content"]
            else:
                raise Exception("Unexpected API response format")
        
        except KeyError:
            print("POLLINATIONS_API_TOKEN not found in environment")
            return None
        except Exception as e:
            print(f"API error: {e}")
            return None

    def display_artist_result(self, name, style_description, lyrical_guidance, from_cache=False):
        """Display the artist style description in the results area"""
        self.artist_results_text.delete(1.0, tk.END)
        
        # Update status indicator based on source
        if from_cache:
            self.artist_source_var.set("CACHED")
            self.artist_indicator.config(style="Cached.TLabel")
        else:
            self.artist_source_var.set("LIVE API")
            self.artist_indicator.config(style="Live.TLabel")
        
        # Display header
        self.artist_results_text.insert(tk.END, f"{name}\n", "title")
        self.artist_results_text.insert(tk.END, "=" * 50 + "\n\n")
        
        self.artist_results_text.insert(tk.END, "MUSICAL STYLE:\n", "heading")
        self.artist_results_text.insert(tk.END, f"{style_description}\n\n")
        
        self.artist_results_text.insert(tk.END, "LYRICAL GUIDANCE:\n", "heading")
        self.artist_results_text.insert(tk.END, f"{lyrical_guidance}\n")
        
        # Configure tags
        self.artist_results_text.tag_configure("title", font=("Arial", 14, "bold"))
        self.artist_results_text.tag_configure("heading", font=("Arial", 12, "bold"))
        
        # Update status based on source
        if from_cache:
            self.status_var.set(f"Loaded cached entry for '{name}'")
        else:
            self.status_var.set(f"Retrieved fresh result for '{name}' from API")

    def save_artist_result(self):
        """Save the current artist result to the database"""
        if not hasattr(self, 'current_artist_result'):
            messagebox.showwarning("Warning", "No results to save")
            return
        
        result = self.current_artist_result
        
        # Add to artists dictionary
        self.db["artists"][result["name"]] = {
            "style_description": result["style_description"],
            "lyrical_guidance": result["lyrical_guidance"],
            "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        # Save database
        if self.save_database():
            self.status_var.set(f"Saved '{result['name']}' to database")
            # Update indicator to show it's now cached
            self.artist_source_var.set("CACHED")
            self.artist_indicator.config(style="Cached.TLabel")
        else:
            messagebox.showerror("Error", "Failed to save to database")

    def remove_artist_from_db(self):
        """Remove the current artist query from database"""
        if not hasattr(self, 'current_artist_query'):
            messagebox.showwarning("Warning", "No current query to remove")
            return
        
        query = self.current_artist_query
        removed = False
        
        # Check in artists
        if query.lower() in [name.lower() for name in self.db["artists"]]:
            for name in list(self.db["artists"].keys()):
                if name.lower() == query.lower():
                    if messagebox.askyesno("Confirm", f"Remove '{name}' from database?"):
                        del self.db["artists"][name]
                        removed = True
                    break
        
        # Save database if something was removed
        if removed:
            if self.save_database():
                self.status_var.set(f"Removed '{query}' from database")
                
                # Update indicator to show it's no longer cached
                self.artist_source_var.set("REMOVED")
                self.artist_indicator.config(style="Error.TLabel")
            else:
                messagebox.showerror("Error", "Failed to save database after removal")
        else:
            self.status_var.set(f"'{query}' not found in database")

    def refresh_artist_result(self):
        """Force refresh the current artist query from API"""
        if not hasattr(self, 'current_artist_query'):
            messagebox.showwarning("Warning", "No current query to refresh")
            return
        
        # Enable force refresh
        old_force = self.artist_force_refresh.get()
        self.artist_force_refresh.set(True)
        
        # Reuse the current query
        query = self.current_artist_query
        
        # Handle era specification
        if "(" in query and ")" in query:
            # Extract artist and era parts
            artist, era_part = query.split("(", 1)
            era = era_part.strip().rstrip(")")
            
            self.artist_search_var.set(artist.strip())
            self.artist_era_var.set(era.strip())
        else:
            self.artist_search_var.set(query)
            self.artist_era_var.set("")
        
        # Execute search
        self.find_artist_style()
        
        # Reset force refresh to original value
        self.artist_force_refresh.set(old_force)

    def clear_artist_results(self):
        """Clear the artist search and results"""
        self.artist_search_var.set("")
        self.artist_era_var.set("")
        self.artist_results_text.delete(1.0, tk.END)
        self.artist_entry.focus_set()
        self.status_var.set("Enter an artist or genre name to get its musical style description")
        
        # Reset indicator
        self.artist_source_var.set("READY")
        self.artist_indicator.config(style="Ready.TLabel")

    def find_song_style(self, event=None):
        """Find song style, querying API if not in database"""
        song = self.song_title_var.get().strip()
        artist = self.song_artist_var.get().strip()
        album = self.song_album_var.get().strip()
        year = self.song_year_var.get().strip()
        
        if not song:
            messagebox.showwarning("Warning", "Please enter a song title")
            return
        
        # Update indicator to loading state
        self.song_source_var.set("LOADING")
        self.song_indicator.config(style="Loading.TLabel")
        
        # Build cache key (include artist if specified)
        if artist:
            cache_key = f"{song} by {artist}"
            if album:
                cache_key += f" (from {album}"
                if year:
                    cache_key += f", {year}"
                cache_key += ")"
        else:
            cache_key = song
        
        # Check if force refresh is enabled
        force_refresh = self.song_force_refresh.get()
        
        # Check database first (unless force refresh is enabled)
        found_in_db = False
        
        if not force_refresh:
            if cache_key.lower() in [k.lower() for k in self.db["songs"]]:
                for key in self.db["songs"]:
                    if key.lower() == cache_key.lower():
                        entry = self.db["songs"][key]
                        self.current_song_result = {
                            "name": key,
                            "musical_style": entry["musical_style"],
                            "production_style": entry["production_style"],
                            "lyrical_content": entry["lyrical_content"],
                            "last_updated": entry.get("last_updated", "Unknown")
                        }
                        self.current_song_query = key
                        self.display_song_result(
                            key, 
                            entry["musical_style"], 
                            entry["production_style"], 
                            entry["lyrical_content"], 
                            True
                        )
                        found_in_db = True
                        break
        
        # If not found or force refresh, query API
        if not found_in_db or force_refresh:
            self.status_var.set(f"Querying API for '{cache_key}'...")
            self.current_song_query = cache_key
            
            # Start API query in separate thread
            threading.Thread(target=self._query_song_api, 
                           args=(song, artist, album, year, self.song_random_seed.get()), 
                           daemon=True).start()

    def _query_song_api(self, song, artist=None, album=None, year=None, use_random_seed=True):
        """Thread function to query API for song style"""
        try:
            # Prepare prompt
            system_prompt = """You are a music analysis expert focusing on detailed song-specific musical characteristics.
            Analyze the requested song and provide three distinct sections:
            
            1. MUSICAL STYLE: The song's genre, musical structure, key elements, rhythm patterns, instrumentation, and melodic approach. Begin directly with the musical characteristics.
            
            2. PRODUCTION STYLE: The production techniques, mixing approach, sonic textures, audio effects, and recording characteristics that define the song's sound. Focus on the technical aspects.
            
            3. LYRICAL CONTENT: The song's lyrical themes, narrative approach, and vocal delivery style. Provide insights into the storytelling, emotional tone, and meaning.
            
            Use confident, definitive statements with specific technical language. Avoid vague descriptions or hedging phrases.
            
            Never mention the artist or song name in your response. Focus purely on the musical elements that define this specific song."""
            
            # Build user prompt based on available information
            user_prompt = f"Analyze the song '{song}'"
            if artist:
                user_prompt += f" by {artist}"
            if album:
                user_prompt += f" from the album '{album}'"
            if year:
                user_prompt += f" ({year})"
            
            # Call API
            response = self._call_api(system_prompt, user_prompt, use_random_seed)
            
            if response:
                # Process response
                musical_style = ""
                production_style = ""
                lyrical_content = ""
                
                # Extract sections
                if all(section in response for section in ["MUSICAL STYLE:", "PRODUCTION STYLE:", "LYRICAL CONTENT:"]):
                    # Split by all three headings
                    parts = response.split("PRODUCTION STYLE:", 1)
                    musical_part = parts[0].replace("MUSICAL STYLE:", "").strip()
                    
                    remaining = parts[1]
                    parts = remaining.split("LYRICAL CONTENT:", 1)
                    production_part = parts[0].strip()
                    lyrical_part = parts[1].strip()
                    
                    musical_style = musical_part
                    production_style = production_part
                    lyrical_content = lyrical_part
                else:
                    # Fallback if sections aren't clearly marked
                    paragraphs = response.split("\n\n")
                    if len(paragraphs) >= 3:
                        musical_style = paragraphs[0]
                        production_style = paragraphs[1]
                        lyrical_content = paragraphs[2]
                    else:
                        musical_style = response
                        production_style = "No specific production details provided."
                        lyrical_content = "No specific lyrical analysis provided."
                
                # Build cache key
                if artist:
                    cache_key = f"{song} by {artist}"
                    if album:
                        cache_key += f" (from {album}"
                        if year:
                            cache_key += f", {year}"
                        cache_key += ")"
                else:
                    cache_key = song
                    
                # Store for potential saving
                self.current_song_result = {
                    "name": cache_key,
                    "musical_style": musical_style,
                    "production_style": production_style,
                    "lyrical_content": lyrical_content,
                    "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
                }
                
                # Display result
                self.root.after(0, lambda: self.display_song_result(
                    cache_key, musical_style, production_style, lyrical_content, False))
                
                # Auto-save if enabled
                if self.song_auto_save.get():
                    self.root.after(100, self.save_song_result)
            else:
                self.root.after(0, lambda: self.status_var.set(f"Failed to get analysis for '{song}'"))
                self.root.after(0, lambda: self.song_source_var.set("ERROR"))
                self.root.after(0, lambda: self.song_indicator.config(style="Error.TLabel"))
        except Exception as e:
            self.root.after(0, lambda: self.status_var.set(f"Error: {str(e)}"))
            self.root.after(0, lambda: self.song_source_var.set("ERROR"))
            self.root.after(0, lambda: self.song_indicator.config(style="Error.TLabel"))

    def display_song_result(self, name, musical_style, production_style, lyrical_content, from_cache=False):
        """Display the song analysis in the results area"""
        self.song_results_text.delete(1.0, tk.END)
        
        # Update status indicator based on source
        if from_cache:
            self.song_source_var.set("CACHED")
            self.song_indicator.config(style="Cached.TLabel")
        else:
            self.song_source_var.set("LIVE API")
            self.song_indicator.config(style="Live.TLabel")
        
        # Display header
        self.song_results_text.insert(tk.END, f"{name}\n", "title")
        self.song_results_text.insert(tk.END, "=" * 50 + "\n\n")
        
        self.song_results_text.insert(tk.END, "MUSICAL STYLE:\n", "heading")
        self.song_results_text.insert(tk.END, f"{musical_style}\n\n")
        
        self.song_results_text.insert(tk.END, "PRODUCTION STYLE:\n", "heading")
        self.song_results_text.insert(tk.END, f"{production_style}\n\n")
        
        self.song_results_text.insert(tk.END, "LYRICAL CONTENT:\n", "heading")
        self.song_results_text.insert(tk.END, f"{lyrical_content}\n")
        
        # Configure tags
        self.song_results_text.tag_configure("title", font=("Arial", 14, "bold"))
        self.song_results_text.tag_configure("heading", font=("Arial", 12, "bold"))
        
        # Update status based on source
        if from_cache:
            self.status_var.set(f"Loaded cached entry for '{name}'")
        else:
            self.status_var.set(f"Retrieved fresh analysis for '{name}' from API")

    def save_song_result(self):
        """Save the current song result to the database"""
        if not hasattr(self, 'current_song_result'):
            messagebox.showwarning("Warning", "No results to save")
            return
        
        result = self.current_song_result
        
        # Add to songs dictionary
        self.db["songs"][result["name"]] = {
            "musical_style": result["musical_style"],
            "production_style": result["production_style"],
            "lyrical_content": result["lyrical_content"],
            "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        # Save database
        if self.save_database():
            self.status_var.set(f"Saved '{result['name']}' to database")
            # Update indicator to show it's now cached
            self.song_source_var.set("CACHED")
            self.song_indicator.config(style="Cached.TLabel")
        else:
            messagebox.showerror("Error", "Failed to save to database")

    def remove_song_from_db(self):
        """Remove the current song query from database"""
        if not hasattr(self, 'current_song_query'):
            messagebox.showwarning("Warning", "No current query to remove")
            return
        
        query = self.current_song_query
        removed = False
        
        # Check in songs
        if query.lower() in [name.lower() for name in self.db["songs"]]:
            for name in list(self.db["songs"].keys()):
                if name.lower() == query.lower():
                    if messagebox.askyesno("Confirm", f"Remove '{name}' from database?"):
                        del self.db["songs"][name]
                        removed = True
                    break
        
        # Save database if something was removed
        if removed:
            if self.save_database():
                self.status_var.set(f"Removed '{query}' from database")
                
                # Update indicator to show it's no longer cached
                self.song_source_var.set("REMOVED")
                self.song_indicator.config(style="Error.TLabel")
            else:
                messagebox.showerror("Error", "Failed to save database after removal")
        else:
            self.status_var.set(f"'{query}' not found in database")

    def refresh_song_result(self):
        """Force refresh the current song query from API"""
        if not hasattr(self, 'current_song_query'):
            messagebox.showwarning("Warning", "No current query to refresh")
            return
        
        # Enable force refresh
        old_force = self.song_force_refresh.get()
        self.song_force_refresh.set(True)
        
        # Reuse the current query - need to parse out the parts
        query = self.current_song_query
        
        # Reset all fields
        self.song_title_var.set("")
        self.song_artist_var.set("")
        self.song_album_var.set("")
        self.song_year_var.set("")
        
        # Parse the query string to extract components
        if " by " in query:
            # Split title and artist/album part
            title, rest = query.split(" by ", 1)
            self.song_title_var.set(title.strip())
            
            # Check if there's album info
            if " (from " in rest:
                artist, album_part = rest.split(" (from ", 1)
                self.song_artist_var.set(artist.strip())
                
                # Extract album and possibly year
                if ", " in album_part and ")" in album_part:
                    album, year_part = album_part.split(", ", 1)
                    self.song_album_var.set(album.strip())
                    self.song_year_var.set(year_part.strip().rstrip(")"))
                else:
                    # Just album, no year
                    self.song_album_var.set(album_part.strip().rstrip(")"))
            else:
                # Just artist, no album
                self.song_artist_var.set(rest.strip())
        else:
            # Just title
            self.song_title_var.set(query)
        
        # Execute search
        self.find_song_style()
        
        # Reset force refresh to original value
        self.song_force_refresh.set(old_force)

    def clear_song_results(self):
        """Clear the song search and results"""
        self.song_title_var.set("")
        self.song_artist_var.set("")
        self.song_album_var.set("")
        self.song_year_var.set("")
        self.song_results_text.delete(1.0, tk.END)
        self.song_entry.focus_set()
        self.status_var.set("Enter a song title to analyze its musical style")
        
        # Reset indicator
        self.song_source_var.set("READY")
        self.song_indicator.config(style="Ready.TLabel")

    def find_era_style(self, event=None):
        """Find era/period style, querying API if not in database"""
        era = self.era_search_var.get().strip()
        genre = self.era_genre_var.get().strip()
        location = self.era_location_var.get().strip()
        
        if not era:
            messagebox.showwarning("Warning", "Please enter an era or period")
            return
        
        # Update indicator to loading state
        self.era_source_var.set("LOADING")
        self.era_indicator.config(style="Loading.TLabel")
        
        # Build cache key (include genre and location if specified)
        cache_key = era
        if genre:
            cache_key += f" ({genre}"
            if location:
                cache_key += f", {location}"
            cache_key += ")"
        elif location:
            cache_key += f" ({location})"
        
        # Check if force refresh is enabled
        force_refresh = self.era_force_refresh.get()
        
        # Check database first (unless force refresh is enabled)
        found_in_db = False
        
        if not force_refresh:
            if cache_key.lower() in [k.lower() for k in self.db["eras"]]:
                for key in self.db["eras"]:
                    if key.lower() == cache_key.lower():
                        entry = self.db["eras"][key]
                        self.current_era_result = {
                            "name": key,
                            "musical_characteristics": entry["musical_characteristics"],
                            "production_techniques": entry["production_techniques"],
                            "lyrical_themes": entry["lyrical_themes"],
                            "last_updated": entry.get("last_updated", "Unknown")
                        }
                        self.current_era_query = key
                        self.display_era_result(
                            key, 
                            entry["musical_characteristics"], 
                            entry["production_techniques"], 
                            entry["lyrical_themes"], 
                            True
                        )
                        found_in_db = True
                        break
        
        # If not found or force refresh, query API
        if not found_in_db or force_refresh:
            self.status_var.set(f"Querying API for '{cache_key}'...")
            self.current_era_query = cache_key
            
            # Start API query in separate thread
            threading.Thread(target=self._query_era_api, 
                           args=(era, genre, location, self.era_random_seed.get()), 
                           daemon=True).start()

    def _query_era_api(self, era, genre=None, location=None, use_random_seed=True):
        """Thread function to query API for era style"""
        try:
            # Prepare prompt
            system_prompt = """You are a music historian focusing on detailed era-specific musical characteristics.
            Analyze the requested music era/period and provide three distinct sections:
            
            1. MUSICAL CHARACTERISTICS: The defining musical elements, instruments, techniques, rhythm patterns, melody structures, harmony approaches, and compositional styles of this era. Begin directly with the musical characteristics.
            
            2. PRODUCTION TECHNIQUES: The recording methods, studio approaches, mixing techniques, audio processing, and technological innovations that defined the sound of this era. Focus on the technical aspects.
            
            3. LYRICAL THEMES: The dominant lyrical topics, storytelling approaches, poetic devices, and thematic content prevalent during this era. Provide insights into the cultural context and meaning.
            
            Use confident, definitive statements with specific technical language. Avoid vague descriptions or hedging phrases.
            
            Never mention the era name itself in your response. Focus purely on the musical elements that define this specific period."""
            
            # Build user prompt based on available information
            user_prompt = f"Analyze the musical period/era '{era}'"
            if genre:
                user_prompt += f" specifically in the {genre} genre"
            if location:
                user_prompt += f" in {location}"
            
            # Call API
            response = self._call_api(system_prompt, user_prompt, use_random_seed)
            
            if response:
                # Process response
                musical_characteristics = ""
                production_techniques = ""
                lyrical_themes = ""
                
                # Extract sections
                if all(section in response for section in ["MUSICAL CHARACTERISTICS:", "PRODUCTION TECHNIQUES:", "LYRICAL THEMES:"]):
                    # Split by all three headings
                    parts = response.split("PRODUCTION TECHNIQUES:", 1)
                    musical_part = parts[0].replace("MUSICAL CHARACTERISTICS:", "").strip()
                    
                    remaining = parts[1]
                    parts = remaining.split("LYRICAL THEMES:", 1)
                    production_part = parts[0].strip()
                    lyrical_part = parts[1].strip()
                    
                    musical_characteristics = musical_part
                    production_techniques = production_part
                    lyrical_themes = lyrical_part
                else:
                    # Fallback if sections aren't clearly marked
                    paragraphs = response.split("\n\n")
                    if len(paragraphs) >= 3:
                        musical_characteristics = paragraphs[0]
                        production_techniques = paragraphs[1]
                        lyrical_themes = paragraphs[2]
                    else:
                        musical_characteristics = response
                        production_techniques = "No specific production details provided."
                        lyrical_themes = "No specific lyrical analysis provided."
                
                # Build cache key
                cache_key = era
                if genre:
                    cache_key += f" ({genre}"
                    if location:
                        cache_key += f", {location}"
                    cache_key += ")"
                elif location:
                    cache_key += f" ({location})"
                    
                # Store for potential saving
                self.current_era_result = {
                    "name": cache_key,
                    "musical_characteristics": musical_characteristics,
                    "production_techniques": production_techniques,
                    "lyrical_themes": lyrical_themes,
                    "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
                }
                
                # Display result
                self.root.after(0, lambda: self.display_era_result(
                    cache_key, musical_characteristics, production_techniques, lyrical_themes, False))
                
                # Auto-save if enabled
                if self.era_auto_save.get():
                    self.root.after(100, self.save_era_result)
            else:
                self.root.after(0, lambda: self.status_var.set(f"Failed to get analysis for '{era}'"))
                self.root.after(0, lambda: self.era_source_var.set("ERROR"))
                self.root.after(0, lambda: self.era_indicator.config(style="Error.TLabel"))
        except Exception as e:
            self.root.after(0, lambda: self.status_var.set(f"Error: {str(e)}"))
            self.root.after(0, lambda: self.era_source_var.set("ERROR"))
            self.root.after(0, lambda: self.era_indicator.config(style="Error.TLabel"))

    def display_era_result(self, name, musical_characteristics, production_techniques, lyrical_themes, from_cache=False):
        """Display the era analysis in the results area"""
        self.era_results_text.delete(1.0, tk.END)
        
        # Update status indicator based on source
        if from_cache:
            self.era_source_var.set("CACHED")
            self.era_indicator.config(style="Cached.TLabel")
        else:
            self.era_source_var.set("LIVE API")
            self.era_indicator.config(style="Live.TLabel")
        
        # Display header
        self.era_results_text.insert(tk.END, f"{name}\n", "title")
        self.era_results_text.insert(tk.END, "=" * 50 + "\n\n")
        
        self.era_results_text.insert(tk.END, "MUSICAL CHARACTERISTICS:\n", "heading")
        self.era_results_text.insert(tk.END, f"{musical_characteristics}\n\n")
        
        self.era_results_text.insert(tk.END, "PRODUCTION TECHNIQUES:\n", "heading")
        self.era_results_text.insert(tk.END, f"{production_techniques}\n\n")
        
        self.era_results_text.insert(tk.END, "LYRICAL THEMES:\n", "heading")
        self.era_results_text.insert(tk.END, f"{lyrical_themes}\n")
        
        # Configure tags
        self.era_results_text.tag_configure("title", font=("Arial", 14, "bold"))
        self.era_results_text.tag_configure("heading", font=("Arial", 12, "bold"))
        
        # Update status based on source
        if from_cache:
            self.status_var.set(f"Loaded cached entry for '{name}'")
        else:
            self.status_var.set(f"Retrieved fresh analysis for '{name}' from API")

    def save_era_result(self):
        """Save the current era result to the database"""
        if not hasattr(self, 'current_era_result'):
            messagebox.showwarning("Warning", "No results to save")
            return
        
        result = self.current_era_result
        
        # Add to eras dictionary
        self.db["eras"][result["name"]] = {
            "musical_characteristics": result["musical_characteristics"],
            "production_techniques": result["production_techniques"],
            "lyrical_themes": result["lyrical_themes"],
            "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        # Save database
        if self.save_database():
            self.status_var.set(f"Saved '{result['name']}' to database")
            # Update indicator to show it's now cached
            self.era_source_var.set("CACHED")
            self.era_indicator.config(style="Cached.TLabel")
        else:
            messagebox.showerror("Error", "Failed to save to database")

    def remove_era_from_db(self):
        """Remove the current era query from database"""
        if not hasattr(self, 'current_era_query'):
            messagebox.showwarning("Warning", "No current query to remove")
            return
        
        query = self.current_era_query
        removed = False
        
        # Check in eras
        if query.lower() in [name.lower() for name in self.db["eras"]]:
            for name in list(self.db["eras"].keys()):
                if name.lower() == query.lower():
                    if messagebox.askyesno("Confirm", f"Remove '{name}' from database?"):
                        del self.db["eras"][name]
                        removed = True
                    break
        
        # Save database if something was removed
        if removed:
            if self.save_database():
                self.status_var.set(f"Removed '{query}' from database")
                
                # Update indicator to show it's no longer cached
                self.era_source_var.set("REMOVED")
                self.era_indicator.config(style="Error.TLabel")
            else:
                messagebox.showerror("Error", "Failed to save database after removal")
        else:
            self.status_var.set(f"'{query}' not found in database")

    def refresh_era_result(self):
        """Force refresh the current era query from API"""
        if not hasattr(self, 'current_era_query'):
            messagebox.showwarning("Warning", "No current query to refresh")
            return
        
        # Enable force refresh
        old_force = self.era_force_refresh.get()
        self.era_force_refresh.set(True)
        
        # Reuse the current query
        query = self.current_era_query
        
        # Reset all fields
        self.era_search_var.set("")
        self.era_genre_var.set("")
        self.era_location_var.set("")
        
        # Parse the query string to extract components
        if "(" in query and ")" in query:
            # Split era and details part
            era, details_part = query.split("(", 1)
            self.era_search_var.set(era.strip())
            
            # Extract genre and possibly location
            details = details_part.strip().rstrip(")")
            if ", " in details:
                genre, location = details.split(", ", 1)
                self.era_genre_var.set(genre.strip())
                self.era_location_var.set(location.strip())
            else:
                # Just genre or just location - determine which
                if details.lower() in ["us", "uk", "japan", "europe", "australia", "canada"] or "united" in details.lower() or "north" in details.lower() or "south" in details.lower() or "east" in details.lower() or "west" in details.lower():
                    # Likely a location
                    self.era_location_var.set(details)
                else:
                    # Likely a genre
                    self.era_genre_var.set(details)
        else:
            # Just era
            self.era_search_var.set(query)
        
        # Execute search
        self.find_era_style()
        
        # Reset force refresh to original value
        self.era_force_refresh.set(old_force)

    def clear_era_results(self):
        """Clear the era search and results"""
        self.era_search_var.set("")
        self.era_genre_var.set("")
        self.era_location_var.set("")
        self.era_results_text.delete(1.0, tk.END)
        self.era_entry.focus_set()
        self.status_var.set("Enter an era or period to analyze its musical style")
        
        # Reset indicator
        self.era_source_var.set("READY")
        self.era_indicator.config(style="Ready.TLabel")

    def copy_section(self, text_widget, section_name):
        """Copy a specific section to clipboard from the specified text widget"""
        content = text_widget.get(1.0, tk.END)
        
        # Find section in content
        if section_name in content:
            start_idx = content.find(section_name + ":")
            if start_idx != -1:
                # Skip the section header
                start_idx = content.find("\n", start_idx) + 1
                
                # Find end of section (next heading or end of text)
                end_idx = len(content)
                for heading in ["MUSICAL STYLE:", "PRODUCTION STYLE:", "LYRICAL CONTENT:", 
                              "MUSICAL CHARACTERISTICS:", "PRODUCTION TECHNIQUES:", "LYRICAL THEMES:",
                              "LYRICAL GUIDANCE:"]:
                    if heading != section_name + ":" and heading in content[start_idx:]:
                        next_heading_idx = content.find(heading, start_idx)
                        if next_heading_idx != -1 and next_heading_idx < end_idx:
                            end_idx = next_heading_idx
                
                # Extract section text
                section_text = content[start_idx:end_idx].strip()
                
                # Copy to clipboard
                self.root.clipboard_clear()
                self.root.clipboard_append(section_text)
                
                self.status_var.set(f"Copied {section_name} to clipboard")
            else:
                self.status_var.set(f"Section '{section_name}' not found in results")
        else:
            self.status_var.set(f"Section '{section_name}' not found in results")

def main():
    root = tk.Tk()
    app = ComprehensiveMusicQuery(root)
    
    # Center window on screen
    window_width = 850
    window_height = 700
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    center_x = int(screen_width/2 - window_width/2)
    center_y = int(screen_height/2 - window_height/2)
    root.geometry(f'{window_width}x{window_height}+{center_x}+{center_y}')
    
    root.mainloop()

if __name__ == "__main__":
    main()