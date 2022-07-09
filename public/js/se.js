$(function(){
 
	//‰¹‚ð–Â‚ç‚·
	$('.hero').click(function(){
 
		document.getElementById("overSound").currentTime = 0;
		document.getElementById("overSound").play();
 
	});
	$('.appButton').mouseover(function(){
 
		document.getElementById("overSound").currentTime = 0;
		document.getElementById("overSound").play();
 
	});
 
 
});