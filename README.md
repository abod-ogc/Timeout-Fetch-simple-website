# Timeout Fetch Demo

This repository contains a simple web application that demonstrates how to implement a timeout for a JavaScript `fetch` request using `Promise.race`. The application fetches a post from the JSONPlaceholder API and allows the user to specify a timeout in milliseconds. If the request takes longer than the specified timeout, it will be aborted and an error message will be displayed.

## Features

-   **Custom Timeout:** Set a timeout value in milliseconds for the fetch request.
-   **API Integration:** Fetches data from the public `https://jsonplaceholder.typicode.com` API.
-   **Clear Feedback:** Displays the fetched data, a loading state, or a specific error message (e.g., timeout or server error).
-   **Responsive UI:** A clean and simple interface built with HTML and CSS.

## How It Works

The core logic is implemented in the `app.js` file. The `fetchData` function uses `Promise.race` to compete between two promises:

1.  The actual `fetch` request to the API.
2.  A `timeout` promise that rejects after the user-specified duration.

```javascript
function timeout(ms)
{
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    });
}

async function fetchData()
{
    const timeoutValue = Number(ms.value);
    try{
        // Race the fetch call against the timeout
        const res = await Promise.race([
            fetch("https://jsonplaceholder.typicode.com/posts/1"), 
            timeout(timeoutValue)
        ]);

        if(!res.ok)
            throw new Error("Server responded with error.");

        return await res.json();
    }catch(error){
        resView.textContent = `❌ ${error.message}`;
        return null;
    }
}
```

If the `fetch` request completes before the timeout, its result is processed. If the `timeout` promise rejects first, the `catch` block is executed, displaying a timeout error to the user.

## Getting Started

No installation or build steps are required. Simply clone the repository and open the `index.html` file in your web browser.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abod-ogc/timeout-fetch-simple-website.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd timeout-fetch-simple-website/Timeout\ Fetch/
    ```

3.  **Open the HTML file:**
    Open `index.html` in your favorite web browser.

## Usage

1.  Enter a timeout value in milliseconds into the input field.
2.  Click the "Fetch Post" button.
3.  The application will display "Loading..." while the request is in progress.
4.  If the request is successful and completes within the timeout period, the JSON response will be displayed.
5.  If the request times out or encounters another error, an error message will be shown.
