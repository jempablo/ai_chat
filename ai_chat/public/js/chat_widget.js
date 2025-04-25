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
        const chatUrl = `https://ai.jempablo.com/chat?user=${encodeURIComponent(user)}`;
        window.open(chatUrl, "_blank");
    });

    document.body.appendChild(chatIcon);
}

function fetchUserAndInject(source = "Unknown") {
    fetch("/api/method/frappe.auth.get_logged_user", {
        credentials: "include"
    })
    .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
    })
    .then(data => {
        const user = data.message || "Guest";
        console.log("✅ Logged in user:", user);
        injectChatIcon(user);
    })
    .catch(err => {
        console.error(`❌ Chat widget failed to fetch user (${source}):`, err);
    });
}

// Detect if inside ERP Desk or outside (website)
if (typeof frappe !== "undefined" && frappe.after_ajax) {
    frappe.after_ajax(() => fetchUserAndInject("ERP"));
} else {
    document.addEventListener("DOMContentLoaded", () => {
        fetchUserAndInject("Public");
    });
}
