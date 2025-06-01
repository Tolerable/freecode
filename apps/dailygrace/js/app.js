// Daily Grace - Truly Dynamic AI-Powered Script
class DailyGraceApp {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.currentMeditation = null;
    this.lastGeneratedDate = null;
    this.sessionTopics = new Set(); // Track topics used this session
    this.init();
  }

  init() {
    this.setDate();
    this.bindEvents();
    this.checkForNewDay();
  }

  setDate() {
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric", 
      month: "long",
      day: "numeric",
    });
    document.getElementById("current-date").textContent = date;
  }

  bindEvents() {
    document.getElementById("generate-new-btn").onclick = () => this.requestNewMeditation();
    document.getElementById("generate-image-btn").onclick = () => this.regenerateImage();
    document.getElementById("generate-audio-btn").onclick = () => this.generateAudio();
    document.getElementById("play-pause-btn").onclick = () => this.toggleAudio();
  }

  checkForNewDay() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lastVisitDate');
    
    if (storedDate !== today) {
      // New day - show welcome message and offer new meditation
      this.showNewDayWelcome();
      localStorage.setItem('lastVisitDate', today);
    } else {
      // Same day - check if they have a meditation already
      const storedMeditation = localStorage.getItem('todaysMeditation');
      if (storedMeditation) {
        this.displayStoredMeditation(JSON.parse(storedMeditation));
      } else {
        this.showWelcomePrompt();
      }
    }
  }

  showNewDayWelcome() {
    // Hide the meditation card initially
    document.getElementById("meditation-card").classList.add("hidden");
    
    const content = document.getElementById("meditation-description");
    content.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h3>🌅 Welcome to a New Day!</h3>
        <p>God's mercies are new every morning. Would you like to discover today's fresh meditation?</p>
        <button class="btn btn-primary" onclick="app.generateMeditation()" style="margin-top: 1rem;">
          🙏 Receive Today's Word
        </button>
      </div>
    `;
    
    // Create a temporary container and show it instead
    this.showWelcomeContainer(content.innerHTML);
  }

  showWelcomePrompt() {
    // Hide the meditation card initially  
    document.getElementById("meditation-card").classList.add("hidden");
    
    const welcomeContent = `
      <div style="text-align: center; padding: 2rem;">
        <h3>✨ Daily Grace</h3>
        <p>Ready for a moment of peace and reflection with the Lord?</p>
        <button class="btn btn-primary" onclick="app.generateMeditation()" style="margin-top: 1rem;">
          🌿 Begin Meditation
        </button>
      </div>
    `;
    
    this.showWelcomeContainer(welcomeContent);
  }

  showWelcomeContainer(content) {
    // Create or update a welcome container that replaces the meditation card
    let welcomeContainer = document.getElementById("welcome-container");
    if (!welcomeContainer) {
      welcomeContainer = document.createElement("div");
      welcomeContainer.id = "welcome-container";  
      welcomeContainer.className = "meditation-card fade-in";
      document.querySelector(".todays-focus").appendChild(welcomeContainer);
    }
    welcomeContainer.innerHTML = content;
    welcomeContainer.classList.remove("hidden");
  }

  requestNewMeditation() {
    this.generateMeditation();
  }

  async generateMeditation() {
    this.showLoading();
    try {
      // Step 1: Get a truly unique topic by avoiding recent ones
      const topic = await this.generateUniqueTopic();
      
      // Step 2: Generate meditation content
      const meditation = await this.generateMeditationContent(topic);
      
      // Step 3: Store and display
      this.currentMeditation = { topic, content: meditation, timestamp: Date.now() };
      localStorage.setItem('todaysMeditation', JSON.stringify(this.currentMeditation));
      
      this.displayMeditation(topic, meditation);
      
      // Step 4: Auto-generate image for the new meditation
      await this.generateImage(topic);
      
    } catch (err) {
      console.error('Meditation generation failed:', err);
      this.displayError("Unable to generate meditation. Please try again.");
    } finally {
      this.hideLoading();
    }
  }

  async generateUniqueTopic() {
    const currentHour = new Date().getHours();
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const uniqueSeed = dayOfYear * 100 + currentHour + Math.random() * 1000;
    
    // Create context that avoids repetition
    const avoidTopics = Array.from(this.sessionTopics).join(', ');
    const timeContext = this.getTimeOfDayContext();
    
    const topicPrompt = `Generate ONE unique Christian meditation topic. Context: ${timeContext}. 
    Avoid these recently used topics: ${avoidTopics}. 
    Focus on: spiritual growth, Bible characters, Christian virtues, God's nature, prayer, worship, or seasonal themes.
    Respond with ONLY the topic name, no extra text. Seed: ${uniqueSeed}`;

    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(topicPrompt)}?model=openai&seed=${Math.floor(uniqueSeed)}`);
    let topic = (await response.text()).trim();
    
    // Clean up the response
    topic = topic.replace(/^["']|["']$/g, '').replace(/^Topic:\s*/i, '').trim();
    
    // Add to session tracking
    this.sessionTopics.add(topic);
    
    // Keep only last 10 topics to avoid memory bloat
    if (this.sessionTopics.size > 10) {
      const topicsArray = Array.from(this.sessionTopics);
      this.sessionTopics.clear();
      topicsArray.slice(-8).forEach(t => this.sessionTopics.add(t));
    }
    
    return topic;
  }

  getTimeOfDayContext() {
    const hour = new Date().getHours();
    if (hour < 10) return "morning devotion, new beginnings, dawn";
    if (hour < 14) return "midday reflection, strength for the journey";  
    if (hour < 18) return "afternoon contemplation, perseverance";
    return "evening meditation, rest, gratitude";
  }

  async generateMeditationContent(topic) {
    const meditationPrompt = `Write a Christian meditation on "${topic}". 
    Structure: Start with a brief opening thought, include ONE relevant Bible verse naturally woven in, 
    provide 2-3 paragraphs of spiritual reflection, and end with a prayer or reflective question.
    Make it personal, encouraging, and authentic. Length: 150-200 words.
    Do not add commentary, introductions, or explanations. Output only the meditation text.`;

    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(meditationPrompt)}?model=openai`);
    const content = await response.text();
    
    // Clean any unwanted AI responses
    return content.replace(/Would you like.*$/gi, '').replace(/I hope this.*$/gi, '').trim();
  }

  displayMeditation(topic, content) {
    // Hide welcome container if it exists
    const welcomeContainer = document.getElementById("welcome-container");
    if (welcomeContainer) {
      welcomeContainer.classList.add("hidden");
    }
    
    // Show the meditation card
    document.getElementById("meditation-card").classList.remove("hidden");
    
    document.getElementById("meditation-title").textContent = topic;
    document.getElementById("scripture-verse").textContent = "";
    document.getElementById("meditation-description").textContent = content;
    
    // Hide audio player until requested
    document.getElementById("audio-player").classList.add("hidden");
    
    // Show action buttons
    document.querySelector('.meditation-controls').style.display = 'flex';
  }

  displayStoredMeditation(stored) {
    this.currentMeditation = stored;
    this.displayMeditation(stored.topic, stored.content);
    
    // Show "refresh for new day" if it's old
    const hoursOld = (Date.now() - stored.timestamp) / (1000 * 60 * 60);
    if (hoursOld > 12) {
      const notice = document.createElement('div');
      notice.innerHTML = `
        <p style="text-align: center; color: #888; font-style: italic; margin-top: 1rem;">
          💡 This meditation is from earlier. <a href="#" onclick="app.generateMeditation()">Generate a fresh one?</a>
        </p>
      `;
      document.querySelector('.meditation-card').appendChild(notice);
    }
  }

  async generateImage(topic = null) {
    this.showLoading();
    try {
      const meditationTopic = topic || this.currentMeditation?.topic || "peaceful Christian scene";
      
      // Create varied, dynamic image prompts
      const imageStyles = [
        "watercolor painting, soft pastels, peaceful",
        "oil painting, warm golden light, serene",
        "digital art, heavenly rays, tranquil",
        "impressionist style, gentle colors, spiritual",
        "realistic photography, natural lighting, calming"
      ];
      
      const environments = [
        "garden with blooming flowers",
        "mountain vista at sunrise", 
        "peaceful lake reflection",
        "forest path with dappled sunlight",
        "field of wheat swaying in breeze",
        "quiet chapel interior",
        "seaside cliff overlooking ocean"
      ];
      
      const randomStyle = imageStyles[Math.floor(Math.random() * imageStyles.length)];
      const randomEnv = environments[Math.floor(Math.random() * environments.length)];
      
      const imagePrompt = `${meditationTopic}, ${randomEnv}, ${randomStyle}, no text, spiritual atmosphere, Christian symbolism`;
      const imageSeed = Date.now() + Math.floor(Math.random() * 10000);
      
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?nologo=true&model=flux&width=1200&height=675&seed=${imageSeed}`;

      const img = document.getElementById("meditation-image");
      img.src = url;
      img.classList.remove("hidden");
      img.classList.add("fade-in");
      
    } catch (err) {
      console.error('Image generation failed:', err);
      this.displayError("Image generation failed.");
    } finally {
      this.hideLoading();
    }
  }

  async regenerateImage() {
    if (!this.currentMeditation) {
      this.displayError("Please generate a meditation first.");
      return;
    }
    await this.generateImage();
  }

  async generateAudio() {
    if (!this.currentMeditation) {
      this.displayError("Please generate a meditation first.");
      return;
    }
    
    this.showLoading();
    try {
      const { topic, content } = this.currentMeditation;
      
      // Create natural reading text
      const audioText = `Today's meditation: ${topic}. ${content}`;
      
      const url = `https://text.pollinations.ai/${encodeURIComponent(audioText)}?model=openai-audio&voice=nova`;

      this.audio = document.getElementById("meditation-audio");
      this.audio.src = url;

      document.getElementById("audio-player").classList.remove("hidden");
      document.getElementById("audio-player").classList.add("fade-in");

      this.setupAudioControls();
    } catch (err) {
      console.error('Audio generation failed:', err);
      this.displayError("Audio generation failed.");
    } finally {
      this.hideLoading();
    }
  }

  setupAudioControls() {
    this.audio.addEventListener("timeupdate", () => {
      if (this.audio.duration) {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        document.getElementById("progress-bar").style.width = `${progress}%`;
        document.getElementById("time-display").textContent = 
          `${this.formatTime(this.audio.currentTime)} / ${this.formatTime(this.audio.duration)}`;
      }
    });
    
    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      document.getElementById("play-pause-btn").textContent = "▶️";
    });
    
    this.audio.addEventListener("loadstart", () => {
      document.getElementById("time-display").textContent = "Loading...";
    });
  }

  toggleAudio() {
    if (!this.audio || !this.audio.src) return;
    
    if (this.isPlaying) {
      this.audio.pause();
      document.getElementById("play-pause-btn").textContent = "▶️";
    } else {
      this.audio.play().catch(err => {
        console.error('Audio play failed:', err);
        this.displayError("Audio playback failed. Please try regenerating.");
      });
      document.getElementById("play-pause-btn").textContent = "⏸️";
    }
    this.isPlaying = !this.isPlaying;
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  showLoading() {
    document.getElementById("loading-overlay").classList.remove("hidden");
  }

  hideLoading() {
    document.getElementById("loading-overlay").classList.add("hidden");
  }

  displayError(message) {
    const errorEl = document.getElementById("meditation-description");
    const originalColor = errorEl.style.color;
    errorEl.textContent = message;
    errorEl.style.color = "#e74c3c";
    
    setTimeout(() => {
      errorEl.style.color = originalColor;
    }, 4000);
  }
}

// Initialize app
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new DailyGraceApp();
});
