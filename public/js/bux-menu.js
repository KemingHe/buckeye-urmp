var options = {
  ariaLabel: "Main Navigation",
  breakpointMinWidth: 639
};
var menuCheck = document.querySelector(".bux-menu");

if (menuCheck) {
  // Check type of a11yNavbar since this will be compiled into bux.min.js.
  if (typeof disclosureNav != "undefined") {
    var menu = new disclosureNav("#bux-main-menu", options);

    function collisionDetection() {
      var menuButtonWidth = 150; //Approximation to allow for a buffer area.

      var menuStyles = window.getComputedStyle(menu._navElem.parentNode);
      var menuWidth = menu._navElem.parentNode.getBoundingClientRect().width - parseFloat(menuStyles.paddingLeft) - parseFloat(menuStyles.paddingRight) - menuButtonWidth;

      var menuItems = menu._navElem.querySelectorAll("li");

      var menuItemsTotalWidth = 0;

      for (var i = 0; i < menuItems.length; i++) {
        var menuItemsStyles = window.getComputedStyle(menuItems[i]);
        var menuItemMargins = parseFloat(menuItemsStyles.marginLeft) + parseFloat(menuItemsStyles.marginRight);
        var menuItemWidth = menuItems[i].getBoundingClientRect().width + menuItemMargins;
        menuItemsTotalWidth += menuItemWidth;
      }

      if (menuItemsTotalWidth >= menuWidth) {
        menu.addMenuToggle();

        if (menu._options.orientation === "horizontal") {
          menu.switchOrientation();
        }
      }
    }

    function toggleMenuHeight() {
      var navButton = document.querySelector(".disclosure-nav-toggle");

      if (navButton) {
        navButton.addEventListener("click", function () {
          if (navButton.getAttribute("aria-expanded") === "false") {
            document.querySelector(".bux-menu-wrapper").style.marginBottom = 0;
          } else {
            var menuHeight = document.querySelector("#bux-main-menu").clientHeight;
            document.querySelector(".bux-menu-wrapper").style.marginBottom = menuHeight + "px";
          }
        });
        var subLevel = document.querySelectorAll(".disclosure-nav-top-level");

        if (subLevel) {
          subLevel.forEach(function (subButton) {
            subButton.addEventListener("click", function () {
              var menuHeight = document.querySelector("#bux-main-menu").clientHeight;
              document.querySelector(".bux-menu-wrapper").style.marginBottom = menuHeight + "px";
            });
          });
        }
      }

      if (document.getElementById("bux-main-menu").classList.contains("disclosure-nav-responsive") && document.querySelector(".bux-menu-wrapper").style.marginBottom) {
        document.querySelector(".bux-menu-wrapper").style.marginBottom = 0;
      }
    }

    toggleMenuHeight();
    collisionDetection();
    window.addEventListener("resize", collisionDetection);
    window.addEventListener("resize", toggleMenuHeight);
  } //
  // Search functionality
  //


  var mainMenuFirstLink = document.querySelector(".bux-menu-wrapper nav > ul > li > a");
  var menuSearch = document.getElementsByClassName("bux-menu__search")[0];
  var menuSearchInput = document.getElementsByClassName("bux-search__input")[0];
  var menuSearchContainer = document.getElementsByClassName("bux-menu__search")[0];
  var menuSearchSubmit = document.getElementsByClassName("bux-search__submit")[0];

  if (menuSearch) {
    var menuSearchBtn = document.getElementById("menuSearchBtn");

    menuSearchBtn.onclick = function () {
      toggleSearch();
    };

    menuSearchInput.onkeydown = function (e) {
      if (menuSearchContainer.classList.contains("active")) {
        if (e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          menuSearchBtn.focus();
        } else if (e.key === "Tab") {
          e.preventDefault();
          menuSearchSubmit.focus();
        } else if (e.key === "Escape") {
          e.preventDefault();
          toggleSearch();
          menuSearchBtn.focus();
        }
      }
    };

    menuSearchBtn.onkeydown = function (e) {
      if (menuSearchContainer.classList.contains("active")) {
        if (e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          menuSearchSubmit.focus();
        } else if (e.key === "Tab") {
          e.preventDefault();
          menuSearchInput.focus();
        } else if (e.key === "Escape") {
          e.preventDefault();
          toggleSearch();
          menuSearchBtn.focus();
        }
      }
    };

    menuSearchSubmit.onkeydown = function (e) {
      if (menuSearchContainer.classList.contains("active")) {
        if (e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          menuSearchInput.focus();
        } else if (e.key === "Tab") {
          e.preventDefault();
          menuSearchBtn.focus();
        } else if (e.key === "Escape") {
          e.preventDefault();
          toggleSearch();
          menuSearchBtn.focus();
        }
      }
    };

    document.addEventListener("click", function (event) {
      if (event.composedPath().includes(menuSearchInput) || event.composedPath().includes(menuSearchSubmit) || event.composedPath().includes(menuSearchBtn)) {// click inside
      } else {
        if (menuSearchContainer.classList.contains("active")) {
          toggleSearch();
        }
      }
    });
  } // Small breakpoint search functionality


  var menuButton = document.getElementById("main-menu-toggle");

  if (menuButton) {
    menuButton.onclick = function () {
      toggleSearch();
    };
  }

  var menuSearchButton = document.getElementById("menuSearchBtn");
  var searchWrapper = document.querySelector('.bux-form__text-field--menu-search__wrapper');

  function toggleSearch() {
    var searchIcon = document.getElementById("searchIcon");
    menuSearchContainer.classList.toggle("active");
    menuSearchInput.classList.toggle("visually-hidden");

    if (menuSearchInput.getAttribute("tabindex") === "0") {
      menuSearchInput.setAttribute("tabindex", "-1");
      menuSearchButton.setAttribute("aria-expanded", "false");
      searchWrapper.style.display = 'none';
    } else {
      menuSearchInput.setAttribute("tabindex", "0");
      menuSearchButton.setAttribute("aria-expanded", "true");
      searchWrapper.style.display = 'block';
    }

    menuSearchSubmit.classList.toggle("visually-hidden");
    menuSearchSubmit.getAttribute("tabindex") === "0" ? menuSearchSubmit.setAttribute("tabindex", "-1") : menuSearchSubmit.setAttribute("tabindex", "0");
    menuSearchInput.focus();
    searchIcon.classList.toggle("icon-xmark");
    menuSearchContainer.classList.contains("active") ? mainMenuFirstLink.setAttribute("tabindex", "-1") : mainMenuFirstLink.setAttribute("tabindex", "0");
  } // Mobile breakpoint for search


  var breakpoint = 639;

  function toggleMobileSearch() {
    if (menuSearch) {
      var windowWidth = window.innerWidth;
      var menuSearchInputIsHidden = menuSearchInput.classList.contains("visually-hidden");
      var menuSearchContainerIsActive = menuSearchContainer.classList.contains("active");
      var menuSearchInputIsShowing = !menuSearchInputIsHidden;
      var menuSearchContainerIsInactive = !menuSearchContainerIsActive;
      var menuIsMobile = document.getElementById("bux-main-menu").classList.contains("disclosure-nav-responsive");

      if (windowWidth <= breakpoint) {
        menuSearchInput.classList.remove("visually-hidden");
        menuSearchSubmit.classList.remove("visually-hidden");
        menuSearchInput.setAttribute("tabindex", "0");
        menuSearchSubmit.setAttribute("tabindex", "0");
        searchWrapper.style.display = 'block';
      } else if (windowWidth > breakpoint && menuSearchContainerIsInactive && menuSearchInputIsHidden) {
        searchWrapper.style.display = 'none';
      } else if (windowWidth > breakpoint && menuSearchContainerIsActive && menuSearchInputIsHidden) {
        menuSearchInput.classList.remove("visually-hidden");
        menuSearchSubmit.classList.remove("visually-hidden");
        menuSearchInput.setAttribute("tabindex", "0");
        menuSearchSubmit.setAttribute("tabindex", "0");
      } else if (windowWidth > breakpoint && menuSearchContainerIsInactive && menuSearchInputIsShowing) {
        menuSearchInput.classList.add("visually-hidden");
        menuSearchSubmit.classList.add("visually-hidden");
        menuSearchInput.setAttribute("tabindex", "-1");
        menuSearchSubmit.setAttribute("tabindex", "-1");
      } else if (windowWidth > breakpoint && menuSearchContainerIsActive) {
        toggleSearch();
      }

      if (windowWidth > breakpoint && menuIsMobile) {
        menuSearch.classList.add("bux-menu--mobile");
        menuSearchInput.classList.remove("visually-hidden");
        menuSearchInput.setAttribute("tabindex", "0");
        menuSearchSubmit.setAttribute("tabindex", "0");
        menuSearchSubmit.classList.remove("visually-hidden");
        searchWrapper.style.display = 'block';
      } else if (windowWidth > breakpoint && !menuIsMobile) {
        menuSearch.classList.remove("bux-menu--mobile");
        menuSearchInput.classList.add("visually-hidden");
        menuSearchSubmit.classList.add("visually-hidden");
      }
    }
  } // const menuSearch = document.getElementsByClassName("bux-menu__search")[0];


  var navMenu = document.querySelector(".bux-container--menu");
  var navButton = document.querySelector(".disclosure-nav-toggle");
  var menuLinks = document.querySelector("ul.bux-menu");
  var buxMainMenu = document.querySelector("#bux-main-menu");
  var navLinks = navMenu.querySelectorAll(".bux-menu__item > a");
  navLinks = Array.prototype.slice.call(navLinks);

  function moveSearchToNav() {
    if (menuSearch) {
      buxMainMenu.insertBefore(menuSearch, menuLinks);
    }
  }

  function moveSearchBack() {
    if (menuSearch) {
      navMenu.insertBefore(menuSearch, buxMainMenu.nextSibling);
    }
  }

  function mobileEvents() {
    var isMobile = document.getElementById("bux-main-menu").classList.contains("disclosure-nav-responsive");

    if (isMobile) {
      moveSearchToNav();
      navButton.addEventListener("click", function () {
        if (navButton.getAttribute("aria-expanded") === "false") {
          navMenu.setAttribute("aria-modal", "false");
        } else {
          navMenu.setAttribute("aria-modal", "true");
        }
      }); // Focus trap for mobile menu

      navMenu.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
          case 9:
            // Tab key
            // Move focus to navButton if on last nav item
            if (e.target === navLinks[navLinks.length - 1] && !e.shiftKey) {
              e.preventDefault();
              navButton.focus();
            }

            break;
        }
      });
    } else if (!isMobile) {
      moveSearchBack();
    }
  }

  mobileEvents();
  window.addEventListener("resize", function () {
    mobileEvents();
  });
  window.addEventListener("load", toggleMobileSearch);
  window.addEventListener("resize", toggleMobileSearch);
}
"use strict";
