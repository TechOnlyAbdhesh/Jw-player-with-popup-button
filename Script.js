    let player;
    let stretchModes = ['uniform', 'exactfit', 'fill', 'none'];
    let currentStretchModeIndex = 0;
    function showPopup(videoUrl) {
    // Initialize JW Player inside the popup
    if (!player) {
    const playerInstance = jwplayer("my-player").setup({
    controls: true,
    
    file: videoUrl,
    
    type: "mp4"
    });

    
    playerInstance.on("ready", function () {
    const playerContainer = playerInstance.getContainer();
    const buttonContainer = playerContainer.querySelector(".jw-button-container");
    const spacer = buttonContainer.querySelector(".jw-spacer");
    const timeSlider = playerContainer.querySelector(".jw-slider-time");
    buttonContainer.replaceChild(timeSlider, spacer);
    
    playerInstance.on("adBlock", () => {
    const modal = document.querySelector("div.modal");
    modal.style.display = "flex";
    
    document.getElementById("close").addEventListener("click", () => location.reload());
    });
    
    const rewindContainer = playerContainer.querySelector(".jw-display-icon-rewind");
    const forwardContainer = rewindContainer.cloneNode(true);
    const forwardDisplayButton = forwardContainer.querySelector(".jw-icon-rewind");
    forwardDisplayButton.style.transform = "scaleX(-1)";
    forwardDisplayButton.ariaLabel = "Forward 10 Seconds";
    const nextContainer = playerContainer.querySelector(".jw-display-icon-next");
    nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);
    
    playerContainer.querySelector(".jw-display-icon-next").style.display = "none";
    const rewindControlBarButton = buttonContainer.querySelector(".jw-icon-rewind");
    const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
    forwardControlBarButton.style.transform = "scaleX(-1)";
    forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
    rewindControlBarButton.parentNode.insertBefore(forwardControlBarButton, rewindControlBarButton.nextElementSibling);
    
    [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
    button.onclick = () => {
    playerInstance.seek(playerInstance.getPosition() + 10);
    };
    });
    
    // Ensure the player has loaded before adding the button
    // Add custom button to toggle aspect ratio
    playerInstance.addButton(
    "https://raw.githubusercontent.com/TechOnlyAbdhesh/jwplayer/refs/heads/main/8420791.png", // URL to an icon
    "Toggle Aspect Ratio", // Tooltip
    function() {
    currentStretchModeIndex = (currentStretchModeIndex + 1) % stretchModes.length;
    let selectedStretchMode = stretchModes[currentStretchModeIndex];
    
    // Update the player with the new stretching mode
    playerInstance.setConfig({
    stretching: selectedStretchMode
    });
    },
    "aspectRatioButton",  // Unique ID for the button
    "control-bar",        // Where the button will be added
    "left"               // Position of the button within the control bar
    );
    
    
    })
    
    } else {
    player.load({ file: videoUrl });
    }
    
    document.getElementById('popup').style.display = 'flex';
    }
    
    function closePopup() {
    document.getElementById('popup').style.display = 'none';
    if (player) {
    player.pause(true); // Pause the video when closing the popup
    }
    }
