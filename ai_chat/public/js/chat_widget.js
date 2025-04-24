if (typeof frappe !== "undefined" && frappe.ready) {
    // Inside Desk (ERP App)
    frappe.ready(() => {
        injectChatIcon();
    });
} else {
    // For website/public pages (not inside Desk)
    document.addEventListener("DOMContentLoaded", injectChatIcon);
}

function injectChatIcon() {
    fetch("/api/user")
        .then(res => res.json())
        .then(data => {
            console.log("Current ERP user:", data.user);

            const chatIcon = document.createElement("div");
            chatIcon.id = "floating-image";
            chatIcon.innerHTML = `
                <img src="/assets/ai_chat/images/chat_icon.png" alt="Chat Icon">
            `;
            document.body.appendChild(chatIcon);
        });
}
