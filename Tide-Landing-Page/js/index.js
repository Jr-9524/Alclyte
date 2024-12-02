// Section 5
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".midText .text");
    let currentIndex = 0;

    items[currentIndex].classList.add("active");

    function showItem(index) {
        items.forEach(item => item.classList.remove("active"));
        
        items[index].classList.add("active");
    }

    document.querySelector(".midText").addEventListener("wheel", function(event) {
        event.preventDefault();
        
        if (event.deltaY > 0) {
            // Scroll down
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        } else {
            // Scroll up
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        }
        
        showItem(currentIndex);
    });
});