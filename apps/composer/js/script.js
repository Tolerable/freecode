// DEBUG: Check if script is even running
console.log('🚨 SCRIPT.JS LOADED!');
console.error('🚨 TESTING CONSOLE.ERROR');

// DEBUG: Check when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚨 DOM CONTENT LOADED EVENT FIRED!');
    
    // Check if critical elements exist
    console.log('Generate button exists?', !!document.getElementById('generate-lyrics-btn'));
    console.log('Clear button exists?', !!document.getElementById('clear-library-btn'));
    console.log('Genre buttons exist?', document.querySelectorAll('.genre-button').length);
});

// DEBUG: Check when window loads
window.addEventListener('load', () => {
    console.log('🚨 WINDOW LOAD EVENT FIRED!');
});

// DEBUG: Try to attach a simple test listener
setTimeout(() => {
    console.log('🚨 ATTEMPTING TEST LISTENER...');
    const btn = document.getElementById('generate-lyrics-btn');
    if (btn) {
        btn.onclick = () => console.log('🚨 TEST CLICK WORKED!');
        console.log('🚨 Test listener attached to button');
    } else {
        console.error('🚨 BUTTON NOT FOUND!');
    }
}, 2000);

// Constants
const TEXT_API = 'https://text.pollinations.ai/';
const IMAGE_API = 'https://image.pollinations.ai/prompt/';
const AUDIO_API = 'https://text.pollinations.ai/';

// Global variables
let db = null;
let currentSong = null;
let currentAudioUrl = null;
let songLibrary = [];
let selectedGenre = 'pop';
let isInitialized = false;

// Make ALL functions globally accessible IMMEDIATELY
window.loadSongById = loadSongById;
window.downloadAudioById = downloadAudioById;
window.copyLyricsById = copyLyricsById;
window.toggleFavoriteById = toggleFavoriteById;
window.deleteSongById = deleteSongById;
window.refreshArtwork = refreshArtwork;
window.downloadCurrentAudio = downloadCurrentAudio;
window.startLyricsEdit = startLyricsEdit;
window.saveLyricsEdit = saveLyricsEdit;
window.cancelLyricsEdit = cancelLyricsEdit;
window.generateCompleteSong = generateCompleteSong;
window.toggleFavorite = toggleFavorite;
window.copyLyrics = copyLyrics;
window.clearLibrary = clearLibrary;
window.regenerateAudioWithNewVoice = regenerateAudioWithNewVoice;

// REMOVE ALL THE OLD INITIALIZATION CODE AND USE ONLY THIS:
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 DOM Ready - Initializing ONCE');
    if (!isInitialized) {
        initializeApp();
    }
});

// Initialize the app
async function initializeApp() {
    if (isInitialized) {
        console.log('⚠️ App already initialized, skipping...');
        return;
    }
    
    console.log('🚀 STARTING APP INITIALIZATION...');
    
    try {
        showStatus('🔧 Setting up your song composer...', 'info');
        
        // Initialize database first
        await initDB();
        console.log('✅ Database initialized');
        
        // Load library
        await loadLibrary();
        console.log('✅ Library loaded');
        
        // Setup event listeners - CRITICAL: Do this AFTER everything else
        const listenersAttached = setupEventListeners();
        if (!listenersAttached) {
            console.error('❌ Failed to attach listeners, retrying...');
            setTimeout(setupEventListeners, 500);
        }
        
        isInitialized = true;
        showStatus('🎵 Ready to create amazing songs! Click the button!', 'success');
        console.log('🎵 APP READY!');
        
    } catch (error) {
        console.error('❌ App initialization failed:', error);
        showStatus('❌ App setup failed. Please refresh the page!', 'error');
    }
}

