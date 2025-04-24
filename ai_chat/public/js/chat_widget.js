function injectChatIcon() {
  fetch("https://ai.jempablo.com/api/user", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      console.log("Current ERP user:", data.user);

      const chatIcon = document.createElement("div");
      chatIcon.id = "floating-image";
      chatIcon.innerHTML = `
        <img src="/assets/ai_chat/images/chat_icon.png" alt="Chat Icon" style="width: 60px; height: 60px; cursor: pointer; position: fixed; bottom: 20px; left: 20px; z-index: 9999;" />
      `;
      document.body.appendChild(chatIcon);
    })
    .catch(err => console.error("🛑 Chat widget failed to fetch user:", err));
}

// Check if inside ERP (frappe) or outside (website)
if (typeof frappe !== "undefined" && frappe.after_ajax) {
  // 🧠 Inside ERP Desk
  frappe.after_ajax(() => {
    injectChatIcon();
  });
} else {
  // 🌐 Public Website / Guest
  document.addEventListener("DOMContentLoaded", injectChatIcon);
}
