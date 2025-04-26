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

    // Add click event
    chatIcon.addEventListener("click", () => {
        console.log("📌 Opening chatbot in new full window (OAuth)");
        const chatUrl = `https://ai.jempablo.com/chat`;
        window.open(chatUrl, "_blank", "width=900,height=700"); // ✅ NEW
    });

    document.body.appendChild(chatIcon);
}

// Detect if inside ERP or outside
if (typeof frappe === "undefined" || !frappe?.after_ajax) {
    document.addEventListener("DOMContentLoaded", () => {
        injectChatIcon("Public");
    });
} else {
    frappe.after_ajax(() => injectChatIcon("ERP"));
}
