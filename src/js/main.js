/*
This file contains all the javascript required for the page to properly run.
@author Josué Cubero Sánchez.
*/

/*
This function initializes the Google Map giving it my home coordinates.
@author Josué Cubero Sánchez.
*/
function initMap() {
    const home = {lat: 9.896724, lng: -84.008888};
    const map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: home});
    const marker = new google.maps.Marker({position: home, map: map});
}

/*
This function is called each time a scroll is made. It will work to keep active the current "page" anchor element.
@author Josué Cubero Sánchez.
*/
function onScroll(event) {
    const top = $(document).scrollTop(); // scrolled pixels
    $('#nav__options li a').each(function() { // for each anchor tag on nav bar
        let currLink = $(this); // current anchor tag
        let refElement = $(currLink.attr('href')); // href element
        if (refElement.position().top <= top
            && refElement.position().top + refElement.height() > top) { // if its within scope, add the active class
            $('#nav__options li a').removeClass('active');
            currLink.addClass('active');
        } else {
            currLink.removeClass('active'); // else if it's not on scope, remove active tag
        }
    });
}

/*
The next functions will be listening for user events to take some action. Based on https://jsfiddle.net/cse_tushar/Dxtyu/141/.
@author Josué Cubero Sánchez.
*/
$(document).ready(function() {

    /*
    This listener will invoke onScroll each time a user scrolls down or up the page.
    @author Josué Cubero Sánchez.
    */
    $(document).on('scroll', onScroll);

    /*
    This listener will scroll the user to the clicked "page" on the navbar.
    @author Josué Cubero Sánchez.
    */
    $('a[href^="#"]').on('click',function(event) { // when a user clicks a link in navbar
        event.preventDefault();
        $(document).off('scroll');

        $('#nav__options li a').each(function() { // remove active for ALL.
            $(this).removeClass('active');
        });
        $(this).addClass('active'); // add active to myself

        let targetSection = $(this.hash); // the id
        $('html, body').stop().animate( // scroll to the desired section
            {'scrollTop': targetSection.offset().top + 2}, 500, 'swing',function() {
              $(document).on('scroll', onScroll);
            });
    });
});
