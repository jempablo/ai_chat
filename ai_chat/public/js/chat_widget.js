function injectChatIcon(user) {
	console.log("💬 Injecting chat icon for:", user);

	// Floating icon
	const chatIcon = document.createElement("div");
	chatIcon.id = "floating-chat-icon";
	chatIcon.innerHTML = `
		<img src="/assets/ai_chat/images/chat_icon.png" alt="Chat Icon" style="width: 60px; cursor: pointer;">
	`;
	Object.assign(chatIcon.style, {
		position: "fixed",
		bottom: "20px",
		right: "20px",
		zIndex: 10000
	});
	document.body.appendChild(chatIcon);

	// Chat popup iframe
	const chatFrame = document.createElement("div");
	chatFrame.id = "chat-popup-container";
	chatFrame.style.display = "none";
	chatFrame.style.position = "fixed";
	chatFrame.style.bottom = "90px";
	chatFrame.style.right = "20px";
	chatFrame.style.width = "400px";
	chatFrame.style.height = "500px";
	chatFrame.style.border = "1px solid #ccc";
	chatFrame.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
	chatFrame.style.zIndex = "10001";
	chatFrame.innerHTML = `
		<iframe src="https://ai.jempablo.com/chat?user=${encodeURIComponent(user)}"
				style="width:100%; height:100%; border:none;"
				title="AI Chat Interface">
		</iframe>
	`;
	document.body.appendChild(chatFrame);

	// Toggle visibility
	chatIcon.addEventListener("click", () => {
		const isVisible = chatFrame.style.display === "block";
		chatFrame.style.display = isVisible ? "none" : "block";
	});
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

// Inside ERP Desk
if (typeof frappe !== "undefined" && frappe.after_ajax) {
	frappe.after_ajax(() => fetchUserAndInject("ERP"));
} else {
	document.addEventListener("DOMContentLoaded", () => {
		fetchUserAndInject("Public");
	});
}
