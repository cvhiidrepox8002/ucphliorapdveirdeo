document.addEventListener("DOMContentLoaded", function() {
    fetchVideos();
});

async function fetchVideos() {
    try {
        const response = await fetch("https://api.github.com/repos/ucphliorapdveirdeo/contents/new");
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
        videoLink.href = `https://raw.githubusercontent.com/ucphliorapdveirdeo/new/${video.name}`;
        videoLink.textContent = video.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
            const confirmDelete = confirm(`Are you sure you want to delete ${video.name}?`);
            if (confirmDelete) {
                await deleteVideoFromGitHub(video.name);
                videoElement.remove();
            }
        });

        videoElement.appendChild(videoLink);
        videoElement.appendChild(deleteBtn);
        videoList.appendChild(videoElement);
    });
}

async function deleteVideoFromGitHub(videoName) {
    const token = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"; // Replace with your GitHub token
    const deleteUrl = `https://api.github.com/repos/ucphliorapdveirdeo/contents/new/${videoName}`;
    const headers = {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json"
    };

    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`Failed to delete ${videoName}: ${response.statusText}`);
        }
        console.log(`Deleted ${videoName} from GitHub.`);
    } catch (error) {
        console.error("Error deleting video:", error);
    }
}
