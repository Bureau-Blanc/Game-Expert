let reste = 10; //question restantes
let vie = 3; //vie
let reptruetolowercase = "";
let ow = {
  width: 0,
  bar: document.querySelector(".bar-ow"),
  pts: document.querySelector("#pts-ow"),
  tp: document.querySelector(".tpimgow"),
  popuptxt: document.querySelector(".popupow"),
};
let fps = {
  width: 0,
  bar: document.querySelector(".bar-fps"),
  pts: document.querySelector("#pts-fps"),
  tp: document.querySelector(".tpimgfps"),
  popuptxt: document.querySelector(".popupfps"),
};
let mv = {
  width: 0,
  bar: document.querySelector(".bar-mv"),
  pts: document.querySelector("#pts-mv"),
  tp: document.querySelector(".tpimgmv"),
  popuptxt: document.querySelector(".popupmv"),
};

let stat = {
  vone: document.querySelector("#score"),
  vtwo: document.querySelector("#bestof3"),
  vthree: document.querySelector("#bestscorev"),
  gone: document.querySelector("#score"),
  gtwo: document.querySelector("#bestof3"),
  gthree: document.querySelector("#bestscore"),
};
let bestscore = localStorage.getItem("bestscore") || 0;
let message = "";
const rnb = document.querySelector("#rnb"); //crystal en cour
let essai = 1; //nombre d'essais
let Questions = [];
let CategorieNow = "";
let RadioRepOne = "";
let repow = "";
let Id = "";
let reptrue = "";
let essaitest = document.querySelectorAll(".essai"); //nombre d'essais
//démarre le jeu
async function demarrer() {
  const TakeFromJSON = await fetch("../.storage/questions.json").then(
    (response) => {
      return response.json();
    }
  ); //prends les questions du json
  localStorage.setItem("Questions", JSON.stringify(TakeFromJSON)); //mets les questions dans le json sous forme de string
  window.location.href = "../view/jeuow.html"; //va dans la première page
}
function chargement() {
  if (reste === 0) {
    if (window.location.href.includes("jeuow.html")) {
      window.location.href = "../view/jeufps.html";
    } else if (window.location.href.includes("jeufps.html")) {
      window.location.href = "../view/jeumv.html";
    }
  } else {
    window.location.href = "../view/victoire.html";
  }
}

//charge la page avec les bonnes valeurs
window.onload = async function () {
  if (window.location.href.includes("jeuow.html")) {
    CategorieNow = "ow";
  } else if (window.location.href.includes("jeufps.html")) {
    CategorieNow = "fps";
  } else if (window.location.href.includes("jeumv.html")) {
    CategorieNow = "mv";
  }
  Questions = JSON.parse(await this.localStorage.getItem("Questions")); //charge les questions
  ow["width"] = parseInt(sessionStorage.getItem("widthow")) || 0; //charge la barre ow
  fps["width"] = parseInt(sessionStorage.getItem("widthfps")) || 0; //charge la barre fps
  mv["width"] = parseInt(sessionStorage.getItem("widthmv")) || 0; //charge la barre mv
  vie = parseInt(sessionStorage.getItem("vie")) || 3; //charge la vie
  // change le background selon la catégorie

  //défini 2 nombres aléatoires pour chaques cible 1 pour la position sur l'axe x l'autre pour la position sur l'axe y
  document.querySelectorAll(".cible").forEach((cible) => {
    let RandomPositionTop = Math.floor(Math.random() * 70) + 15;
    let RandomPositionLeft = Math.floor(Math.random() * 75) + 10;
    cible.style.top = RandomPositionTop + "%";
    cible.style.left = RandomPositionLeft + "%";
  });

  //actualise les points et la vie
  if (ow["bar"] && ow["pts"]) {
    ow["bar"].style.width = ow["width"] + "%";
    ow["pts"].innerHTML = ow["width"] + " pts";
  }
  if (fps["bar"] && fps["pts"]) {
    fps["bar"].style.width = fps["width"] + "%";
    fps["pts"].innerHTML = fps["width"] + " pts";
  }
  if (mv["bar"] && mv["pts"]) {
    mv["bar"].style.width = mv["width"] + "%";
    mv["pts"].innerHTML = mv["width"] + " pts";
  }
  if (vie === 2) {
    document.querySelector("#coeur3").src = "../img/brokenheart.png";
    parseInt(sessionStorage.setItem("vie", 2));
  }
  if (vie === 1) {
    document.querySelector("#coeur1").id = "coeurShake";
    document.querySelector("#coeur2").src = "../img/brokenheart.png";
    document.querySelector("#coeur3").src = "../img/brokenheart.png";
  }
  ow["bar"].style.width = ow["width"] + "%";
  ow["pts"].innerHTML = ow["width"] + " pts";
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  mediaQuery.addEventListener("change", applyBackground);
  applyBackground(mediaQuery);
  function applyBackground(elem) {
    let device;
    if (elem && elem.matches) {
      device = "Mobile";
    } else {
      device = "PC";
    }
    let imagename = Questions.Backgrounds[device][CategorieNow];
    if (imagename) {
      document.body.style.backgroundImage = `url('../img/${imagename}')`;
    }
  }
};

