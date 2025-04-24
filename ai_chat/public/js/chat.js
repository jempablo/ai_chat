document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user_input");
    const chatBox = document.getElementById("chat-box");

    function appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("mb-2");
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }

    chatForm.addEventListener("submit", function (e) {
        e.preventDefault(); // 🚫 Prevent page reload

        const message = userInput.value.trim();
        if (!message) return;

        appendMessage("You", message); // Display user input
        userInput.value = ""; // Clear input field

        // Send the message to the Flask API
        fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        })
        .then(res => res.json())
        .then(data => {
            const reply = data.reply || "⚠️ No reply received.";
            appendMessage("AI", reply);
        })
        .catch(err => {
            console.error("❌ Chat error:", err);
            appendMessage("AI", "⚠️ Something went wrong. Try again.");
        });
    });
});