// Initialize IndexedDB with better error handling
function initDB() {
    return new Promise((resolve, reject) => {
        console.log('🔧 Opening database...');
        
        // ADD TIMEOUT - if database doesn't open in 3 seconds, continue anyway
        const timeout = setTimeout(() => {
            console.error('❌ Database timeout - continuing without database!');
            db = null; // Set to null, we'll work without it
            resolve(null);
        }, 3000);
        
        try {
            const request = indexedDB.open('songComposerDB', 3);
            
            request.onerror = () => {
                clearTimeout(timeout);
                console.error('❌ Database error:', request.error);
                db = null; // Work without database
                resolve(null); // DON'T REJECT - RESOLVE ANYWAY
            };
            
            request.onsuccess = () => {
                clearTimeout(timeout);
                db = request.result;
                console.log('✅ Database opened successfully');
                resolve(db);
            };
            
            request.onupgradeneeded = (event) => {
                console.log('🔧 Database needs upgrade...');
                const database = event.target.result;
                
                if (!database.objectStoreNames.contains('songs')) {
                    const store = database.createObjectStore('songs', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('favorited', 'favorited', { unique: false });
                    console.log('✅ Songs object store created');
                }
            };
            
            // ADDITIONAL FAILSAFE
            request.onblocked = () => {
                clearTimeout(timeout);
                console.error('❌ Database blocked!');
                db = null;
                resolve(null);
            };
            
        } catch (error) {
            clearTimeout(timeout);
            console.error('❌ IndexedDB not available:', error);
            db = null;
            resolve(null); // CONTINUE WITHOUT DATABASE
        }
    });
}

// Set up all event listeners with proper error handling
function setupEventListeners() {
    console.log('🔧 SETTING UP EVENT LISTENERS...');
    
    // Check if critical elements exist
    const generateBtn = document.getElementById('generate-lyrics-btn');
    if (!generateBtn) {
        console.error('❌ CRITICAL: Generate button not found! DOM not ready.');
        return false;
    }
    
    // CRITICAL FIX: Remove ALL existing event listeners first
    const newGenerateBtn = generateBtn.cloneNode(true);
    generateBtn.parentNode.replaceChild(newGenerateBtn, generateBtn);
    
    // Add the click listener to the fresh button
    newGenerateBtn.addEventListener('click', function(e) {
        console.log('🎵 Generate button CLICKED - Event fired!');
        e.preventDefault();
        e.stopPropagation();
        generateCompleteSong();
    });
    
    // Also add as onclick for backup
    newGenerateBtn.onclick = function(e) {
        console.log('🎵 Generate button onclick fired!');
        e.preventDefault();
        generateCompleteSong();
    };
    
    console.log('✅ Generate button listeners attached');
    
    // Other buttons - use the same cloning technique
    const buttonConfigs = [
        { id: 'regenerate-lyrics-btn', handler: generateCompleteSong },
        { id: 'favorite-song-btn', handler: toggleFavorite },
        { id: 'copy-lyrics-btn', handler: copyLyrics },
        { id: 'clear-library-btn', handler: clearLibrary },
        { id: 'regenerate-audio-btn', handler: regenerateAudioWithNewVoice }
    ];
    
    buttonConfigs.forEach(({ id, handler }) => {
        const btn = document.getElementById(id);
        if (btn) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', handler);
            newBtn.onclick = handler; // Backup
            console.log(`✅ ${id} listener attached`);
        }
    });
    
    // Genre buttons - CRITICAL FIX
    const genreButtons = document.querySelectorAll('.genre-button');
    console.log(`🎼 Found ${genreButtons.length} genre buttons`);
    
    genreButtons.forEach((button, index) => {
        // Clone to remove any existing listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const genre = this.dataset.genre;
            console.log('🎼 Genre clicked:', genre);
            
            // Remove selected class from all
            document.querySelectorAll('.genre-button').forEach(b => {
                b.classList.remove('selected');
            });
            
            // Add selected to this one
            this.classList.add('selected');
            selectedGenre = genre;
            
            // Clear custom genre input
            const customGenreInput = document.getElementById('custom-genre');
            if (customGenreInput) {
                customGenreInput.value = '';
            }
            
            // Visual feedback
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            console.log('✅ Genre selected:', selectedGenre);
        });
    });
    
    console.log('✅ All event listeners successfully set up!');
    return true;
}

// Helper function to safely attach button listeners
function attachButtonListener(buttonId, handler) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', handler);
        console.log(`✅ ${buttonId} listener attached`);
    } else {
        console.warn(`⚠️ Button ${buttonId} not found`);
    }
}

// Generate complete song with better error handling
async function generateCompleteSong() {
    console.log('🎵 generateCompleteSong CALLED!');
    console.log('🎵 Current selectedGenre:', selectedGenre);
    
    const titleInput = document.getElementById('song-title');
    const themeInput = document.getElementById('song-theme');
    const generateBtn = document.getElementById('generate-lyrics-btn');
    
    console.log('📝 Title input:', titleInput?.value);
    console.log('📝 Theme input:', themeInput?.value);
    
    // Rest of your existing generateCompleteSong function...
    if (!titleInput || !themeInput) {
        console.error('❌ Required input fields not found');
        showStatus('❌ Error: Required fields not found!', 'error');
        return;
    }
    
    const title = titleInput.value.trim();
    const theme = themeInput.value.trim();
    
    if (!title && !theme) {
        showStatus('❌ Please provide at least a song title or theme! 🎵', 'error');
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '✨ Create My Song Lyrics! ✨';
        }
        return;
    }
    
    // Disable button and show loading
    if (generateBtn) {
        generateBtn.innerHTML = '🎼 CREATING YOUR SONG...';
        generateBtn.disabled = true;
    }
    
    const lyricsSection = document.getElementById('lyrics-section');
    if (lyricsSection) {
        lyricsSection.classList.add('hidden');
    }
    
    let songData = {
        title: title || 'Untitled',
        artist: getInputValue('song-artist', 'Unknown'),
        theme: theme || 'Unknown',
        mood: getInputValue('song-mood', 'upbeat'),
        genre: getInputValue('custom-genre', selectedGenre),
        structure: getInputValue('song-structure', 'verse-chorus'),
        voice: getInputValue('voice-type', 'nova'),
        timestamp: new Date().toISOString(),
        favorited: false
    };

    try {
        showStatus('✍️ AI is writing your song lyrics...', 'info');
        
        const lyrics = await generateLyrics();
        console.log('✅ Lyrics generated');
        
        if (!lyrics || lyrics.length < 50) {
            throw new Error('Generated lyrics are too short or empty');
        }
        
        songData.lyrics = lyrics;
        displayLyrics(lyrics);
        showStatus('🎼 Lyrics complete! Saving to your library...', 'success');
        
        if (db) {
            await saveToLibraryWithLimit(songData);
            console.log('✅ Song saved to database');
        }
        
        // Generate artwork and audio asynchronously
        generateArtworkAsync(songData);
        generateAudioAsync(songData);
        
        showStatus('🎵 Your song is ready! Artwork and audio coming soon...', 'success');
        
    } catch (error) {
        console.error('❌ Song generation failed:', error);
        showStatus(`❌ Song creation failed: ${error.message}`, 'error');
    } finally {
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '✨ Create My Song Lyrics! ✨';
        }
    }
}

