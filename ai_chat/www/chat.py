import frappe

def get_context(context):
    user = frappe.session.user
    context.user = user
    context.roles = frappe.get_roles(user)
