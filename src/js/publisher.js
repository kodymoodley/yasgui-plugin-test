class Publisher {
    priority = 10;

    // Whether to show a select-button for this plugin
    hideFromSelection = false;

    constructor(yasgui) {
        this.yasgui = yasgui;
        // this.mandatories = ["repo", "token", "query_name"];
    }

    // Draw the publication form.
    draw() {
        console.log('got here1');
        // HTML string
        const htmlString = '<input class="autocomplete"><ul id="" class="autocompleteList"><li data-id="1" class="autoComplete_result"><div style="display: flex; flex-direction: column;"><span><b>Test Kody</b></span></div></li></ul>';
        // Step 1: Create a parent element, e.g., a div
        const newElement = document.createElement('div');
        
        newElement.classList.add('autocompleteWrapper');
        console.log('div1: ', newElement);
        // Step 2: Set the innerHTML of the new element
        newElement.innerHTML = htmlString;
        console.log('div2: ', newElement);
        this.yasgui.controlBarEl.appendChild(newElement);
        console.log('got here3');
    }

    // A required function, used to indicate whether this plugin can draw the current
    // resultset from yasr
    canHandleResults() {
        return (
            !! this.yasr.results
        );
    }
    // A required function, used to identify the plugin, works best with an svg
    getIcon() {
        const textIcon = document.createElement("div");
        textIcon.innerText = "";
        return textIcon;
    }

    // Functions for creating form elements
    createRow(label, value) {
        const row = document.createElement('div');
        row.setAttribute("class", "mdFormRow");
        row.append(label);
        row.append(value);
        return row;
    }

    createLabel(label) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "mdFormLabel");
        cell.innerText = label;
        return cell;
    }

    createValue(inputType, id, cols, lines = 1) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "mdFormValue");
        const input = document.createElement(inputType);
        input.setAttribute("id", id);
        input.setAttribute("name", id);
        input.setAttribute("value", "");
        switch (inputType) {
            case "textarea":
                input.setAttribute("rows", lines);
                input.setAttribute("cols", cols);
                break;
            case "input":
                input.setAttribute("size", cols);
                if (id === 'token') {
                    input.setAttribute("type", "password");
                }
                break;
            default:
                return cell;
        }

        cell.append(input);
        if (this.mandatories.includes(id)) {
            const man = document.createElement("span");
            man.innerText = " *";
            cell.append(man);
        }
        return cell;
    }

    createList(id, values) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "mdFormValue");
        const input = document.createElement("select");
        input.setAttribute("id", id);

        for (let value in values) {
            console.log(value);
            let opt = document.createElement("option");
            if (value === "0") {
                opt.value = "";
            } else {
                opt.value = values[value];
            }
            opt.text = values[value];
            input.append(opt);
        }
        cell.append(input);
        return cell;
    }


}