function questions(clicked_id, clicked_class) {
  Id = parseInt(clicked_id);
  document.getElementById(clicked_id).id = "rnb";
  if (clicked_class == "text") {
    let q = Questions.QuestionList[clicked_id];
    document.querySelectorAll(".overlay")[1].style.height = "100%";
    document.querySelectorAll(".image")[1].src = "../img/" + q.image;
    document.querySelectorAll(".h1")[1].innerHTML = q.category;
    document.querySelectorAll(".h2")[1].innerHTML = q.question;
  } else {
    document.querySelectorAll(".overlay")[0].style.height = "100%";
    random(clicked_id);
  }
}
function random(clicked_id) {
  let q = Questions.QuestionList[clicked_id];
  let order = ["repOne", "repTwo", "repThree"];
  let RandomPlacement = order.sort(() => Math.random() - 0.5);
  document.querySelector(".image").src = "../img/" + q.image;
  document.querySelector(".h1").innerHTML = q.category;
  document.querySelector(".h2").innerHTML = q.question;
  document.querySelector(".p1").innerHTML = q[RandomPlacement[0]];
  document.querySelector(".p2").innerHTML = q[RandomPlacement[1]];
  document.querySelector(".p3").innerHTML = q[RandomPlacement[2]];
  let index = RandomPlacement.indexOf("repOne");
  const radios = [
    document.querySelector("#radio1"),
    document.querySelector("#radio2"),
    document.querySelector("#radio3"),
  ];
  RadioRepOne = radios[index];
}

