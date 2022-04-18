const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//global variable, function
const contentList = [$("#home"), $("#about"), $("#resume"), $("#contact")];

const resumeList = [$("#education"), $("#skills"), $("#projects")];

const headerNavLinks = $$(".header__direction li a");

var projectsBottomPosition = resumeList.reduce((initValue, item) => {
    return initValue + item.offsetHeight;
}, $("#resume").offsetTop);

var aboutBottomPosition = $(".about").offsetTop + $(".about").offsetHeight;

function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < window.pageYOffset + window.innerHeight &&
        left < window.pageXOffset + window.innerWidth &&
        top + height > window.pageYOffset &&
        left + width > window.pageXOffset
    );
}

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

//scroll window
window.onscroll = () => {
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    if (top >= 120) {
        $("header").classList.add("scroll");
        // $("header").classList.add('hide');
    } else {
        $("header").classList.remove("scroll");
        // $("header").classList.remove('hide');
    }
    //header link effect
    let index = contentList.findIndex((item) => elementInViewport(item));
    $(".header__direction li a.active").classList.remove("active");
    headerNavLinks[index].classList.add("active");
    //resume link effect
    if (top >= aboutBottomPosition && top <= projectsBottomPosition) {
        $(".resume .resume__links").style.position = "fixed";
        // $('.resume .resume__links').style.top = '50px';
    } else {
        $(".resume .resume__links").style.position = "static";
        // $('.resume .resume__links').style.top = '';
        // $('.resume .resume__links').style.bottom = '0';
    }

    //resume link effect
    index = resumeList.findIndex((item) => elementInViewport(item));
    if (index !== -1) {
        if ($(".resume__links .list .link.active")) {
            $(".resume__links .list .link.active").classList.remove("active");
        }
        $$(".resume__links .list .link")[index].classList.add("active");
    } else {
        if ($(".resume__links .list .link.active")) {
            $(".resume__links .list .link.active").classList.remove("active");
        }
    }
};
