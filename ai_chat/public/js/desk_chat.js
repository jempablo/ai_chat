frappe.ready(() => {
    // Prevent multiple instances
    if (document.getElementById("floating-chat-launcher")) return;

    // Remove the default blue chat icon if present
    const defaultChatIcon = document.querySelector('div[data-widget-name="chatbot_widget"]');
    if (defaultChatIcon) defaultChatIcon.remove();

    // Create custom chat icon container
    const chatDiv = document.createElement("div");
    chatDiv.id = "floating-chat-launcher";
    chatDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 10000;
        animation: slideInFromRight 1s ease-out;
    `;

    const chatImg = document.createElement("img");
    chatImg.src = "https://balmoralbeachhouse.au/wp-content/uploads/2025/01/chat10.gif";
    chatImg.alt = "Chat with us";
    chatImg.style.cssText = `
        width: 150px;
        height: 100px;
        cursor: pointer;
        transition: transform 0.3s ease, opacity 0.3s ease;
    `;
    chatImg.onclick = () => {
        const url = "http://ai.jempablo.com/chat";
        const width = 420;
        const height = 520;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        window.open(
            url,
            "ChatWindow",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    chatImg.addEventListener("mouseover", () => {
        chatImg.style.transform = "scale(1.1)";
        chatImg.style.opacity = "0.8";
    });
    chatImg.addEventListener("mouseout", () => {
        chatImg.style.transform = "scale(1)";
        chatImg.style.opacity = "1";
    });

    // Inject keyframe animation
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes slideInFromRight {
            from { transform: translateX(100vw); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);

    chatDiv.appendChild(chatImg);
    document.body.appendChild(chatDiv);
});
