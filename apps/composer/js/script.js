// Constants
const TEXT_API = 'https://text.pollinations.ai/';
const IMAGE_API = 'https://image.pollinations.ai/prompt/';
const AUDIO_API = 'https://text.pollinations.ai/';

// Global variables
let db;
let currentSong = null;
let currentAudioUrl = null;
let songLibrary = [];
let selectedGenre = 'pop';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 INITIALIZING APP');
    initializeApp();
});

// Initialize the app
async function initializeApp() {
    try {
        await initDB();
        console.log('✅ Database initialized');
        
        await loadLibrary();
        console.log('✅ Library loaded');
        
        setupEventListeners();
        console.log('✅ Event listeners set up');
        
        console.log('🎵 APP READY');
    } catch (error) {
        console.error('❌ App initialization failed:', error);
        showStatus('App initialization failed. Please refresh the page.', 'error');
    }
}

// Initialize IndexedDB
function initDB() {
    return new Promise((resolve, reject) => {
        console.log('🔧 Opening database...');
        const request = indexedDB.open('songComposerDB', 3);
        
        request.onerror = () => {
            console.error('❌ Database error:', request.error);
            reject(request.error);
        };
        
        request.onsuccess = () => {
            db = request.result;
            console.log('✅ Database opened successfully');
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            console.log('🔧 Database needs upgrade...');
            const db = event.target.result;
            
            if (!db.objectStoreNames.contains('songs')) {
                const store = db.createObjectStore('songs', { keyPath: 'id', autoIncrement: true });
                store.createIndex('timestamp', 'timestamp', { unique: false });
                store.createIndex('favorited', 'favorited', { unique: false });
                console.log('✅ Songs object store created');
            }
        };
    });
}

// Set up all event listeners
function setupEventListeners() {
    console.log('🔧 SETTING UP EVENT LISTENERS...');
    
    // Main buttons - with debug logging
    const generateBtn = document.getElementById('generate-lyrics-btn');
    console.log('🔧 Looking for generate button...', generateBtn);
    
    if (generateBtn) {
        // REMOVE ANY EXISTING LISTENERS
        generateBtn.onclick = null;
        
        // ADD THE REAL FUNCTION
        generateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎵 GENERATE BUTTON CLICKED - CALLING FUNCTION!');
            generateCompleteSong();
        });
        console.log('✅ Generate button listener attached');
    } else {
        console.error('❌ Generate button NOT FOUND!');
    }
    
    const regenerateBtn = document.getElementById('regenerate-lyrics-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', generateCompleteSong);
        console.log('✅ Regenerate button listener attached');
    }
    
    const favoriteBtn = document.getElementById('favorite-song-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
        console.log('✅ Favorite button listener attached');
    }
    
    const copyBtn = document.getElementById('copy-lyrics-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyLyrics);
        console.log('✅ Copy button listener attached');
    }
    
    const clearBtn = document.getElementById('clear-library-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearLibrary);
        console.log('✅ Clear button listener attached');
    }
    
    const regenAudioBtn = document.getElementById('regenerate-audio-btn');
    if (regenAudioBtn) {
        regenAudioBtn.addEventListener('click', regenerateAudioWithNewVoice);
        console.log('✅ Regen audio button listener attached');
    }

    // Genre selection
    document.querySelectorAll('.genre-button').forEach(button => {
        button.addEventListener('click', () => {
            console.log('🎼 Genre selected:', button.dataset.genre);
            document.querySelectorAll('.genre-button').forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            selectedGenre = button.dataset.genre;
            document.getElementById('custom-genre').value = '';
        });
    });

    console.log('✅ Event listeners attached');
}

