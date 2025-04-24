function injectChatIcon(user) {
    console.log("✅ Injecting chat icon for:", user);
    const chatIcon = document.createElement("div");
    chatIcon.id = "floating-image";
    chatIcon.innerHTML = `
        <img src="/assets/ai_chat/images/chat_icon.png" alt="Chat Icon">
    `;
    document.body.appendChild(chatIcon);
}

// Use after_ajax inside ERP Desk
if (typeof frappe !== "undefined" && frappe.after_ajax) {
    frappe.after_ajax(() => {
        fetch("https://ai.jempablo.com/api/user", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => injectChatIcon(data.user || "Guest"))
        .catch(err => console.error("Chat widget failed to fetch user (ERP):", err));
    });
} else {
    // Outside ERP (e.g. website login page)
    document.addEventListener("DOMContentLoaded", () => {
        fetch("https://ai.jempablo.com/api/user", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => injectChatIcon(data.user || "Guest"))
        .catch(err => console.error("Chat widget failed to fetch user (Public):", err));
    });
}
