let menuData = {};
fetch("assets/js/menuData.json")
.then(function(response) {

    if (!response.ok) {
        throw new Error("Menu JSON file not found");
    }

    return response.json();
})
.then(function(data) {

    menuData = data;
    console.log("JSON Data Loaded Successfully");

})
.catch(function(error) {
    console.log("Error:", error);
});

let megaMenu = document.getElementById("megaMenu");
let megaInner = document.getElementById("megaInner");
let megaBackdrop = document.getElementById("megaBackdrop");

let navLinks = document.querySelectorAll(".nav-link");

let mainNav = document.getElementById("mainNav");
let mobileMenuBtn = document.getElementById("mobileMenuBtn");
let closeTimer;

function renderMenu(key) {
    let columns = menuData[key];
    if (columns == undefined) {
        return;
    }
    let menuHTML = "";
    columns.forEach(function(column, index) {
        let title = column[0];
        menuHTML += `
            <div class="mega-column">
                <h3>${title}</h3>
        `;
        for (let i = 1; i < column.length; i++) {
            let item = column[i];
            let highlight = "";
            if (item.toLowerCase().includes("space jam")) {
                highlight = "highlight-link";
            }
            menuHTML += `
                <a class="${highlight}"
                href="#${key}-${index}-${i - 1}">
                    ${item}
                </a>
            `;
        }
        menuHTML += `</div>`;
    });

    megaInner.innerHTML = menuHTML;

}
function renderMobileMenu() {
    let menuHTML = "";
    Object.keys(menuData).forEach(function(key) {
        let columns = menuData[key];
        menuHTML += `
            <div class="mega-column">
                <h3>${key}</h3>
        `;
        columns.forEach(function(column, index) {
            let title = column[0];
            menuHTML += `
                <div class="mobile-menu-group">
                    <h4>${title}</h4>
            `;

            for (let i = 1; i < column.length; i++) {
                let item = column[i];
                let highlight = "";
                if (item.toLowerCase().includes("space jam")) {
                    highlight = "highlight-link";
                }
                menuHTML += `
                    <a class="${highlight}"
                    href="#${key}-${index}-${i - 1}">
                        ${item}
                    </a>
                `;

            }

            menuHTML += `
                </div>
            `;
        });
        menuHTML += `
            </div>
        `;
    });

    megaInner.innerHTML = menuHTML;
}

function openMenu(key, link) {
    if (menuData[key] == undefined) {
        return;
    }

    clearTimeout(closeTimer);
    renderMenu(key);

    megaMenu.classList.add("open");
    megaBackdrop.classList.add("open");

    navLinks.forEach(function(item) {

        if (item == link) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

}

function closeMenu() {

    megaMenu.classList.remove("open");
    megaBackdrop.classList.remove("open");

    navLinks.forEach(function(item) {

        item.classList.remove("active");

    });

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
    }

}

function openMobileMenu() {

    clearTimeout(closeTimer);

    renderMobileMenu();

    megaMenu.classList.add("open");
    megaBackdrop.classList.add("open");

    mobileMenuBtn.setAttribute("aria-expanded", "true");

}

function scheduleClose() {

    closeTimer = setTimeout(function() {

        closeMenu();

    }, 180);

}

navLinks.forEach(function(link) {

     link.addEventListener("mouseenter", function() {

        if (window.innerWidth > 850) {

            openMenu(link.dataset.menu, link);

        }

    });

    link.addEventListener("focus", function() {
        if (window.innerWidth > 850) {
            openMenu(link.dataset.menu, link);
        }
    });

    link.addEventListener("click", function(event) {
        if (window.innerWidth <= 850) {
            event.preventDefault();
            if (
                megaMenu.classList.contains("open") &&
                link.classList.contains("active")
            ) {
                closeMenu();
            } else {
                openMenu(link.dataset.menu, link);
            }
        }
    });
});

megaMenu.addEventListener("mouseenter", function() {
    clearTimeout(closeTimer);
});
megaMenu.addEventListener("mouseleave", function() {
    if (window.innerWidth > 850) {
        scheduleClose();
    }

});

megaBackdrop.addEventListener("click", function() {

    closeMenu();

});

mobileMenuBtn.addEventListener("click", function() {
    if (megaMenu.classList.contains("open")) {
        closeMenu();
    } else {
        openMobileMenu();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key == "Escape") {
        closeMenu();
    }
});

document.addEventListener("click", function(event) {
    if (
        !event.target.closest(".site-header") &&
        !event.target.closest(".mega-menu")
    ) {
        closeMenu();
    }
});

window.addEventListener("scroll", function() {
    let header = document.getElementById("siteHeader");
    if (window.scrollY > 5) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

let searchForm = document.getElementById("searchForm");
if (searchForm) {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let searchInput = event.currentTarget.querySelector("input");
        let searchValue = searchInput.value.trim();
        if (searchValue != "") {
            window.location.href =
            "https://www.nike.com/w?q=" +
            encodeURIComponent(searchValue);
        }
    });

}

window.addEventListener("resize", function() {
    if (window.innerWidth > 850) {
        closeMenu();
    }
});
