const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//global variable

//detect device
const ua = navigator.userAgent;
if (
    /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
    ) ||
    window.innerWidth < 992
) {
    $("header .header__direction").classList.add("hide");
    $("header .container .menu").classList.remove("hide");
}

const responsiveMenu = $("header .container .menu");
const headerDirection = $("header .header__direction");

//responsive for menu
window.onresize = function () {
    if (window.innerWidth < 992) {
        responsiveMenu.classList.remove("hide");
        headerDirection.classList.add("hide");
        headerBackground = "#000";
    } else {
        responsiveMenu.classList.add("hide");
        headerDirection.classList.remove("hide");
        headerBackground = "transparent";
    }
};

responsiveMenu.addEventListener("click", (e) => {
    headerDirection.classList.remove("hide");
    $("header").classList.toggle("full");
});

//typing for text in banner
var spanText = $(".banner .banner__content h3 span");
var bannerSpanContent = "Front-end developer.";
const txtArr = bannerSpanContent.split("");

function typeText(txtArr, curChar = 0) {
    setTimeout(() => {
        spanText.innerHTML += txtArr[curChar];
        if (curChar + 1 == txtArr.length) {
            return deleteText(txtArr, txtArr.length);
        }
        return typeText(txtArr, curChar + 1);
    }, 250);
}

function deleteText(txtArr, curChar = 0) {
    setTimeout(() => {
        let txt = spanText.innerHTML;
        txt = txt.slice(0, curChar - 1);
        spanText.innerHTML = txt;
        if (txt.length == 0) {
            return typeText(txtArr, 0);
        }
        return deleteText(txtArr, txt.length);
    }, 100);
}

typeText(txtArr);

//scroll header
window.onscroll = () => {
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    if (top >= 120) {
        // $("header").classList.add('scroll');
        $("header").classList.add('hide');
    } else {
        // $("header").classList.remove('scroll');
        $("header").classList.remove('hide');
    }
};
