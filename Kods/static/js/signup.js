document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("floatingInput");
  const passwordInput = document.getElementById("floatingPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const signUpButton = document.querySelector(".btn-primary");
  const alertBox = document.getElementById("alert-box");

    /**
   * Parāda paziņojumu paziņojuma lodziņā un padara to redzamu.
   * message - Ziņa, kas jāparāda paziņojuma lodziņā.
   */
  function showAlert(message) {
    alertBox.textContent = message;
    alertBox.classList.remove("d-none");
  }

    /**
   * Paslēpj paziņojuma lodziņu un notīra tā saturu.
   */
  function clearAlert() {
    alertBox.classList.add("d-none");
    alertBox.textContent = "";
  }

    /**
   * Pievieno pozitīvas validācijas stila klases ievades laukam.
   * inputElement - Elements, kuram piemērot pozitīvo validāciju.
   */
  function positiveValidationFeedback(inputElement) {
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
  }

    /**
   * Pievieno negatīvas validācijas stila klases ievades laukam.
   * inputElement - Elements, kuram piemērot negatīvo validāciju.
   */
  function negativeValidationFeedback(inputElement) {
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
  }

  /**
   * Klausās uz e-pasta ievades izmaiņām un veic validāciju.
   * Ja lauks ir tukšs, tiek parādīts kļūdas ziņojums. 
   * Ja ievadītais e-pasts neatbilst regulārās izteiksmes formātam, tas arī tiek atzīmēts kā nederīgs.
  */
  emailInput.addEventListener("input", function () {
    clearAlert(); // Notīra iepriekšējos kļūdu ziņojumus.
    const email = emailInput.value.trim();
    //https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    //https://stackoverflow.com/questions/13992403/regex-validation-of-email-addresses-according-to-rfc5321-rfc5322
    //https://regex101.com/library/3uvtNl
    // Regulārā izteiksme e-pasta validācijai (RFC 5322 standarts).
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (email === "") {
      negativeValidationFeedback(emailInput);
      showAlert("Email is required.");
    } else if (!emailRegex.test(email)) {
      negativeValidationFeedback(emailInput);
      showAlert("Please provide a valid email address.");
    } else {
      positiveValidationFeedback(emailInput);
    }
  });

  /**
   * Klausās uz paroles ievades izmaiņām un veic validāciju.
   * Ja parole neatbilst prasībām (vismaz 6 rakstzīmes un viens cipars), tiek parādīta kļūda.
  */
  passwordInput.addEventListener("input", function () {
    clearAlert();
    const password = passwordInput.value.trim();
    const passwordRegex = /^(?=.*\d).{6,}$/;

    if (password === "") {
      negativeValidationFeedback(passwordInput);
      showAlert("Password is required.");
    } else if (!passwordRegex.test(password)) {
      negativeValidationFeedback(passwordInput);
      showAlert("Password must be at least 6 characters and contain a number.");
    } else {
      positiveValidationFeedback(passwordInput);
    }
  });

  /**
   * Klausās uz paroles apstiprinājuma ievades izmaiņām un salīdzina to ar ievadīto paroli.
   * Ja paroles nesakrīt vai apstiprinājuma lauks ir tukšs, tiek parādīta kļūda.
  */
  confirmPasswordInput.addEventListener("input", function () {
    clearAlert();
    const password = passwordInput.value.trim(); // Noņem liekās atstarpes no paroles ievades lauka
    const confirmPassword = confirmPasswordInput.value.trim(); // Noņem liekās atstarpes no apstiprinājuma lauka.

    if (confirmPassword === "") {
      negativeValidationFeedback(confirmPasswordInput);
      showAlert("Confirm Password is required.");
    } else if (password !== confirmPassword) {
      negativeValidationFeedback(confirmPasswordInput);
      showAlert("Passwords do not match.");
    } else {
      positiveValidationFeedback(confirmPasswordInput);
    }
  });

  /**
   * Klausās uz klikšķa notikumu reģistrācijas pogai un validē visus ievades laukus.
   * Ja visi lauki ir pareizi aizpildīti, dati tiek saglabāti kā sīkdatnes un forma tiek atiestatīta.
  */
  signUpButton.addEventListener("click", function (event) {
    event.preventDefault();
    clearAlert();

    let valid = true;

    // Validē e-pasta ievades lauku
    if (emailInput.value.trim() === "") {
      negativeValidationFeedback(emailInput);
      showAlert("Email is required.");
      valid = false;
    } else {
      positiveValidationFeedback(emailInput);
    }
    // Validē paroles ievades lauku
    if (passwordInput.value.trim() === "") {
      negativeValidationFeedback(passwordInput);
      showAlert("Password is required.");
      valid = false;
    } else {
      positiveValidationFeedback(passwordInput);
    }
    // Validē paroles apstiprinājuma ievades lauku
    if (confirmPasswordInput.value.trim() === "") {
      negativeValidationFeedback(confirmPasswordInput);
      showAlert("Confirm Password is required.");
      valid = false;
    } else if (
      passwordInput.value.trim() !== confirmPasswordInput.value.trim()
    ) {
      negativeValidationFeedback(confirmPasswordInput);
      showAlert("Passwords do not match.");
      valid = false;
    } else {
      positiveValidationFeedback(confirmPasswordInput);
    }

    // Ja visi lauki ir validēti, saglabā e-pastu un paroli kā sīkdatnes un notīra formu
    if (valid) {      
        // Iegūst e-pasta vērtību no ievades lauka un noņem nevajadzīgas atstarpes.
        const email = emailInput.value.trim();
        // Iegūst paroles vērtību no ievades lauka un noņem nevajadzīgas atstarpes.
        const password = passwordInput.value.trim();
      
        /**
         * Saglabā e-pasta vērtību kā sīkdatni ar nosaukumu "email".
         * encodeURIComponent nodrošina, ka vērtība ir droši kodēta un nesatur aizliegtus simbolus.
         * Sīkdatnes ceļš ir iestatīts uz "/", kas nozīmē, ka tā būs pieejama visā vietnē.
         * max-age=86400 nosaka, ka sīkdatne derīga 86400 sekundes (1 dienu).
         * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
         * https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
        */
        document.cookie = `email=${encodeURIComponent(email)}; path=/; max-age=86400`;
      
        // Saglabā paroles vērtību kā sīkdatni ar nosaukumu "password", izmantojot tos pašus iestatījumus.
        document.cookie = `password=${encodeURIComponent(password)}; path=/; max-age=86400`;
      
        // Izsauc `resetForm()` funkciju, lai notīrītu ievades laukus un to stila klases.
        resetForm();
      
        showAlert("veidlapa ir iesniegta veiksmīgi! Tavs konts ir izveidots");
      }      
  });

  function resetForm() {
    emailInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";

    emailInput.classList.remove("is-valid", "is-invalid");
    passwordInput.classList.remove("is-valid", "is-invalid");
    confirmPasswordInput.classList.remove("is-valid", "is-invalid");

    clearAlert();
  }
});
