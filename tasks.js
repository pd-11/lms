var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["description"] = document.getElementById("description").value;
    formData["completed"] = document.getElementById("completed").value;
    formData["myDate"] = document.getElementById("myDate").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.description;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.completed;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.myDate;
    cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<button style="float: inline-end;"onClick="onEdit(this)">Edit</button>`
    cell5 = newRow.insertCell(4);
        cell5.innerHTML =`<button style="float: inline;" onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("description").value = selectedRow.cells[0].innerHTML;
    document.getElementById("completed").value = selectedRow.cells[1].innerHTML;
    document.getElementById("myDate").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.description;
    selectedRow.cells[1].innerHTML = formData.completed;
    selectedRow.cells[2].innerHTML = formData.myDate;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("description").value = '';
    document.getElementById("completed").value = '';
    document.getElementById("myDate").value = '';
    selectedRow = null;
}