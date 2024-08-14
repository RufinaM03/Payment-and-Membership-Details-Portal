let people = [];
let totalAmount = 0;

//newly added - starts
const closeButton1 = document.getElementById("closeButton1");
const closeButton2 = document.getElementById("closeButton2");
const closeButton3 = document.getElementById("closeButton3");
let filterOpenCount = 0;

function openMethod1() {
  console.log("entered open");

  //close other sidebars if open
  closeSliderWindow2();
  closeSliderWindow3();

  document.getElementById("openbtn1").style.backgroundColor = "#555555";
  document.querySelector(".form-field").style.width = "36.725rem";
  document.querySelector(".form-field").style.backgroundColor = "white";
  document.querySelector(".form-field").style.boxShadow =
    "var(--shadow-one), var(--shadow-two), var(--shadow-three)";
  document.getElementById("tableArea").style.marginLeft = "40.85rem";
  document.documentElement.style.setProperty("--slider-width", "40.85rem");
}

function openMethod2() {
  console.log("entered open");

  //close other sidebars if open
  closeSliderWindow1();
  closeSliderWindow3();

  document.getElementById("openbtn2").style.backgroundColor = "#555555";
  document.querySelector(".total-row").style.width = "32.725rem";
  document.querySelector(".total-row").style.backgroundColor = "white";
  document.querySelector(".total-row").style.boxShadow =
    "var(--shadow-one), var(--shadow-two), var(--shadow-three)";
  document.getElementById("tableArea").style.marginLeft = "36.85rem";
  document.documentElement.style.setProperty("--slider-width", "36.85rem");
}

function openMethod3() {
  console.log("entered open");
  filterOpenCount += 1;
  //close other sidebars if open
  closeSliderWindow1();
  closeSliderWindow2();

  document.getElementById("openbtn3").style.backgroundColor = "#555555";
  document.querySelector(".Filter-records").style.width = "16.725rem";
  document.querySelector(".Filter-records").style.backgroundColor = "white";
  document.querySelector(".Filter-records").style.boxShadow =
    "var(--shadow-one), var(--shadow-two), var(--shadow-three)";
  document.getElementById("tableArea").style.marginLeft = "20.85rem";
  document.documentElement.style.setProperty("--slider-width", "20.85rem");

  if (filterOpenCount == 1) FilterRecords();
}

closeButton1.addEventListener("click", closeSliderWindow1);

function closeSliderWindow1() {
  console.log("executed");
  document.getElementById("openbtn1").style.backgroundColor = "transparent";
  document.querySelector(".form-field").style.width = "0";
  document.querySelector(".form-field").style.backgroundColor = "transparent";
  document.querySelector(".form-field").style.boxShadow = "none";
  document.getElementById("tableArea").style.marginLeft = "3.125rem";
  document.documentElement.style.setProperty("--slider-width", "0rem");
}

closeButton2.addEventListener("click", closeSliderWindow2);

function closeSliderWindow2() {
  console.log("executed");
  document.getElementById("openbtn2").style.backgroundColor = "transparent";
  document.querySelector(".total-row").style.width = "0";
  document.querySelector(".total-row").style.backgroundColor = "transparent";
  document.querySelector(".total-row").style.boxShadow = "none";
  document.getElementById("tableArea").style.marginLeft = "3.125rem";
  document.documentElement.style.setProperty("--slider-width", "0rem");
}

closeButton3.addEventListener("click", closeSliderWindow3);

function closeSliderWindow3() {
  console.log("executed");
  document.getElementById("openbtn3").style.backgroundColor = "transparent";
  document.querySelector(".Filter-records").style.width = "0";
  document.querySelector(".Filter-records").style.backgroundColor =
    "transparent";
  document.querySelector(".Filter-records").style.boxShadow = "none";
  document.getElementById("tableArea").style.marginLeft = "3.125rem";
  document.documentElement.style.setProperty("--slider-width", "0rem");
} //newly added  - ends

