document.addEventListener("DOMContentLoaded", function () {
    if (frappe.session && frappe.session.sid) {
        document.cookie = `sid=${frappe.session.sid}; domain=.jempablo.com; path=/`;
        console.log("✅ SID cookie set for Flask chatbot");
    } else {
        console.warn("⚠️ Could not find frappe.session.sid");
    }
});
