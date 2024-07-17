document.addEventListener("DOMContentLoaded", function() {
    fetchVideos();
});

async function fetchVideos() {
    try {
        const response = await fetch("/new/");
        const videos = await response.json();
        displayVideos(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

function displayVideos(videos) {
    const videoList = document.getElementById("videoList");

    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.classList.add("video-item");

        const videoLink = document.createElement("a");
        videoLink.href = `new/${video}`;
        videoLink.textContent = video;

        videoElement.appendChild(videoLink);
        videoList.appendChild(videoElement);
    });
}
