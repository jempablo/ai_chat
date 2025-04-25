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
        const sid = getCookie("sid") || (typeof frappe !== "undefined" ? frappe.session.sid : null);
        console.log("📌 SID being sent to iframe:", sid);
        const chatUrl = `https://ai.jempablo.com/chat?sid=${sid || "nosid"}`;

        // Try setting sid in iframe to preserve session context (CORS must allow credentials)
        const iframe = document.createElement("iframe");
        iframe.src = chatUrl;
        iframe.style.position = "fixed";
        iframe.style.bottom = "90px";
        iframe.style.right = "20px";
        iframe.style.width = "400px";
        iframe.style.height = "500px";
        iframe.style.zIndex = "9999";
        iframe.style.border = "1px solid #ccc";
        iframe.style.borderRadius = "8px";
        iframe.style.background = "#fff";
        iframe.allow = "camera; microphone";

        document.body.appendChild(iframe);
    });

    document.body.appendChild(chatIcon);
}

// Cookie reader helper
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Detect if inside ERP or outside (website)
if (typeof frappe === "undefined" || !frappe?.after_ajax) {
    document.addEventListener("DOMContentLoaded", () => {
        injectChatIcon("Public");
    });
} else {
    frappe.after_ajax(() => injectChatIcon("ERP"));
}
