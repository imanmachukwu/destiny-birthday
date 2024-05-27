gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    const pinnedSections = gsap.utils.toArray(".pinned")
    const lastSection = document.querySelector(".last")

    pinnedSections.forEach((section, index, sections) => {
        const img = section.querySelector(".image__container_parent");

        let nextSection = sections[index + 1];
        let endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                /* end: index === sections.length ? `+=${lastSection.offsetHeight / 2}` : lastSection.offsetTop - window.innerHeight, */
                pin: true,
                pinSpacing: false,
                scrub: 1,
                onUpdate: (self) => {
                    let opacity = self.progress;
                    section.style.opacity = 1 - opacity;
                }
            }
        });

        gsap.fromTo(img, {scale: 1}, {
            scale: 0.5,
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: endScalePoint,
                scrub: 1,
            }
        })
    });
});