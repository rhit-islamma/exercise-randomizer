document.addEventListener("DOMContentLoaded", function() {
  const initialPage = document.getElementById('initial-page');
  const weightsPage = document.getElementById('weights-page');
  const exercisePage = document.getElementById('exercise-page');
  const viewAllPage = document.getElementById('view-all-page');
  const weightsButton = document.getElementById('weights-button');
  const backButton = document.getElementById('back-button');
  const backToWeightsButton = document.getElementById('back-to-weights-button');
  const viewAllButton = document.getElementById('view-all-button');
  const backFromViewAllButton = document.getElementById('back-from-view-all-button');
  const newExerciseButton = document.getElementById('new-exercise-button');
  const optionButtons = document.querySelectorAll('.option-button');

  let currentCategory, currentMuscleGroup;

  const exercises = {
    push: {
      chest: ["CHEST FLY", "DUMBBELL BENCH", "DUMBBELL BENCH INCLINE", "BARBEL BENCH", "BARBEL BENCH INCLINE", "DECLINE BENCH", "CHEST DIP"],
      triceps: ["ROPE PULL DOWN", "ROPE PULLOVER", "SKULL CRUSHERS", "DIPS"],
      frontDelt: ["DEEP DIPS", "DUMBBELL SHOULDER PRESS", "BARBELL SHOULDER PRESS", "TRUCK DRIVERS", "PLATE RAISES", "DUMBBELL RAISES"],
      lateralDelt: ["DUMBBELL RAISE", "CABLE RAISE", "UPRIGHT ROW"]
    },
    pull: {
      lats: ["BARBELL ROWS", "DUMBBELL ROWS", "PULL-UPS", "WIDE PULL UP", "NEUTRAL PULL UP", "CHIN UP", "MACHINE ROW", "LAT PULL DOWN", "MAG GRIP PULL DOWN", "STRAIGHT ARM PULL DOWN", "DUMBBELL PULLOVER"],
      traps: ["SCAPULAR PULL UP", "BARBELL HIGH PULL", "DUMBBELL SHRUG", "BARBELL SHRUG", "CABLE SHRUG", "HIGH MACHINE ROW"],
      rearDelt: ["FACE PULLS", "REAR DELT DUMBBELL FLYS", "REAR DELT MACHINE FLY", "HIGH MACHINE ROW"],
      bicep: ["STANDING DUMBBELL CURL", "SEATED DUMBBELL CURL", "STANDING DUMBBELL HAMMER CURL", "SEATED DUMBBELL HAMMER CURL", "SEATED WIDE CURL", "DECLINE CURL", "BARBELL CURL", "MACHINE CURL"]
    },
    legs: {
      quads: ["BACK SQUAT", "FRONT SQUAT", "LEG PRESS", "LEG EXTENSION", "ZURCHER SQUAT", "DEADLIFT"],
      hamstring: ["ASSISTED NORDICS", "NORDIC NEGATIVES", "LEG CURLS", "ROMANIAN DEADLIFT", "STIFF-LEGGED DEADLIFT", "GOOD MORNINGS"],
      glutes: ["GLUTE MACHINE", "ABDUCTOR", "ADDUCTOR", "BANDED KNEE RAISES", "LEG RAISES", "GLUTE RAISE"],
      calves: ["SEATED CALF RAISE", "CALF RAISES", "SINGLE LEG CALF RAISES"],
      shin: ["SHIN MACHINE", "WALL RAISES", "HEEL WALKS"]
    },
    core: {
      abs: ["CRUNCHES", "SITUPS", "VUPS", "HANGING LEG RAISES", "WINDSHIELD WIPERS", "HOLLOW HOLDS", "PLANKS", "PLANK DIPS", "RUSSIAN TWISTS", "DECLINE CRUNCHES", "SIDE TOE TOUCHES", "TOE TOUCHES", "TORTURE TWIST", "SIDE DUMBBELL CRUNCH", "BICYCLE CRUNCHES", "LEG RAISES"],
      lowerBack: ["BACK EXTENSION", "BACK EXTENSION MACHINE", "SUPERMANS", "JEFFERSON CURLS", "GOOD MORNINGS"]
    }
  };

  const modifiers = ["PAUSE", "HEAVY", "VOLUME", "SLOW NEGATIVE", "PERFECT FORM"];

  weightsButton.addEventListener('click', function() {
    changePage('initial-page', 'weights-page');
    typewriterEffect('weights-title', 'SELECT A CATEGORY');
  });

  optionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = button.getAttribute('data-category');
      showMuscleGroups(category);
    });
  });

  backButton.addEventListener('click', function() {
    changePage('weights-page', 'initial-page');
  });

  backToWeightsButton.addEventListener('click', function() {
    changePage('exercise-page', 'weights-page');
  });

  viewAllButton.addEventListener('click', function() {
    changePage('exercise-page', 'view-all-page');
    showAllExercises(currentCategory, currentMuscleGroup);
  });

  backFromViewAllButton.addEventListener('click', function() {
    changePage('view-all-page', 'exercise-page');
  });

  newExerciseButton.addEventListener('click', function() {
    showRandomExercise(currentCategory, currentMuscleGroup);
  });

  function changePage(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
  }

  function typewriterEffect(elementId, text) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      } else {
        element.style.borderRight = 'none'; // Optionally remove the cursor at the end
      }
    }
    type();
  }

  function showMuscleGroups(category) {
    currentCategory = category;
    const muscleGroups = Object.keys(exercises[category]);
    weightsPage.innerHTML = '<h1 id="weights-title">SELECT A MUSCLE GROUP</h1>';
    muscleGroups.forEach(muscleGroup => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = muscleGroup.toUpperCase();
      button.addEventListener('click', function() {
        currentMuscleGroup = muscleGroup;
        showRandomExercise(currentCategory, currentMuscleGroup);
      });
      weightsPage.appendChild(button);
    });
    weightsPage.appendChild(backButton);
  }

  function showRandomExercise(category, muscleGroup) {
    const exerciseList = exercises[category][muscleGroup];
    const randomExercise = exerciseList[Math.floor(Math.random() * exerciseList.length)];
    const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    exercisePage.classList.remove('hidden');
    weightsPage.classList.add('hidden');
    typewriterEffect('exercise-title', `${randomExercise} - ${randomModifier}`);
  }

  function showAllExercises(category, muscleGroup) {
    const allExercisesList = document.getElementById('all-exercises-list');
    allExercisesList.innerHTML = '';
    exercises[category][muscleGroup].forEach(exercise => {
      const item = document.createElement('p');
      item.textContent = exercise;
      allExercisesList.appendChild(item);
    });
  }
});
