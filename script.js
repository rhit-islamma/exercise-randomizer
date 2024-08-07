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
  let optionButtons = document.querySelectorAll('.option-button');

  let currentCategory, currentMuscleGroup;
  let isTyping = false; // Flag to track if animation is running
  let typingTimeout; // Timeout ID for clearing the animation
  let isViewingMuscleGroups = false; // Flag to track if viewing muscle groups

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

  backButton.addEventListener('click', function() {
    if (isViewingMuscleGroups) {
      showCategories();
    } else {
      changePage('weights-page', 'initial-page');
      typewriterEffect('title', 'WELCOME TO YOUR EXERCISE SELECTOR');
    }
  });

  backToWeightsButton.addEventListener('click', function() {
    changePage('exercise-page', 'weights-page');
    typewriterEffect('weights-title', 'SELECT A CATEGORY');
  });

  backFromViewAllButton.addEventListener('click', function() {
    changePage('view-all-page', 'exercise-page');
    typewriterEffect('exercise-title', 'EXERCISE SELECTOR');
  });

  viewAllButton.addEventListener('click', function() {
    changePage('exercise-page', 'view-all-page');
    showAllExercises(currentCategory, currentMuscleGroup);
  });

  newExerciseButton.addEventListener('click', function() {
    showRandomExercise(currentCategory, currentMuscleGroup);
  });

  function changePage(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
  }

  function typewriterEffect(elementId, text) {
    if (isTyping) {
      clearTimeout(typingTimeout);
      isTyping = false;
    }
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = '';
    isTyping = true;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        typingTimeout = setTimeout(type, 100);
      } else {
        element.style.borderRight = 'none';
        isTyping = false;
      }
    }
    type();
  }

  function showMuscleGroups(category) {
    currentCategory = category;
    isViewingMuscleGroups = true;
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
    typewriterEffect('weights-title', 'SELECT A MUSCLE GROUP'); // Ensure animation runs on the pick muscle page
  }

  function showRandomExercise(category, muscleGroup) {
    const exerciseList = exercises[category][muscleGroup];
    const randomExercise = exerciseList[Math.floor(Math.random() * exerciseList.length)];
    const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    changePage('weights-page', 'exercise-page');
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

  function showCategories() {
    isViewingMuscleGroups = false;
    const categories = ['push', 'pull', 'legs', 'core'];
    weightsPage.innerHTML = '<h1 id="weights-title">SELECT A CATEGORY</h1>';
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.setAttribute('data-category', category);
      button.textContent = category.toUpperCase();
      button.addEventListener('click', function() {
        showMuscleGroups(this.getAttribute('data-category'));
      });
      weightsPage.appendChild(button);
    });
    weightsPage.appendChild(backButton);
    typewriterEffect('weights-title', 'SELECT A CATEGORY');
  }

  function reattachEventListeners() {
    optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = button.getAttribute('data-category');
        showMuscleGroups(category);
      });
    });
    viewAllButton.addEventListener('click', function() {
      changePage('exercise-page', 'view-all-page');
      showAllExercises(currentCategory, currentMuscleGroup);
    });

    newExerciseButton.addEventListener('click', function() {
      showRandomExercise(currentCategory, currentMuscleGroup);
    });
  }

  // Initial event listener attachment
  reattachEventListeners();
});
