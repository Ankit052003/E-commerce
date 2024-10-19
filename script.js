document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Successful login
            alert("Login successful!");
            localStorage.setItem("token", data.access_token); // Store the token
            window.location.href = "/welcome.html"; // Redirect to welcome page
        } else {
            // Handle error
            document.getElementById("errorMessage").innerText = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("errorMessage").innerText = "An error occurred. Please try again.";
    }
});