// Helper function to safely get input values
function getInputValue(elementId, defaultValue = '') {
    const element = document.getElementById(elementId);
    return element ? element.value.trim() : defaultValue;
}

// Save song to library with proper error handling
async function saveToLibraryWithLimit(songData) {
    return new Promise((resolve, reject) => {
        try {
            if (!db) {
                console.warn('⚠️ Database not available');
                resolve();
                return;
            }
            
            const transaction = db.transaction(['songs'], 'readwrite');
            const store = transaction.objectStore('songs');
            
            const addRequest = store.add(songData);
            
            addRequest.onsuccess = () => {
                songData.id = addRequest.result;
                currentSong = songData;
                console.log('✅ Song saved with ID:', songData.id);
                
                // Enforce 10-song limit
                const getAllRequest = store.getAll();
                getAllRequest.onsuccess = () => {
                    const allSongs = getAllRequest.result;
                    
                    if (allSongs.length > 10) {
                        const nonFavorited = allSongs.filter(song => !song.favorited);
                        nonFavorited.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                        
                        const toDelete = allSongs.length - 10;
                        for (let i = 0; i < Math.min(toDelete, nonFavorited.length); i++) {
                            store.delete(nonFavorited[i].id);
                        }
                    }
                    
                    loadLibrary().then(resolve);
                };
                
                getAllRequest.onerror = () => {
                    console.error('❌ Error getting all songs');
                    resolve();
                };
            };
            
            addRequest.onerror = () => {
                console.error('❌ Error adding song:', addRequest.error);
                reject(addRequest.error);
            };
            
        } catch (error) {
            console.error('❌ Error in saveToLibraryWithLimit:', error);
            reject(error);
        }
    });
}

// Generate artwork asynchronously
async function generateArtworkAsync(songData) {
    try {
        showStatus('Creating album artwork... 🎨', 'info');
        const artworkUrl = await generateArtwork();
        
        const response = await fetch(artworkUrl);
        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = () => {
            songData.artworkUrl = reader.result;
            showArtwork(reader.result);
            
            if (db && songData.id) {
                const transaction = db.transaction(['songs'], 'readwrite');
                const store = transaction.objectStore('songs');
                store.put(songData);
            }
            
            console.log('✅ Artwork generated and saved');
        };
        reader.readAsDataURL(blob);
        
    } catch (error) {
        console.error('❌ Artwork generation failed:', error);
        showStatus('Lyrics created! Artwork generation failed... 🎨', 'info');
    }
}

// Generate audio asynchronously
async function generateAudioAsync(songData) {
    try {
        showStatus('Recording vocal demo... 🎤', 'info');
        showAudioPlaceholder();
        
        const audioUrl = await generateVocalDemo(songData.lyrics, songData.voice);
        
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = () => {
            songData.audioUrl = reader.result;
            currentAudioUrl = reader.result;
            showAudio(reader.result);
            
            if (db && songData.id) {
                const transaction = db.transaction(['songs'], 'readwrite');
                const store = transaction.objectStore('songs');
                store.put(songData);
            }
            
            showStatus('Vocal demo complete! 🎤', 'success');
            console.log('✅ Audio generated and saved');
        };
        reader.readAsDataURL(blob);
        
    } catch (error) {
        console.error('❌ Audio generation failed:', error);
        showAudioError();
        showStatus('Song created! Vocal demo generation failed... 🎤', 'info');
    }
}

// Build lyrics generation prompt
function buildLyricsPrompt() {
    const title = getInputValue('song-title');
    const artist = getInputValue('song-artist');
    const theme = getInputValue('song-theme');
    const mood = getInputValue('song-mood', 'upbeat');
    const structure = getInputValue('song-structure', 'verse-chorus');
    const customGenre = getInputValue('custom-genre');
    const customInstructions = getInputValue('custom-instructions');
    
    const genre = customGenre || selectedGenre;
    
    const moodDescriptions = {
        upbeat: 'upbeat and energetic',
        romantic: 'romantic and sweet',
        melancholy: 'melancholy and emotional',
        empowering: 'empowering and motivational',
        nostalgic: 'nostalgic and reflective',
        rebellious: 'rebellious and edgy',
        peaceful: 'peaceful and calming',
        party: 'fun and party-oriented',
        introspective: 'introspective and thoughtful'
    };
    
    const structureDescriptions = {
        'verse-chorus': 'verse-chorus structure with 2-3 verses and a memorable chorus',
        'verse-chorus-bridge': 'verse-chorus-bridge structure with 2 verses, chorus, and a bridge section',
        'aaba': 'AABA structure (32-bar form)',
        'verse-prechorus-chorus': 'verse-prechorus-chorus structure for building tension',
        'ballad': 'ballad structure with emotional storytelling',
        'freestyle': 'creative/experimental structure'
    };
    
    let prompt = `WRITE ONLY RAW SONG LYRICS WITH NO LABELS, NO SECTION HEADERS, NO COMMENTARY, NO EXPLANATIONS. Generate complete professional song lyrics in the ${genre} genre. `;
    
    if (title) prompt += `The song title is "${title}". `;
    if (artist) prompt += `Write in the style of ${artist}. `;
    if (theme) prompt += `The song theme/topic is: ${theme}. `;
    
    prompt += `The mood should be ${moodDescriptions[mood] || mood}. `;
    prompt += `Use a ${structureDescriptions[structure] || structure}. `;
    
    if (customInstructions) prompt += `Additional requirements: ${customInstructions}. `;
    
    prompt += `CRITICAL: Output ONLY the complete song lyrics as plain text. NO [Verse], NO [Chorus], NO **Title**, NO formatting, NO labels, NO section markers, NO commentary. Just the raw lyrical content that can be sung from start to finish.`;
    
    return prompt;
}