// Generate complete song
async function generateCompleteSong() {
	const title = document.getElementById('song-title').value.trim();
	const theme = document.getElementById('song-theme').value.trim();
	if (!title && !theme) {
       showStatus('Please provide at least a song title or theme! 🎵', 'error');
       return;
   }
   
   setLoading(document.getElementById('generate-lyrics-btn'), true, 'Composing your song...');
   document.getElementById('lyrics-section').classList.add('hidden');
   
   let songData = {
       title: title || 'Untitled',
       artist: document.getElementById('song-artist').value.trim() || 'Unknown',
       theme: theme || 'Unknown',
       mood: document.getElementById('song-mood').value,
       genre: document.getElementById('custom-genre').value.trim() || selectedGenre,
       structure: document.getElementById('song-structure').value,
       voice: document.getElementById('voice-type').value,
       timestamp: new Date().toISOString(),
       favorited: false
   };

   try {
       // Step 1: Generate lyrics
       showStatus('Writing your song lyrics... ✍️', 'info');
       const lyrics = await generateLyrics();
       if (!lyrics || lyrics.length < 50) {
           throw new Error('Generated lyrics are too short or empty');
       }
       songData.lyrics = lyrics;
       
       // Display lyrics immediately
       displayLyrics(lyrics);
       
       // Save to database with proper limit management
       await saveToLibraryWithLimit(songData);
       
       // Generate artwork (non-blocking)
       generateArtworkAsync(songData);
       
       // Generate audio (non-blocking)
       generateAudioAsync(songData);
       
       showStatus('Your song lyrics are ready! Artwork and vocal demo are being generated... ✨🎼', 'success');
       
   } catch (error) {
       console.error('❌ Song generation failed:', error);
       showStatus(`Song creation failed: ${error.message}. Please try again! 🎵`, 'error');
   } finally {
       setLoading(document.getElementById('generate-lyrics-btn'), false);
   }
}

// Save song to library with proper 10-song limit
async function saveToLibraryWithLimit(songData) {
   try {
       const transaction = db.transaction(['songs'], 'readwrite');
       const store = transaction.objectStore('songs');
       
       // Add the new song
       const addRequest = store.add(songData);
       
       addRequest.onsuccess = async () => {
           songData.id = addRequest.result;
           currentSong = songData;
           console.log('✅ Song saved with ID:', songData.id);
           
           // Now enforce the 10-song limit
           const getAllRequest = store.getAll();
           getAllRequest.onsuccess = async () => {
               const allSongs = getAllRequest.result;
               console.log('📊 Total songs in DB:', allSongs.length);
               
               if (allSongs.length > 10) {
                   // Sort by timestamp (oldest first), but keep favorites
                   const nonFavorited = allSongs.filter(song => !song.favorited);
                   nonFavorited.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                   
                   const toDelete = allSongs.length - 10;
                   console.log('🗑️ Need to delete', toDelete, 'old songs');
                   
                   for (let i = 0; i < Math.min(toDelete, nonFavorited.length); i++) {
                       const deleteRequest = store.delete(nonFavorited[i].id);
                       deleteRequest.onsuccess = () => {
                           console.log('🗑️ Deleted old song:', nonFavorited[i].title);
                       };
                   }
               }
               
               // Reload the library to reflect changes
               await loadLibrary();
           };
       };
       
   } catch (error) {
       console.error('❌ Error saving to library:', error);
   }
}

