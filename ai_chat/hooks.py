app_name = "ai_chat"
app_title = "AI Chatbot"
app_publisher = "Jem Pablo"
app_description = "Chatbot App"
app_email = "admin@jempablo.com"
app_license = "MIT"

app_include_js = "/assets/ai_chat/js/chat_widget.js"
web_include_js = "/assets/ai_chat/js/chat_widget.js"

override_whitelisted_methods = {
    "frappe.auth.get_logged_user": "ai_chat.ai_chat.ai_chatbot.api.auth.get_logged_user_safe"
}
