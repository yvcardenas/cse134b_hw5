document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".js-theme-toggle").style.display = "flex";
    
    const toggleSwitch = document.getElementById("theme-toggle");
    const toggleIcon = document.querySelector(".toggle-icon");
    const logo = document.getElementById("logo");
    const currentTheme = localStorage.getItem("theme") || "light"; 

    function updateTheme(theme){
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        toggleIcon.textContent = theme === "dark" ? "🌞" : "🌙";
        logo.src = theme == "dark" ? "/media/slogopink.png" : "/media/slogoblack.png";
    }

    toggleSwitch.checked = currentTheme === "dark";
    updateTheme(currentTheme);

    toggleSwitch.addEventListener("change", () => {
        const newTheme = toggleSwitch.checked ? "dark" : "light";
        updateTheme(newTheme);
    });
});
