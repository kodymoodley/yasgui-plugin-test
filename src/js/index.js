
function createGUI(event) {
  event.stopPropagation();
  // Create the main container
  let mainContent = document.createElement('div');
  mainContent.id = 'main-content';
  
  let yasqeButtonsEl = document.getElementsByClassName("yasqe_buttons")[0];
  yasqeButtonsEl.appendChild(mainContent);
  
  document.body.addEventListener(
    "click",
    (event) => {
        if (mainContent && event.target !== mainContent && !mainContent.contains(event.target)) {
            mainContent.remove();
            mainContent = undefined;
        }
    },
    true
  );


  if (!yasqeButtonsEl) {
    console.log('yasqe_buttons element not found!');
  }

  // Create the flexbox container
  const flexbox = document.createElement('div');
  flexbox.id = 'flexbox';
  
  // Filters container
  const filterContainer = document.createElement('div');
  filterContainer.id = 'filter-container';
  
  // Attribute Filters section
  const attributeLabelHeader = document.createElement('div');
  attributeLabelHeader.classList.add('labelheader');
  
  const attributeLabelDiv = document.createElement('div');
  attributeLabelDiv.classList.add('lbl');
  
  const attributeLabel = document.createElement('label');
  attributeLabel.textContent = 'Attribute Filters';
  
  attributeLabelDiv.appendChild(attributeLabel);
  attributeLabelHeader.appendChild(attributeLabelDiv);
  
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('toggle-button');
  toggleButton.setAttribute('data-target', '#attribute-filters');
  toggleButton.textContent = '−';
  
  attributeLabelHeader.appendChild(toggleButton);
  filterContainer.appendChild(attributeLabelHeader);
  
  const attributeFilters = document.createElement('div');
  attributeFilters.id = 'attribute-filters';
  attributeFilters.classList.add('collapsible');
  
  const attributeFiltersSection = document.createElement('div');
  attributeFiltersSection.id = 'attribute-filters-section';
  
  // Creating a single filter entry as a template
  const searchFilter = document.createElement('div');
  searchFilter.classList.add('search-filter');
  
  const inputLoaderContainer1 = document.createElement('div');
  inputLoaderContainer1.classList.add('input-loader-container');
  
  const predicateInput = document.createElement('input');
  predicateInput.type = 'text';
  predicateInput.id = 'predicate-0';
  predicateInput.classList.add('predicate');
  predicateInput.placeholder = 'Attribute';
  
  inputLoaderContainer1.appendChild(predicateInput);
  searchFilter.appendChild(inputLoaderContainer1);
  
  const inputLoaderContainer2 = document.createElement('div');
  inputLoaderContainer2.classList.add('input-loader-container');
  
  const objectInput = document.createElement('input');
  objectInput.type = 'text';
  objectInput.id = 'object-0';
  objectInput.classList.add('object');
  objectInput.placeholder = 'Value';
  
  inputLoaderContainer2.appendChild(objectInput);
  searchFilter.appendChild(inputLoaderContainer2);
  
  const deleteButtonDiv = document.createElement('div');
  deleteButtonDiv.classList.add('delete-filter-comp');
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-filter');
  deleteButton.textContent = 'X';
  
  deleteButtonDiv.appendChild(deleteButton);
  searchFilter.appendChild(deleteButtonDiv);
  
  attributeFiltersSection.appendChild(searchFilter);
  attributeFilters.appendChild(attributeFiltersSection);
  
  const addFilterButton = document.createElement('button');
  addFilterButton.id = 'add-filter';
  addFilterButton.textContent = '+';
  
  attributeFilters.appendChild(addFilterButton);
  filterContainer.appendChild(attributeFilters);
  
  flexbox.appendChild(filterContainer);
  mainContent.appendChild(flexbox);
  
  return mainContent;
}



























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
