let input = document.querySelector(".input-group input");
let researchButton = document.querySelector(".input-group span");
let randomButton = document.querySelector(".random button");
let mealsRow = document.querySelector("#meal-list .row");
let singleMeal = document.querySelector("#single-meal")

researchButton.addEventListener("click", function() {
  fetchData(input.value);
})
input.addEventListener("keyup", function(e) {
  if (event.keyCode === 13) {
    fetchData(input.value);
  }
  let value = input.value;

})
// Fetch data and display images
function fetchData(value) {
  input.value = "";
  input.focus();
  mealsRow.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    .then(res => res.json())
    .then(data => {
      data.meals.forEach(e => {
        mealsRow.innerHTML += `  <div class="col-lg-3 meal">
        <div class="image" data-id=${e.idMeal}>
            <img src="${e.strMealThumb}" alt="">
            <div class="overlay">
              <span>${e.strMeal}</span>
            </div>
            </div>
          </div>`
      })
    })
    .catch(err => {
      mealsRow.innerHTML = "Please enter a valid type of food";
      console.log(err);
    })

}

// function to add Event listener on click on a card
mealsRow.addEventListener("click", function(e) {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains("image");
    } else {
      return false;
    }
  })
  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-id");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(res => res.json())
      .then(data => getMeal(data))
      .catch(err => console.log(`error ${err}`))
  }
})

randomButton.addEventListener("click", (e)=>{
  mealsRow.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => getMeal(data))
    .catch(err => console.log(`error ${err}`))
  })
function getMeal(data) {

        let mealName = data.meals[0].strMeal;
        mealJpeg = data.meals[0].strMealThumb,
          mealArea = data.meals[0].strArea,
          mealCategory = data.meals[0].strCategory,
          mealInstructions = data.meals[0].strInstructions;

        let ingredient = [];
        for (var i = 1; i < 20; i++) {
          if (data.meals[0][`strIngredient${i}`]) {
            ingredient.push(`${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}`);
          } else {
            break;
          }

        }

        singleMeal.innerHTML = `    <div class="container">
              <div class="row" style="  width: 60%;  margin: auto;">
                <div class="col-12 text-center">
                  <h1>${mealName}</h1>
                </div>
                <div class="col-8 mx-auto">
                  <div class="single-meal-image">
                    <img src="${mealJpeg}" alt="">
                  </div>
                </div>
                <div class="col-12 text-center" style="border: 2px dotted yellow; border-radius: 4px; margin-bottom: 20px; padding: 10px; padding-top: 20px">
                  <p>${mealArea}</p>
                  <p>${mealCategory}</p>
                </div>
                <div class="col-12 text-center">
                  <p>${mealInstructions}</p>
                </div>
                <div class="col-12 text-center my-3">
                  <h2 class=" fw-bold">Ingredient</h2>
                </div>
                <div class="col-12 text-center">
                  <ul>
                  ${ingredient.map(ing => `<li>${ing}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>`

      }
