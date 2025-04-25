from frappe import whitelist

@whitelist()
def get_logged_user_safe():
    return frappe.session.user
