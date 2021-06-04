function searchSubmitClick() {
    window.location.assign('/Search/default.aspx?k=' + document.getElementById('searchTerm').value)
}
function searchSubmitEnter() {
    if (window.event.keyCode == 13) { 
        window.event.cancelBubble = true; 
        window.event.returnValue = false; 
        window.location.assign('/Search/default.aspx?k=' + document.getElementById('searchTerm').value) 
    }
}