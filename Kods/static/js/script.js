function loadHTML(file, elementId) {
  fetch(file) // Veic HTTP pieprasījumu, lai ielādētu norādīto HTML failu.
    .then((response) => response.text()) // Pārvērš atbildi par teksta formātu.
    .then((data) => {
      document.getElementById(elementId).innerHTML = data; // Aizpilda elementu ar ielādēto HTML saturu.
    })
    .catch((error) => console.log("Error loading HTML:", error)); // Izvada kļūdas ziņojumu, ja fails nav ielādēts.
}

/**
 * Kad lapa ir pilnībā ielādēta, tiek izsaukta loadHTML funkcija,
 * lai aizpildītu navigācijas un footer sadaļas ar to attiecīgajiem HTML failiem
 */
document.addEventListener("DOMContentLoaded", function () {
  loadHTML("navbar.html", "navbar-placeholder"); // Ielādē navigācijas joslu elementā ar ID "navbar-placeholder".
  loadHTML("footer.html", "footer-placeholder"); // Ielādē footer sadaļu elementā ar ID "footer-placeholder".
});

// Pievieno notikuma klausītāju pogai ar ID "exportPdf", kas izpildīs funkciju, kad lietotājs nospiedīs šo pogu.
document.getElementById("exportPdf").addEventListener("click", function () {
  // Importē `jsPDF` no globālā `window.jspdf` objekta.
  const { jsPDF } = window.jspdf;

  // Inicializē jaunu jsPDF instanci, kas ļauj ģenerēt un manipulēt ar PDF dokumentiem.
  const doc = new jsPDF();

  // Iestata fonta izmēru uz 16 punktiem.
  doc.setFontSize(16);

  // Pievieno PDF virsrakstu "Today's Tasks" dokumenta augšdaļā (x:10, y:10).
  doc.text("Today's Tasks", 10, 10);

  // Definē sākotnējo vertikālo nobīdi (yOffset) un rindu atstatumu (lineSpacing).
  let yOffset = 20; // Vertikālā pozīcija sākas 20 pikseļus no lapas augšas.
  const lineSpacing = 8; // Rindu atstatums starp tekstiem.

  // Izvēlas visus elementus ar klasi "accordion-item", kas satur uzdevumu sarakstu.
  const tasks = document.querySelectorAll(".accordion-item");

  // Uzdevumu numurēšanas sākuma vērtība.
  let mainTaskIndex = 1;

  // Iterē cauri visiem atrastajiem uzdevumu elementiem.
  tasks.forEach((task) => {
    // Pārbauda, vai elements ir galvenajā akordeona sadaļā ar ID "taskAccordion".
    const parentAccordion = task.closest(".accordion");
    if (!parentAccordion || parentAccordion.id !== "taskAccordion") {
      return; // Izlaiž uzdevumus, kas nav galvenajā akordeonā.
    }

    // Iegūst akordeona galvenes elementu, kas satur uzdevuma informāciju.
    const header = task.querySelector(".accordion-button");
    if (!header) {
      console.warn(`Skipping a task, no header found.`); // Izlaiž elementus, kuros nav galvenes.
      return;
    }

    // Iegūst informāciju par īpašnieku, mājdzīvnieku, laiku un uzdevuma tipu.
    const ownerName =
      header.querySelector(".col-3:nth-child(1)")?.textContent.trim() ||
      "No owner name provided";
    const petName =
      header.querySelector(".col-3:nth-child(2)")?.textContent.trim() ||
      "No pet name provided";
    const time =
      header.querySelector(".col-3:nth-child(3)")?.textContent.trim() ||
      "No time provided";
    const taskType =
      header.querySelector(".col-3:nth-child(4)")?.textContent.trim() ||
      "No task type provided";

    // Iestata fonta izmēru uz 14 punktiem un pievieno uzdevuma detaļas PDF dokumentam.
    doc.setFontSize(14);
    doc.text(
      `${mainTaskIndex}. ${ownerName} - ${petName} (${time}, ${taskType})`,
      10,
      yOffset
    );
    yOffset += lineSpacing; // Pārvieto yOffset nākamajai rindai.

    // Iegūst akordeona ķermeņa (body) elementu, kas satur papildu uzdevuma informāciju.
    const taskDetails = task.querySelector(".accordion-body");

    if (taskDetails) {
      // Iegūst dzīvnieka informāciju, īpašnieka informāciju un piezīmes.
      const animalInfo =
        taskDetails
          .querySelector("div.col-md-4:nth-child(1) p")
          ?.textContent.trim() || "No animal info provided";
      const ownerInfo =
        taskDetails
          .querySelector("div.col-md-4:nth-child(2) p")
          ?.textContent.trim() || "No owner info provided";
      const notes =
        taskDetails
          .querySelector("div.col-md-4:nth-child(3) p")
          ?.textContent.trim() || "No notes provided";

      // Iestata fonta izmēru uz 12 punktiem un pievieno informāciju ar atkāpēm.
      doc.setFontSize(12);

      // Pievieno dzīvnieka informāciju PDF dokumentā.
      doc.text(`   Animal Info:`, 15, yOffset); // Atkāpe ar 3 tukšumiem.
      yOffset += lineSpacing;
      doc.text(
        `      Species: ${animalInfo.split("Age:")[0].trim()}`,
        20,
        yOffset
      ); // Atkāpe ar 6 tukšumiem.
      yOffset += lineSpacing;
      doc.text(
        `      Age: ${
          animalInfo.split("Age:")[1]?.split("Breed:")[0].trim() || ""
        }`,
        20,
        yOffset
      );
      yOffset += lineSpacing;
      doc.text(
        `      Breed: ${animalInfo.split("Breed:")[1]?.trim() || ""}`,
        20,
        yOffset
      );
      yOffset += lineSpacing;

      // Pievieno īpašnieka informāciju PDF dokumentā.
      doc.text(`   Owner Info:`, 15, yOffset);
      yOffset += lineSpacing;
      doc.text(
        `      Name: ${ownerInfo.split("Contact:")[0].trim()}`,
        20,
        yOffset
      );
      yOffset += lineSpacing;
      doc.text(
        `      Contact: ${ownerInfo.split("Contact:")[1]?.trim() || ""}`,
        20,
        yOffset
      );
      yOffset += lineSpacing;

      // Pievieno piezīmes PDF dokumentā.
      doc.text(`   Notes:`, 15, yOffset);
      yOffset += lineSpacing;
      doc.text(`      ${notes}`, 20, yOffset);
      yOffset += lineSpacing + 5; // Papildu atstarpe pēc katra uzdevuma.
    }

    // Palielina galvenā uzdevuma indeksu.
    mainTaskIndex++;

    // Ja vertikālais novietojums pārsniedz lapas augstumu, pievieno jaunu lapu.
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20; // Atiestata yOffset jaunās lapas sākumam.
    }
  });

  // Saglabā PDF dokumentu ar nosaukumu "Todays_Tasks.pdf".
  doc.save("Todays_Tasks.pdf");
});