function valider() {
  let textarea = document.querySelector("#textarea").value;
  rep = textarea.toLowerCase();
  if (
    Questions.QuestionList[Id].repTrue != "" &&
    Questions.QuestionList[Id].repTrue != undefined
  ) {
    reptrue = Questions.QuestionList[Id].repTrue;
    reptruetolowercase = reptrue.map((reptrue) => reptrue.toLowerCase());
  }
  if (
    RadioRepOne.checked ||
    (reptruetolowercase.includes(rep) && reptrue != undefined && reptrue != "")
  ) {
    document.querySelectorAll(".radio").forEach((radio) => {
      radio.checked = false;
    });
    document.querySelectorAll(".overlay").forEach((overlay) => {
      overlay.style.height = "0%";
    });
    document.querySelectorAll("#textarea").forEach((textarea) => {
      textarea.value = "";
    });
    document.querySelector("#rnb").id = "questionfin";
    reste -= 1;
    let currentObj = { ow, fps, mv }[CategorieNow];
    currentObj["popuptxt"].innerHTML =
      "Répondez encore à " +
      reste +
      " questions avant d'accéder au prochain niveau.";
    if (reste === 1) {
      currentObj["popuptxt"].innerHTML =
        "Répondez encore à " +
        reste +
        " question avant d'accéder au prochain niveau.";
    }

    if (reste === 0) {
      currentObj["tp"].id = "tpunlocked";
      currentObj["popuptxt"].style.visibility = "hidden";
    }
    if (essai === 1) {
      currentObj["width"] += 10;
      currentObj["bar"].style.width = currentObj["width"] + "%";
      currentObj["pts"].innerHTML = currentObj["width"] + " pts";
    }
    if (essai === 2) {
      currentObj["width"] += 5;
      currentObj["bar"].style.width = currentObj["width"] + "%";
      currentObj["pts"].innerHTML = currentObj["width"] + " pts";
      essai = 1;
      document.querySelector("#essai1").innerHTML = "Essai n°" + essai + "/3";
      document.querySelector("#essai2").innerHTML = "Essai n°" + essai + "/3";
      essaitest[0].classList.remove("essaij");
      essaitest[0].classList.add("essai");
      essaitest[1].classList.remove("essaij");
      essaitest[1].classList.add("essai");
    }

    if (essai === 3) {
      essai = 1;
      currentObj["width"] += 0;
      currentObj["bar"].style.width = currentObj["width"] + "%";
      currentObj["pts"].innerHTML = currentObj["width"] + " pts";
      document.querySelector("#essai1").innerHTML = "Essai n°" + essai + "/3";
      document.querySelector("#essai2").innerHTML = "Essai n°" + essai + "/3";
      essaitest[0].classList.remove("essair");
      essaitest[0].classList.add("essai");
      essaitest[1].classList.remove("essair");
      essaitest[1].classList.add("essai");
    }
    sessionStorage.setItem("width" + CategorieNow, currentObj["width"]);
  } else {
    vie -= 1;
    sessionStorage.setItem("vie", vie);
    if (vie === 2) {
      document.querySelector("#coeur3").src = "../img/brokenheart.png";
    }

    if (vie === 1) {
      document.querySelector("#coeur1").id = "coeurShake";
      document.querySelector("#coeur2").src = "../img/brokenheart.png";
    }

    if (vie === 0) {
      document.querySelector("#coeurShake").src = "../img/brokenheart.png";
      window.location.href = "../view/gameover.html";
    }

    if (essai <= 2) essai++;
    document.querySelector("#essai1").innerHTML = "Essai n°" + essai + "/3";
    document.querySelector("#essai2").innerHTML = "Essai n°" + essai + "/3";
    if (essai === 2) {
      essaitest[0].classList.remove("essai");
      essaitest[0].classList.add("essaij");
      essaitest[1].classList.remove("essai");
      essaitest[1].classList.add("essaij");
    }

    if (essai === 3) {
      essaitest[0].classList.remove("essaij");
      essaitest[0].classList.add("essair");
      essaitest[1].classList.remove("essaij");
      essaitest[1].classList.add("essair");
    }
  }
}
//game-over
if (window.location.href.includes("gameover.html")) {
  ow["width"] = parseInt(sessionStorage.getItem("widthow")) || 0;
  fps["width"] = parseInt(sessionStorage.getItem("widthfps")) || 0;
  mv["width"] = parseInt(sessionStorage.getItem("widthmv")) || 0;

  ow["width"] = Math.max(0, ow["width"]);
  fps["width"] = Math.max(0, fps["width"]);
  mv["width"] = Math.max(0, mv["width"]);

  if (document.querySelector("#bar-ow")) {
    document.querySelector("#bar-ow").style.width = ow["width"] + "%";
    document.querySelector("#pts-ow").innerHTML = ow["width"] + " pts";
  }
  if (document.querySelector("#bar-fps")) {
    document.querySelector("#bar-fps").style.width = fps["width"] + "%";
    document.querySelector("#pts-fps").innerHTML = fps["width"] + " pts";
  }
  if (document.querySelector("#bar-mv")) {
    document.querySelector("#bar-mv").style.width = mv["width"] + "%";
    document.querySelector("#pts-mv").innerHTML = mv["width"] + " pts";
  }
  let q = Questions.QuestionList;
  owrac = ow["width"];
  fpsrac = fps["width"];
  mvrac = mv["width"];
  totalscore = owrac + fpsrac + mvrac;
  if (totalscore >= bestscore) {
    localStorage.setItem("bestscore", totalscore);
  }
  if (owrac > fpsrac && owrac > mvrac) {
    message =
      "Tu es le plus fort dans la catégorie " +
      q.category[0] +
      " avec " +
      owrac +
      "pts/100";
  } else if (fpsrac < owrac && fpsrac < mvrac) {
    message =
      "Tu es le plus fort dans la catégorie " +
      q.category[10] +
      " avec " +
      fpsrac +
      "pts/100";
  } else if (mvrac > owrac && mvrac > fpsrac) {
    message =
      "Tu es le plus fort dans la catégorie " +
      q.category[20] +
      " avec " +
      mvrac +
      " pts/100";
  } else if (owrac === fpsrac && owrac > mvrac) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories Open World et FPS !";
  } else if (owrac === mvrac && owrac > fpsrac) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories Open World et MetroidVania !";
  } else if (fpsrac === mvrac && fpsrac > owrac) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories FPS et MetroidVania !";
  } else if (owrac === fpsrac && owrac === mvrac && totalscore != 300) {
    message =
      "Tu as obtenu le même nombre de points dans toutes les catégories";
  } else {
    message = "Bravo tu as répondu correctement à toutes les questions !";
  }
  stat["gone"].textContent = "Tu as finis avec " + totalscore + "points";
  stat["gtwo"].textContent = message;
  stat["gthree"].textContent = "Meilleur score:" + bestscore;
  stat["vone"].textContent = "Tu as finis avec " + totalscore + " points/300";
  stat["vtwo"].textContent = message;
  stat["vthree"].textContent = bestscore;
  vie = 0;
  document.querySelector("#coeur1").src = "../img/brokenheart.png";
  document.querySelector("#coeur2").src = "../img/brokenheart.png";
  document.querySelector("#coeur3").src = "../img/brokenheart.png";

  sessionStorage.setItem("widthow", ow["width"]);
  sessionStorage.setItem("widthfps", fps["width"]);
  sessionStorage.setItem("widthmv", mv["width"]);
}

