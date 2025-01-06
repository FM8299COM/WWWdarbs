document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const serviceSelect = document.getElementById("serviceSelect");
  const dateInput = document.getElementById("dateInput");
  const alertBox = document.getElementById("alert-box");
  const scheduleButton = document.getElementById("scheduleButton");

  function showAlert(message, success = false) {
    alertBox.textContent = message;
    alertBox.classList.remove("d-none");
    alertBox.classList.remove("alert-danger", "alert-success");
    alertBox.classList.add(success ? "alert-success" : "alert-danger");
  }

  function clearAlert() {
    alertBox.classList.add("d-none");
    alertBox.textContent = "";
  }

  function positiveValidationFeedback(inputElement) {
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
  }

  function negativeValidationFeedback(inputElement) {
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
  }

  function validateEmail(email) {
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegex.test(email);
  }

  function validateInput() {
    let valid = true;

    if (nameInput.value.trim() === "") {
      negativeValidationFeedback(nameInput);
      showAlert("Name is required.");
      valid = false;
    } else {
      positiveValidationFeedback(nameInput);
    }

    if (
      emailInput.value.trim() === "" ||
      !validateEmail(emailInput.value.trim())
    ) {
      negativeValidationFeedback(emailInput);
      showAlert("Please provide a valid email address.");
      valid = false;
    } else {
      positiveValidationFeedback(emailInput);
    }

    if (serviceSelect.value === "") {
      negativeValidationFeedback(serviceSelect);
      showAlert("Please select a service.");
      valid = false;
    } else {
      positiveValidationFeedback(serviceSelect);
    }

    if (dateInput.value === "") {
      negativeValidationFeedback(dateInput);
      showAlert("Please select a date.");
      valid = false;
    } else {
      positiveValidationFeedback(dateInput);
    }

    return valid;
  }

  scheduleButton.addEventListener("click", function () {
    clearAlert();

    if (validateInput()) {
      showAlert("Appointment scheduled successfully!", true);

      setTimeout(() => {
        alertBox.classList.add("d-none");
        alertBox.textContent = "";
        const modalElement = document.getElementById("staticBackdrop");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        document.getElementById("appointmentForm").reset();
        nameInput.classList.remove("is-valid");
        emailInput.classList.remove("is-valid");
        serviceSelect.classList.remove("is-valid");
        dateInput.classList.remove("is-valid");
      }, 2000);
    }
  });
});

