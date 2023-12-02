document.addEventListener('DOMContentLoaded', function () {
    const NOMNOM = () => {
        // Get element
        const cursor = document.querySelector('.cursor');
        // Function to add the class on mouse enter


        //main shit
        let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

        function animate() {
            posX += (mouseX - posX) / 3;
            posY += (mouseY - posY) / 3;

            // cursor.style.transform = `translate(${posX}px, ${posY}px)`;
            gsap.to('.cursor', {
                left: posX + 'px',
                top: posY + "px",
                ease: "elastic.out(1, 0.3)",
                duration: 0.200,
            });
            // cursor.style.top = posY + 'px'
            requestAnimationFrame(animate);

        }

        window.addEventListener('mousemove', function (e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
            // console.log(mouseX)
        });

        this.body.addEventListener('mouseenter', function (e) {
            cursor.style.visibility = 'visible';
        });
        this.body.addEventListener('mouseleave', function (e) {
            cursor.style.visibility = 'hidden';
        });
        if (!yourMOm) return;
        animate();
    }
    let yourMOm = true;

    if (!yourMOm) return;
    NOMNOM();

})

