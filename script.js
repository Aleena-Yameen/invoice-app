let invoices =
    JSON.parse(localStorage.getItem("invoices")) || [];

displayInvoices();

function addInvoice(){

    const customer =
        document.getElementById("customer").value;

    const amount =
        document.getElementById("amount").value;

    const dueDate =
        document.getElementById("dueDate").value;

    if(!customer || !amount || !dueDate){
        alert("Please fill all fields");
        return;
    }

    const invoice = {
        customer,
        amount,
        dueDate
    };

    invoices.push(invoice);

    localStorage.setItem(
        "invoices",
        JSON.stringify(invoices)
    );

    document.getElementById("customer").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("dueDate").value = "";

    displayInvoices();
}

function displayInvoices(){

    const list =
        document.getElementById("list");

    list.innerHTML = "";

    if(invoices.length === 0){
        list.innerHTML =
            '<p class="empty">No invoices added yet.</p>';
        return;
    }

    invoices.forEach(function(invoice,index){

        const today = new Date();
        const due = new Date(invoice.dueDate);

        const overdue = due < today;

        const card =
            document.createElement("div");

        card.className =
            "invoice-card";

        card.innerHTML = `
            <div class="invoice-info">
                <div class="customer">${invoice.customer}</div>
                <div class="amount">$${invoice.amount}</div>
                <div class="due">Due: ${invoice.dueDate}</div>
                ${overdue ? '<div class="overdue">⚠ OVERDUE</div>' : ''}
            </div>
        `;

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "Delete";

        deleteBtn.className =
            "delete-btn";

        deleteBtn.onclick = function(){

            invoices.splice(index,1);

            localStorage.setItem(
                "invoices",
                JSON.stringify(invoices)
            );

            displayInvoices();
        };

        card.appendChild(deleteBtn);

        list.appendChild(card);
    });
}