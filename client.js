document.addEventListener("DOMContentLoaded", function () {
    // ... (your existing code)
  
    fetch("skills.json")
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
    
  });
  
