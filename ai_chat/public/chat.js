document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('user_input');
    const chatBox = document.getElementById('chat-box');
    const micBtn = document.getElementById('mic-btn');
    const modelSelect = document.getElementById('ai-model');
    const currentUser = "{{ user }}";
    let user = currentUser;

    // Handle Chat Form
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = input.value.trim();
        if (!message) return;
        const model = modelSelect?.value || "gpt-4";

        chatBox.innerHTML += `<div class='user-msg'><strong>You:</strong> ${message}</div>`;
        input.value = "";

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    user,
                    role_id: localStorage.getItem("ai_selected_role") || null,
                    model
                })
            });

            const data = await response.json();
            const reply = typeof data.reply === 'object' ? JSON.stringify(data.reply) : data.reply;
            chatBox.innerHTML += `<div class='bot-msg'><strong>Bot:</strong> ${reply}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;

        } catch (err) {
            chatBox.innerHTML += `<div class='bot-msg text-danger'><strong>Bot:</strong> Error: ${err.message}</div>`;
        }
    });

    // Handle Mic Input
    micBtn.addEventListener("click", () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
        };
        recognition.onerror = function (event) {
            alert("Voice error: " + event.error);
        };
    });
});
