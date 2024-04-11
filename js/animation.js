$(document).ready(function () {
    const g = gsap;
    function assigningHoverJiggle() {
        $('div#main-txt > div > h5> div > span').hover(function () {
            $(this).css('transformOrigin', '')
            $(this).addClass('jiggle');
            setTimeout(() => {
                $(this).removeClass('jiggle');
            }, 1600);
        }
        );
    };
    function intro(text, element, callback) {
        for (let i = 0; i < text.length; i++) {
            $(element).append($("<span>").text(text[i]));
        }
        if (callback) {
            callback();
        };
    };

    async function initText() {
        const top = $('div#main-txt').find("span");
        const mid = $("main#intro > div > div:nth-child(2)").find("span");
        const bottom = $("main#intro > div > ul.links").find("span");
        function animatinon(elem, speed) {
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
        animatinon(top, 0.035);
        animatinon(mid, 0.08);
        animatinon(bottom, 0.1);

    };

    const temp = new Promise((green, red) => {
        green();
    });
    const call_me = "but you can call me ";
    temp.then((green) => {
        if (window.innerWidth <= 400) {
            intro('hello! my name is', $('div#main-txt > div > h5:nth-child(1)'), function () {
                $('div#main-txt > div > h5:nth-child(2)').append('<div>');
                $('div#main-txt > div').append('<h5 class="overflowH"></h5>');
                $('div#main-txt > div > h5:nth-child(4)').append('<div>');
            });
            intro('shivam singh', "div#main-txt > div > h5:nth-child(2) > div", assigningHoverJiggle);
            // intro(call_me, $('div#main-txt > div > h5:nth-child(3)'), function () {
            //     intro('aki', "div#main-txt > div > h5:nth-child(4) > div", assigningHoverJiggle);
            // });
        }
        else {
            intro('hello!', $('div#main-txt > div > h5:nth-child(1)'));
            intro('my name is ', $('div#main-txt > div > h5:nth-child(2)'), function () {
                $('div#main-txt > div > h5:nth-child(2)').append('<div>');
                intro('shivam singh', "div#main-txt > div > h5:nth-child(2) > div", assigningHoverJiggle);
            });
            // intro(call_me, $('div#main-txt > div > h5:nth-child(3)'), function () {
            //     $('div#main-txt > div > h5:nth-child(3)').append('<div>');
            //     intro('aki', "div#main-txt > div > h5:nth-child(3) > div", assigningHoverJiggle);
            // });
        };
        intro("I'm a Web Developer", $('main > div.wrapper > main#intro > div > div:nth-child(2)'));
        intro("Git", $('main#intro > div > ul.links > li:nth-child(1) > a'));
        intro("About", $('main#intro > div > ul.links > li:nth-child(2) > a'));
        intro("Resume", $('main#intro > div > ul.links > li:nth-child(3) > a'));
        return green;
    }).then((greenishGreen) => {
        initText();
    });
});
