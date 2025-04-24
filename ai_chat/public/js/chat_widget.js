function injectChatIcon() {
    fetch("https://ai.jempablo.com/api/user", { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            console.log("✅ Current ERP user:", data.user);

            const chatIcon = document.createElement("div");
            chatIcon.id = "floating-image";
            chatIcon.innerHTML = `
                <img src="/assets/ai_chat/images/chat_icon.png" alt="Chat Icon">
            `;
            document.body.appendChild(chatIcon);
        })
        .catch(err => {
            console.error("❌ Chat widget failed to fetch user:", err);
        });
}

// If inside ERP Desk
if (typeof frappe !== "undefined" && frappe.after_ajax) {
    frappe.after_ajax(() => {
        injectChatIcon();
    });
} else {
    // Public site (website side)
    document.addEventListener("DOMContentLoaded", injectChatIcon);
}
