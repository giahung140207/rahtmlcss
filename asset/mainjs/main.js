const listBanner = [
  {
    title: "Cam kết mang lại kết quả tối ưu",
    descBanner:
      "Tích hợp chiến lược nhà cung cấp toàn cầu với những hiểu biết địa phương, dịch vụ để đạt được kết quả tối ưu.",
    url: "/asset/img/Banner1.png",
  },
  {
    title: "Mang đến giải pháp tùy chỉnh",
    descBanner:
      "Cung cấp các giải pháp tùy chỉnh để đạt được các mô hình tiết kiệm chi phí cho khách hàng.",
    url: "/asset/img/Banner2.png",
  },
  {
    title: "Tạo dựng môi trường làm việc hiệu quả",
    descBanner:
      "Xây dựng một môi trường làm việc chuyên nghiệp để thu hút nhân tài.",
    url: "/asset/img/Banner3.png",
  },
  {
    title: "Tuân thủ các tiêu chuẩn về môi trường, sức khỏe và an toàn",
    descBanner:
      "Đảm bảo tuân thủ đầy đủ các tiêu chuẩn Môi trường, Sức khỏe, An toàn, và Quy trình áp dụng để đóng góp cho một thế giới tốt đẹp hơn .",
    url: "/asset/img/Banner4.png",
  },
];

// handle
const btnNextBanner = document.querySelector(".btn--prev");
const btnPrevBanner = document.querySelector(".btn--next");

const renderBanner = document.querySelector(".list--banner");
const listImgBanner = document.querySelector(".banner--img");

// render block img banner
function renderImgBanner() {
  const zIndexEl = 999;
  const htmls = listBanner.map((el, index) => {
    return `
   <div style='${
     index === 0
       ? "opacity:1; visibility:visible"
       : "opacity:0; visibility:hidden"
   }; z-index:${zIndexEl - index}' data-active=${
      index === 0 ? 1 : 0
    } class="list--banner__item">
            <div class="banner--img">
              <img src=${el.url} />
            </div>
            <!-- content banner -->
            <div class="container--banner custom--containerContentBanner">
              <div class="content--banner">
                <div>
                  <h2 class="content--banner__top">Tầm nhìn-sứ mệnh</h2>
                  <p class="content--banner__title">
                    ${el.title}
                  </p>
                  <p class="content--banner__content">
                    ${el.descBanner}
                  </p>
                </div>
                <button class="content--banner__seemore">
                  <span>Khám phá thêm</span>
                  <div class="box--icon">
                    <div class="slide--icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 14L12 7.5L5 1" stroke-linecap="square" />
                      </svg>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 14L12 7.5L5 1" stroke-linecap="square" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
  `;
  });
  renderBanner.innerHTML = htmls.join("");
}

renderImgBanner();

// render list title banner
const listControlBanner = document.querySelector(".list--control");
// render title banner vào thanh điều khiển bên dưới
function renderTitleControlBanner() {
  const htmls = listBanner.map((el, i) => {
    return `
      <li class="list--control__item ${
        i === 0 ? "active" : ""
      }" data-index=${i}>
        ${el.title}
      </li>
      `;
  });
  listControlBanner.innerHTML = htmls.join("");
}
renderTitleControlBanner();

// handle next banner
let i = 0;
let intervalBanner;

btnNextBanner.onclick = () => {
  i = (i + 1) % listBanner.length;
  clearInterval(intervalBanner);
  handlePrevNextBanner(i);
  startInterVal();
};

// handle prev banner
btnPrevBanner.onclick = () => {
  i = (i - 1 + listBanner.length) % listBanner.length;
  clearInterval(intervalBanner);
  handlePrevNextBanner(i);
  startInterVal();
};

// autorun banner
const timeInterval = 3000;

function startInterVal() {
  intervalBanner = setInterval(() => {
    i = (i + 1) % listBanner.length;
    handlePrevNextBanner(i);
  }, timeInterval);
}
startInterVal();