function rejouer() {
  window.location.href = "../view/accueil.html";
  sessionStorage.clear();
}
//victoire
function stats() {
  let showstat = document.querySelector("#MyNavVictoire");
  showstat.style.height = "100%";
}
function closeoverlay() {
  let showstat = document.querySelector("#MyNavVictoire");
  showstat.style.height = "0%";
}
if (window.location.href.includes("victoire.html")) {
  ow["width"] = parseInt(sessionStorage.getItem("widthow")) || 0;
  fps["width"] = parseInt(sessionStorage.getItem("widthfps")) || 0;
  mv["width"] = parseInt(sessionStorage.getItem("widthmv")) || 0;

  ow["width"] = Math.max(0, ow["width"]);
  fps["width"] = Math.max(0, fps["width"]);
  mv["width"] = Math.max(0, mv["width"]);

  if (document.querySelector("#bar-ow")) {
    document.querySelector("#bar-ow").style.width = ow["width"] + "%";
    document.querySelector("#pts-ow").innerHTML = ow["width"] + " pts";
  }
  if (document.querySelector("#bar-fps")) {
    document.querySelector("#bar-fps").style.width = fps["width"] + "%";
    document.querySelector("#pts-fps").innerHTML = fps["width"] + " pts";
  }
  if (document.querySelector("#bar-mv")) {
    document.querySelector("#bar-mv").style.width = mv["width"] + "%";
    document.querySelector("#pts-mv").innerHTML = mv["width"] + " pts";
  }
}
//cheat
let basiccheat = ["c", "h", "e", "a", "t"];
let basicPosition = 0;
document.addEventListener("keydown", function (e) {
  if (e.key === basiccheat[basicPosition]) {
    basicPosition++;
    if (basicPosition === basiccheat.length) {
      basicPosition = 0;
      cheat();
    }
  } else {
    basicPosition = 0;
  }
});
function cheat() {
  if (window.location.href.includes("ow.html")) {
    document.querySelectorAll(".cible").forEach((cible) => {
      cible.style.display = "none";
    });
    ow["width"] = 100;
    ow["bar"].style.width = ow["width"] + "%";
    ow["pts"].innerHTML = ow["width"] + " pts";
    sessionStorage.setItem("widthow", ow["width"]);
    reste = 0;
    ow["tp"].id = "tpunlocked";
    ow["popuptxt"].style.visibility = "hidden";
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  } else if (window.location.href.includes("fps.html")) {
    document.querySelectorAll(".cible").forEach((cible) => {
      cible.style.display = "none";
    });
    fps["width"] = 100;
    fps["bar"].style.width = fps["width"] + "%";
    fps["pts"].innerHTML = fps["width"] + " pts";
    sessionStorage.setItem("widthfps", fps["width"]);
    reste = 0;
    fps["tp"].id = "tpunlocked";
    fps["popuptxt"].style.visibility = "hidden";
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  } else if (window.location.href.includes("mv.html")) {
    document.querySelectorAll(".cible").forEach((cible) => {
      cible.style.display = "none";
    });
    mv["width"] = 100;
    mv["bar"].style.width = mv["width"] + "%";
    mv["pts"].innerHTML = mv["width"] + " pts";
    sessionStorage.setItem("widthmv", mv["width"]);
    reste = 0;
    mv["tp"].id = "tpunlocked";
    mv["popuptxt"].style.visibility = "hidden";
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  } else if (window.location.href.includes("gameover.html")) {
    window.location.href = "../view/victoire.html";
    ow["width"] = 100;
    ow["bar"].style.width = ow["width"] + "%";
    ow["pts"].innerHTML = ow["width"] + " pts";
    sessionStorage.setItem("widthow", width["ow"]);
    fps["width"] = 100;
    fps["bar"].style.width = fps["width"] + "%";
    fps["pts"].innerHTML = fps["width"] + " pts";
    sessionStorage.setItem("widthfps", width["fps"]);
    mv["width"] = 100;
    mv["bar"].style.width = mv["width"] + "%";
    mv["pts"].innerHTML = mv["width"] + " pts";
    sessionStorage.setItem("widthmv", width["mv"]);
    vie = 3;
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  }
}
// // create game
// function ValiderChoixQuestion() {
//   const textarea = document.querySelector("#navtextarea");
//   const checkbox = document.querySelector("#navcheckbox");
//   const radio = document.querySelector("#navradio");
//   if (document.querySelector("#QCM").checked === true) {
//     textarea.style.height = "100%";
//   } else if (document.querySelector("#QCU").checked === true) {
//     checkbox.style.height = "100%";
//   } else if (document.querySelector("#QL").checked === true) {
//     radio.style.height = "100%";
//   }
// }
