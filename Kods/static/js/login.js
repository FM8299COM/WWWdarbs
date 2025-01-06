document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("floatingInput");
  const passwordInput = document.getElementById("floatingPassword");
  const signInButton = document.getElementById("signInButton");
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
   * Validē e-pasta adresi, izmantojot regulāru izteiksmi.
   * email - E-pasta adrese, kas jāvalidē.
   * rezultātā atgriež true/false vai e-pasta adrese ir derīga.
   */
  function validateEmail(email) {
    //https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegex.test(email);
  }

  /**
   * Validē e-pasta adresi, izmantojot regulāru izteiksmi.
   * email - E-pasta adrese, kas jāvalidē.
   * rezultātā atgriež true/false vai e-pasta adrese ir derīga.
   */
  function validatePassword(password) {
    const passwordRegex = /^(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }

  // Klausās izmaiņas e-pasta ievades laukā un veic validāciju
  emailInput.addEventListener("input", function () {
    clearAlert();
    const email = emailInput.value.trim();

    if (email === "") {
      negativeValidationFeedback(emailInput);
      showAlert("Email is required.");
    } else if (!validateEmail(email)) {
      negativeValidationFeedback(emailInput);
      showAlert("Please provide a valid email address.");
    } else {
      positiveValidationFeedback(emailInput);
    }
  });

  // Klausās izmaiņas paroles ievades laukā un veic validāciju
  passwordInput.addEventListener("input", function () {
    clearAlert();
    const password = passwordInput.value.trim();

    if (password === "") {
      negativeValidationFeedback(passwordInput);
      showAlert("Password is required.");
    } else if (!validatePassword(password)) {
      negativeValidationFeedback(passwordInput);
      showAlert("Password must be at least 6 characters and contain a number.");
    } else {
      positiveValidationFeedback(passwordInput);
    }
  });

  // Klausās uz klikšķa notikumu pieslēgšanās pogai un validē formu
  signInButton.addEventListener("click", function (event) {
    event.preventDefault();
    clearAlert();

    let valid = true;

    if (emailInput.value.trim() === "") {
      negativeValidationFeedback(emailInput);
      showAlert("Email is required.");
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      negativeValidationFeedback(emailInput);
      showAlert("Please provide a valid email address.");
      valid = false;
    } else {
      positiveValidationFeedback(emailInput);
    }

    if (passwordInput.value.trim() === "") {
      negativeValidationFeedback(passwordInput);
      showAlert("Password is required.");
      valid = false;
    } else if (!validatePassword(passwordInput.value.trim())) {
      negativeValidationFeedback(passwordInput);
      showAlert("Password must be at least 6 characters and contain a number.");
      valid = false;
    } else {
      positiveValidationFeedback(passwordInput);
    }

    // Ja viss ir derīgs, pārbauda saglabātās sīkdatnes un autentificē lietotāju
    if (valid) {
      const storedEmail = getCookie("email");
      const storedPassword = getCookie("password");

      if (
        emailInput.value.trim() === storedEmail &&
        passwordInput.value.trim() === storedPassword
      ) {
        window.location.href = "index.html";
      } else {
        showAlert("Invalid email or password.");
      }
    }
  });

  /**
   * Funkcija `getCookie` iegūst noteiktas sīkdatnes (cookie) vērtību pēc tās nosaukuma.
   * Sīkdatnes tiek glabātas pārlūkā kā daļa no tīmekļa vietnes informācijas,
   * un tās tiek izmantotas dažādiem mērķiem, piemēram, lietotāja autentifikācijai vai sesijas datu glabāšanai.
   *
   * Detalizēta darbība:
   * 1. `document.cookie` iegūst visas sīkdatnes kā vienu virkni.
   *    Piemērs: `"email=user@example.com; password=123456; theme=dark"`
   * 2. Sākumā virknei tiek pievienots papildu prefikss `"; "`, lai nodrošinātu,
   *    ka meklēšana darbosies precīzāk arī tad, ja sīkdatne atrodas virknes sākumā.
   *    Piemērs: `"; email=user@example.com; password=123456; theme=dark"`
   * 3. Funkcija sadala virkni pa sīkdatnēm, izmantojot `split`, kur norādīts meklētājs:
   *    `; ${name}=`
   *    Tas meklē norādīto sīkdatni pēc tās nosaukuma.
   *    Piemērs ar `name="email"`: `[ "; ", "user@example.com; password=123456; theme=dark" ]`
   * 4. Ja sadalīšanas rezultātā masīva garums (`parts.length`) ir 2, tas nozīmē, ka sīkdatne tika atrasta.
   *    - Pēdējā masīva daļa tiek paņemta, izmantojot `pop()`.
   *      Piemērs: `"user@example.com; password=123456; theme=dark"`
   *    - Tā tiek atdalīta pie pirmā `;`, izmantojot `split(";")` un `shift()`.
   *      Piemērs: `"user@example.com"`
   * 5. Ja `parts.length` nav 2, tas nozīmē, ka sīkdatne nav atrasta, un funkcija neko neatgriež (undefined).
   *
   * Funkcija atgriež:
   * - Sīkdatnes vērtību, ja tā eksistē.
   * - `undefined`, ja sīkdatne ar norādīto nosaukumu nav atrasta.
   *
   * Piemērs:
   * Ja dokumentā ir šādas sīkdatnes: `"email=user@example.com; password=123456"`,
   * tad izsaucot `getCookie("email")`, funkcija atgriezīs `"user@example.com"`.
   * 
   * Ideja gūta no: 
   * https://stackoverflow.com/a/25490531
   * https://stackoverflow.com/questions/61732586/trying-to-store-username-and-password-in-cookie-with-javascript
   */
  function getCookie(name) {
    const value = `; ${document.cookie}`; // Pievieno prefiksu "; " sīkdatņu virknei
    const parts = value.split(`; ${name}=`); // Meklē sīkdatni ar norādīto nosaukumu
    if (parts.length === 2) return parts.pop().split(";").shift(); // Atgriež atrasto vērtību vai undefined
  }
});
