document.addEventListener("DOMContentLoaded", function () {
    // ... (your existing code)
  
    fetch("skills.json")
      .then((response) => response.json())
      .then((data) => {
        skillsData = data;
        // Create particles after fetching skillsData
        createParticles();
        // Populate the list items
        populateList("Languages", "languages-list");
        populateList("Software", "software-list");
        // Start the animation
        update();
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  
    // ... (your existing code)
  
    function populateList(category, listId) {
      if (skillsData && skillsData.skills[category]) {
        var list = document.getElementById(listId);
        var categorySkills = skillsData.skills[category];
  
        // Create list items for each skill
        categorySkills.forEach(function (skill) {
          var listItem = document.createElement("li");
          listItem.textContent = skill;
          list.appendChild(listItem);
        });
      }
    }
  
    // ... (your existing code)
  });
  