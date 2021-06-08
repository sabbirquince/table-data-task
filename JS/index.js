// FAKE TABLE DATA

// let fakeTableData = [
//   {
//     id: "1",
//     name: "John",
//     email: "john34@outlook.com",
//     phone: "+884870025",
//     totalScan: 4,
//     totalSchedule: 3,
//     status: "active",
//     role: "Moderator",
//     lastLogin: "3 minutes ago",
//   },
//   {
//     id: "2",
//     name: "Emma",
//     email: "emma34@outlook.com",
//     phone: "+88457526",
//     totalScan: 6,
//     totalSchedule: 5,
//     status: "active",
//     role: "Editor",
//     lastLogin: "2 minutes ago",
//   },
//   {
//     id: "3",
//     name: "Rachel",
//     email: "rachel34@outlook.com",
//     phone: "+88423526",
//     totalScan: 2,
//     totalSchedule: 4,
//     status: "active",
//     role: "Moderator",
//     lastLogin: "3 minutes ago",
//   },
// ];

// SHOWING DATA TO THE DOM
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
        <td><button class="btn-delete btn-danger">Delete</button> 
            <button onclick=editUser("${eachSet.id}") class="btn-edit btn-info">Edit</button>
        </td>
      </tr>
        `;

    console.log(fakeTableData);
  });
};

showInTable();

// POPUP BUTTON SHOW FUNCTIONALITY
const addUserButton = document.querySelector(".my-addUser-btn");
const addUserPopup = document.querySelector(".my-popup");
const addUserPopupClose = document.querySelector(".my-popupClose-btn");
const tableContainer = document.getElementById("my-table-container");

addUserButton.addEventListener("click", () => {
  addUserPopup.classList.add("popup-show");
  addUserPopup.classList.remove("popup-hidden");
  tableContainer.classList.add("my-table-container");
});

// POPUP BUTTON CLOSE FUNCTIONALITY
const closeAddUserPopup = () => {
  addUserPopup.classList.add("popup-hidden");
  addUserPopup.classList.remove("popup-show");
  tableContainer.classList.remove("my-table-container");
};

addUserPopupClose.addEventListener("click", () => {
  closeAddUserPopup();
});

// ADDING USER TO THE TABLE LIST
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

  closeAddUserPopup();
  showInTable();
});

// EDITING A USER FROM THE TABLE LIST
const editUserPopup = document.querySelector(".edit-user-popup");
const editUserClosePopup = document.querySelector(".editUser-close-btn");

const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editPhone = document.getElementById("editPhone");
const editRole = document.getElementById("editRole");
const editId = document.getElementById("editId");

const editUser = (id) => {
  const editableUser = fakeTableData.filter((user) => user.id === id);
  console.log(editableUser);

  editName.value = editableUser[0].name;
  editEmail.value = editableUser[0].email;
  editPhone.value = editableUser[0].phone;
  editRole.value = editableUser[0].role;
  editId.value = editableUser[0].id;

  editUserPopup.classList.add("popup-show");
  editUserPopup.classList.remove("popup-hidden");
  tableContainer.classList.add("my-table-container");
};

const editedSubmit = (e) => {
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
  editPopupClose();
  showInTable();
};

const editForm = document.getElementById("editForm");

editForm.addEventListener("submit", (e) => {
  editedSubmit(e);
});

// CLOSING EDIT USER POPUP
const editPopupClose = () => {
  editUserPopup.classList.remove("popup-show");
  editUserPopup.classList.add("popup-hidden");
  tableContainer.classList.remove("my-table-container");
};

editUserClosePopup.addEventListener("click", (event) => {
  event.preventDefault();
  editPopupClose();
});
