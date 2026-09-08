
function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}


async function search() {
    const searchText = document.getElementById("search").value;
    const filter = document.getElementById("filter").value;
    const results = document.getElementById("results");

    if (searchText === "") {
        results.innerHTML = "Please enter a search term.";
        return;
    }

    showLoading();

    let url;

    if (filter === "photos") {
        url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchText)}&per_page=12`;
    } else {
        url = `https://pixabay.com/api/videos/?key=${API_KEY}&q=${encodeURIComponent(searchText)}&per_page=12`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        displayResults(data.hits, filter);

    } catch (error) {
        results.innerHTML = "Sorry, something went wrong. Please try again.";
        console.error(error);

    } finally {
        hideLoading();
    }
}


async function challenge(term) {
    const results = document.getElementById("results");
    const filter = document.getElementById("filter").value;

    showLoading();

    let url;

    if (filter === "photos") {
        url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(term)}&per_page=12`;
    } else {
        url = `https://pixabay.com/api/videos/?key=${API_KEY}&q=${encodeURIComponent(term)}&per_page=12`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        displayResults(data.hits, filter);

    } catch (error) {
        results.innerHTML = "Sorry, something went wrong. Please try again.";
        console.error(error);

    } finally {
        hideLoading();
    }
}

function displayResults(hits, filter) {
    const results = document.getElementById("results");

    results.innerHTML = "";

    if (hits.length === 0) {
        results.innerHTML = "No results found.";
        return;
    }

    hits.forEach(item => {
        const result = document.createElement("div");

        result.className = "result";

        if (filter === "photos") {
            result.innerHTML = `
                <img src="${item.webformatURL}" alt="${item.tags}">
                <p>${item.tags}</p>
            `;
        } else {
            result.innerHTML = `
                <video controls width="100%">
                    <source src="${item.videos.medium.url}" type="video/mp4">
                    Your browser does not support this video.
                </video>
                <p>${item.tags}</p>
            `;
        }

        results.appendChild(result);
    });
}