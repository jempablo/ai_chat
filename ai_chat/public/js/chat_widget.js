function injectChatIcon(user) {
    console.log("🧠 Injecting chat icon for:", user);
    const chatIcon = document.createElement("div");
    chatIcon.id = "floating-image";
    chatIcon.innerHTML = `
        <img src="/assets/ai_chat/images/chat_icon.png" alt="Chat Icon">
    `;
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

// Inside ERP Desk (after_ajax is triggered once data and session are ready)
if (typeof frappe !== "undefined" && frappe.after_ajax) {
    frappe.after_ajax(() => fetchUserAndInject("ERP"));
} else {
    // Outside ERP (e.g. website login page)
    document.addEventListener("DOMContentLoaded", () => {
        fetchUserAndInject("Public");
    });
}