let searchdropdownBtnText = document.getElementById("search-drop-text");
let searchspan = document.getElementById("searchspan");
let arrowicon = document.getElementById("arrowicon");
let searchlist = document.getElementById("searchlist");
let searchinput = document.getElementById("search-input");
let searchlistItems = document.querySelectorAll(".search-dropdown-list-item");
let searchicon = document.getElementById("searchicon");
const closeIcon = document.getElementById("closeIcon");

searchdropdownBtnText.onclick = function () {
  // Toggle dropdown visibility
  searchlist.classList.toggle("show");

  // Toggle arrow icon rotation
  if (searchlist.classList.contains("show")) {
    arrowicon.style.rotate = "-180deg";
  } else {
    arrowicon.style.rotate = "0deg";
  }
};

window.onclick = function (e) {
  if (
    e.target.id !== "search-drop-text" &&
    e.target.id !== "arrowicon" &&
    e.target.id !== "searchspan"
  ) {
    searchlist.classList.remove("show");
    arrowicon.style.rotate = "0deg";
  }
};

// Use event delegation to handle clicks on list items
searchlist.addEventListener("click", function (e) {
  if (e.target.classList.contains("search-dropdown-list-item")) {
    searchspan.innerText = e.target.innerText;
    if (e.target.innerText === "Member Id") {
      searchinput.placeholder = "Search by Member Id...";
    } else {
      searchinput.placeholder = "Search by " + e.target.innerText + "...";
    }
    // Hide the dropdown after selection
    searchlist.classList.remove("show");
    arrowicon.style.rotate = "0deg";
  }
});

searchicon.addEventListener("click", search);
closeIcon.addEventListener("click", () => {
  showAll();
  resetSwitches();
  searchinput.value = "";
  // searchinput.focus();
  closeIcon.style.display = "none";
});
searchinput.addEventListener("input", () => {
  if (searchinput.value.length > 0) {
    closeIcon.style.display = "block";
  } else {
    closeIcon.style.display = "none";
  }
});

// Fetch data from the server
function fetchData() {
  return fetch("get_payments.php") // URL of the PHP script
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      if (data.length === 0) {
        console.log("Empty response");
        people = [];
        return []; // Return an empty array if no data
      } else {
        people = data;
        return data; // Return the fetched data
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to propagate it further
    });
}

window.onload = function () {
  fetchData()
    .then((peopledata) => {
      renderTable(peopledata); // Call renderTable() after fetchData() completes
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle errors if necessary
    });
};

let edit_id = false;

document.getElementById('addPersonBtn').addEventListener('click', function () {
    const phone = document.getElementById("phoneNumberInput").value;
    if (phone && phone.length !== 10) {
        alert('Phone number must be exactly 10 digits.');
    }
    else {
        addPerson();
    }
});

