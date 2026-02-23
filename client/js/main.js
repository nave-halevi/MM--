const faqItems = document.querySelectorAll(".faq-item");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const body = document.body;
const accessibilityButtons = document.querySelectorAll("[data-accessibility-toggle]");
const ACCESSIBILITY_KEY = "mm-accessibility-mode";

// FAQ accordion
faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question?.addEventListener("click", () => {
        const isActive = item.classList.toggle("active");
        faqItems.forEach(other => {
            if (other !== item) {
                other.classList.remove("active");
                const btn = other.querySelector(".faq-question");
                const panel = other.querySelector(".faq-answer");
                if (btn) btn.setAttribute("aria-expanded", "false");
                if (panel) panel.setAttribute("aria-hidden", "true");
            }
        });

        question.setAttribute("aria-expanded", String(isActive));
        answer?.setAttribute("aria-hidden", String(!isActive));
    });
});

// Mobile nav toggle
navToggle?.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (body.classList.contains("nav-open")) {
            body.classList.remove("nav-open");
            navToggle?.setAttribute("aria-expanded", "false");
        }
    });
});

// Accessibility mode
const setAccessibilityMode = enabled => {
    body.classList.toggle("accessibility-mode", enabled);
    accessibilityButtons.forEach(btn => btn.setAttribute("aria-pressed", String(enabled)));
    if (enabled) {
        localStorage.setItem(ACCESSIBILITY_KEY, "on");
    } else {
        localStorage.removeItem(ACCESSIBILITY_KEY);
    }
};

if (localStorage.getItem(ACCESSIBILITY_KEY) === "on") {
    setAccessibilityMode(true);
}

accessibilityButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const willEnable = !body.classList.contains("accessibility-mode");
        setAccessibilityMode(willEnable);
    });
});

// Close nav when resizing back to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 992 && body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
    }
});
