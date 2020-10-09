/* Responsive category navigation*/

document.addEventListener("touchstart", function() {},false);  
$(function() {
	$('#wsnavtoggle').click(function () {		
		$('.wsmenucontainer').toggleClass('wsoffcanvasopener');
	});
	$('.overlapblackbg').click(function () {
	  $('.wsmenucontainer').removeClass('wsoffcanvasopener');
	});

	$('.wsmenu-list> li').has('.wsmenu-submenu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
	$('.wsmenu-list > li').has('.megamenu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
	$('.wsmenu-click').click(function(){
		if($(this).parent('li').hasClass('activeColor')){
			$(this).parent('li').removeClass('activeColor');
		}
		else{
		$('li').removeClass('activeColor');
		$(this).parent('li').toggleClass('activeColor');
	}
	

		$(this).toggleClass('ws-activearrow')
		.parent().siblings().children().removeClass('ws-activearrow');
		$(".wsmenu-submenu, .megamenu").not($(this).siblings('.wsmenu-submenu, .megamenu')).slideUp('slow');
		$(this).siblings('.wsmenu-submenu').slideToggle('slow');
		$(this).siblings('.megamenu').slideToggle('slow');	
	});
	
	$('.wsmenu-list > li > ul > li').has('.wsmenu-submenu-sub').prepend('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
	$('.wsmenu-list > li > ul > li > ul > li').has('.wsmenu-submenu-sub-sub').prepend('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');

	$('.wsmenu-click02').click(function(){
		$(this).children('.wsmenu-arrow').toggleClass('wsmenu-rotate');
		$(this).siblings('.wsmenu-submenu-sub').slideToggle('slow');
		$(this).siblings('.wsmenu-submenu-sub-sub').slideToggle('slow');
	
	});

});