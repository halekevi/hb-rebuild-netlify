(function () {
    "use strict";

    var backToTop = document.querySelector(".back-to-top");
    var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    var sections = document.querySelectorAll("main section[id]");
    var statItems = document.querySelectorAll(".stat-item h3[data-count]");
    var filterButtons = document.querySelectorAll(".btn-filter");
    var galleryItems = document.querySelectorAll(".gallery-item");
    var faqButtons = document.querySelectorAll(".faq-item");
    var yearEl = document.getElementById("year");
    var dateInput = document.getElementById("date");
    var timeSelect = document.getElementById("time");

    function toggleBackToTop() {
        if (!backToTop) return;
        backToTop.style.display = window.scrollY > 240 ? "inline-flex" : "none";
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function setActiveNav() {
        var scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                var id = section.getAttribute("id");
                navLinks.forEach(function (link) {
                    var href = link.getAttribute("href") || "";
                    link.classList.toggle("active", href === "#" + id);
                });
            }
        });
    }

    function animateCount(el) {
        var targetRaw = el.getAttribute("data-count");
        var target = parseFloat(targetRaw);
        if (isNaN(target)) return;

        var duration = 1200;
        var start = performance.now();
        var isDecimal = targetRaw.indexOf(".") > -1;

        function frame(now) {
            var progress = Math.min((now - start) / duration, 1);
            var value = target * progress;
            el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                el.textContent = isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString();
            }
        }

        requestAnimationFrame(frame);
    }

    function startStatsWhenVisible() {
        if (!("IntersectionObserver" in window) || !statItems.length) {
            statItems.forEach(animateCount);
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statItems.forEach(function (item) { observer.observe(item); });
    }

    function setupGalleryFilter() {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var filter = button.getAttribute("data-filter");
                filterButtons.forEach(function (b) { b.classList.remove("active"); });
                button.classList.add("active");
                galleryItems.forEach(function (item) {
                    var match = filter === "all" || item.getAttribute("data-category") === filter;
                    item.classList.toggle("hidden", !match);
                });
            });
        });
    }

    function setupFaq() {
        faqButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var answer = btn.nextElementSibling;
                var icon = btn.querySelector("i");
                var isOpen = btn.classList.contains("open");
                faqButtons.forEach(function (b) {
                    b.classList.remove("open");
                    var a = b.nextElementSibling;
                    var i = b.querySelector("i");
                    if (a) a.style.maxHeight = null;
                    if (i) i.className = "fa fa-plus";
                });
                if (!isOpen && answer) {
                    btn.classList.add("open");
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    if (icon) icon.className = "fa fa-minus";
                }
            });
        });
    }

    function populateTimeSlots() {
        if (!timeSelect) return;
        var slots = [
            "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
            "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
            "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
        ];
        slots.forEach(function (slot) {
            var option = document.createElement("option");
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
    }

    function setMinDate() {
        if (!dateInput) return;
        var today = new Date();
        var month = String(today.getMonth() + 1).padStart(2, "0");
        var day = String(today.getDate()).padStart(2, "0");
        dateInput.min = today.getFullYear() + "-" + month + "-" + day;
    }

    if (backToTop) backToTop.addEventListener("click", scrollToTop);
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    window.addEventListener("scroll", function () {
        toggleBackToTop();
        setActiveNav();
    });

    toggleBackToTop();
    setActiveNav();
    startStatsWhenVisible();
    setupGalleryFilter();
    setupFaq();
    populateTimeSlots();
    setMinDate();
})();
