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
            selectElement();
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
    if(dropDownList.innerHTML.trim() !== "<div></div>") {
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

/*
 <div class="wrapper">
 <div class="left-aligned"><span style="font-weight: bold;">T</span>ata</div>
 <div class="center-aligned">tata@gmail.com</div>
 <div class="right-aligned">pacuret</div>
 <br style="clear: left;" />
 </div>

 <div class="flex-wrapper">
 <div class="flex-item">tatatretertretertert</div>
 <div class="flex-item">tata@gmail.com</div>
 <div class="flex-item">pacuret</div>
 </div>
 */

function populateList(inputElemVal) {
    var contactList = createContactList();

    //suggestionList = document.createElement("div");
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
            dropDownList.appendChild(flexWrapper);
        }
    }
    /*suggestionList = document.createElement("ul");
    for (var i = 0; i < contactList.length; i++) {
        var suggestion = contactList[i].name;
        var index = suggestion.toLowerCase().indexOf(inputElemVal.toLowerCase());
        if (index >= 0) {
            var listElem = document.createElement("li");
            listElem.innerHTML = highlightTypedChars(suggestion, index, inputElemVal);
            listElem.innerHTML += "&nbsp;" + contactList[i].email;
            listElem.innerHTML += "&nbsp;" + contactList[i].address;
            suggestionList.appendChild(listElem);
        }
    }
    dropDownList.appendChild(suggestionList);*/
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

function moveDown() {
    //unselect current
    //select next
    if(dropDownList.childNodes.length > 0) {
        if (currentIndex === -1) {
            //first time
            dropDownList.childNodes[0].classList.add("selected");
            currentIndex++;
        } else if (currentIndex < dropDownList.childNodes.length - 1) {
            dropDownList.childNodes[currentIndex].classList.remove("selected");
            dropDownList.childNodes[currentIndex + 1].classList.add("selected");
            currentIndex++;
        }
    }
}

function moveUp() {
    if(currentIndex > 0) {
        dropDownList.childNodes[currentIndex].classList.remove("selected");
        dropDownList.childNodes[currentIndex-1].classList.add("selected");
        currentIndex--;
    }

}

function selectElement() {
    if(currentIndex >= 0) {
        var inputElem = document.getElementById('autoInput');
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = dropDownList.childNodes[currentIndex].innerHTML;
        //take the name only
        inputElem.value = tempDiv.childNodes[0].textContent;
        resetAndHideList();
    }
}

//TODO: implement onclick, mouseover, mouseout

/*not used now */
function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);

        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

document.addEventListener("DOMContentLoaded", function () {
    dropDownList = createDropDownList();
    addKeyPressListener();
});