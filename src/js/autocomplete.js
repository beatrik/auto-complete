var dropDownList = null;
var currentIndex = -1;

function createDropDownList() {
    var div = document.createElement("div");
    div.className = "drop-down-list";
    document.body.appendChild(div);
    return div;
}

function addKeyPressListener() {
    var inputElem = document.getElementById('autoInput');
    inputElem.addEventListener("keyup", autocompleteOrMove, false);
}

function autocompleteOrMove(e) {
    switch (e.which) {
        case 40:
            //select first list element
            moveDown();
            break;
        case 38:
            moveUp();
            break;
        case 13:
            if(currentIndex >= 0) {
                selectElement(dropDownList.childNodes[currentIndex]);
            }
            break;
        default:
            autocomplete();
            break;
    }
}

function autocomplete() {
    resetAndHideList();
    var inputElemVal = document.getElementById("autoInput").value;
    if(inputElemVal && inputElemVal.length > 0) {
        populateList(inputElemVal);
        positionList();
    }
}

function positionList() {
    var inputElem = document.getElementById("autoInput");
    var inputOffset = inputElem.getBoundingClientRect();
    if(dropDownList.innerHTML.trim() !== "") {
        dropDownList.style.top = (inputOffset.top + inputOffset.height) + "px";
        dropDownList.style.left = inputOffset.left + "px";
        addClassName(dropDownList, "visible");
    }
}

function resetAndHideList() {
    dropDownList.innerHTML = ""; //clear div content
    removeClassName(dropDownList, "visible");
    currentIndex = -1;
}

function addClassName(elem, className) {
    if(!hasClass(elem, className)) {
        elem.className += " " + className;
    }
}

function removeClassName(elem, className) {
    if(hasClass(elem, className)) {
        var reg = new RegExp("(?:^| )(" + className + ")(?: |$)")
        elem.className = elem.className.replace(reg, '');
    }
}

function hasClass(elem, className) {
    var reg = new RegExp("(?:^| )(" + className + ")(?: |$)"),
        match = (" " + elem.className).match(reg);
    return (match) ? match[1] : null;
}

function populateList(inputElemVal) {
    var contactList = createContactList();

    for (var i = 0; i < contactList.length; i++) {
        //for each suggestion, create a flex wrapper with 3 flex items
        var flexWrapper = document.createElement("div");
        flexWrapper.className = "flex-wrapper";
        var suggestion = contactList[i].name;
        var index = suggestion.toLowerCase().indexOf(inputElemVal.toLowerCase());
        if (index >= 0) {
            flexWrapper.appendChild(createFlexItem(highlightTypedChars(suggestion, index, inputElemVal)));
            flexWrapper.appendChild(createFlexItem(contactList[i].email));
            flexWrapper.appendChild(createFlexItem(contactList[i].address));

            addMouseEventListeners(flexWrapper);

            dropDownList.appendChild(flexWrapper);
        }
    }
}

function highlightTypedChars(suggestion, index, strToHighlight) {
    return suggestion.substring(0, index) + "<span style='font-weight: bold;'>"
    + suggestion.substring(index, index + strToHighlight.length) + "</span>"
    + suggestion.substring(index + strToHighlight.length, suggestion.length);
}

function createFlexItem(itemContent) {
    var flexItem = document.createElement("div");
    flexItem.className = "flex-item";
    flexItem.innerHTML = itemContent;
    return flexItem;
}

function addMouseEventListeners(wrapper) {
    wrapper.addEventListener("mouseover", function() {
        addClassName(wrapper, "selected");
    }, false);
    wrapper.addEventListener("mouseout", function() {
        removeClassName(wrapper, "selected");
    }, false);
    wrapper.addEventListener("click", function() {
        selectElement(this);
    }, false);
}

function moveDown() {
    //unselect current
    //select next
    if(dropDownList.childNodes.length > 0) {
        if (currentIndex === -1) {
            //first time
            addClassName(dropDownList.childNodes[0], "selected");
            currentIndex++;
        } else if (currentIndex < dropDownList.childNodes.length - 1) {
            removeClassName(dropDownList.childNodes[currentIndex], "selected");
            addClassName(dropDownList.childNodes[currentIndex + 1], "selected");
            currentIndex++;
        }
    }
}

function moveUp() {
    if(currentIndex > 0) {
        removeClassName(dropDownList.childNodes[currentIndex], "selected");
        addClassName(dropDownList.childNodes[currentIndex-1], "selected");
        currentIndex--;
    }

}

function selectElement(currentElement) {
        var inputElem = document.getElementById('autoInput');
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = currentElement.innerHTML;
        //take the name only
        inputElem.value = tempDiv.childNodes[0].textContent;
        resetAndHideList();
}

document.addEventListener("DOMContentLoaded", function () {
    dropDownList = createDropDownList();
    addKeyPressListener();
});