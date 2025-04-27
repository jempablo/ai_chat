// =========================
// CHAT BUTTON ON ERPNext
// =========================
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/method/frappe.auth.get_logged_user', { credentials: 'same-origin' })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            if (data.message && data.message !== 'Guest') {
                var chatBtn = document.createElement('div');
                chatBtn.id = 'chatbot-button';
                chatBtn.style.position = 'fixed';
                chatBtn.style.bottom = '20px';
                chatBtn.style.right = '20px';
                chatBtn.style.width = '60px';
                chatBtn.style.height = '60px';
                chatBtn.style.backgroundColor = '#007bff';
                chatBtn.style.borderRadius = '50%';
                chatBtn.style.display = 'flex';
                chatBtn.style.alignItems = 'center';
                chatBtn.style.justifyContent = 'center';
                chatBtn.style.cursor = 'pointer';
                chatBtn.style.zIndex = '9999';
                chatBtn.style.color = '#ffffff';
                chatBtn.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16v12H5.17L4 17.17V4z"/></svg>';

                chatBtn.addEventListener('click', function () {
                    window.open('https://ai.jempablo.com/chat?sid=' + encodeURIComponent(getCookie('sid')), '_blank');
                });

                document.body.appendChild(chatBtn);
            }
        })
        .catch(function () { });
});

// =========================
// HELPER FUNCTION
// =========================
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}
