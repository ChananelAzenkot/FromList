function checkForm() {
  const nameCheck = document.forms["formList"]["firstName"].value;
  const nameError = document.getElementById("name");
  const lastNameCheck = document.forms["formList"]["lastName"].value;
  const lastNameError = document.getElementById("last_name");
  const idCheck = document.forms["formList"]["id"].value;
  const idLength = idCheck.length;
  const idError = document.getElementById("idPass");
  const idSelect = document.getElementById("id_select");

  if (nameCheck === "") {
    nameError.style.display = "block";
    nameError.textContent = "שם הפרטי אינו תקין";
  } else {
    nameError.style.display = "none";
  }

  if (lastNameCheck === "") {
    lastNameError.style.display = "block";
    lastNameError.textContent = "שם המשפחה אינו תקין";
  } else {
    lastNameError.style.display = "none";
  }

  if (idLength > 0) {
    if (idLength >= 8 && idLength <= 9) {
      if (
        is_israeli_id_number(idCheck) ||
        (idSelect.value === "passport" &&
          /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/.test(idCheck))
      ) {
        if (idSelect.value === "passport") {
          idError.style.display = "none";
          idError.textContent = "";
        } else {
          idError.style.display = "none";
          idError.textContent = "";
        }
      } else {
        if (idSelect.value === "passport") {
          idError.style.display = "block";
          idError.textContent = passportError;
        } else {
          idError.style.display = "block";
          idError.textContent = errorNotValidTZ;
        }
      }
    } else {
      if (idSelect.value === "passport") {
        idError.style.display = "block";
        idError.textContent = errorRangePassport;
      } else {
        idError.style.display = "block";
        idError.textContent = errorRangeOfTZ;
      }
    }
  } else {
    if (idSelect.value === "passport") {
      idError.style.display = "block";
      idError.textContent = passportRec;
    } else {
      idError.style.display = "block";
      idError.textContent = errorEmptyTZ;
    }
  }

  if (
    nameCheck === "" ||
    lastNameCheck === "" ||
    idLength <= 0 ||
    idLength < 8 ||
    idLength > 9 ||
    (!is_israeli_id_number(idCheck) && idSelect.value !== "passport") ||
    (idSelect.value === "passport" &&
      !/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/.test(idCheck))
  ) {
    alert("אחד או יותר מהשדות אינו תקין");
  } else {
    let idType = idSelect.value === "passport" ? "מספר דרכון" : "תעודת זהות";
    alert(`
    האדם שעבורו מוגשת הבקשה :


    שם פרטי: ${nameCheck}
    שם משפחה: ${lastNameCheck}
    ${idType} : ${idCheck}
    `);
  }
}

function updateInputId() {
  const idSelect = document.getElementById("id_select");
  const idContainer = document.getElementById("id_container");

  if (idSelect.value === "passport") {
    idContainer.setAttribute("type", "text");
    idContainer.setAttribute("placeholder", "מספר דרכון");
  } else {
    idContainer.setAttribute("type", "number");
    idContainer.setAttribute("inputmode", "numeric");
    idContainer.setAttribute("placeholder", "תעודת זהות");
  }
}
