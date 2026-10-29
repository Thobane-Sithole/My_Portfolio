// $(".testimonial-slider").slick({
//   dots: true,
//   infinite: true,
//   autoplay: false,
//   autoplaySpeed: 1000,
//   slickGoTo: 0,
//   speed: 3000,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1400,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 1200,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 992,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 576,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 320,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// });

// // =================Our Dedicated Investigators===========================
// var shareButtons = document.querySelectorAll(".share-button");
// var socialLinksList = document.querySelectorAll(".social-links");

// shareButtons.forEach(function (shareButton, index) {
//   shareButton.addEventListener("click", function () {
//     socialLinksList[index].classList.toggle("hideLink");
//   });
// });

// // up to down button

// const toTop = document.querySelector(".to-top");

// window.addEventListener("scroll", () => {
//   if (window.pageYOffset > 2000) {
//     toTop.classList.add("active");
//   } else {
//     toTop.classList.remove("active");
//   }
// });

// // Number Counting

// const countElement = document.querySelector("#num");
// let countNumber = 0;
// const upDateCounter = setInterval(function () {
//   countNumber++;
//   countElement.textContent = countNumber;

//   if (countNumber >= 79) {
//     clearInterval(upDateCounter);
//   }
// }, 50);

// // =================Our Dedicated Investigators===========================
// var shareButtons = document.querySelectorAll(".share-button");
// var socialLinksList = document.querySelectorAll(".social-links");

// shareButtons.forEach(function (shareButton, index) {
//   shareButton.addEventListener("click", function () {
//     socialLinksList[index].classList.toggle("hideLink");
//   });
// });

// // video two
// var modalTwo = document.getElementById("videoPopupTwo");
// var btnTwo = document.getElementById("openBtnTwo");
// var spanTwo = document.getElementById("closeBtnTwo");
// var videoTwo = document.getElementById("videoPlayerTwo");

// btnTwo.onclick = function () {
//   modalTwo.style.display = "block";
//   video.play();
// };
// spanTwo.onclick = function () {
//   modalTwo.style.display = "none";
//   videoTwo.pause();
// };
// window.onclick = function (event) {
//   if (event.target == modalTwo) {
//     modalTwo.style.display = "none";
//     videoTwo.pause();
//   }
// };
