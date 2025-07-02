# Copyright (c) 2025, thomas and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ServiceRequestForm(Document):
	def before_insert(self):
		self.created_by = frappe.session.user



		

