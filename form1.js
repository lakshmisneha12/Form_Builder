const fields = document.querySelectorAll(".field");
const dropArea = document.getElementById("dropArea");
const form = document.getElementById("dynamicForm");
const resultBox = document.getElementById("result");

const submitBtn = document.getElementById("submitBtn");
const downloadBtn = document.getElementById("downloadBtn");
const exportBtn = document.getElementById("exportBtn");

/* Drag Start */
fields.forEach(field => {
    field.addEventListener("dragstart", e => {
        e.dataTransfer.setData("type", field.dataset.type);
    });
});

/* Allow Drop */
dropArea.addEventListener("dragover", e => e.preventDefault());

/* Drop */
dropArea.addEventListener("drop", e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    addField(type);
});

/* Add Field */
function addField(type) {
    const div = document.createElement("div");
    div.className = "form-field";

    const label = document.createElement("label");
    label.textContent = type.toUpperCase();

    let input;
    if (type === "textarea") {
        input = document.createElement("textarea");
    } else if (type === "checkbox") {
        input = document.createElement("input");
        input.type = "checkbox";
    } else {
        input = document.createElement("input");
        input.type = type;
    }

    input.name = type + "_" + Date.now();

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
}

/* Submit */
submitBtn.addEventListener("click", () => {
    const data = {};
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        data[input.name] =
            input.type === "checkbox" ? input.checked : input.value;
    });

    resultBox.style.display = "block";
    resultBox.innerHTML =
        `<h3>Submitted Data</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
});

/* Download JSON */
downloadBtn.addEventListener("click", () => {
    const data = {};
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        data[input.name] =
            input.type === "checkbox" ? input.checked : input.value;
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "form-data.json";
    a.click();
});

/* Export HTML */
exportBtn.addEventListener("click", () => {
    const html = `
<!DOCTYPE html>
<html>
<head><title>Exported Form</title></head>
<body>
${form.outerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "form.html";
    a.click();
});
