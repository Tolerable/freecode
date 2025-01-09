// wobbleEffect.js

function createWobbleEffect(targetElement, options = {}) {
    // Default options
    const defaults = {
        width: '100%',
        aspectRatio: '16/9',
        backgroundImage: 'background.jpg',
        foregroundImage: 'figure.png',
        animationDuration: '8s',
        foregroundWidth: '60%',
        maxForegroundHeight: '90%',
        border: true,
        shadow: true
    };

    // Merge provided options with defaults
    const settings = { ...defaults, ...options };

    // Create container
    const container = document.createElement('div');
    container.style.cssText = `
        position: relative;
        width: ${settings.width};
        aspect-ratio: ${settings.aspectRatio};
        overflow: hidden;
        ${settings.border ? 'border: 2px solid #fff;' : ''}
        ${settings.shadow ? 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);' : ''}
    `;

    // Create background wrapper for aspect ratio maintenance
    const backgroundWrapper = document.createElement('div');
    backgroundWrapper.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `;

    // Create and append background image
    const background = document.createElement('img');
    background.src = settings.backgroundImage;
    background.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;

    // Create and append foreground image
    const foreground = document.createElement('img');
    foreground.src = settings.foregroundImage;
	foreground.style.cssText = `
		position: absolute;
		bottom: -30%; /* Push it down further to hide feet */
		left: 50%;
		transform: translateX(-50%);
		width: 80%; /* Make it a bit larger */
		max-height: 130%; /* Allow it to be taller than container */
		object-fit: contain;
		mix-blend-mode: multiply; /* This will remove the white background */
	`;

    // Add animation
    const keyframes = `
        @keyframes sway {
            0% { transform: translate(-50%, 0); }
            25% { transform: translate(-52%, 5px); }
            50% { transform: translate(-50%, 8px); }
            75% { transform: translate(-48%, 5px); }
            100% { transform: translate(-50%, 0); }
        }
    `;

    // Add keyframes to document if they don't exist
    if (!document.querySelector('#wobble-keyframes')) {
        const style = document.createElement('style');
        style.id = 'wobble-keyframes';
        style.textContent = keyframes;
        document.head.appendChild(style);
    }

    foreground.style.animation = `sway ${settings.animationDuration} ease-in-out infinite`;

    // Append elements
    backgroundWrapper.appendChild(background);
    container.appendChild(backgroundWrapper);
    container.appendChild(foreground);
    targetElement.appendChild(container);

    // Return container for potential future reference
    return container;
}