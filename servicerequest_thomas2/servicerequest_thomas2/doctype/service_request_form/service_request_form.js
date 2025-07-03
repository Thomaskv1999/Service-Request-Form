// Copyright (c) 2025, thomas and contributors
// For license information, please see license.txt


frappe.ui.form.on("Service Items Table", {
    estimated_hours: update_totals,
    item_price: update_totals
    
});

function update_totals(frm, cdt, cdn) {
    let row = locals[cdt][cdn];


    let hours = row.estimated_hours || 0;
    let price = row.item_price || 0;
    let cost = hours * price;

    frappe.model.set_value(cdt, cdn, "estimated_cost", cost);


    let total_hours = 0;
    let total_cost = 0;

    frm.doc.service_items_table.forEach(item => {
        total_hours += item.estimated_hours || 0;
        total_cost += item.estimated_cost || 0;
    });

    frm.set_value("total_estimated_hours", total_hours);
    frm.set_value("total_estimated_cost", total_cost);
}

frappe.ui.form.on("Service Request Form", {
    before_workflow_action:function(frm) {
        if (frm.selected_workflow_action==='submit'){
        
        let d = new frappe.ui.Dialog({
            title: 'Confirm Submission',
            fields: [
                {
                    label: 'Customer',
                    fieldname: 'customer',
                    fieldtype: 'Data',
                    default: frm.doc.customer,
                    read_only: 1
                },
                {
                    label: 'Request Type',
                    fieldname: 'request_type',
                    fieldtype: 'Data',
                    default: frm.doc.request_type,
                    read_only: 1
                },
                {
                    label: 'Priority',
                    fieldname: 'priority',
                    fieldtype: 'Data',
                    default: frm.doc.priority,
                    read_only: 1
                },
                {
                    label: 'Total Estimated Hours',
                    fieldname: 'total_estimated_hours',
                    fieldtype: 'Float',
                    default: frm.doc.total_estimated_hours,
                    read_only: 1
                },
                {
                    label: 'Total Estimated Cost',
                    fieldname: 'total_estimated_cost',
                    fieldtype: 'Currency',
                    default: frm.doc.total_estimated_cost,
                    read_only: 1
                }
            ],
            primary_action_label: 'Confirm',
            secondary_action_label: 'Edit',
            primary_action(values){
                d.hide()
                frm.save("Submit")

            },
            secondary_action(){
                d.hide()
                frappe.msgprint("Submission Cancelled")

            }});

        d.show();
    }}
});


