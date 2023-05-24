
const errorEmptyTZ = "שדה תעודת זהות הינו שדה חובה";
const errorRangeOfTZ = "מספר תעודת זהות צריכה להכיל בין 8 ל 9 ספרות";
const errorNotValidTZ = "תעודת זהות אינה תקינה";
const passportError = "מספר דרכון אינו תקין";
const passportRec = "שדה  דרכון הינו שדה חובה";
const errorRangePassport = " בדרכון צריך בתו הראשון צריך להיות A-Z, והשני 1-9";

function is_israeli_id_number(id) {
  id = String(id).trim();
  if (id.length > 9 || isNaN(id)) return false;
  id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
}