function addPerson() {
  const memberid = parseInt(document.getElementById("memberIdInput").value);
  const name = document.getElementById("nameInput").value;
  let paidon = document.getElementById("paidOnInput").value;
  let expiryDate = document.getElementById("expiryDateInput").value;
  let amountpaid = parseFloat(document.getElementById("paymentInput").value);
  let balanceamount = parseFloat(document.getElementById("balanceInput").value);
  const paymenttype = document.getElementById("paymentTypeInput").value;
  let paymentstatus = document.getElementById("paymentStatusInput").value;
  const phonenumber = document.getElementById("phoneNumberInput").value;
  const offer = document.getElementById("offerInput").value;
  let validityStartDate = document.getElementById(
    "validityStartDateInput"
  ).value;
  let validityEndDate = document.getElementById("validityEndDateInput").value;

  //newly added - starts
  if (isNaN(amountpaid)) amountpaid = 0.0;
  if (isNaN(balanceamount)) balanceamount = 0.0;

  // const editIndex = document.getElementById("editIndex").value;

  const data = {
    memberid,
    name,
    paidon,
    expiryDate,
    amountpaid,
    balanceamount,
    paymenttype,
    paymentstatus,
    phonenumber,
    offer,
    validityStartDate,
    validityEndDate,
  };

  if (edit_id) {
    // data.editIndex = editIndex;
    console.log(edit_id);
    edit_id = false;
    fetch("update_payments.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data).toString(),
    })
      .then((response) => {
        if (response.ok) {
          fetchData()
            .then((people) => {
              renderTable(people); // Call renderTable() after fetchData() completes
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              // Handle errors if necessary
            }); // Re-fetch data after updating
          // Show a success message after the edit is complete
        window.alert("Successfully edited the details of Member ID: " + memberid);

        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    fetch("submit_payments.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data).toString(),
    })
      .then((response) => {
        if (response.ok) {
          fetchData()
            .then((people) => {
              renderTable(people); // Call renderTable() after fetchData() completes
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              // Handle errors if necessary
            }); // Re-fetch data after saving
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  clearForm();
}

function renderTable(people) {
  const tableBody = document.getElementById("peopleTableBody");
  tableBody.innerHTML = "";

  people.forEach((person) => {
    const row = document.createElement("tr");
    if (new Date(person.expiry_date) < new Date()) {
      row.classList.add("expired");
    }
    // else if (new Date(person.dueDate) < new Date()) {
    //   row.classList.add("upcoming");
    // }

    addRow(row, person);
    tableBody.appendChild(row);
  });
}

function addRow(row, person) {
  Object.keys(person).forEach((key) => {
    const cell = document.createElement("td");

    console.log(typeof person[key]);
    console.log(person[key]);

    //newly added - starts
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(person[key])) {
      if (person[key] === "0000-00-00") {
        cell.textContent = null;
      } else {
        let parts = person[key].split("-");
        let formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
        cell.textContent = formattedDate;
      }
    } //newly added - ends
    else {
      cell.textContent = person[key];
    }
    row.appendChild(cell);
  });
  console.log(person["member_id"]);
  console.log(typeof person["member_id"]);
  const actionsCell = document.createElement("td");
  actionsCell.innerHTML = `<span class="edit-icon" onclick="editPerson(${person["member_id"]})">✏️</span> <span class="delete-icon" onclick="deletePerson(${person["member_id"]})">❌</span>`;
  row.appendChild(actionsCell);
}

function editPerson(edit_memberid) {
  openMethod1(); //newly added - starts
  document.getElementById(
    "openbtn1"
  ).innerHTML = `<img src="assets/edit.svg" />`;
  document.querySelector(".slider-head1").innerHTML = `Edit Payment Details`;
  document.getElementById("addPersonBtn").innerHTML = `Save`;
  //newly added - ends
  
      document.getElementById('addPersonBtn').addEventListener('click', function() {
        document.getElementById("openbtn1").innerHTML = `<img src="assets/add-new-user.svg" />`;
        document.querySelector(".slider-head1").innerHTML = `Add Payment  Details`;
        document.getElementById("addPersonBtn").innerHTML = `Add Member`;
    });
    
  people.forEach((person) => {
    if (person.member_id == edit_memberid) {
      document.getElementById("memberIdInput").value = parseInt(
        person.member_id
      );
      document.getElementById("nameInput").value = person.name;
      document.getElementById("paidOnInput").value = person.paid_on;
      document.getElementById("expiryDateInput").value = person.expiry_date;
      document.getElementById("paymentInput").value = parseFloat(
        person.payment
      );
      document.getElementById("balanceInput").value = parseFloat(
        person.balance_amount
      );
      document.getElementById("paymentTypeInput").value = person.payment_type;
      document.getElementById("paymentStatusInput").value =
        person.payment_status;
      document.getElementById("phoneNumberInput").value = person.phone_number;
      document.getElementById("offerInput").value = person.offer;
      document.getElementById("validityStartDateInput").value =
        person.validity_start_date;
      document.getElementById("validityEndDateInput").value =
        person.validity_end_date;
      edit_id = true;
      // break;
    }
  });
}

function deletePerson(delete_memberid) {
  // Show a confirmation dialog
  const confirmation = window.confirm(
    "Are you sure you want to delete the datails of Member ID: " +
      delete_memberid +
      "?"
  );

  if (confirmation) {
    // If the user clicks "OK", proceed with the deletion
    const memberId = delete_memberid; // Assuming memberid is used to identify the person
    fetch("delete_payments.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ memberId }).toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchData()
            .then((peopledata) => {
              renderTable(peopledata); // Call renderTable() after fetchData() completes
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              // Handle errors if necessary
            }); // Update the table after deletion
        } else {
          console.error("Error deleting person:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting person:", error));
  } else {
    // If the user clicks "Cancel", do nothing
    console.log("Deletion cancelled by the user.");
  }
}

function clearForm() {
  document.getElementById("memberIdInput").value = "";
  document.getElementById("nameInput").value = "";
  document.getElementById("paidOnInput").value = "";
  document.getElementById("expiryDateInput").value = "";
  document.getElementById("paymentInput").value = "";
  document.getElementById("balanceInput").value = "";
  document.getElementById("paymentTypeInput").value = "";
  document.getElementById("paymentStatusInput").value = "";
  document.getElementById("phoneNumberInput").value = "";
  document.getElementById("offerInput").value = "";
  document.getElementById("validityStartDateInput").value = "";
  document.getElementById("validityEndDateInput").value = "";
}

function search() {
  let searchInput = document.getElementById("search-input").value.toLowerCase();
  let attributeName = searchspan.innerText.replace(/\s+/g, "").toLowerCase();

  if (attributeName == "phonenumber") attributeName = "phone_number";
  if (attributeName == "paymentstatus") attributeName = "payment_status";
  if (attributeName == "memberid") attributeName = "member_id";
  if (attributeName == "amountpaid") attributeName = "payment";
  if (attributeName == "paymenttype") attributeName = "payment_type";

  const tableBody = document.getElementById("peopleTableBody");
  tableBody.innerHTML = "";
  
//   fetchdata();
  
  people.forEach((person) => {
    const attributeValue = person[attributeName];
    if (attributeName == "payment_status") {
      if (attributeValue == searchInput) {
        const row = document.createElement("tr");
        addRow(row, person);
        tableBody.appendChild(row);
      }
    } else {
      if (String(attributeValue).toLowerCase().includes(searchInput)) {
        const row = document.createElement("tr");
        addRow(row, person);
        tableBody.appendChild(row);
      }
    }
  });
}

function calculateTotal() {
  const startDate = new Date(document.getElementById("startDateInput").value);
  const endDate = new Date(document.getElementById("endDateInput").value);
  const paymentType = document.getElementById("totalPaymentType").value;

  let totalAmount = people.reduce((total, person) => {
    const paidOnDate = new Date(person['paid_on']);
    if (
      startDate &&
      endDate &&
      paidOnDate >= startDate &&
      paidOnDate <= endDate &&
      (paymentType === "all" || person['payment_type'] === paymentType)
    ) {
      return total + parseInt(person['payment']);
    }
    return total;
  }, 0);
  document.getElementById("totalAmount").innerHTML = totalAmount.toFixed(2);
}

const PlanSwitch = document.getElementById("PlanSwitch");
const OfferSwitch = document.getElementById("OfferSwitch");
const UpcomingSwitch = document.getElementById("About-to-expire-Switch");
const ExpiredSwitch = document.getElementById("ExpiredSwitch");

let arrowicon1 = document.getElementById("arrowicon1");
let subSectionContent = document.getElementById("sub-section-content");

const removeFilters = document.getElementById("removeFilters");

let days;
let NoOfDays;

arrowicon1.onclick = function () {
  // Toggle dropdown visibility
  subSectionContent.classList.toggle("show");

  // Toggle arrow icon rotation
  if (subSectionContent.classList.contains("show")) {
    arrowicon1.style.rotate = "-180deg";
    UpcomingSwitch.checked = false;
    if (PlanSwitch.checked) PlanRecords();
    else if (OfferSwitch.checked) OfferRecords();
  } else {
    arrowicon1.style.rotate = "0deg";
  }
};

removeFilters.addEventListener("click", RemoveFilters);

function initializeSwitches() {
  UpcomingSwitch.checked = false;
  ExpiredSwitch.checked = false;
  UpcomingSwitch.disabled = true;
  ExpiredSwitch.disabled = true;
  PlanSwitch.checked = false;
  OfferSwitch.checked = false;

  //fontcolor changes for disable and enable
  document.getElementById("Plan").style.color = "#8c8b8b";
  document.getElementById("Offer").style.color = "#8c8b8b";
  document.getElementById("About-to-expire").style.color = "#e4e4e4";
  document.getElementById("Expired").style.color = "#e4e4e4";

  //Removing previous event listeners if present
  PlanSwitch.removeEventListener("change", handlePlanSwitch);
  OfferSwitch.removeEventListener("change", handleOfferSwitch);

  PlanSwitch.addEventListener("change", handlePlanSwitch);
  OfferSwitch.addEventListener("change", handleOfferSwitch);
}

function handlePlanSwitch() {
  if (PlanSwitch.checked) {
    console.log("Plan Switch Checked");

    removeFilters.classList.add("show");

    PlanRecords();

    //fontcolor changes
    document.getElementById("Offer").style.color = "#e4e4e4";
    document.getElementById("About-to-expire").style.color = "#8c8b8b";
    document.getElementById("Expired").style.color = "#8c8b8b";

    OfferSwitch.disabled = true;
    UpcomingSwitch.disabled = false;
    ExpiredSwitch.disabled = false;
    UpcomingSwitch.addEventListener("click", checkPlanExpiry);
    ExpiredSwitch.addEventListener("click", checkPlanExpiry);
  } else {
    console.log("Plan Switch Unchecked");
    resetSwitches();
    showAll();
  }
}

function PlanRecords() {
  const tableBody = document.getElementById("peopleTableBody");
  tableBody.innerHTML = "";

  people.forEach((person) => {
    const PaidOn = person.paid_on;
    const Payment = person.payment;
    if ((PaidOn && PaidOn != "0000-00-00") || (Payment && Payment != '0')) {
      const row = document.createElement("tr");
      addRow(row, person);
      tableBody.appendChild(row);
    }
  });
}

function handleOfferSwitch() {
  if (OfferSwitch.checked) {
    console.log("Offer Switch Checked");

    removeFilters.classList.add("show");

    OfferRecords();

    //fontcolor changes
    document.getElementById("Plan").style.color = "#e4e4e4";
    document.getElementById("About-to-expire").style.color = "#8c8b8b";
    document.getElementById("Expired").style.color = "#8c8b8b";

    PlanSwitch.disabled = true;
    UpcomingSwitch.disabled = false;
    ExpiredSwitch.disabled = false;
    UpcomingSwitch.addEventListener("click", checkOfferExpiry);
    ExpiredSwitch.addEventListener("click", checkOfferExpiry);
  } else {
    console.log("Offer Switch Unchecked");
    resetSwitches();
    showAll();
  }
}

function OfferRecords() {
  const tableBody = document.getElementById("peopleTableBody");
  tableBody.innerHTML = "";

  people.forEach((person) => {
    const offer = person.offer;
    const startsOn = new Date(person.validity_start_date);
    const endsOn = new Date(person.validity_end_date);

    if ((offer && offer.trim() !== "") || !isNaN(startsOn) || !isNaN(endsOn)) {
      const row = document.createElement("tr");
      addRow(row, person);
      tableBody.appendChild(row);
    }
  });
}

function resetSwitches() {
  PlanSwitch.disabled = false;
  OfferSwitch.disabled = false;
  PlanSwitch.checked = false;
  OfferSwitch.checked = false;

  UpcomingSwitch.checked = false;
  ExpiredSwitch.checked = false;
  UpcomingSwitch.disabled = true;
  ExpiredSwitch.disabled = true;

  //fontcolor changes for disable and enable
  document.getElementById("Plan").style.color = "#8c8b8b";
  document.getElementById("Offer").style.color = "#8c8b8b";
  document.getElementById("About-to-expire").style.color = "#e4e4e4";
  document.getElementById("Expired").style.color = "#e4e4e4";

  // Remove event listeners to prevent duplicates
  UpcomingSwitch.removeEventListener("click", checkPlanExpiry);
  ExpiredSwitch.removeEventListener("click", checkPlanExpiry);
  UpcomingSwitch.removeEventListener("click", checkOfferExpiry);
  ExpiredSwitch.removeEventListener("click", checkOfferExpiry);

  removeFilters.classList.remove("show");
}

function FilterRecords() {
  initializeSwitches();
}

function calculateNoOfDays_Filter() {
  NoOfDays = parseInt(document.getElementById("days-input").value);
  if (isNaN(NoOfDays)) {
    NoOfDays = 10;
  }
}

function checkPlanExpiry() {
  if (ExpiredSwitch.checked && !UpcomingSwitch.checked) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 to only compare dates
    const tableBody = document.getElementById("peopleTableBody");
    tableBody.innerHTML = "";

    people.forEach((person) => {
      const expiryDate = new Date(person.expiry_date);

      if (expiryDate < today) {
        const row = document.createElement("tr");
        row.classList.add("expired");

        addRow(row, person);

        tableBody.appendChild(row);
      }
    });
  } else if (UpcomingSwitch.checked && !ExpiredSwitch.checked) {
    const tableBody = document.getElementById("peopleTableBody");
    tableBody.innerHTML = "";

    calculateNoOfDays_Filter();

    people.forEach((person) => {
      const expiryDate = new Date(person.expiry_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 to only compare dates
      const startDate = new Date(expiryDate);

      startDate.setDate(expiryDate.getDate() - NoOfDays);

      if (startDate <= today && today <= expiryDate) {
        const row = document.createElement("tr");
        row.classList.add("upcoming");

        addRow(row, person);
        tableBody.appendChild(row);
      }
    });
  } else if (UpcomingSwitch.checked && ExpiredSwitch.checked) {
    const tableBody = document.getElementById("peopleTableBody");
    tableBody.innerHTML = "";

    calculateNoOfDays_Filter();

    people.forEach((person) => {
      const expiryDate = new Date(person.expiry_date);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 to only compare dates
      const startDate = new Date(expiryDate);
      startDate.setDate(expiryDate.getDate() - NoOfDays);

      if (expiryDate < today) {
        const row = document.createElement("tr");
        row.classList.add("expired");

        addRow(row, person);

        tableBody.appendChild(row);
      } else if (startDate <= today && today <= expiryDate) {
        const row = document.createElement("tr");
        row.classList.add("upcoming");

        addRow(row, person);

        tableBody.appendChild(row);
      }
    });
  } else {
    PlanRecords();
  }
}

function checkOfferExpiry() {
  if (ExpiredSwitch.checked && !UpcomingSwitch.checked) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 to only compare dates
    const tableBody = document.getElementById("peopleTableBody");
    tableBody.innerHTML = "";

    people.forEach((person) => {
      const expiryDate = new Date(person.validity_end_date);

      if (expiryDate < today) {
        const row = document.createElement("tr");

        addRow(row, person);

        tableBody.appendChild(row);
      }
    });
  } else if (UpcomingSwitch.checked && !ExpiredSwitch.checked) {
    const tableBody = document.getElementById("peopleTableBody");
    tableBody.innerHTML = "";

    calculateNoOfDays_Filter();

    people.forEach((person) => {
      const expiryDate = new Date(person.validity_end_date);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 to only compare dates
      const startDate = new Date(expiryDate);
      startDate.setDate(expiryDate.getDate() - NoOfDays);

      if (startDate <= today && today <= expiryDate) {
        const row = document.createElement("tr");

        addRow(row, person);

        tableBody.appendChild(row);
      }
    });
  } else if (UpcomingSwitch.checked && ExpiredSwitch.checked) {
    const tableBody = document.getElementById("peopleTableBody");
    tableBody.innerHTML = "";

    calculateNoOfDays_Filter();

    people.forEach((person) => {
      const expiryDate = new Date(person.validity_end_date);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 to only compare dates
      const startDate = new Date(expiryDate);
      startDate.setDate(expiryDate.getDate() - NoOfDays);

      if (expiryDate < today) {
        const row = document.createElement("tr");

        addRow(row, person);

        tableBody.appendChild(row);
      } else if (startDate <= today && today <= expiryDate) {
        const row = document.createElement("tr");

        addRow(row, person);

        tableBody.appendChild(row);
      }
    });
  } else {
    OfferRecords();
  }
}

function showAll() {
  renderTable(people);
}

function RemoveFilters() {
  resetSwitches();
  showAll();
}
