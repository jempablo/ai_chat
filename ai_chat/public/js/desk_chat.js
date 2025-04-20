frappe.ready(() => {
    const chatBtn = document.createElement("div");
    chatBtn.innerHTML = `<div id="chat-launcher" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; background: #007bff; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
        🤖 Chat
    </div>`;
    document.body.appendChild(chatBtn);

    document.getElementById("chat-launcher").addEventListener("click", () => {
        window.open("https://ai.jempablo.com/chat", "_blank");
    });
});
