const uri = 'api/AnnouncementBoard';
let announcement = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addDescriptionTextbox = document.getElementById('add-description');
  const addPriceTextbox = document.getElementById('add-price');
  const addPhotoLinkTextbox = document.getElementById('add-photoLink');
  const addDataTextbox = document.getElementById('add-date');

  const item = {
    Name: addNameTextbox.value.trim(),
    Description: addDescriptionTextbox.value.trim(),
    Price: addPriceTextbox.value.trim(),
    PhotoLink: addPhotoLinkTextbox.value.trim(),
    Data: addDataTextbox.value.trim()

  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = announcement.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-description').value = item.description;
  document.getElementById('edit-price').value = item.price;
  document.getElementById('edit-photoLink').value = item.photoLink;
  document.getElementById('edit-date').value = item.date;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    Name: document.getElementById('edit-name').value.trim(),
    Description: document.getElementById('edit-description').value.trim(),
    Price: document.getElementById('edit-price').value.trim(),
    PhotoLink: document.getElementById('edit-photoLink').value.trim(),
    Data: document.getElementById('edit-date').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('announcement');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {

    let tr = tBody.insertRow();

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
    
    let td1 = tr.insertCell(0);
    let textNode1 = document.createTextNode(item.name);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(1);
    let textNode2 = document.createTextNode(item.description);
    td2.appendChild(textNode2);
    
    let td3 = tr.insertCell(2);
    let textNode3 = document.createTextNode(item.price);
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(3);
    let textNode4 = document.createTextNode(item.photoLink);
    td4.appendChild(textNode4);

    let td5 = tr.insertCell(4);
    let textNode5 = document.createTextNode(item.data);
    td5.appendChild(textNode5);

    let td6 = tr.insertCell(5);
    td6.appendChild(deleteButton);

    let td7 = tr.insertCell(6);
    td7.appendChild(editButton);

  });

  let sortByPrice = document.getElementsByTagName("th")[2];
  let sortByDate = document.getElementsByTagName("th")[4];
  
  sortByDate.addEventListener ("click", function() {sortTable(4)}, false);
  sortByPrice.addEventListener ("click", function() {sortTable(2)}, false);

  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("announcement");
    

    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 0; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        var date1 = new Date(x.innerText);
        var date2 = new Date(y.innerText);

        if (dir == "asc") {
          if (date1 > date2) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (date1 < date2) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  announcement = data;
}