// Function to show a share popup when an event occurs
function showSharePopup(event) {
  event.stopPropagation();
  
  let popup = document.createElement("div");
  popup.className = "yasqe_sharePopup";
  let yasqeButtonsEl = document.getElementsByClassName("yasqe_buttons")[0];
  yasqeButtonsEl.appendChild(popup);
  document.body.addEventListener(
      "click",
      (event) => {
          if (popup && event.target !== popup && !popup.contains(event.target)) {
              popup.remove();
              popup = undefined;
          }
      },
      true
  );

  var input = document.createElement("input");
  input.type = "text";
  input.value = "http://hahaha.com";

  input.onfocus = function () {
      input.select();
  };

  // Work around Chrome's issue with mouseup
  input.onmouseup = function () {
      return false;
  };

  popup.innerHTML = "";

  var inputWrapper = document.createElement("div");
  inputWrapper.className = "inputWrapper";

  inputWrapper.appendChild(input);
  popup.appendChild(inputWrapper);
  return popup;
}


// Function to draw SVG from a string
function drawSvgStringAsElement(svgString) {
  if (svgString && svgString.trim().indexOf("<svg") === 0) {
    // No style passed via config, guess own styles
    var parser = new DOMParser();
    var dom = parser.parseFromString(svgString, "text/xml");
    var svg = dom.documentElement;
    svg.setAttribute("aria-hidden", "true");

    var svgContainer = document.createElement("div");
    svgContainer.className = "svgImg";
    svgContainer.appendChild(svg);
    return svgContainer;
  }
  throw new Error("No svg string given. Cannot draw");
}

// Function to draw Font Awesome icon as SVG
function drawFontAwesomeIconAsSvg(faIcon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${faIcon.width} ${faIcon.height}" aria-hidden="true"><path fill="currentColor" d="${faIcon.svgPathData}"></path></svg>`;
}

// Function to check if an element has a specific class
function hasClass(el, className) {
  if (!el) return;
  if (el.classList) return el.classList.contains(className);
  else return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

// Function to add a class to an element
function addClass(el, ...classNames) {
  if (!el) return;
  for (const className of classNames) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
  }
}

// Function to remove a class from an element
function removeClass(el, className) {
  if (!el) return;
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

// Function to get a value or execute a function and return its result
function getAsValue(valueOrFn, arg) {
  if (typeof valueOrFn === "function") return valueOrFn(arg);
  return valueOrFn;
}
