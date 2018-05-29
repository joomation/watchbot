var swiper;
window.addEventListener('scroll', scrollActive)
window.addEventListener("resize", resizeElements);
document.addEventListener("DOMContentLoaded", function (event) {
  watchbotBall();
  resizeElements();
  setTimeout(function () {
    var loading = document.querySelector('.loading-wrap');
    loading.classList.add('hide');
  },200)
  setTimeout(function () {
    var items = document.querySelectorAll('.dic');
    items[0].classList.add('active');
  }, 500);
  setTimeout(function () {
    landingPage();
  }, 800);
  //swiper
  swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // when window width is <= 767px
      767: {
        slidesPerView: 2,
        spaceBetweenSlides: 20
      },
      // when window width is <= 540px
      540: {
        slidesPerView: 1,
        spaceBetweenSlides: 0
      }
    }
  });
});
//2번째 페이지로 스크롤 애니메이션
document.querySelector('.scroll-down').addEventListener('click', function () {
  scrollPosition(
    document.querySelector('.page-2'),
    400,
    'easeOutQuad'
  );
});
//맨 위로 스크롤 애니메이션
document.querySelector('.scroll-up').addEventListener('click', function () {
  scrollPosition(
    document.querySelector('.page-1'),
    1000,
    'easeOutQuad'
  );
});
var countOptions = {  
  useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
};
//리사이즈시 사이즈 변화
function resizeElements() {
  var w = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  var headerTitle = document.querySelector('.header-contents h1');
  var deskMenu = document.querySelector('.desk-add-menu');
  deskMenu.style.width = headerTitle.getBoundingClientRect().left + headerTitle.offsetWidth + 40 + 'px';
}
//데스크 메뉴 오픈
function deskMenuOpen(target, event) {
  resizeElements();
  var headerTitle = document.querySelector('.header-contents h1');
  var deskMenu = document.querySelector('.desk-add-menu');
  headerTitle.classList.toggle('white');
  target.classList.toggle('active');
  deskMenu.classList.toggle('active');
  var overlay = document.getElementById('overlay');
  overlay.classList.toggle('active');
}
//모바일 메뉴 오픈
function mobileMenuOpen(target) {
  target.classList.toggle('active');
  var overlay = document.getElementById('overlay');
  overlay.classList.toggle('active');
}
//overlay 클릭 시 닫기
function outsideClick(target, e) {
  if (e.currentTarget.id === 'overlay') {
    var headerTitle = document.querySelector('.header-contents h1');
    var mobileNav = document.querySelector('.nav-bar');
    var deskMenu = document.querySelector('.desk-add-menu');
    var deskLang = document.querySelector('.change-lang');
    headerTitle.classList.remove('white');
    deskLang.classList.remove('active');
    deskMenu.classList.remove('active');
    mobileNav.classList.remove('active');
    e.currentTarget.classList.remove('active');
  }
}
//첫 랜딩페이지
function landingPage() {
  setTimeout(function () {
    var downChart = new CountUp('downChart', 100, -46.18, 2, 1.5, countOptions);
    if (!downChart.error) {
      downChart.start();
    } else {  
      console.error(downChart.error);
    }
    var downText = new CountUp('downText', 99, 54, 0, 1.5, countOptions);
    if (!downText.error) {
      downText.start();
    } else {  
      console.error(downText.error);
    }
  }, 300);
  setTimeout(function () {
    var upChart = new CountUp('upChart', 100, 87.68, 2, 1.5, countOptions);
    if (!upChart.error) {
      upChart.start();
    } else {  
      console.error(upChart.error);
    }
    var upText = new CountUp('upText', 100, 188, 0, 1.5, countOptions);
    if (!upText.error) {
      upText.start();
    } else {  
      console.error(upText.error);
    }
  }, 1000)


}
//해당 페이지 도착 시 애니메이션
function scrollActive(e) {
  var windowScrollY = window.scrollY;
  var items = document.querySelectorAll('.dic');
  var header = document.querySelector('.header-wrap');

  if (windowScrollY > 10) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
  for (var i = 0; i < items.length; i++) {
    var itemsOffset = items[i].offsetTop;
    var windowHeight = document.body.offsetHeight;
    if (windowScrollY > itemsOffset - windowHeight * 0.65) {
      items[i].classList.add('active');
      if (i === 6) {
        watchbotState();
      }
    }
  }
}
//워치봇 상태페이지 활성화
var watchbotState = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      var upText = new CountUp('tradingBot', 0, 4068, 0, 2, countOptions);
      if (!upText.error) {
        upText.start();
      } else {  
        console.error(upText.error);
      }
      var upText = new CountUp('weekPrice', 0, 870, 0, 2, countOptions);
      if (!upText.error) {
        upText.start();
      } else {  
        console.error(upText.error);
      }
    }
  };
})();
//해당 페이지로 스크롤 애니메이션
function scrollPosition(destination, duration = 200, easing, callback) {
  const easings = {
    easeOutQuad(t) {
      return t * (2 - t);
    },
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}
var ballWidth = 40;

function watchbotBall(count) {
  ballAnimate(ballWidth);
  setTimeout(function () {
    ballAnimate(0);
  }, 700);
}
var myVar = setInterval(function () {
  watchbotBall()
}, 1400);

function ballAnimate(move) {

  var svg = document.querySelector('.deco_blob');
  var svgGroup = document.querySelector('.blobs');
  var ball = document.querySelectorAll('.circle');
  svg.style.width = ball.length * ballWidth + "px";
  svgGroup.style.transform = "translateX(" + ball.length * ballWidth / 2 + "px)";
  var center = Math.round(ball.length / 2) - 1;
  for (var i = 0; i < ball.length; i++) {
    if (i === center) {
      ball[i].style.transform = "translate(0px)";
    } else if (i < center) {
      ball[i].style.transform = "translate(-" + move * (center - i) + "px)";
    } else if (i > center) {
      ball[i].style.transform = "translate(" + move * (i - center) + "px)";
    }

  }
}