// Daily Grace - Dynamic AI-Powered Script
class DailyGraceApp {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.seed = null;
    this.init();
  }

  init() {
    this.setDate();
    this.bindEvents();
    this.generateMeditation();
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
    document.getElementById("generate-new-btn").onclick = () => this.generateMeditation();
    document.getElementById("generate-image-btn").onclick = () => this.generateImage();
    document.getElementById("generate-audio-btn").onclick = () => this.generateAudio();
    document.getElementById("play-pause-btn").onclick = () => this.toggleAudio();
  }

  showLoading() {
    document.getElementById("loading-overlay").classList.remove("hidden");
  }

  hideLoading() {
    document.getElementById("loading-overlay").classList.add("hidden");
  }

  async generateMeditation() {
	  this.showLoading();
	  try {
		const topicPrompt = "Suggest a fresh, unique Christian meditation topic that is not repeated.";
		const topicRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(topicPrompt)}?model=openai`);
		const topic = (await topicRes.text()).trim();

		const medPrompt = `Without commentary or remark, write a short Christian meditation on the topic: "${topic}". It must begin directly. Include one Bible verse naturally in the flow. End with a short prayer or reflection question. Do not introduce or explain anything. Do not offer help or ask questions. Output only the meditation text.`;

		this.seed = Math.floor(Math.random() * 1e9);
		const medRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(medPrompt)}?model=openai&seed=${this.seed}`);
		const meditation = await medRes.text();

		// Clean output
		const cleanMeditation = meditation
		  .replace(/Would you like.*\\n?/gi, '');

		this.displayMeditation(topic, cleanMeditation);
		this.generateImage();
	  } catch (err) {
		console.error(err);
		this.displayError("Failed to generate meditation.");
	  } finally {
		this.hideLoading();
	  }
  }



	displayMeditation(_, content) {
	  document.getElementById("meditation-title").textContent = ""; // No extra crap
	  document.getElementById("scripture-verse").textContent = "";  // Let AI decide formatting
	  document.getElementById("meditation-description").textContent = content.trim(); // Raw, clean

	  document.getElementById("audio-player").classList.add("hidden");
	}


  async generateImage() {
    this.showLoading();
    try {
      const title = document.getElementById("meditation-title").textContent;
      const prompt = `${title}, peaceful Christian scene, nature, gentle light, watercolor style, no text, serene, spiritual`;
      const seed = Math.floor(Math.random() * 1e9);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&model=flux&width=1200&height=675&seed=${seed}`;

      const img = document.getElementById("meditation-image");
      img.src = url;
      img.classList.remove("hidden");
      img.classList.add("fade-in");
    } catch (err) {
      this.displayError("Image generation failed.");
    } finally {
      this.hideLoading();
    }
  }

	async generateAudio() {
	  this.showLoading();
	  try {
		const title = document.getElementById("meditation-title").textContent;
		const verse = document.getElementById("scripture-verse").textContent;
		const desc = document.getElementById("meditation-description").textContent;

		// Add strict instruction for exact transcription
		const instruction = "READ THIS TEXT VERBATIM WITHOUT ANY COMMENTARY OR RESPONSE, SKIPPING NOTHING:";
		const audioText = `${instruction} ${title} ${verse} ${desc}`;

		const url = `https://text.pollinations.ai/${encodeURIComponent(audioText)}?model=openai-audio&voice=nova&seed=${this.seed}`;

		this.audio = document.getElementById("meditation-audio");
		this.audio.src = url;

		document.getElementById("audio-player").classList.remove("hidden");
		document.getElementById("audio-player").classList.add("fade-in");

		this.setupAudioControls();
	  } catch (err) {
		this.displayError("Audio generation failed.");
	  } finally {
		this.hideLoading();
	  }
	}


  setupAudioControls() {
    this.audio.addEventListener("timeupdate", () => {
      const progress = (this.audio.currentTime / this.audio.duration) * 100;
      document.getElementById("progress-bar").style.width = `${progress}%`;
      document.getElementById("time-display").textContent = `${this.format(this.audio.currentTime)} / ${this.format(this.audio.duration)}`;
    });
    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      document.getElementById("play-pause-btn").textContent = "▶️";
    });
  }

  toggleAudio() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      document.getElementById("play-pause-btn").textContent = "▶️";
    } else {
      this.audio.play();
      document.getElementById("play-pause-btn").textContent = "⏸️";
    }
    this.isPlaying = !this.isPlaying;
  }

  format(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  displayError(msg) {
    const el = document.getElementById("meditation-description");
    el.textContent = msg;
    el.style.color = "#e74c3c";
    setTimeout(() => (el.style.color = ""), 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => new DailyGraceApp());