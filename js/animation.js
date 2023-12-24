$(document).ready(function () {
    const bg = document.querySelector(".tile-container");
    let columns = Math.ceil(window.innerWidth / 65);
    let rows = Math.ceil(window.innerHeight / 65);
    let totalDivs = columns * rows;
    const g = gsap;

    for (var i = 0; i < totalDivs; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("tiles");
        bg.append(newDiv);
    }
    bg.style.setProperty("--columns", columns);
    bg.style.setProperty("--rows", rows);

    function onReSize() {
        columns = Math.ceil(document.body.clientWidth / 65);
        rows = Math.ceil(document.body.clientHeight / 65);
        totalDivs = columns * rows;
        let currentCount = bg.childElementCount;
        if (currentCount > totalDivs) {
            $(bg).children().slice(totalDivs).remove();
        } else if (currentCount < totalDivs) {
            let elementsToAdd = totalDivs - currentCount;
            for (var i = 0; i < elementsToAdd; i++) {
                const newDiv = document.createElement("div");
                newDiv.classList.add("tiles");
                bg.append(newDiv);
            }
        }
        start();
    }
    window.onresize = () => onReSize();

    function enter() {
        this.style.backgroundColor = "#4FC0D0";
        setTimeout(() => {
            this.style.backgroundColor = "#2d4356";
        }, 200);
    }

    function randomPicker(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const imposterDiv = array[randomIndex];
        return imposterDiv;
    }
    function welcome(index) {
        $('body').off();
        $('.tile-container').css({
            backgroundColor: 'transparent'
        });

        anime({
            targets: ".tiles",
            scale: [
                { value: 1.3, easing: 'easeOutSine', duration: 1200 },
                { value: 0.5, easing: 'easeInOutQuad', duration: 500 },
                { value: 0, easing: 'easeInOutQuad', duration: 500 },
            ],
            delay: anime.stagger(100, { grid: [columns, rows], from: index }),
        });



        $("#canvas").css({
            'display': "block"
        });
        setTimeout(() => {
            $('#welcome').css({
                'display': "none"
            });
            $('body > main').fadeIn();
            initText();
        }, 3300);

    }
    function start() {

        let divs = document.querySelectorAll(".tiles");

        // Remove all event listeners from .tiles elements
        divs.forEach((value) => {
            $(value).off();
            $(value).removeAttr("value");
            $(value).css({
                backgroundColor: '#2d4356'
            });
        });

        let red = randomPicker(divs);

        $(red).attr("value", "red");
        divs.forEach((value, index) => {
            let bool = $(value).attr("value") === "red";

            if (bool) {
                $(value).mouseenter(function () {
                    this.style.backgroundColor = "#FF8989";
                    setTimeout(() => {
                        this.style.backgroundColor = "#2d4356";
                    }, 600);
                });
                $(value).click(function () {

                    welcome(index);
                });
            } else {
                $(value).mouseenter(enter);
            }
        });
    }
    setTimeout(() => {
        $("#skip").fadeToggle();
        $("#skip").css({
            'display': 'flex'
        });
    }, 800);
    $('div#skip > button').click(function (e) {
        e.preventDefault();
        $("#skip").fadeToggle();
    });

    $('body').dblclick(function () {
        $("#skipButton").fadeToggle();
        $("#skipButton").css({
            'display': 'flex'
        });
    });
    $("#skipButton > .skipCancel").css({

    })
    $("#skipButton > .skipCancel").click(function (event) {
        event.stopPropagation();
        $("#skipButton").fadeToggle();
    })
    $("#btn").click(function () {
        $("#skipButton").fadeToggle();
        welcome(1);
    });
    start();


    function assigningHoverJiggle() {
        $('div#main-txt > div > h5> div > span').hover(function () {
            $(this).css('transformOrigin', '')
            $(this).addClass('jiggle');
            setTimeout(() => {
                $(this).removeClass('jiggle');
            }, 1500);
        }
        );
    };
    function intro(text, element, x) {
        for (let i = 0; i < text.length; i++) {
            $(element).append($("<span>").text(text[i]));
        }
        if (x) {
            x();
        };
    };

    async function initText() {
        const top = $('div#main-txt').find("span");
        const mid = $("main#intro > div > div:nth-child(2)").find("span");
        const bottom = $("main#intro > div > ul.links").find("span");
        function ehe(elem, speed) {

            g.set(elem, { transformOrigin: 'bottom left' });
            elem.each(function (index, element) {
                let singleElement = $(element);
                g.from(singleElement, {
                    scaleY: 0,
                    duration: 0.55,
                    ease: "back.out(1.8)",
                    delay: index * speed
                });
            });
        }
        ehe(top, 0.035);
        ehe(mid, 0.08);
        ehe(bottom, 0.26);

    };

    const x = new Promise((green, red) => {
        green();
    });
    x.then((green) => {
        if (window.innerWidth <= 400) {
            intro('hello! my name is', $('div#main-txt > div > h5:nth-child(1)'), function () {
                $('div#main-txt > div > h5:nth-child(2)').append('<div>');
                $('div#main-txt > div').append('<h5 class="overflowH"></h5>');
                $('div#main-txt > div > h5:nth-child(4)').append('<div>');
            });
            intro('shivam', "div#main-txt > div > h5:nth-child(2) > div", assigningHoverJiggle);
            intro("but you can call me ", $('div#main-txt > div > h5:nth-child(3)'), function () {
                intro('aki', "div#main-txt > div > h5:nth-child(4) > div", assigningHoverJiggle);
            });
        }
        else {
            intro('hello!', $('div#main-txt > div > h5:nth-child(1)'));
            intro('my name is ', $('div#main-txt > div > h5:nth-child(2)'), function () {
                $('div#main-txt > div > h5:nth-child(2)').append('<div>');
                intro('shivam', "div#main-txt > div > h5:nth-child(2) > div", assigningHoverJiggle);
            });
            intro("but you can call me ", $('div#main-txt > div > h5:nth-child(3)'), function () {
                $('div#main-txt > div > h5:nth-child(3)').append('<div>');
                intro('aki', "div#main-txt > div > h5:nth-child(3) > div", assigningHoverJiggle);
            });
        };
        intro("I'm a Web Developer", $('main > div.wrapper > main#intro > div > div:nth-child(2)'));
        intro("nom", $('main > div.wrapper > main#intro > div > ul.links > li:nth-child(1)'));
        intro("nom", $('main > div.wrapper > main#intro > div > ul.links > li:nth-child(2)'));
        intro("nom", $('main > div.wrapper > main#intro > div > ul.links > li:nth-child(3)'));
        return green;
    }).then((greenishGreen) => {
        initText();
    });

});
