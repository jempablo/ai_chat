function injectChatIcon(user) {
    console.log("✅ Injecting chat icon for:", user);

    const chatIcon = document.createElement("div");
    chatIcon.id = "floating-chat-icon";
    chatIcon.style.position = "fixed";
    chatIcon.style.bottom = "20px";
    chatIcon.style.right = "20px";
    chatIcon.style.zIndex = "9999";
    chatIcon.style.cursor = "pointer";
    chatIcon.innerHTML = `
        <img src="/assets/ai_chat/images/chat_icon.png" alt="Chat Icon" style="width: 64px; height: 64px;">
    `;

    chatIcon.addEventListener("click", () => {
        console.log("🖱️ Opening chatbot for user:", user);

        const chatUrl = `https://ai.jempablo.com/chat?user=${encodeURIComponent(user)}`;
        window.open(chatUrl, "_blank", "width=900,height=700");
    });

    document.body.appendChild(chatIcon);
}

// Dynamically inject correct ERP logged-in user
if (typeof frappe === "undefined" || !frappe?.after_ajax) {
    document.addEventListener("DOMContentLoaded", () => {
        injectChatIcon("Guest"); // fallback if frappe not loaded
    });
} else {
    frappe.after_ajax(() => {
        if (frappe.session && frappe.session.user) {
            injectChatIcon(frappe.session.user); // ✅ Use actual logged-in user!
        } else {
            injectChatIcon("Guest"); // fallback
        }
    });
}
