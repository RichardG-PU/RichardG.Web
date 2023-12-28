document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = (canvas.width = window.innerWidth - 20),
        height = (canvas.height = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        )),
        particles = [],
        minYPixelDistance = 40,
        skillsData = null,
        randomValue = null,
        numParticles = 25;

    window.addEventListener("resize", function () {
        width = canvas.width = window.innerWidth - 20;
        height = canvas.height = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
    });

    fetch("../skills.json")
        .then((response) => response.json())
        .then((data) => {
            skillsData = data;

            createParticles();

            populateList("Languages", "languages-list");
            populateList("Software", "software-list");
            update();
        })
        .catch((error) => {
            console.error("Error fetching JSON data:", error);
        });

    function createParticles() {
        for (var i = 0; i < numParticles; i += 1) {
            createParticle();
        }
    }

    function populateList(category, listId) {
        if (skillsData && skillsData.skills[category]) {
            var list = document.getElementById(listId);
            var categorySkills = skillsData.skills[category];

            categorySkills.forEach(function (skill) {
                var listItem = document.createElement("li");
                listItem.textContent = skill;
                list.appendChild(listItem);
            });
        }
    }

    function createParticle() {
        var yPos, xPos;
        do {
            yPos = generateRandomYPosition();
            xPos = Math.random() * width;
        } while (isTooCloseY(yPos, minYPixelDistance));
        if (skillsData) {
            var randomCategory = Math.random() < 0.5 ? "Languages" : "Software";
            randomValue =
                skillsData.skills[randomCategory][
                    Math.floor(
                        Math.random() * skillsData.skills[randomCategory].length
                    )
                ];
            particles.push(
                particle.create(
                    xPos,
                    yPos,
                    Math.random() * 0.9 + Math.random(),
                    0,
                    randomValue
                )
            );
        }
    }

    function generateRandomYPosition() {
        var yPos;
        do {
            yPos = Math.random() * height;
            console.log(height, canvas.height);
        } while (isTooCloseY(yPos, minYPixelDistance));
        return yPos;
    }

    function isTooCloseY(y, threshold) {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var yDistance = Math.abs(y - p.position.getY());
            if (yDistance < threshold) {
                return true;
            }
        }
        return false;
    }

    function update() {
        context.clearRect(0, 0, width, height);

        for (var i = 0; i < particles.length; i += 1) {
            var p = particles[i];
            p.update();
            var textX = p.position.getX();
            var textY = p.position.getY();

            if (textX > width) {
                p.position.setX(0);
                p.position.setY(generateRandomYPosition());
            }

            if (skillsData) {
                context.font = "bold 36px Verdana";
                context.fillStyle = "#282828";
                context.fillText(p.text, textX, textY);
            }
        }

        if (document.body.contains(canvas)) {
            requestAnimationFrame(update);
        }
    }
});
