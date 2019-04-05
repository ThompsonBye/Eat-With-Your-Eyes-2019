const $ = window.$;

// JavaScript Document
$(document).ready(function(){
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////    INLCUDE EXTERNAL HTML FILES   /////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function includeHTML() {
		var z, i, elmnt, file, xhttp;
		/*loop through a collection of all HTML elements:*/
		z = document.getElementsByTagName("*");
		for (i = 0; i < z.length; i++) {
		elmnt = z[i];
    	/*search for elements with a certain atrribute:*/
    	file = elmnt.getAttribute("w3-include-html");
    	if (file) {
      		/*make an HTTP request using the attribute value as the file name:*/
      		xhttp = new XMLHttpRequest();
      		xhttp.onreadystatechange = function() {
        	if (this.readyState == 4) {
          		if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          			if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          			/*remove the attribute, and call this function once more:*/
					elmnt.removeAttribute("w3-include-html");
          			includeHTML();
        		}
      		}      
      		xhttp.open("GET", file, true);
      		xhttp.send();
      		/*exit the function:*/
      		return;
    		}
  		}
	};
	
	includeHTML();
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////    DOWN ARROW    /////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$('.down-arrow').on('click', function(){
		$('html, body').animate({scrollTop: $(this).parent().next().offset().top},500);
	});
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////    ANIMATE MENU BUTTON [FUNC]   //////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function animateMenu (img, imgWidth, firstImg, lastImg) {
		var animation = setInterval(function(){
    	var position =  -1 * (firstImg*imgWidth);
    	
		img.css('left', position).stop();
    
    	firstImg++;
			if(firstImg == lastImg){
				clearInterval(animation);
			}
		},30);
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////    SHOW/HIDE MENU   ////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var menuClosed = true;
	var menuGreen = false;
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////    MENU APPEARANCE ON SCROLL   //////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$(window).on('load scroll', function(){
		var scroll = $(window).scrollTop();
		var btnTop = $('.nav-button').offset().top;
		var btnHeight = $('.nav-button').height();
		var greenTop = $('.green').offset().top;
		var greenHeight = $('.green').height();

		if (greenTop <= btnTop && !menuGreen) {
			if (menuClosed) {
				$('.nav-button-animation').addClass('contrast');

				if (btnTop + btnHeight >= greenTop + greenHeight ) {
					$('.nav-button-animation').removeClass('contrast');
				}
			}
		} else {
			$('.nav-button-animation').removeClass('contrast');
		}
	});
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////    SHOW/HIDE MENU   ////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$('.nav-button').on('click', function(){
		if (menuClosed) {
			
			animateMenu($('.nav-button').find('.nav-button-animation'), 26.667, 0, 11); 
			
			menuClosed = false;
			$('.overlay, nav,  .social-media-menu').fadeIn();
			$('header').addClass('clicked');
			
			if ($('.nav-button-animation').hasClass('contrast')) {
				menuGreen = true;
				$('.nav-button-animation').removeClass('contrast');
			}
		
		} else {
			
			animateMenu($('.nav-button').find('.nav-button-animation'), 26.667, 11, 21);
		
			menuClosed = true;
			$('.overlay, nav, .social-media-menu').fadeOut();
			$('header').removeClass('clicked');
			
			if ($('#mc_embed_signup').hasClass('open')) {
				$('#mc_embed_signup').removeClass('open').slideUp();
			}
			
			if (menuGreen) {
				menuGreen = false;
				$('.nav-button-animation').addClass('contrast');
			}	
		}
	});
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////    SHOW/HIDE SIGNUP FORM   ////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$('.signup-btn, .up-arrow').on('click', function(){
		if ($('#mc_embed_signup').hasClass('open')) {
			$('#mc_embed_signup').removeClass('open').slideUp();
		} else {
			$('#mc_embed_signup').addClass('open').slideDown();
		}
	});
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////    LOAD MORE WORK   ///////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	/* Add more button */ 
	$(function(){ /* Add more button */ 
    	$("#main ul li").slice(0, 6).show(); // select the first 18
    	
    	$("#load").click(function(e){ // click event for load more
       		e.preventDefault();
       		
       		$("#main ul li:hidden").slice(0, 6).fadeIn(1500); // select next 2 hidden divs and show them
       		
       		//$("img").trigger("unveil");
        	
        	if($("#main ul li:hidden").length === 0){ // check if any hidden divs still exist
            	$("#load").hide();
        	}
       	});
	});
	
	$(window).load(function(){
		if($("#main ul li:hidden").length === 0){ // check if any hidden divs still exist
            //alert("No more divs"); // alert if there are none left
           $("#load").hide();
        }
	});
});