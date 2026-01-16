let reste = 10; //question restantes
let vie = 3; //vie
let reptruetolowercase = "";
let width = {
  ow: 0,
  fps: 0,
  mv: 0,
};

let bars = {
  ow: document.querySelector(".bar-ow"),
  fps: document.querySelector(".bar-fps"),
  mv: document.querySelector(".bar-mv"),
};
let pts = {
  ow: document.querySelector("#pts-ow"),
  fps: document.querySelector("#pts-fps"),
  mv: document.querySelector("#pts-mv"),
};
let tp = {
  ow: document.querySelector(".tpimgow"),
  fps: document.querySelector(".tpimgfps"),
  mv: document.querySelector(".tpimgmv"),
};
let popuptxt = {
  ow: document.querySelector(".popupow"),
  fps: document.querySelector(".popupfps"),
  mv: document.querySelector(".popupmv"),
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
function chargement1() {
  if (reste === 0) {
    window.location.href = "../view/jeufps.html"; //va dans la 2eme page si toutes les questionsont été validée
  }
}
function chargement2() {
  if (reste === 0) {
    window.location.href = "../view/jeumv.html"; //va dans la 3eme page si toutes les questionsont été validée
  }
}
function chargement3() {
  if (reste === 0) {
    window.location.href = "../view/victoire.html"; //va dans la page victoire si toutes les questionsont été validée
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
  width["ow"] = parseInt(sessionStorage.getItem("widthow")) || 0; //charge la barre ow
  width["fps"] = parseInt(sessionStorage.getItem("widthfps")) || 0; //charge la barre fps
  width["mv"] = parseInt(sessionStorage.getItem("widthmv")) || 0; //charge la barre mv
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
  if (bars["ow"] && pts["ow"]) {
    bars["ow"].style.width = width["ow"] + "%";
    pts["ow"].innerHTML = width["ow"] + " pts";
  }
  if (bars["fps"] && pts["fps"]) {
    bars["fps"].style.width = width["fps"] + "%";
    pts["fps"].innerHTML = width["fps"] + " pts";
  }
  if (bars["mv"] && pts["mv"]) {
    bars["mv"].style.width = width["mv"] + "%";
    pts["mv"].innerHTML = width["mv"] + " pts";
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
  bars["ow"].style.width = width["ow"] + "%";
  pts["ow"].innerHTML = width["ow"] + " pts";
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
    console.log(reptrue);
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
    popuptxt[CategorieNow].innerHTML =
      "Répondez encore à " +
      reste +
      " questions avant d'accéder au prochain niveau.";
    if (reste === 1) {
      popuptxt[CategorieNow].innerHTML =
        "Répondez encore à " +
        reste +
        " question avant d'accéder au prochain niveau.";
    }

    if (reste === 0) {
      tp[CategorieNow].id = "tpunlocked";
      popuptxt[CategorieNow].style.visibility = "hidden";
    }
    if (essai === 1) {
      width[CategorieNow] += 10;
      bars[CategorieNow].style.width = width[CategorieNow] + "%";
      pts[CategorieNow].innerHTML = width[CategorieNow] + " pts";
    }
    if (essai === 2) {
      width[CategorieNow] += 5;
      bars[CategorieNow].style.width = width[CategorieNow] + "%";
      pts[CategorieNow].innerHTML = width[CategorieNow] + " pts";
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
      width[CategorieNow] += 0;
      bars[CategorieNow].style.width = width[CategorieNow] + "%";
      pts[CategorieNow].innerHTML = width[CategorieNow] + " pts";
      document.querySelector("#essai1").innerHTML = "Essai n°" + essai + "/3";
      document.querySelector("#essai2").innerHTML = "Essai n°" + essai + "/3";
      essaitest[0].classList.remove("essair");
      essaitest[0].classList.add("essai");
      essaitest[1].classList.remove("essair");
      essaitest[1].classList.add("essai");
    }
    sessionStorage.setItem("width" + CategorieNow, width[CategorieNow]);
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
  width["ow"] = parseInt(sessionStorage.getItem("widthow")) || 0;
  width["fps"] = parseInt(sessionStorage.getItem("widthfps")) || 0;
  width["mv"] = parseInt(sessionStorage.getItem("widthmv")) || 0;

  width["ow"] = Math.max(0, width["ow"]);
  width["fps"] = Math.max(0, width["fps"]);
  width["mv"] = Math.max(0, width["mv"]);

  if (document.querySelector("#bar-ow")) {
    document.querySelector("#bar-ow").style.width = width["ow"] + "%";
    document.querySelector("#pts-ow").innerHTML = width["ow"] + " pts";
  }
  if (document.querySelector("#bar-fps")) {
    document.querySelector("#bar-fps").style.width = width["fps"] + "%";
    document.querySelector("#pts-fps").innerHTML = width["fps"] + " pts";
  }
  if (document.querySelector("#bar-mv")) {
    document.querySelector("#bar-mv").style.width = width["mv"] + "%";
    document.querySelector("#pts-mv").innerHTML = width["mv"] + " pts";
  }
  let q = Questions.QuestionList;
  ow = width["ow"];
  fps = width["fps"];
  mv = width["mv"];
  totalscore = ow + fps + mv;
  if (totalscore >= bestscore) {
    localStorage.setItem("bestscore", totalscore);
  }
  if (ow > fps && ow > mv) {
    message =
      "Tu es le plus fort dans la catégorie " +
      q.category[0] +
      " avec " +
      ow +
      "pts/100";
  } else if (fps < ow && fps < mv) {
    message =
      "Tu es le plus fort dans la catégorie " +
      q.category[10] +
      " avec " +
      fps +
      "pts/100";
  } else if (mv > ow && mv > fps) {
    message =
      "Tu es le plus fort dans la catégorie " +
      q.category[20] +
      " avec " +
      mv +
      "pts/100";
  } else if (ow === fps && ow > mv) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories Open World et FPS !";
  } else if (ow === mv && ow > fps) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories Open World et MetroidVania !";
  } else if (fps === mv && fps > ow) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories FPS et MetroidVania !";
  } else if (ow === fps && ow === mv && totalscore != 300) {
    message =
      "Tu as obtenu le même nombre de points dans toutes les catégories";
  } else {
    message = "Bravo tu as répondu correctement à toutes les questions !";
  }
  stat["gone"].textContent = "Tu as finis avec " + totalscore + "points";
  stat["gtwo"].textContent = message;
  stat["gthree"].textContent = "Meilleur score:" + bestscore;

  vie = 0;
  document.querySelector("#coeur1").src = "../img/brokenheart.png";
  document.querySelector("#coeur2").src = "../img/brokenheart.png";
  document.querySelector("#coeur3").src = "../img/brokenheart.png";

  sessionStorage.setItem("widthow", width["ow"]);
  sessionStorage.setItem("widthfps", width["fps"]);
  sessionStorage.setItem("widthmv", width["mv"]);
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
  width["ow"] = parseInt(sessionStorage.getItem("widthow")) || 0;
  width["fps"] = parseInt(sessionStorage.getItem("widthfps")) || 0;
  width["mv"] = parseInt(sessionStorage.getItem("widthmv")) || 0;

  width["ow"] = Math.max(0, width["ow"]);
  width["fps"] = Math.max(0, width["fps"]);
  width["mv"] = Math.max(0, width["mv"]);

  if (document.querySelector("#bar-ow")) {
    document.querySelector("#bar-ow").style.width = width["ow"] + "%";
    document.querySelector("#pts-ow").innerHTML = width["ow"] + " pts";
  }
  if (document.querySelector("#bar-fps")) {
    document.querySelector("#bar-fps").style.width = width["fps"] + "%";
    document.querySelector("#pts-fps").innerHTML = width["fps"] + " pts";
  }
  if (document.querySelector("#bar-mv")) {
    document.querySelector("#bar-mv").style.width = width["mv"] + "%";
    document.querySelector("#pts-mv").innerHTML = width["mv"] + " pts";
  }
  ow = width["ow"];
  fps = width["fps"];
  mv = width["mv"];
  totalscore = ow + fps + mv;
  if (totalscore >= bestscore) {
    localStorage.setItem("bestscore", totalscore);
  }

  if (ow > fps && ow > mv) {
    message =
      "Tu es le plus fort dans la catégorie Open World avec " + ow + " pts/100";
  } else if (fps < ow && fps < mv) {
    message =
      "Tu es le plus fort dans la catégorie FPS avec " + fps + " pts/100";
  } else if (mv > ow && mv > fps) {
    message =
      "Tu es le plus fort dans la catégorie MetroidVania avec " +
      mv +
      "pts/100";
  } else if (ow === fps && ow > mv) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories Open World et FPS !";
  } else if (ow === mv && ow > fps) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories Open World et MetroidVania !";
  } else if (fps === mv && fps > ow) {
    message =
      "Tu as obtenu le même nombre de points dans les catégories FPS et MetroidVania !";
  } else if (ow === fps && ow === mv && totalscore != 300) {
    message =
      "Tu as obtenu le même nombre de points dans toutes les catégories";
  } else {
    message = "Bravo tu as répondu correctement à toutes les questions !";
  }
  stat["vone"].textContent = "Tu as finis avec " + totalscore + " points/300";
  stat["vtwo"].textContent = message;
  stat["vthree"].textContent = bestscore;
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
    width["ow"] = 100;
    bars["ow"].style.width = width["ow"] + "%";
    pts["ow"].innerHTML = width["ow"] + " pts";
    sessionStorage.setItem("widthow", width["ow"]);
    reste = 0;
    tp["ow"].id = "tpunlocked";
    popuptxt["ow"].style.visibility = "hidden";
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  } else if (window.location.href.includes("fps.html")) {
    document.querySelectorAll(".cible").forEach((cible) => {
      cible.style.display = "none";
    });
    width["fps"] = 100;
    bars["fps"].style.width = width["fps"] + "%";
    pts["fps"].innerHTML = width["fps"] + " pts";
    sessionStorage.setItem("widthfps", width["fps"]);
    reste = 0;
    tp["fps"].id = "tpunlocked";
    popuptxt["fps"].style.visibility = "hidden";
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  } else if (window.location.href.includes("mv.html")) {
    document.querySelectorAll(".cible").forEach((cible) => {
      cible.style.display = "none";
    });
    width["mv"] = 100;
    bars["mv"].style.width = width["mv"] + "%";
    pts["mv"].innerHTML = width["mv"] + " pts";
    sessionStorage.setItem("widthmv", width["mv"]);
    reste = 0;
    tp["mv"].id = "tpunlocked";
    popuptxt["mv"].style.visibility = "hidden";
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  } else if (window.location.href.includes("gameover.html")) {
    window.location.href = "../view/victoire.html";
    width["ow"] = 100;
    bar["ow"].style.width = width["ow"] + "%";
    pts["ow"].innerHTML = width["ow"] + " pts";
    sessionStorage.setItem("widthow", width["ow"]);
    width["fps"] = 100;
    bars["fps"].style.width = width["fps"] + "%";
    pts["fps"].innerHTML = width["fps"] + " pts";
    sessionStorage.setItem("widthfps", width["fps"]);
    width["mv"] = 100;
    bars["mv"].style.width = width["mv"] + "%";
    pts["mv"].innerHTML = width["mv"] + " pts";
    sessionStorage.setItem("widthmv", width["mv"]);
    vie = 3;
    document.querySelector("#coeur1").src = "../img/heart.png";
    document.querySelector("#coeur2").src = "../img/heart.png";
    document.querySelector("#coeur3").src = "../img/heart.png";
  }
}
// create game
function ValiderChoixQuestion() {
  const textarea = document.querySelector("#navtextarea");
  const checkbox = document.querySelector("#navcheckbox");
  const radio = document.querySelector("#navradio");
  if (document.querySelector("#QCM").checked === true) {
    textarea.style.height = "100%";
  } else if (document.querySelector("#QCU").checked === true) {
    checkbox.style.height = "100%";
  } else if (document.querySelector("#QL").checked === true) {
    radio.style.height = "100%";
  }
}
