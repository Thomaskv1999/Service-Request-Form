import frappe

def get_context(context):
    def on_submit(self):
        doc = frappe.new_doc("Service Request Form")
        doc.customer = self.Customer
        doc.contact_person = self.Contact_Person
        doc.contact_email = self.Contact_Email
        doc.contact_number = self.Contact_Number
        doc.request_type = self.Request_Type
        doc.priority = self.Priority
        doc.description = self.Description

        doc.insert()




