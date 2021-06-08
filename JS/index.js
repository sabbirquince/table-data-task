// FAKE TABLE DATA IS ON 'fakeTableData.js' FILE AS AN ARRAY

/////////////////// SHOWING DATA TO THE DOM ///////////////////
const tableBody = document.querySelector(".my-table-body");

const showInTable = () => {
  tableBody.innerHTML = "";

  fakeTableData.forEach((eachSet) => {
    tableBody.innerHTML += `
      <tr>
        <th scope="row">${eachSet.name}</th>
        <td>${eachSet.email}</td>
        <td>${eachSet.phone}</td>
        <td>${eachSet.totalScan}</td>
        <td>${eachSet.totalSchedule}</td>
        <td>${eachSet.status}</td>
        <td>${eachSet.role}</td>
        <td>${eachSet.lastLogin}</td>
        <td><button onclick=deleteUser("${eachSet.id}") class="btn-delete btn-danger">Delete</button> 
            <button onclick=editUser("${eachSet.id}") class="btn-edit btn-info">Edit</button>
        </td>
      </tr>
        `;
  });
};

showInTable();

//////////////////// EDITING A USER FROM THE TABLE LIST ////////////////////
const editUserPopup = document.querySelector(".edit-user-popup");
const editUserClosePopup = document.querySelector(".editUser-close-btn");

const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editPhone = document.getElementById("editPhone");
const editRole = document.getElementById("editRole");
const editId = document.getElementById("editId");

// this function is implemented on row's edit button (line: 21)
const editUser = (id) => {
  const editableUser = fakeTableData.filter((user) => user.id === id);

  editName.value = editableUser[0].name;
  editEmail.value = editableUser[0].email;
  editPhone.value = editableUser[0].phone;
  editRole.value = editableUser[0].role;
  editId.value = editableUser[0].id;

  popupShow(editUserPopup);
};

const editedFormSubmit = (e) => {
  e.preventDefault();
  const id = e.target.id.value;

  const editedUser = fakeTableData.filter((user) => user.id === id)[0];

  const pushUser = {
    ...editedUser,
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    role: e.target.role.value,
  };

  fakeTableData.splice(id - 1, 1, pushUser);
  popupClose(editUserPopup);
  showInTable();
};

const editForm = document.getElementById("editForm");

editForm.addEventListener("submit", (e) => {
  editedFormSubmit(e);
});

editUserClosePopup.addEventListener("click", (event) => {
  event.preventDefault();
  popupClose(editUserPopup);
});

//////////////////// ADDING USER TO THE TABLE LIST //////////////////////////
const addUserBtn = document.querySelector(".add-user-btn");

const addName = document.getElementById("addName");
const addEmail = document.getElementById("addEmail");
const addPhone = document.getElementById("addPhone");
const addRole = document.getElementById("addRole");

addUserBtn.addEventListener("click", () => {
  fakeTableData.push({
    id: `${fakeTableData.length + 1}`,
    name: addName.value,
    email: addEmail.value,
    phone: addPhone.value,
    role: addRole.value,
    totalScan: 2,
    totalSchedule: 4,
    status: "active",
    lastLogin: "3 minutes ago",
  });

  popupClose(addUserPopup);
  showInTable();
});

//////////////////// DELETE USER FROM TABLE ///////////////////
const deleteUser = (id) => {
  const newTableData = fakeTableData.filter((user) => user.id !== id);

  fakeTableData = [...newTableData];
  showInTable();
};

// VARIABLE USED IN POPUP SHOW & CLOSE
const addUserButton = document.querySelector(".my-addUser-btn");
const addUserPopup = document.querySelector(".my-popup");
const addUserPopupClose = document.querySelector(".my-popupClose-btn");
const tableContainer = document.getElementById("my-table-container");

///////////////////// POPUP BUTTON SHOW FUNCTIONALITY /////////////////////////
const popupShow = (popupClassName) => {
  popupClassName.classList.add("popup-show");
  popupClassName.classList.remove("popup-hidden");
  tableContainer.classList.add("my-table-container");
};

addUserButton.addEventListener("click", () => {
  popupShow(addUserPopup);
});

/////////////////////// POPUP BUTTON CLOSE FUNCTIONALITY ///////////////////////
const popupClose = (popupClassName) => {
  popupClassName.classList.add("popup-hidden");
  popupClassName.classList.remove("popup-show");
  tableContainer.classList.remove("my-table-container");
};

addUserPopupClose.addEventListener("click", () => {
  popupClose(addUserPopup);
});