// Generate lyrics with error handling
async function generateLyrics() {
    try {
        const prompt = buildLyricsPrompt();
        const encodedPrompt = encodeURIComponent(prompt);
        const randomSeed = Math.floor(Math.random() * 1000000);
        const lyricsUrl = `${TEXT_API}${encodedPrompt}?model=openai&seed=${randomSeed}&referrer=songcomposer`;
        
        const response = await fetch(lyricsUrl, {
            method: 'GET',
            headers: { 'Accept': 'text/plain' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const lyrics = await response.text();
        
        if (!lyrics || lyrics.length < 50) {
            throw new Error('Lyrics too short or empty');
        }
        
        return lyrics;
    } catch (error) {
        console.error('❌ Error generating lyrics:', error);
        throw error;
    }
}

// Generate artwork
async function generateArtwork() {
    const title = getInputValue('song-title');
    const theme = getInputValue('song-theme');
    const mood = getInputValue('song-mood', 'upbeat');
    const customGenre = getInputValue('custom-genre');
    const genre = customGenre || selectedGenre;
    
    let artworkPrompt = `album cover art, music artwork, ${genre} genre, ${mood} mood, professional design, high quality, detailed, artistic`;
    
    if (title) artworkPrompt += `, ${title}`;
    if (theme) artworkPrompt += `, ${theme} theme`;
    
    artworkPrompt += `, vibrant colors, modern design, music industry style`;
    
    const encodedPrompt = encodeURIComponent(artworkPrompt);
    const randomSeed = Math.floor(Math.random() * 1000000);
    const artworkUrl = `${IMAGE_API}${encodedPrompt}?width=512&height=512&model=flux&enhance=true&nologo=true&seed=${randomSeed}&referrer=songcomposer`;
    
    const response = await fetch(artworkUrl);
    if (!response.ok) throw new Error('Artwork generation failed');
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

// Generate vocal demo
async function generateVocalDemo(lyrics, voice) {
    const cleanLyrics = lyrics
        .replace(/\*\*.*?\*\*/g, '')
        .replace(/\*.*?\*/gi, '')
        .replace(/\[.*?\]/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    const instruction = "SKIP NO LINES AND IMMEDIATELY WITHOUT REMARKS OR COMMENTARY TRANSCRIBE COMPLETELY AND EXACTLY THIS TEXT FOR IT IS SONG LYRICS, READ ALOUD WITH FEELING AND DEPTH:";
    const textToSpeak = `${instruction} ${cleanLyrics}`;
    const encodedText = encodeURIComponent(textToSpeak);
    const audioSeed = Math.floor(Math.random() * 1000000);
    const audioUrl = `${AUDIO_API}${encodedText}?model=openai-audio&voice=${voice}&seed=${audioSeed}&referrer=songcomposer`;
    
    const response = await fetch(audioUrl);
    if (!response.ok) throw new Error('Audio fetch failed');
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

// Load library from database
async function loadLibrary() {
    return new Promise((resolve) => {
        try {
            if (!db) {
                console.warn('⚠️ No database - using empty library');
                songLibrary = [];
                updateLibraryUI();
                resolve();
                return;
            }
            
            const transaction = db.transaction(['songs'], 'readonly');
            const store = transaction.objectStore('songs');
            const request = store.getAll();
            
            request.onsuccess = () => {
                songLibrary = request.result || [];
                console.log('📚 Library loaded:', songLibrary.length, 'songs');
                updateLibraryUI();
                resolve();
            };
            
            request.onerror = () => {
                console.error('❌ Error loading library:', request.error);
                songLibrary = [];
                updateLibraryUI();
                resolve(); // RESOLVE ANYWAY
            };
        } catch (error) {
            console.error('❌ Library load exception:', error);
            songLibrary = [];
            updateLibraryUI();
            resolve(); // RESOLVE ANYWAY
        }
    });
}

// Update library UI
function updateLibraryUI() {
    const libraryList = document.getElementById('song-library-list');
    if (!libraryList) {
        console.warn('⚠️ Library list element not found');
        return;
    }
    
    if (songLibrary.length === 0) {
        libraryList.innerHTML = `
            <div style="text-align: center; color: #718096; font-style: italic; padding: 3rem;">
                No songs created yet. Start composing your first masterpiece above! 🎼
            </div>
        `;
        return;
    }
    
    const sortedSongs = [...songLibrary].sort((a, b) => {
        if (a.favorited !== b.favorited) {
            return b.favorited - a.favorited;
        }
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    libraryList.innerHTML = sortedSongs.map((song) => {
        const preview = song.lyrics ? song.lyrics.substring(0, 150) + '...' : 'No lyrics';
        const date = new Date(song.timestamp).toLocaleDateString();
        
        return `
            <div class="song-card ${song.favorited ? 'favorited' : ''}" data-song-id="${song.id}">
                <div class="song-title">
                    ${song.favorited ? '⭐ ' : ''}${song.title}
                </div>
                <div class="song-preview">${preview}</div>
                <div class="song-meta">
                    <span>📅 ${date} | 🎵 ${song.genre} | 😊 ${song.mood}</span>
                </div>
                <div class="song-actions">
                    <button class="mini-button" onclick="loadSongById(${song.id})">🎼 View Full Song</button>
                    <button class="mini-button" onclick="downloadAudioById(${song.id})">💾 Download</button>
                    <button class="mini-button" onclick="copyLyricsById(${song.id})">📋 Copy Lyrics</button>
                    <button class="mini-button ${song.favorited ? 'favorite' : ''}" onclick="toggleFavoriteById(${song.id})">
                        ${song.favorited ? '⭐ Favorited' : '⭐ Favorite'}
                    </button>
                    <button class="mini-button" onclick="deleteSongById(${song.id})">🗑️ Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Load song by ID
function loadSongById(songId) {
    console.log('📖 Loading song ID:', songId);
    
    const song = songLibrary.find(s => s.id == songId);
    if (!song) {
        showStatus('Song not found!', 'error');
        return;
    }
    
    currentSong = song;
    
    // Fill form fields safely
    setInputValue('song-title', song.title || '');
    setInputValue('song-artist', song.artist || '');
    setInputValue('song-theme', song.theme || '');
    setInputValue('song-mood', song.mood || 'upbeat');
    setInputValue('song-structure', song.structure || 'verse-chorus');
    setInputValue('voice-type', song.voice || 'nova');
    
    // Update genre selection
    if (song.genre) {
        document.querySelectorAll('.genre-button').forEach(b => b.classList.remove('selected'));
        const genreButton = document.querySelector(`[data-genre="${song.genre}"]`);
        if (genreButton) {
            genreButton.classList.add('selected');
            selectedGenre = song.genre;
        } else {
            setInputValue('custom-genre', song.genre);
        }
    }

    setInputValue('regenerate-voice-type', song.voice || 'nova');
    
    displayLyrics(song.lyrics);
    
    if (song.artworkUrl) {
        showArtwork(song.artworkUrl);
    } else {
        const artworkContainer = document.getElementById('song-artwork-container');
        if (artworkContainer) {
            artworkContainer.classList.add('hidden');
        }
    }
    
    if (song.audioUrl) {
        showAudio(song.audioUrl);
    } else {
        const audioContainer = document.getElementById('audio-container');
        if (audioContainer) {
            audioContainer.style.display = 'none';
        }
    }
    
    const favoriteBtn = document.getElementById('favorite-song-btn');
    if (favoriteBtn) {
        favoriteBtn.innerHTML = song.favorited ? 
            '⭐ Remove from Favorites' : '⭐ Add to Favorites';
    }
    
    showStatus('Song loaded! ✨', 'success');
    
    const lyricsSection = document.getElementById('lyrics-section');
    if (lyricsSection) {
        lyricsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Helper function to safely set input values
function setInputValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.value = value;
    }
}

// Copy lyrics by ID
function copyLyricsById(songId) {
    console.log('📋 Copying lyrics for song ID:', songId);
    
    const song = songLibrary.find(s => s.id == songId);
    if (!song || !song.lyrics) {
        showStatus('No lyrics to copy!', 'error');
        return;
    }
    
    navigator.clipboard.writeText(song.lyrics).then(() => {
        showStatus('Lyrics copied to clipboard! 📋', 'success');
    }).catch(() => {
        showStatus('Failed to copy lyrics! 📋', 'error');
    });
}

// Toggle favorite by ID
async function toggleFavoriteById(songId) {
    console.log('⭐ Toggling favorite for song ID:', songId);
    
    const song = songLibrary.find(s => s.id == songId);
    if (!song) return;
    
    song.favorited = !song.favorited;
    
    try {
        if (db) {
            const transaction = db.transaction(['songs'], 'readwrite');
            const store = transaction.objectStore('songs');
            store.put(song);
            
            transaction.oncomplete = () => {
                loadLibrary();
                showStatus(song.favorited ? 'Added to favorites! ⭐' : 'Removed from favorites! ⭐', 'success');
            };
        }
    } catch (error) {
        console.error('❌ Error updating favorite:', error);
        showStatus('Failed to update favorite!', 'error');
    }
}

// Download audio by ID
function downloadAudioById(songId) {
    console.log('💾 Downloading audio for song ID:', songId);
    
    const song = songLibrary.find(s => s.id == songId);
    if (!song || !song.audioUrl) {
        showStatus('No vocal demo to download! 💾', 'error');
        return;
    }
    
    try {
        const a = document.createElement('a');
        a.href = song.audioUrl;
        
        const safeFileName = song.title.replace(/[^a-z0-9_]/gi, '_').toLowerCase();
        const filename = `song_demo_${safeFileName}_${Date.now()}.mp3`;
        a.download = filename;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showStatus('Download started! 💾', 'success');
        
    } catch (error) {
        console.error('❌ Download error:', error);
        showStatus('Download failed. Please try again! 💾', 'error');
    }
}

// Delete song by ID
async function deleteSongById(songId) {
    console.log('🗑️ Deleting song ID:', songId);
    
    const song = songLibrary.find(s => s.id == songId);
    if (!song) return;
    
    const songTitle = song.title || 'Untitled';
    
    if (confirm(`Delete "${songTitle}"? This cannot be undone! 🗑️`)) {
        try {
            if (!db) {
                showStatus('Database not available!', 'error');
                return;
            }
            
            const transaction = db.transaction(['songs'], 'readwrite');
            const store = transaction.objectStore('songs');
            
            const deleteRequest = store.delete(Number(songId));
            
            deleteRequest.onsuccess = () => {
                const index = songLibrary.findIndex(s => s.id == songId);
                if (index >= 0) {
                    songLibrary.splice(index, 1);
                }
                
                if (currentSong && currentSong.id == songId) {
                    currentSong = null;
                    const lyricsSection = document.getElementById('lyrics-section');
                    if (lyricsSection) {
                        lyricsSection.classList.add('hidden');
                    }
                }
                
                updateLibraryUI();
                showStatus(`"${songTitle}" DELETED! 🗑️`, 'success');
            };
            
            deleteRequest.onerror = () => {
                console.error('❌ Delete failed:', deleteRequest.error);
                showStatus('Failed to delete song!', 'error');
            };
            
        } catch (error) {
            console.error('❌ Delete exception:', error);
            showStatus('Delete failed! 🗑️', 'error');
        }
    }
}

// Clear entire library
async function clearLibrary() {
    console.log('🗑️ Clearing entire library...');
    
    if (confirm('Are you sure you want to delete ALL songs (including favorites)? This cannot be undone! 🗑️')) {
        try {
            if (!db) {
                showStatus('Database not available!', 'error');
                return;
            }
            
            const transaction = db.transaction(['songs'], 'readwrite');
            const store = transaction.objectStore('songs');
            
            const clearRequest = store.clear();
            
            clearRequest.onsuccess = () => {
                songLibrary = [];
                currentSong = null;
                currentAudioUrl = null;
                
                const lyricsSection = document.getElementById('lyrics-section');
                if (lyricsSection) {
                    lyricsSection.classList.add('hidden');
                }
                
                const artworkContainer = document.getElementById('song-artwork-container');
                if (artworkContainer) {
                    artworkContainer.classList.add('hidden');
                }
                
                const audioContainer = document.getElementById('audio-container');
                if (audioContainer) {
                    audioContainer.style.display = 'none';
                }
                
                updateLibraryUI();
                showStatus('ALL SONGS DELETED! 🗑️💥', 'success');
            };
            
            clearRequest.onerror = () => {
                console.error('❌ Clear failed:', clearRequest.error);
                showStatus('Failed to clear library!', 'error');
            };
            
        } catch (error) {
            console.error('❌ Clear all exception:', error);
            showStatus('Failed to clear library! Please refresh the page! 🗑️', 'error');
        }
    }
}

// Toggle favorite for current song
async function toggleFavorite() {
    console.log('⭐ Toggling favorite for current song');
    
    if (!currentSong) {
        showStatus('No song selected!', 'error');
        return;
    }
    
    currentSong.favorited = !currentSong.favorited;
    
    try {
        if (db) {
            const transaction = db.transaction(['songs'], 'readwrite');
            const store = transaction.objectStore('songs');
            store.put(currentSong);
            
            transaction.oncomplete = () => {
                const favoriteBtn = document.getElementById('favorite-song-btn');
                if (favoriteBtn) {
                    favoriteBtn.innerHTML = currentSong.favorited ? 
                        '⭐ Remove from Favorites' : '⭐ Add to Favorites';
                }
                
                loadLibrary();
                showStatus(currentSong.favorited ? 'Added to favorites! ⭐' : 'Removed from favorites! ⭐', 'success');
            };
        }
    } catch (error) {
        console.error('❌ Error updating favorite:', error);
        showStatus('Failed to update favorite!', 'error');
    }
}

// Copy current lyrics
async function copyLyrics() {
    console.log('📋 Copying current lyrics');
    
    if (!currentSong || !currentSong.lyrics) {
        showStatus('No lyrics to copy! 📋', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(currentSong.lyrics);
        showStatus('Lyrics copied to clipboard! 📋', 'success');
    } catch (error) {
        showStatus('Failed to copy lyrics. Please select and copy manually! 📋', 'error');
    }
}

// Regenerate audio with new voice
async function regenerateAudioWithNewVoice() {
    console.log('🎤 Regenerating audio with new voice');
    
    if (!currentSong) {
        showStatus('No song loaded to regenerate audio! 🎤', 'error');
        return;
    }
    
    const voiceSelect = document.getElementById('regenerate-voice-type');
    const selectedVoice = voiceSelect ? voiceSelect.value : 'nova';
    const regenBtn = document.getElementById('regenerate-audio-btn');
    
    if (regenBtn) {
        const originalText = regenBtn.innerHTML;
        regenBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';
        regenBtn.disabled = true;
        
        showStatus('Generating new vocal demo with selected voice... 🎤', 'info');
        showAudioPlaceholder();
        
        try {
            const newAudioUrl = await generateVocalDemo(currentSong.lyrics, selectedVoice);
            
            const response = await fetch(newAudioUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                currentSong.audioUrl = base64data;
                currentSong.voice = selectedVoice;
                currentAudioUrl = base64data;
                
                if (db && currentSong.id) {
                    const transaction = db.transaction(['songs'], 'readwrite');
                    const store = transaction.objectStore('songs');
                    store.put(currentSong);
                    
                    transaction.oncomplete = () => {
                        showAudio(base64data);
                        loadLibrary();
                        setInputValue('voice-type', selectedVoice);
                        showStatus('New vocal demo generated! 🎤', 'success');
                    };
                }
            };
            reader.readAsDataURL(blob);
            
        } catch (error) {
            console.error('❌ Audio regeneration failed:', error);
            showAudioError();
            showStatus('Failed to generate new vocal demo. Please try again! 🎤', 'error');
        } finally {
            regenBtn.innerHTML = originalText;
            regenBtn.disabled = false;
        }
    }
}

// Display lyrics
function displayLyrics(lyrics) {
    if (!lyrics) {
        console.warn('⚠️ No lyrics to display');
        return;
    }
    
    const lyricsDisplay = document.getElementById('lyrics-display');
    if (lyricsDisplay) {
        lyricsDisplay.innerHTML = `
            <div id="lyrics-text" class="lyrics-display" style="cursor: pointer; position: relative;">
                ${lyrics}
                <div style="position: absolute; top: 10px; right: 10px; font-size: 0.8rem; color: #667eea; opacity: 0.7;">
                    Click to edit ✏️
                </div>
            </div>
            <div id="lyrics-editor" class="hidden">
                <textarea id="lyrics-textarea" class="editable-lyrics">${lyrics}</textarea>
                <div class="lyrics-edit-controls">
                    <button class="mini-button" onclick="saveLyricsEdit()">💾 Save Changes</button>
                    <button class="mini-button" onclick="cancelLyricsEdit()">❌ Cancel</button>
                </div>
            </div>
        `;
        
        // Add click handler for editing
        const lyricsText = document.getElementById('lyrics-text');
        if (lyricsText) {
            lyricsText.addEventListener('click', startLyricsEdit);
        }
    }
    
    const lyricsSection = document.getElementById('lyrics-section');
    if (lyricsSection) {
        lyricsSection.classList.remove('hidden');
        lyricsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Show artwork with refresh button
function showArtwork(artworkUrl) {
    const artworkContainer = document.getElementById('song-artwork-container');
    if (artworkContainer) {
        artworkContainer.innerHTML = `
            <div class="artwork-container">
                <img class="song-artwork" alt="Song artwork" src="${artworkUrl}" />
                <button class="refresh-artwork-btn" onclick="refreshArtwork()" title="Generate new artwork">
                    🔄
                </button>
            </div>
        `;
        artworkContainer.classList.remove('hidden');
    }
}

// Show audio
function showAudio(audioUrl) {
    const audioContainer = document.getElementById('audio-container');
    if (audioContainer) {
        audioContainer.style.display = 'block';
        
        audioContainer.innerHTML = `
            <h3 style="color: #2d3748; margin-bottom: 1rem;">🎵 Vocal Demo</h3>
            <audio id="audio-player" controls src="${audioUrl}"></audio>
            <button class="mini-button" onclick="downloadCurrentAudio()" style="margin-top: 1rem;">
                💾 Download Demo
            </button>
        `;
        
        currentAudioUrl = audioUrl;
    }
}

// Show audio loading placeholder
function showAudioPlaceholder() {
    const audioContainer = document.getElementById('audio-container');
    if (audioContainer) {
        audioContainer.style.display = 'block';
        audioContainer.innerHTML = `
            <h3 style="color: #2d3748; margin-bottom: 1rem;">🎵 Vocal Demo</h3>
            <div style="padding: 2rem; text-align: center; color: #667eea; background: linear-gradient(135deg, #e6f3ff, #f0e6ff); border-radius: 10px;">
                <div class="loading-spinner" style="margin: 0 auto 1rem;"></div>
                <p><strong>Creating your vocal demo...</strong></p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; color: #718096;">This may take 30-60 seconds ⏳</p>
            </div>
        `;
    }
}

function showAudioError() {
    const audioContainer = document.getElementById('audio-container');
    if (audioContainer) {
        audioContainer.style.display = 'block';
        audioContainer.innerHTML = `
            <h3 style="color: #2d3748; margin-bottom: 1rem;">🎵 Vocal Demo</h3>
            <div style="padding: 1.5rem; text-align: center; color: #e53e3e; background: #fed7d7; border-radius: 10px;">
                <p><strong>❌ Vocal demo generation failed</strong></p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">You can try creating a new version to generate audio, or view this song later from your library!</p>
            </div>
        `;
    }
}

// Download current audio
function downloadCurrentAudio() {
    console.log('💾 Downloading current audio');
    
    if (!currentAudioUrl) {
        showStatus('No vocal demo to download. Create audio first! 🎤', 'error');
        return;
    }
    
    try {
        const a = document.createElement('a');
        a.href = currentAudioUrl;
        
        const title = getInputValue('song-title', 'song');
        const safeFileName = title.replace(/[^a-z0-9_]/gi, '_').toLowerCase();
        const filename = `song_demo_${safeFileName}_${Date.now()}.mp3`;
        a.download = filename;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showStatus('Download started! 💾', 'success');
        
    } catch (error) {
        console.error('❌ Download error:', error);
        showStatus('Download failed. Please try again! 💾', 'error');
    }
}

// Refresh artwork with new seed
function refreshArtwork() {
    console.log('🔄 Refreshing artwork');
    
    if (!currentSong) return;
    
    const refreshBtn = document.querySelector('.refresh-artwork-btn');
    if (refreshBtn) {
        refreshBtn.innerHTML = '⏳';
        refreshBtn.style.pointerEvents = 'none';
    }
    
    showStatus('Generating new artwork... 🎨', 'info');
    
    generateArtwork().then(async (newArtworkUrl) => {
        const response = await fetch(newArtworkUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result;
            currentSong.artworkUrl = base64data;
            
            if (db && currentSong.id) {
                const transaction = db.transaction(['songs'], 'readwrite');
                const store = transaction.objectStore('songs');
                store.put(currentSong);
                
                transaction.oncomplete = () => {
                    showArtwork(base64data);
                    loadLibrary();
                    showStatus('New artwork generated! 🎨', 'success');
                };
            }
        };
        reader.readAsDataURL(blob);
        
    }).catch((error) => {
        console.error('❌ Artwork refresh failed:', error);
        showStatus('Failed to generate new artwork. Please try again! 🎨', 'error');
        if (refreshBtn) {
            refreshBtn.innerHTML = '🔄';
            refreshBtn.style.pointerEvents = 'auto';
        }
    });
}

// Start lyrics editing
function startLyricsEdit() {
    console.log('✏️ Starting lyrics edit');
    
    const lyricsText = document.getElementById('lyrics-text');
    const lyricsEditor = document.getElementById('lyrics-editor');
    const lyricsTextarea = document.getElementById('lyrics-textarea');
    
    if (lyricsText && lyricsEditor && lyricsTextarea) {
        lyricsText.classList.add('hidden');
        lyricsEditor.classList.remove('hidden');
        lyricsTextarea.focus();
    }
}

// Save lyrics edit
function saveLyricsEdit() {
    console.log('💾 Saving lyrics edit');
    
    const lyricsTextarea = document.getElementById('lyrics-textarea');
    if (!lyricsTextarea) return;
    
    const newLyrics = lyricsTextarea.value.trim();
    
    if (!newLyrics) {
        showStatus('Lyrics cannot be empty! ✏️', 'error');
        return;
    }
    
    if (!currentSong) {
        showStatus('No song to update! ✏️', 'error');
        return;
    }
    
    currentSong.lyrics = newLyrics;
    
    try {
        if (db && currentSong.id) {
            const transaction = db.transaction(['songs'], 'readwrite');
            const store = transaction.objectStore('songs');
            store.put(currentSong);
            
            transaction.oncomplete = () => {
                const lyricsText = document.getElementById('lyrics-text');
                if (lyricsText) {
                    lyricsText.innerHTML = `
                        ${newLyrics}
                        <div style="position: absolute; top: 10px; right: 10px; font-size: 0.8rem; color: #667eea; opacity: 0.7;">
                            Click to edit ✏️
                        </div>
                    `;
                    lyricsText.addEventListener('click', startLyricsEdit);
                }
                
                const lyricsEditor = document.getElementById('lyrics-editor');
                if (lyricsEditor) {
                    lyricsEditor.classList.add('hidden');
                }
                
                const lyricsTextEl = document.getElementById('lyrics-text');
                if (lyricsTextEl) {
                    lyricsTextEl.classList.remove('hidden');
                }
                
                loadLibrary();
                showStatus('Lyrics updated successfully! ✏️', 'success');
            };
        }
        
    } catch (error) {
        console.error('❌ Error saving lyrics:', error);
        showStatus('Failed to save lyrics changes! ✏️', 'error');
    }
}

// Cancel lyrics edit
function cancelLyricsEdit() {
    console.log('❌ Canceling lyrics edit');
    
    const lyricsEditor = document.getElementById('lyrics-editor');
    const lyricsText = document.getElementById('lyrics-text');
    
    if (lyricsEditor && lyricsText) {
        lyricsEditor.classList.add('hidden');
        lyricsText.classList.remove('hidden');
    }
}

// Show status message
function showStatus(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    const statusMessage = document.getElementById('status-message');
    if (statusMessage) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type}`;
        statusMessage.classList.remove('hidden');
        
        // Clear any existing timeout
        if (window.statusTimeout) {
            clearTimeout(window.statusTimeout);
        }
        
        // Set new timeout
        window.statusTimeout = setTimeout(() => {
            statusMessage.classList.add('hidden');
        }, 5000);
    }
}

// Log initialization complete
console.log('🎵 Song Composer Script Loaded Successfully!');