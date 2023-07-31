class Poster {
    constructor(ids) {
        ids.map((id) => (document.getElementById(id).style.display = "none"));
    }

    show = (id) => (document.getElementById(id).style.display = "block");
    hide = (id) => (document.getElementById(id).style.display = "none");

    onChange = (inputId, previewId) => {
        document.getElementById(inputId).addEventListener("input", function () {
            document.getElementById(previewId).innerText = this.value;
        });
    };

    onFileChange = (inputId, previewId) => {
        const inputElement = document.getElementById(inputId);
        if (inputElement.files && inputElement.files[0]) {
            const reader = new FileReader();
            reader.onload = function () {
                document.getElementById(previewId).src = reader.result;
            };
            reader.readAsDataURL(inputElement.files[0]);
        }
    };
}

let poster = null;

document.addEventListener("DOMContentLoaded", function () {
    poster = new Poster(["heading", "component-body-image", "description"]);
});

function showHeadingSection() {
    poster.show("heading");
}

function showImageSection() {
    poster.show("component-body-image");
}

function showDescriptionSection() {
    poster.show("description");
}

function onChange(inputId, previewId, type = "text") {
    if (type == "text") poster.onChange(inputId, previewId);
    else poster.onFileChange(inputId, previewId);
}

function downloadImage(id) {
    const downloadLink = document.createElement("a");
    downloadLink.href = document.getElementById(id).src;
    downloadLink.download = "downloaded-image.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
