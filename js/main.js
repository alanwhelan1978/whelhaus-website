const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });
}


const projectForm = document.querySelector("#project-form");

if (projectForm) {
    const formStatus = document.querySelector("#form-status");
    const submitButton = projectForm.querySelector('button[type="submit"]');
    const defaultButtonText = "Send project enquiry →";

    const setFormStatus = (message, state) => {
        formStatus.textContent = message;
        formStatus.className = "form-status form-group-full";

        if (state) {
            formStatus.classList.add(`is-${state}`);
        }
    };

    projectForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!projectForm.checkValidity()) {
            projectForm.reportValidity();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending enquiry…";
        projectForm.setAttribute("aria-busy", "true");
        setFormStatus("Sending your enquiry…", "sending");

        try {
            const response = await fetch(projectForm.action, {
                method: "POST",
                body: new FormData(projectForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            projectForm.reset();
            setFormStatus(
                "Thanks — your enquiry has been sent. We’ll be in touch shortly.",
                "success"
            );
            formStatus.focus();
        } catch (error) {
            setFormStatus(
                "We couldn’t send the form. Please email alanwhelan1978@gmail.com instead.",
                "error"
            );
            formStatus.focus();
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = defaultButtonText;
            projectForm.removeAttribute("aria-busy");
        }
    });
}
