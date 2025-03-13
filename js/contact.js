document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const errorOutput = document.getElementById("errorOutput");
    const infoOutput = document.getElementById("infoOutput");
    const messageInput = document.getElementById("message");
    const formErrors = [];
    const formErrorsField = document.getElementById("form-errors");

    // Function to update the hidden form-errors input
    function updateFormErrors() {
        formErrorsField.value = JSON.stringify(formErrors);
        console.log("Updated form-errors:", formErrorsField.value);
    }

    // Function to show error messages without shifting layout
    function showError(message){
        errorOutput.textContent = message;
        errorOutput.classList.add("show");
        setTimeout(() => {
            errorOutput.classList.remove("show");
            errorOutput.textContent = "";
        }, 2000);
    }

    // Input masking mechanism for the First and Last name (only letters)
    document.querySelectorAll("#fname, #lname").forEach(input => {
        input.addEventListener("keypress", (event) => {
            if(!/[a-zA-Z\s]/.test(event.key)){
                event.preventDefault();

                const fieldName = input.name;
                const errorMessage = `Illegal character '${event.key}' entered in ${fieldName}. Only letters and spaces allowed.`;
                const existingError = formErrors.find(err => err.field === fieldName && err.error === errorMessage);

                if (!existingError) {
                    formErrors.push({ field: fieldName, error: errorMessage });
                    updateFormErrors();
                }

                showError("Only letters and spaces allowed.");
            }
        });
    });

    // Feature that counts down the characters allowed in the comments <textarea>
    messageInput.addEventListener("input", () => {
        const remaining = messageInput.value.length;
        infoOutput.textContent = `${remaining}/300 characters`;
        infoOutput.classList.add("show");
        infoOutput.style.color = remaining < 250 ? "black" : remaining < 275 ? "pink" : "red";
        if(remaining == 0){
            infoOutput.classList.remove("show");
        }
    });

    // Capture the data of each mistake into an array of bjects formErrors[]
    form.addEventListener("submit", (event) => {
        //event.preventDefault();
        //formErrors.length = 0; // Reset errors

        form.querySelectorAll(":invalid").forEach(field => {
            formErrors.push({ field: field.name, error: field.validationMessage });
        });

        const firstName = document.getElementById("fname").value.trim();
        const lastName = document.getElementById("lname").value.trim();
        const namePattern = /^[A-Za-z\s]+$/; // Allows only letters and spaces

        if (!namePattern.test(firstName)) {
            formErrors.push({ field: "firstname", error: "Only letters and spaces are allowed in first name." });
        }

        if (!namePattern.test(lastName)) {
            formErrors.push({ field: "lastname", error: "Only letters and spaces are allowed in last name." });
        }

        updateFormErrors();

        if (formErrors.length > 0) {
            showError("Please fix the errors before submitting!");
            return; // Stop submission if errors exist
        }

        infoOutput.textContent = "Thank you for reaching out! I will get back to you shortly. <3";
        form.sumbit();
    });

});