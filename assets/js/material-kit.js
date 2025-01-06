const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let lastScrollY = 0;
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    navbar.classList.add('scrollUp');
  } else {
    navbar.classList.remove('scrollUp');
  }

  lastScrollY = currentScrollY;
});

function toggleNavbarShadow() {
  if (window.scrollY > 0) {
    navbar.classList.add('navbar-shadow');
  } else {
    navbar.classList.remove('navbar-shadow');
  }
}

window.addEventListener('scroll', toggleNavbarShadow);
window.addEventListener('load', toggleNavbarShadow);
window.addEventListener('resize', toggleNavbarShadow);

document.querySelectorAll('.nav-link').forEach((link) => {
  if (link.href === document.URL) {
    link.parentElement.classList.add('active');
  }
});

document.querySelectorAll('a').forEach(function(link) {
    if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
    }
});


/*!
 * Material Kit - Copyright (c) 2018 Creative Tim
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit/blob/master/LICENSE.md)
 */
const togglerButton = document.querySelector('.navbar-toggler');
togglerButton.addEventListener('click', () => {
  navbar.classList.toggle('nav-open');
  togglerButton.classList.toggle('toggled');
});

/*!
 * Ripple.js Copyright (c) 2014 Jacob Kelley
 * Licensed under MIT (https://github.com/jakiestfu/Ripple.js/blob/develop/LICENSE)
 */

(function(document, Math) {
    const Ripple = function(selector, options) {
        const self = this;
        self.selector = selector;
        self.defaults = {
            on: 'mousedown',
            opacity: 0.4,
            color: "auto",
            multi: false,
            duration: 0.7,
            rate: function(pxPerSecond) {
                return pxPerSecond;
            },
            easing: 'linear'
        };
        self.defaults = mergeOptions(self.defaults, options);
        function mergeOptions(defaults, options) {
            const result = {};
            for (let key in defaults) {
                result[key] = defaults[key];
            }
            for (let key in options) {
                result[key] = options[key];
            }
            return result;
        }
        function Trigger(e) {
            const element = this;
            let ripple;
            let settings;
            element.classList.add('has-ripple');
            settings = mergeOptions(self.defaults, element.dataset);
            if (settings.multi || (!settings.multi && element.querySelectorAll(".ripple").length === 0)) {
                ripple = document.createElement("span");
                ripple.classList.add("ripple");
                element.appendChild(ripple);
                if (!ripple.offsetHeight && !ripple.offsetWidth) {
                    const size = Math.max(element.offsetWidth, element.offsetHeight);
                    ripple.style.height = size + 'px';
                    ripple.style.width = size + 'px';
                }
                if (settings.rate && typeof settings.rate === "function") {
                    const rate = Math.round(ripple.offsetWidth / settings.duration);
                    const filteredRate = settings.rate(rate);
                    const newDuration = ripple.offsetWidth / filteredRate;
                    if (settings.duration.toFixed(2) !== newDuration.toFixed(2)) {
                        settings.duration = newDuration;
                    }
                }
                const color = (settings.color === "auto") ? getComputedStyle(element).color : settings.color;
                const css = {
                    animationDuration: settings.duration + 's',
                    animationTimingFunction: settings.easing,
                    background: color,
                    opacity: settings.opacity
                };
                for (let prop in css) {
                    ripple.style[prop] = css[prop];
                }
            }
            if (!settings.multi) {
                ripple = element.querySelector(".ripple");
            }
            ripple.classList.remove("ripple-animate");
            const rect = element.getBoundingClientRect();
            const x = e.pageX - rect.left - ripple.offsetWidth / 2;
            const y = e.pageY - rect.top - ripple.offsetHeight / 2;
            if (settings.multi) {
                ripple.addEventListener('animationend', function() {
                    ripple.remove();
                });
            }
            ripple.style.top = y + 'px';
            ripple.style.left = x + 'px';
            ripple.classList.add("ripple-animate");
        }
        const elements = document.querySelectorAll(self.selector);
        elements.forEach(function(element) {
            element.addEventListener(self.defaults.on, Trigger);
        });
    };
    new Ripple(".btn, .nav-item");
})(document, Math);