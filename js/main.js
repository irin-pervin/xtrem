$(window).on("load", function() {

  var $landingWrapper = $(".landing-wrapper"),
      $landingInnerContent = $(".landing-inner-content");

  // scroll left and right
  $landingInnerContent.on("mousemove touchmove", function(e) {
    if (e.clientX > $landingWrapper.width() / 2) {
      TweenMax.to($landingWrapper, 2, {
        scrollTo: {
          x: "+=175"
        },
        ease: Power2.easeOut
      });
    } else {
      TweenMax.to($landingWrapper, 2, {
        scrollTo: {
          x: "-=175"
        },
        ease: Power2.easeOut
      });
    }
  });

});





// text scroll animation 
var $tickerWrapper = $(".tickerwrapper");
var $list = $tickerWrapper.find("ul.list");
var $clonedList = $list.clone();
var listWidth = 100;
    $list.find("li").each(function (i) {
      listWidth += $(this, i).outerWidth(true);
    });

var endPos = $tickerWrapper.width() - listWidth;

$list.add($clonedList).css({
  "width" : listWidth + "px"
});

$clonedList.addClass("cloned").appendTo($tickerWrapper);

//TimelineMax
var infinite = new TimelineMax({force3D:true, repeat: -1, paused: false});
var time = 30;

infinite.fromTo($list, time, {x:0}, {x: -listWidth, ease: Linear.easeNone}, 0);
infinite.fromTo($clonedList, time, {x:listWidth}, {x:0, ease: Linear.easeNone}, 0);
infinite.set($list, {x: listWidth});
infinite.to($clonedList, time, {x: -listWidth, ease: Linear.easeNone}, time);
infinite.to($list, time, {x: 0, ease: Linear.easeNone}, time);

//Pause/Play
        
$tickerWrapper.on("mouseenter", function(){
  infinite.pause();
}).on("mouseleave", function(){
  infinite.play();
});



// Options for first odometer
let num1 = 10;
const od1 = new Odometer({
  el: document.getElementById("odometer1"),
  format: "(,ddd).dd",
  duration: 1000,
  theme: "default"
});
od1.render();

// Options for second odometer
let num2 = 20;
const od2 = new Odometer({
  el: document.getElementById("odometer2"),
  format: "(,ddd).dd",
  duration: 1000,
  theme: "default"
});
od2.render();

// Initial Animation for both odometers
setTimeout(function () {
  od1.update(num1);
  od2.update(num2);
}, 100);

// Random Time = +Random Number for both odometers
function randNumber1() {
  num1 = num1 + Math.floor(1 + 5 * Math.random());
  od1.update(num1);
}
function randNumber2() {
  num2 = num2 + Math.floor(1 + 5 * Math.random());
  od2.update(num2);
}
(function myFunction() {
  let randTime1 = Math.floor(Math.random() * (20 - 5 + 1) + 5);
  let randTime2 = Math.floor(Math.random() * (20 - 5 + 1) + 5);
  randNumber1();
  randNumber2();
  setTimeout(myFunction, Math.min(randTime1, randTime2) * 1000);
})();




// humberger 
$('#hamburger-container').mouseleave(function(e){
  TweenMax.to(this, 0.3, {scale: 1});
  TweenMax.to('.circle, .hamburger', 0.3,{scale:1, x: 0, y: 0});
});

$('#hamburger-container').mouseenter(function(e){
  TweenMax.to(this, 0.3, {transformOrigin: '0 0', scale: 1.2});
  TweenMax.to('.circle', 0.3,{scale: 0.85});
});

$('#hamburger-container').mousemove(function(e){   
  callParallax(e);
});

function callParallax(e){
  parallaxIt(e, '.circle', 40);
  parallaxIt(e, '.hamburger', 20);
}

function parallaxIt(e, target, movement){
  var $this = $('#hamburger-container');
  var boundingRect = $this[0].getBoundingClientRect();
  var relX = e.pageX - boundingRect.left;
  var relY = e.pageY - boundingRect.top;

  TweenMax.to(target, 0.3, {
    x: (relX - boundingRect.width/2) / boundingRect.width * movement,
    y: (relY - boundingRect.height/2) / boundingRect.width * movement,
    ease: Power2.easeOut
  });
}