// Generate artwork asynchronously
async function generateArtworkAsync(songData) {
   try {
       showStatus('Creating album artwork... 🎨', 'info');
       const artworkUrl = await generateArtwork();
       
       // Convert to base64 for storage
       const response = await fetch(artworkUrl);
       const blob = await response.blob();
       
       const reader = new FileReader();
       reader.onloadend = async () => {
           songData.artworkUrl = reader.result;
           showArtwork(reader.result);
           
           // Update in database
           const transaction = db.transaction(['songs'], 'readwrite');
           const store = transaction.objectStore('songs');
           store.put(songData);
           
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
       
       // Convert to base64 for storage
       const response = await fetch(audioUrl);
       const blob = await response.blob();
       
       const reader = new FileReader();
       reader.onloadend = async () => {
           songData.audioUrl = reader.result;
           currentAudioUrl = reader.result;
           showAudio(reader.result);
           
           // Update in database
           const transaction = db.transaction(['songs'], 'readwrite');
           const store = transaction.objectStore('songs');
           store.put(songData);
           
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
   const title = document.getElementById('song-title').value.trim();
   const artist = document.getElementById('song-artist').value.trim();
   const theme = document.getElementById('song-theme').value.trim();
   const mood = document.getElementById('song-mood').value;
   const structure = document.getElementById('song-structure').value;
   const customGenre = document.getElementById('custom-genre').value.trim();
   const customInstructions = document.getElementById('custom-instructions').value.trim();
   
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
   
   prompt += `The mood should be ${moodDescriptions[mood]}. `;
   prompt += `Use a ${structureDescriptions[structure]}. `;
   
   if (customInstructions) prompt += `Additional requirements: ${customInstructions}. `;
   
   prompt += `CRITICAL: Output ONLY the complete song lyrics as plain text. NO [Verse], NO [Chorus], NO **Title**, NO formatting, NO labels, NO section markers, NO commentary. Just the raw lyrical content that can be sung from start to finish.`;
   
   return prompt;
}

// Generate lyrics
async function generateLyrics() {
   const prompt = buildLyricsPrompt();
   const encodedPrompt = encodeURIComponent(prompt);
   const randomSeed = Math.floor(Math.random() * 1000000);
   const lyricsUrl = `${TEXT_API}${encodedPrompt}?model=openai&seed=${randomSeed}&referrer=songcomposer`;
   
   const response = await fetch(lyricsUrl, {
       method: 'GET',
       headers: {
           'Accept': 'text/plain',
       }
   });
   
   if (!response.ok) {
       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
   }
   
   const lyrics = await response.text();
   
   if (!lyrics || lyrics.length < 50) {
       throw new Error('Lyrics too short or empty');
   }
   
   return lyrics;
}

// Generate artwork
async function generateArtwork() {
   const title = document.getElementById('song-title').value.trim();
   const theme = document.getElementById('song-theme').value.trim();
   const mood = document.getElementById('song-mood').value;
   const customGenre = document.getElementById('custom-genre').value.trim();
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
   const localUrl = URL.createObjectURL(blob);
   
   return localUrl;
}

// Generate vocal demo
async function generateVocalDemo(lyrics, voice) {
   const cleanLyrics = lyrics
       .replace(/\*\*.*?\*\*/g, '')
       .replace(/\*Verse.*?\*/gi, '')
       .replace(/\*Chorus.*?\*/gi, '')
       .replace(/\*Bridge.*?\*/gi, '')
       .replace(/\*Intro.*?\*/gi, '')
       .replace(/\*Outro.*?\*/gi, '')
       .replace(/\*Pre-Chorus.*?\*/gi, '')
       .replace(/\*Hook.*?\*/gi, '')
       .replace(/\*Refrain.*?\*/gi, '')
       .replace(/\[Verse.*?\]/gi, '')
       .replace(/\[Chorus.*?\]/gi, '')
       .replace(/\[Bridge.*?\]/gi, '')
       .replace(/\[Intro.*?\]/gi, '')
       .replace(/\[Outro.*?\]/gi, '')
       .replace(/\[Pre-Chorus.*?\]/gi, '')
       .replace(/\[Hook.*?\]/gi, '')
       .replace(/\[Refrain.*?\]/gi, '')
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
   const localAudioUrl = URL.createObjectURL(blob);
   
   return localAudioUrl;
}

// Load library from database
async function loadLibrary() {
   return new Promise((resolve, reject) => {
       try {
           const transaction = db.transaction(['songs'], 'readonly');
           const store = transaction.objectStore('songs');
           const request = store.getAll();
           
           request.onsuccess = () => {
               songLibrary = request.result;
               console.log('📚 Library loaded:', songLibrary.length, 'songs');
               updateLibraryUI();
               resolve();
           };
           
           request.onerror = () => {
               console.error('❌ Error loading library:', request.error);
               reject(request.error);
           };
       } catch (error) {
           console.error('❌ Library load exception:', error);
           reject(error);
       }
   });
}

// Update library UI
function updateLibraryUI() {
   const libraryList = document.getElementById('song-library-list');
   
   if (songLibrary.length === 0) {
       libraryList.innerHTML = `
           <div style="text-align: center; color: #718096; font-style: italic; padding: 3rem;">
               No songs created yet. Start composing your first masterpiece above! 🎼
           </div>
       `;
       return;
   }
   
   // Sort songs: favorites first, then by newest timestamp
   const sortedSongs = [...songLibrary].sort((a, b) => {
       if (a.favorited !== b.favorited) {
           return b.favorited - a.favorited;
       }
       return new Date(b.timestamp) - new Date(a.timestamp);
   });
   
   libraryList.innerHTML = sortedSongs.map((song) => {
       const preview = song.lyrics.substring(0, 150) + '...';
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
   
   console.log('🔄 Library UI updated with', sortedSongs.length, 'songs');
}

// Load song by ID
function loadSongById(songId) {
   console.log('🔧 Loading song ID:', songId);
   const song = songLibrary.find(s => s.id == songId);
   if (!song) {
       console.error('❌ Song not found:', songId);
       showStatus('Song not found!', 'error');
       return;
   }
   
   currentSong = song;
   
   // Fill form fields
   document.getElementById('song-title').value = song.title || '';
   document.getElementById('song-artist').value = song.artist || '';
   document.getElementById('song-theme').value = song.theme || '';
   document.getElementById('song-mood').value = song.mood || 'upbeat';
   document.getElementById('song-structure').value = song.structure || 'verse-chorus';
   document.getElementById('voice-type').value = song.voice || 'nova';
   
   // Update genre selection
   if (song.genre) {
       document.querySelectorAll('.genre-button').forEach(b => b.classList.remove('selected'));
       const genreButton = document.querySelector(`[data-genre="${song.genre}"]`);
       if (genreButton) {
           genreButton.classList.add('selected');
           selectedGenre = song.genre;
       } else {
           document.getElementById('custom-genre').value = song.genre;
       }
   }

   // Update regenerate voice selector
   const regenVoiceSelect = document.getElementById('regenerate-voice-type');
   if (regenVoiceSelect) {
       regenVoiceSelect.value = song.voice || 'nova';
   }
   
   // Display lyrics
   displayLyrics(song.lyrics);
   
   // Handle artwork
   if (song.artworkUrl) {
       showArtwork(song.artworkUrl);
   } else {
       document.getElementById('song-artwork-container').classList.add('hidden');
   }
   
   // Handle audio
   if (song.audioUrl) {
       showAudio(song.audioUrl);
   } else {
       document.getElementById('audio-container').style.display = 'none';
   }
   
   // Update favorite button
   document.getElementById('favorite-song-btn').innerHTML = song.favorited ? 
       '⭐ Remove from Favorites' : '⭐ Add to Favorites';
   
   showStatus('Song loaded! ✨', 'success');
   document.getElementById('lyrics-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Copy lyrics by ID
function copyLyricsById(songId) {
   const song = songLibrary.find(s => s.id == songId);
   if (!song) return;
   
   navigator.clipboard.writeText(song.lyrics).then(() => {
       showStatus('Lyrics copied to clipboard! 📋', 'success');
   }).catch(() => {
       showStatus('Failed to copy lyrics! 📋', 'error');
   });
}

// Toggle favorite by ID
async function toggleFavoriteById(songId) {
   const song = songLibrary.find(s => s.id == songId);
   if (!song) return;
   
   song.favorited = !song.favorited;
   
   try {
       const transaction = db.transaction(['songs'], 'readwrite');
       const store = transaction.objectStore('songs');
       store.put(song);
       
       await loadLibrary();
       showStatus(song.favorited ? 'Added to favorites! ⭐' : 'Removed from favorites! ⭐', 'success');
   } catch (error) {
       console.error('❌ Error updating favorite:', error);
   }
}

// Download audio by ID
function downloadAudioById(songId) {
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
   console.log('🗑️ DELETE: Starting delete for ID:', songId);
   
   const song = songLibrary.find(s => s.id == songId);
   if (!song) {
       console.error('❌ Song not found for deletion:', songId);
       return;
   }
   
   const songTitle = song.title || 'Untitled';
   
   if (confirm(`Delete "${songTitle}"? This cannot be undone! 🗑️`)) {
       try {
           const transaction = db.transaction(['songs'], 'readwrite');
           const store = transaction.objectStore('songs');
           
           const deleteRequest = store.delete(Number(songId));
           
           deleteRequest.onsuccess = async () => {
               console.log('✅ Song deleted from database');
               
               // Remove from memory array
               const index = songLibrary.findIndex(s => s.id == songId);
               if (index >= 0) {
                   songLibrary.splice(index, 1);
               }
               
               // Clear current song if it was deleted
               if (currentSong && currentSong.id == songId) {
                   currentSong = null;
                   document.getElementById('lyrics-section').classList.add('hidden');
               }
               
               // Update UI
               updateLibraryUI();
               showStatus(`"${songTitle}" DELETED! 🗑️`, 'success');
           };
           
           deleteRequest.onerror = () => {
               console.error('❌ Delete failed:', deleteRequest.error);
               showStatus('Delete failed! 🗑️', 'error');
           };
           
       } catch (error) {
           console.error('❌ Delete exception:', error);
           showStatus('Delete failed! 🗑️', 'error');
       }
   }
}

// Clear entire library
async function clearLibrary() {
   console.log('🗑️ CLEAR ALL: Starting...');
   
   if (confirm('Are you sure you want to delete ALL songs (including favorites)? This cannot be undone! 🗑️')) {
       try {
           const transaction = db.transaction(['songs'], 'readwrite');
           const store = transaction.objectStore('songs');
           
           const clearRequest = store.clear();
           
           clearRequest.onsuccess = () => {
               console.log('✅ All songs cleared from database');
               
               // Clear memory
               songLibrary = [];
               currentSong = null;
               currentAudioUrl = null;
               
               // Hide current song display
               document.getElementById('lyrics-section').classList.add('hidden');
               document.getElementById('song-artwork-container').classList.add('hidden');
               document.getElementById('audio-container').style.display = 'none';
               
               // Update UI
               updateLibraryUI();
               showStatus('ALL SONGS DELETED! 🗑️💥', 'success');
           };
           
           clearRequest.onerror = () => {
               console.error('❌ Clear all failed:', clearRequest.error);
               showStatus('Failed to clear library! 🗑️', 'error');
           };
           
       } catch (error) {
           console.error('❌ Clear all exception:', error);
           showStatus('Failed to clear library! Please refresh the page! 🗑️', 'error');
       }
   }
}

// Toggle favorite for current song
async function toggleFavorite() {
   if (!currentSong) return;
   
   currentSong.favorited = !currentSong.favorited;
   
   try {
       const transaction = db.transaction(['songs'], 'readwrite');
       const store = transaction.objectStore('songs');
       store.put(currentSong);
       
       document.getElementById('favorite-song-btn').innerHTML = currentSong.favorited ? 
           '⭐ Remove from Favorites' : '⭐ Add to Favorites';
       
       await loadLibrary();
       showStatus(currentSong.favorited ? 'Added to favorites! ⭐' : 'Removed from favorites! ⭐', 'success');
   } catch (error) {
       console.error('❌ Error updating favorite:', error);
   }
}

// Copy current lyrics
async function copyLyrics() {
   if (!currentSong || !currentSong.lyrics) {
       showStatus('No lyrics to copy! 📋', 'error');
       return;
   }
   
   try {
       await navigator.clipboard.writeText(currentSong.lyrics);
       showStatus('Lyrics copied to clipboard! 📋', 'success');
   } catch (error) {
       console.error('❌ Copy failed:', error);
       showStatus('Failed to copy lyrics. Please select and copy manually! 📋', 'error');
   }
}

// Regenerate audio with new voice
async function regenerateAudioWithNewVoice() {
   if (!currentSong) {
       showStatus('No song loaded to regenerate audio! 🎤', 'error');
       return;
   }
   
   const selectedVoice = document.getElementById('regenerate-voice-type').value;
   const regenBtn = document.getElementById('regenerate-audio-btn');
   
   const originalText = regenBtn.innerHTML;
   regenBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';
   regenBtn.disabled = true;
   
   showStatus('Generating new vocal demo with selected voice... 🎤', 'info');
   showAudioPlaceholder();
   
   try {
       const newAudioUrl = await generateVocalDemo(currentSong.lyrics, selectedVoice);
       
       // Convert to base64 for storage
       const response = await fetch(newAudioUrl);
       const blob = await response.blob();
       const reader = new FileReader();
       reader.onloadend = async () => {
           const base64data = reader.result;
           currentSong.audioUrl = base64data;
           currentSong.voice = selectedVoice;
           currentAudioUrl = base64data;
           
           // Update in database
           const transaction = db.transaction(['songs'], 'readwrite');
           const store = transaction.objectStore('songs');
           store.put(currentSong);
           
           // Update display
           showAudio(base64data);
           
           // Update library
           await loadLibrary();
           
           // Update the voice selector in the form
           document.getElementById('voice-type').value = selectedVoice;
           
           showStatus('New vocal demo generated! 🎤', 'success');
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

// Display lyrics
function displayLyrics(lyrics) {
   document.getElementById('lyrics-display').innerHTML = `
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
   document.getElementById('lyrics-text').addEventListener('click', startLyricsEdit);
   
   document.getElementById('lyrics-section').classList.remove('hidden');
   document.getElementById('lyrics-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show artwork with refresh button
function showArtwork(artworkUrl) {
   document.getElementById('song-artwork-container').innerHTML = `
       <div class="artwork-container">
           <img class="song-artwork" alt="Song artwork" src="${artworkUrl}" />
           <button class="refresh-artwork-btn" onclick="refreshArtwork()" title="Generate new artwork">
               🔄
           </button>
       </div>
   `;
   document.getElementById('song-artwork-container').classList.remove('hidden');
}

// Show audio
function showAudio(audioUrl) {
   const audioContainer = document.getElementById('audio-container');
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

// Show audio loading placeholder
function showAudioPlaceholder() {
   const audioContainer = document.getElementById('audio-container');
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

function showAudioError() {
    const audioContainer = document.getElementById('audio-container');
    audioContainer.style.display = 'block';
    audioContainer.innerHTML = `
        <h3 style="color: #2d3748; margin-bottom: 1rem;">🎵 Vocal Demo</h3>
        <div style="padding: 1.5rem; text-align: center; color: #e53e3e; background: #fed7d7; border-radius: 10px;">
            <p><strong>❌ Vocal demo generation failed</strong></p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">You can try creating a new version to generate audio, or view this song later from your library!</p>
        </div>
    `;
}

// Download current audio
function downloadCurrentAudio() {
   if (!currentAudioUrl) {
       showStatus('No vocal demo to download. Create audio first! 🎤', 'error');
       return;
   }
   
   try {
       const a = document.createElement('a');
       a.href = currentAudioUrl;
       
       const title = document.getElementById('song-title').value.trim() || 'song';
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
   if (!currentSong) return;
   
   const refreshBtn = document.querySelector('.refresh-artwork-btn');
   if (refreshBtn) {
       refreshBtn.innerHTML = '⏳';
       refreshBtn.style.pointerEvents = 'none';
   }
   
   showStatus('Generating new artwork... 🎨', 'info');
   
   generateArtwork().then(async (newArtworkUrl) => {
       // Convert to base64 for storage
       const response = await fetch(newArtworkUrl);
       const blob = await response.blob();
       const reader = new FileReader();
       reader.onloadend = async () => {
           const base64data = reader.result;
           currentSong.artworkUrl = base64data;
           
           // Update in database
           const transaction = db.transaction(['songs'], 'readwrite');
           const store = transaction.objectStore('songs');
           store.put(currentSong);
           
           // Update display
           showArtwork(base64data);
           await loadLibrary();
           showStatus('New artwork generated! 🎨', 'success');
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
   document.getElementById('lyrics-text').classList.add('hidden');
   document.getElementById('lyrics-editor').classList.remove('hidden');
   document.getElementById('lyrics-textarea').focus();
}

// Save lyrics edit
function saveLyricsEdit() {
   const newLyrics = document.getElementById('lyrics-textarea').value.trim();
   
   if (!newLyrics) {
       showStatus('Lyrics cannot be empty! ✏️', 'error');
       return;
   }
   
   if (!currentSong) {
       showStatus('No song to update! ✏️', 'error');
       return;
   }
   
   // Update current song
   currentSong.lyrics = newLyrics;
   
   try {
       // Save to database
       const transaction = db.transaction(['songs'], 'readwrite');
       const store = transaction.objectStore('songs');
       store.put(currentSong);
       
       // Update display
       document.getElementById('lyrics-text').innerHTML = `
           ${newLyrics}
           <div style="position: absolute; top: 10px; right: 10px; font-size: 0.8rem; color: #667eea; opacity: 0.7;">
               Click to edit ✏️
           </div>
       `;
       
       document.getElementById('lyrics-editor').classList.add('hidden');
       document.getElementById('lyrics-text').classList.remove('hidden');
       
       // Re-add click handler
       document.getElementById('lyrics-text').addEventListener('click', startLyricsEdit);
       
       loadLibrary();
       showStatus('Lyrics updated successfully! ✏️', 'success');
       
   } catch (error) {
       console.error('❌ Error saving lyrics:', error);
       showStatus('Failed to save lyrics changes! ✏️', 'error');
   }
}

// Cancel lyrics edit
function cancelLyricsEdit() {
   document.getElementById('lyrics-editor').classList.add('hidden');
   document.getElementById('lyrics-text').classList.remove('hidden');
}

// Show status message
function showStatus(message, type = 'info') {
   const statusMessage = document.getElementById('status-message');
   statusMessage.textContent = message;
   statusMessage.className = `status-message status-${type}`;
   statusMessage.classList.remove('hidden');
   setTimeout(() => statusMessage.classList.add('hidden'), 5000);
}

// Loading state helper
function setLoading(button, isLoading, loadingText = 'Loading...') {
   if (isLoading) {
       button.disabled = true;
       button.innerHTML = `<span class="loading-spinner"></span> ${loadingText}`;
   } else {
       button.disabled = false;
       if (button.id === 'generate-lyrics-btn') {
           button.innerHTML = '✨ Create My Song Lyrics! ✨';
       } else if (button.id === 'regenerate-lyrics-btn') {
           button.innerHTML = '🔄 New Version';
       }
   }
}

console.log('🎵 SCRIPT LOADED SUCCESSFULLY');