// handle Next and Prev banner
function handlePrevNextBanner(i) {
  const listImgBanner = document.querySelectorAll(".list--banner__item");
  const listControlBanner = document.querySelectorAll(".list--control__item");
  const itemControl = document.querySelector(
    `.list--control__item[data-index='${i}']`
  );
  console.log(itemControl);
  const currentElement = listImgBanner[i];
  // kéo el đang được active về
  const elImgPresent = document.querySelector(
    ".list--banner__item[data-active='1']"
  );

  //   get index el chuẩn bị active
  const zIndexElPrepareActive = currentElement.style.zIndex;

  // hạ img hiện tại if có
  if (elImgPresent) {
    elImgPresent.style.cssText = `
    opacity: 0;
    visibility: hidden;
    z-index: ${zIndexElPrepareActive}
    `;
    elImgPresent.dataset.active = 0;
  }

  // hiện img mới
  currentElement.style.cssText = `
  opacity: 1;
  visibility:visible;
  z-index:${elImgPresent.style.zIndex}
  `;

  currentElement.dataset.active = 1;

  //
  listControlBanner.forEach((el) => el.classList.remove("active"));
  // add lại class
  itemControl.classList.add("active");
}

// handle click dot banner

listControlBanner.onclick = (e) => {
  const el = e.target.closest(".list--control__item");
  if (!el) return;
  const indexBanner = el.dataset.index;
  clearInterval(intervalBanner);
  handlePrevNextBanner(indexBanner);
  startInterVal();
};
//an hien header 
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  if (scrollY >= 300) {
    header.classList.add("active--header");
  } else {
    if (header.classList.contains("active--header")) {
      header.classList.remove("active--header");
      header.classList.add("out--header");
      header.addEventListener("animationend", () => {
        header.classList.remove("out--header");
      });
    }
  }
});
//nut backtotop
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});
backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
//menu dropdown language
document.addEventListener("DOMContentLoaded", () => {
  const langControls = document.querySelectorAll(".control--languge");

  langControls.forEach((langControl) => {
    const langDropdown = langControl.querySelector(".language-dropdown");

    langControl.addEventListener("click", (event) => {
      event.stopPropagation();
      document
        .querySelectorAll(".language-dropdown.show")
        .forEach((dropdown) => {
          if (dropdown !== langDropdown) {
            dropdown.classList.remove("show");
            dropdown.closest(".control--languge").classList.remove("open");
          }
        });

      langDropdown.classList.toggle("show");
      langControl.classList.toggle("open");
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".language-dropdown.show").forEach((dropdown) => {
      const parentControl = dropdown.closest(".control--languge");
      if (!parentControl.contains(event.target)) {
        dropdown.classList.remove("show");
        parentControl.classList.remove("open");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Select the necessary elements
  const searchIcon = document.querySelector(".control--search");
  const searchOverlay = document.querySelector(".search-overlay");
  const closeBtn = document.querySelector(".search-close-btn");

  // Function to open the search overlay
  function openSearch() {
    searchOverlay.classList.add("show");
  }

  // Function to close the search overlay
  function closeSearch() {
    searchOverlay.classList.remove("show");
  }

  // Add event listeners
  searchIcon.addEventListener("click", openSearch);
  closeBtn.addEventListener("click", closeSearch);

  // Optional: Close the overlay by pressing the 'Escape' key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("show")) {
      closeSearch();
    }
  });

  // Optional: Close the overlay by clicking outside the search bar
  searchOverlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("search-overlay")) {
      closeSearch();
    }
  });
});
// Lấy các phần tử cần thiết từ DOM
const hamburgerBtn = document.querySelector(".menu--bar");
const menu = document.querySelector(".mobile-menu");

// Thêm sự kiện 'click' vào nút hamburger
hamburgerBtn.addEventListener("click", () => {
  // Thêm hoặc xóa class 'is-active' trên menu
  menu.classList.toggle("is-active");
});
//slide tin tuc
function newsSwiper() {
  var swiper = new Swiper(".section--news .swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true,
    loop: false,
    navigation: {
      nextEl: ".section--news .news--next",
      prevEl: ".section--news .news--prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}
newsSwiper();
