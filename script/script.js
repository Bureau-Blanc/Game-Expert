
//ow = open world
// //fps = first person shooter
//mv = metroidvania
var owrestant = 10;  //question ow restantes
var fpsrestant = 10; //question fps restantes
var mvrestant = 10; //question mv restantes
var vie = 3;  //vie 
var scoreow = 0;  //score ow
var scorefps = 0; //score fps
var scoremv = 0;  //score mv
var barow = document.getElementById("barow");  //barre de score ow
var barfps = document.getElementById("barfps");  //barre de score fps
var barmv = document.getElementById("barmv");  //barre de score mv
var widthow = 0;  //taille barre ow
var widthfps = 0;  //taille barre fps
var widthmv = 0;  //taille barre mv
var rnb = document.getElementById("rnb");  //crystal en cour
var essai = 1; //nombre d'essais
var questionow = 0; //n° de la question ow
var questionfps = 0; //n° de la question fps
var questionmv = 0; //n° de la question mv
let listow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];  //liste questions ow
let listfps = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];  //liste questions fps
let listmv = ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];  //liste questions mv
var progressfps = document.getElementById("progressfps");  //pour changer le style de progressfps
//démarre le jeu


function demarrer() {
  window.location.href = "../view/jeuow.html";
}

function chargement1() {
  if (owrestant === 0) {
    window.location.href = "../view/jeufps.html";
  }
}
function chargement2() {
  if (fpsrestant === 0) {
    window.location.href = "../view/jeumv.html";
  }
}
function chargement3() {
  if (mvrestant === 0) {
    window.location.href = "../view/victoire.html";
  }
}

//charge la page avec les bonnes valeurs
window.onload = function () {
   widthow = parseInt(sessionStorage.getItem("widthow")) || 0;
   widthfps = parseInt(sessionStorage.getItem("widthfps")) || 0;
   widthmv = parseInt(sessionStorage.getItem("widthmv")) || 0;
  var bar = document.getElementById("barow");
  var barfps = document.getElementById("barfps");
  var barmv = document.getElementById("barmv");
  var pts = document.getElementById("ptsow");
  var ptsfps = document.getElementById("ptsfps");
  var ptsmv = document.getElementById("ptsmv");
   vie = parseInt(sessionStorage.getItem("vie")) || 3;
  if (bar && pts) {
    bar.style.width = widthow + "%";
    pts.innerHTML = widthow + " pts";
  }
  if (barfps && ptsfps) {
    barfps.style.width = widthfps + "%";
    ptsfps.innerHTML = widthfps + " pts";
  }
  if (barmv && ptsmv) {
    barmv.style.width = widthmv + "%";
    ptsmv.innerHTML = widthmv + " pts";
  }
  if (vie === 2) {
    document.getElementById("coeur3").src = "../img/brokenheart.png";
  }

  if (vie === 1) {
    document.getElementById("coeur1").id = "coeurShake";
    document.getElementById("coeur2").src = "../img/brokenheart.png";
  }
  console.log("widthow =", widthow, "vie =", vie);
  bar.style.width = widthow + "%";
  pts.innerHTML = widthow + " pts";
};


//ow
//choisis un question ow aléatoire 
function questionsow(clicked_id) {
  document.getElementById(clicked_id).id = "rnb";

  if (listow.length === 0) {
    console.log("Toutes les questions ont déjà été utilisées !");
    return;
  }

  var randomIndex = Math.floor(Math.random() * listow.length);
  questionow = parseInt(listow[randomIndex]);
  listow.splice(randomIndex, 1);
  console.log("Question :", questionow);
  var element = document.getElementById("myNav" + questionow);

  if (element) {
    element.style.height = "100%";
  }
  else {
    console.warn("Élément introuvable : myNav" + questionow);
  }
  return questionow;
}


//valide la réponse
function validerow() {
  var essaitest = document.getElementById("essai" + questionow);  //nombre d'essais
  //question ow 5
  if (questionow === 5) {
    var input5 = document.getElementById("input5").value;
    var rep5 = input5.toLowerCase();
    if (
      rep5 === "overworld" ||
      rep5 === "nether" ||
      rep5 === "end" ||
      rep5 === "l'overworld" ||
      rep5 === "le nether" ||
      rep5 === "l'end"
    ) {
      scoreow += 10;
      widthow += 10;
      barow.style.width = widthow + "%";
      ptsow.innerHTML = widthow + " pts";
      document.getElementById("myNav" + questionow).style.height = "0%";
      document.getElementById("rnb").id = "questionfin";
      essai = 1
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionow);
      owrestant -= 1;
      popuptxt.innerHTML = "Répondez encore à " + owrestant + " questions avant d'accéder au prochain niveau.";
      sessionStorage.setItem("widthow", widthow);
      if (owrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + owrestant + " question avant d'accéder au prochain niveau.";
      }

      if (owrestant === 0) {
        carimg = document.getElementById("carimg");
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
      }
    }

    else {
      widthow -= 5;
      vie -= 1;
      sessionStorage.setItem("widthow", widthow);
      sessionStorage.setItem("vie", vie);
      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";
      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";


      if (essai === 2) {
        essaitest.classList.remove("essai" + questionow);
        essaitest.classList.add("essaij");
      }

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
  //question ow 10
  if (questionow === 10) {
    var input10 = document.getElementById("input10").value;
    var rep10 = input10.toLowerCase();
    if (
      rep10 === "mexique" ||
      rep10 === "au mexique" ||
      rep10 === "le mexique"
    ) {
      scoreow += 10;
      widthow += 10;
      document.getElementById("rnb").id = "questionfin";
      document.getElementById("myNav" + questionow).style.height = "0%";
      barow.style.width = widthow + "%";
      ptsow.innerHTML = widthow + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionow);
      essai = 1;
      owrestant -= 1;
      sessionStorage.setItem("widthow", widthow);

      popuptxt.innerHTML = "Répondez encore à " + owrestant + " questions avant d'accéder au prochain niveau.";

      if (owrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + owrestant + " question avant d'accéder au prochain niveau.";
      }

      if (owrestant === 0) {
        carimg = document.getElementById("carimg");
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none";
      }
    }

    else {
      widthow -= 5;
      vie -= 1;
      sessionStorage.setItem("widthow", widthow);
      sessionStorage.setItem("vie", vie);

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";
      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";
      essaitest.classList.remove("essai" + questionow);
      essaitest.classList.add("essaij");

    }

    if (essai === 2) {

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
  //autres questions
  else {
    if (document.getElementById(questionow + "vrai").checked === true) {
      scoreow += 10;
      widthow += 10;
      document.getElementById("rnb").id = "questionfin";
      document.getElementById("myNav" + questionow).style.height = "0%";
      barow.style.width = widthow + "%";
      ptsow.innerHTML = widthow + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionow);
      essai = 1;
      owrestant -= 1;
      popuptxt.innerHTML = "Répondez encore à " + owrestant + " questions avant d'accéder au prochain niveau.";
      sessionStorage.setItem("widthow", widthow);

      if (owrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + owrestant + " question avant d'accéder au prochain niveau.";
      }

      if (owrestant === 0) {
        carimg = document.getElementById("carimg");
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none";
      }
    }

    else {
      widthow -= 5;

      vie -= 1;
      sessionStorage.setItem("widthow", widthow);
      sessionStorage.setItem("vie", vie);

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";

      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";

      if (essai === 2) {
        essaitest.classList.remove("essai" + questionow);
        essaitest.classList.add("essaij");
      }

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
}
//fps
//choisis un question fps aléatoire 
function questionsfps(clicked_id) {
  document.getElementById(clicked_id).id = "rnb";

  if (listfps.length === 0) {
    console.log("Toutes les questions ont déjà été utilisées !");
    return;
  }

  var randomIndex = Math.floor(Math.random() * listfps.length);
  questionfps = parseInt(listfps[randomIndex]);
  listfps.splice(randomIndex, 1);
  console.log("Question :", questionfps);
  var element = document.getElementById("myNav" + questionfps);

  if (element) {
    element.style.height = "100%";
  }
  else {
    console.warn("Élément introuvable : myNav" + questionfps);
  }
  return questionfps;
}


//valide la réponse
function validerfps() {
  var essaitest = document.getElementById("essai" + questionfps);  //nombre d'essais

  //question fps 14
  if (questionfps === 14) {
    var input14 = document.getElementById("input14").value;
    var rep14 = input14.toLowerCase();
    if (
      rep14 === "karambit" ||
      rep14 === "un karambit" ||
      rep14 === "le karambit"
    ) {
      scorefps += 10;
      widthfps += 10;
      document.getElementById("rnb").id = "questionfin";
      document.getElementById("myNav" + questionfps).style.height = "0%";
      barfps.style.width = widthfps + "%";
      ptsfps.innerHTML = widthfps + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionfps);
      sessionStorage.setItem("widthfps", widthfps);
      essai = 1;
      fpsrestant -= 1;
      popuptxt2.innerHTML = "Répondez encore à " + fpsrestant + " questions avant d'accéder au prochain niveau.";
      if (ptsfps === 100) {
        ptsfps.style.right = "0%";
        progressfps.style.right = "0%";
      }
      if (fpsrestant === 1) {
        popuptxt2.innerHTML = "Répondez encore à " + fpsrestant + " question avant d'accéder au prochain niveau.";
      }

      if (fpsrestant === 0) {
        carimg2 = document.getElementById("carimg2")
        carimg2.classList.remove("carimg2");
        carimg2.classList.add("carunlocked2");
        popuptxt2.style.display = "none";
      }
    }

    else {
      widthfps -= 5;
      vie -= 1;
      sessionStorage.setItem("widthfps", widthfps);
      sessionStorage.setItem("vie", vie);
      if (widthfps <= 0) {
        widthfps = 0;
      }
      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";

      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";

      if (essai === 2) {
        essaitest.classList.remove("essai" + questionfps);
        essaitest.classList.add("essaij");
      }

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
  //autres questions
  else {
    if (document.getElementById(questionfps + "vrai").checked === true) {
      scorefps += 10;
      widthfps += 10;
      document.getElementById("rnb").id = "questionfin";
      document.getElementById("myNav" + questionfps).style.height = "0%";
      barfps.style.width = widthfps + "%";
      ptsfps.innerHTML = widthfps + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionfps);
      sessionStorage.setItem("widthfps", widthfps);
      essai = 1;
      fpsrestant -= 1;
      if (ptsfps === 100) {
        ptsfps.style.right = "0%";
        progressfps.style.right = "0%";
      }
      popuptxt2.innerHTML = "Répondez encore à " + fpsrestant + " questions avant d'accéder au prochain niveau.";
      if (fpsrestant === 1) {
        popuptxt2.innerHTML = "Répondez encore à " + fpsrestant + " question avant d'accéder au prochain niveau.";
      }

      if (fpsrestant === 0) {
        carimg2 = document.getElementById("carimg2")
        carimg2.classList.remove("carimg2");
        carimg2.classList.add("carunlocked2");
        popuptxt2.style.display = "none";
      }
    }

    else {
      vie -= 1;
      sessionStorage.setItem("widthfps", widthfps);
      sessionStorage.setItem("vie", vie);
      if (widthfps <= 0) {
        widthfps = 0;
      }
      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";

      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";
      widthfps -= 5;
      if (widthfps <= 0) {
        widthfps = 0;
      }

      if (essai === 2) {
        essaitest.classList.remove("essai" + questionfps);
        essaitest.classList.add("essaij");
      }

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
}

//mv
//choisis un question mv aléatoire
function questionsmv(clicked_id) {
  document.getElementById(clicked_id).id = "rnb";

  if (listmv.length === 0) {
    console.log("Toutes les questions ont déjà été utilisées !");
    return;
  }

  var randomIndex = Math.floor(Math.random() * listmv.length);
  questionmv = parseInt(listmv[randomIndex]);
  listmv.splice(randomIndex, 1);
  console.log("Question :", questionmv);
  var element = document.getElementById("myNav" + questionmv);

  if (element) {
    element.style.height = "100%";
  }
  else {
    console.warn("Élément introuvable : myNav" + questionmv);
  }
  return questionmv;
}


//valide la réponse
function validermv() {
  var essaitest = document.getElementById("essai" + questionmv);  //nombre d'essais
  //question mv 22
  if (questionmv === 22) {
    var input22 = document.getElementById("input22").value;
    var rep22 = input22.toLowerCase();
    if (
      rep22 === "metroid" ||
      rep22 === "castlevania"
    ) {
      scoremv += 10;
      widthmv += 10;
      barmv.style.width = widthmv + "%";
      ptsmv.innerHTML = widthmv + " pts";
      document.getElementById("myNav" + questionmv).style.height = "0%";
      document.getElementById("rnb").id = "questionfin";
      essai = 1
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionmv);
      mvrestant -= 1;
      popuptxt.innerHTML = "Répondez encore à " + mvrestant + " questions avant d'accéder au prochain niveau.";
      sessionStorage.setItem("widthmv", widthmv);
      if (mvrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + mvrestant + " question avant d'accéder au prochain niveau.";
      }

      if (mvrestant === 0) {
        carimg = document.getElementById("carimg");
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
      }
    }

    else {
      widthmv -= 5;
      vie -= 1;
      sessionStorage.setItem("widthmv", widthmv);
      sessionStorage.setItem("vie", vie);
      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";

      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";


      if (essai === 2) {
        essaitest.classList.remove("essai" + questionmv);
        essaitest.classList.add("essaij");
      }

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
  //question mv 30
  if (questionmv === 30) {
    var input30 = document.getElementById("input30").value;
    var rep30 = input30.toLowerCase();
    if (
      rep30 === "samus" ||
      rep30 === "samus aran"
    ) {
      scoremv += 10;
      widthmv += 10;
      document.getElementById("rnb").id = "questionfin";
      document.getElementById("myNav" + questionmv).style.height = "0%";
      barmv.style.width = widthmv + "%";
      ptsmv.innerHTML = widthmv + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionmv);
      essai = 1;
      mvrestant -= 1;
      sessionStorage.setItem("widthmv", widthmv);

      popuptxt.innerHTML = "Répondez encore à " + mvrestant + " questions avant d'accéder au prochain niveau.";

      if (mvrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + mvrestant + " question avant d'accéder au prochain niveau.";
      }

      if (mvrestant === 0) {
        carimg = document.getElementById("carimg");
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none";
      }
    }

    else {
      widthmv -= 5;
      vie -= 1;
      sessionStorage.setItem("widthmv", widthmv);
      sessionStorage.setItem("vie", vie);

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";
      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";
      essaitest.classList.remove("essai" + questionmv);
      essaitest.classList.add("essaij");

    }

    if (essai === 2) {

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
  //autres questions
  else {
    if (document.getElementById(questionmv + "vrai").checked === true) {
      scoremv += 10;
      widthmv += 10;
      document.getElementById("rnb").id = "questionfin";
      document.getElementById("myNav" + questionmv).style.height = "0%";
      barmv.style.width = widthmv + "%";
      ptsmv.innerHTML = widthmv + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionmv);
      essai = 1;
      mvrestant -= 1;
      popuptxt.innerHTML = "Répondez encore à " + mvrestant + " questions avant d'accéder au prochain niveau.";
      sessionStorage.setItem("widthmv", widthmv);

      if (mvrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + mvrestant + " question avant d'accéder au prochain niveau.";
      }

      if (mvrestant === 0) {
        carimg = document.getElementById("carimg");
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none";
      }
    }

    else {
      widthmv -= 5;

      vie -= 1;
      sessionStorage.setItem("widthmv", widthmv);
      sessionStorage.setItem("vie", vie);

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png";
      }

      if (vie === 1) {
        document.getElementById("coeur1").id = "coeurShake";
        document.getElementById("coeur2").src = "../img/brokenheart.png";
      }

      if (vie === 0) {
        document.getElementById("coeurShake").src = "../img/brokenheart.png";
        window.location.href = "../view/gameover.html";

      }

      if (essai <= 2) essai++;
      essaitest.innerHTML = "Essai n°" + essai + "/3";

      if (essai === 2) {
        essaitest.classList.remove("essai" + questionmv);
        essaitest.classList.add("essaij");
      }

      if (essai === 3) {
        essaitest.classList.remove("essaij");
        essaitest.classList.add("essair");
      }
    }
  }
}
//game-over
if (window.location.href.includes("gameover.html")) {

  widthow = parseInt(sessionStorage.getItem("widthow")) || 0;
  widthfps = parseInt(sessionStorage.getItem("widthfps")) || 0;
  widthmv = parseInt(sessionStorage.getItem("widthmv")) || 0;

  widthow = Math.max(0, widthow);
  widthfps = Math.max(0, widthfps);
  widthmv = Math.max(0, widthmv);

  if (document.getElementById("barow")) {
    document.getElementById("barow").style.width = widthow + "%";
    document.getElementById("ptsow").innerHTML = widthow + " pts";
  }
  if (document.getElementById("barfps")) {
    document.getElementById("barfps").style.width = widthfps + "%";
    document.getElementById("ptsfps").innerHTML = widthfps + " pts";
  }
  if (document.getElementById("barmv")) {
    document.getElementById("barmv").style.width = widthmv + "%";
    document.getElementById("ptsmv").innerHTML = widthmv + " pts";
  }
   bestscore = localStorage.getItem("bestscore") || 0;
  let finalScore = widthow + widthfps + widthmv;
  if (widthow >= widthfps + 1 && widthow >= widthmv + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu es le plus fort dans la catégorie Open World avec " + widthow + "/100"
  }
  if (widthfps >= widthow + 1 && widthfps >= widthmv + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu es le plus fort dans la catégorie FPS avec " + widthfps + "pts/100"
  }
  if (widthmv >= widthow + 1 && widthmv >= widthfps + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu es le plus fort dans la catégorie MetroidVania avec " + widthmv + "pts/100"
  }
  if (finalScore === 300) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Bravo tu as répondu correctement à toutes les questions sans fautes !"
  }
  if (finalScore >= bestscore) {
    localStorage.setItem("bestscore", finalScore)
  }
  if (widthow === widthfps && widthow >= widthmv + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans les catégories Open World et FPS !"
  }
  if (widthow === widthmv && widthow >= widthfps + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans les catégories Open World et MetroidVania !"
  }
  if (widthfps === widthmv && widthfps >= widthow + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans les catégories FPS et Metroidvania !"
  }
  if (widthow === widthfps && widthfps === widthmv && finalScore <= 299) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans toutes les catégories !"
  }
  let bestscoreoat = document.getElementById("bestscore")
  let score = document.getElementById("score");
  score.innerHTML = "Tu as fini avec " + finalScore + " points / 300";
  bestscoreoat.innerHTML = "Meilleur score: " + bestscore
  vie = 0;
  document.getElementById("coeur1").src = "../img/brokenheart.png";
  document.getElementById("coeur2").src = "../img/brokenheart.png";
  document.getElementById("coeur3").src = "../img/brokenheart.png";

  sessionStorage.setItem("widthow", widthow);
  sessionStorage.setItem("widthfps", widthfps);
  sessionStorage.setItem("widthmv", widthmv);
}

function rejouer() {
  window.location.href = "../view/accueil.html";
  sessionStorage.clear();
}
//victoire
function stats() {
  var showstat = document.getElementById("MyNavVictoire");
  showstat.style.height = "100%";
}
function closeoverlay() {
  var showstat = document.getElementById("MyNavVictoire");
  showstat.style.height = "0%";
}
if (window.location.href.includes("victoire.html")) {

  widthow = parseInt(sessionStorage.getItem("widthow")) || 0;
  widthfps = parseInt(sessionStorage.getItem("widthfps")) || 0;
  widthmv = parseInt(sessionStorage.getItem("widthmv")) || 0;

  widthow = Math.max(0, widthow);
  widthfps = Math.max(0, widthfps);
  widthmv = Math.max(0, widthmv);

  if (document.getElementById("barow")) {
    document.getElementById("barow").style.width = widthow + "%";
    document.getElementById("ptsow").innerHTML = widthow + " pts";
  }
  if (document.getElementById("barfps")) {
    document.getElementById("barfps").style.width = widthfps + "%";
    document.getElementById("ptsfps").innerHTML = widthfps + " pts";
  }
  if (document.getElementById("barmv")) {
    document.getElementById("barmv").style.width = widthmv + "%";
    document.getElementById("ptsmv").innerHTML = widthmv + " pts";
  }
  var bestscore = localStorage.getItem("bestscore") || 0;
  let finalScore = widthow + widthfps + widthmv;
  if (widthow >= widthfps + 1 && widthow >= widthmv + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu es le plus fort dans la catégorie Open World avec " + widthow + "/100"
  }
  if (widthfps >= widthow + 1 && widthfps >= widthmv + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu es le plus fort dans la catégorie FPS avec " + widthfps + "pts/100"
  }
  if (widthmv >= widthow + 1 && widthmv >= widthfps + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu es le plus fort dans la catégorie MetroidVania avec " + widthmv + "pts/100"
  }
  if (finalScore === 300) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Bravo tu as répondu correctement à toutes les questions sans fautes !"
  }
  if (finalScore >= bestscore) {
    localStorage.setItem("bestscore", finalScore)
  }
  if (widthow === widthfps && widthow >= widthmv + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans les catégories Open World et FPS !"
  }
  if (widthow === widthmv && widthow >= widthfps + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans les catégories Open World et MetroidVania !"
  }
  if (widthfps === widthmv && widthfps >= widthmv + 1) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans les catégories FPS et Metroidvania !"
  }
  if (widthow === widthfps && widthfps === widthmv === finalScore <= 300) {
    var bestof3 = document.getElementById("bestof3")
    bestof3.innerHTML = "Tu as obtenu le même nombre de points dans toutes les catégories !"
  }
    let score = document.getElementById("score");
  score.innerHTML = "Tu as fini avec " + finalScore + " points / 300";
   let bestscorev = document.getElementById("bestscorev")
    bestscorev.innerHTML = bestscore
}
//cheat 
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;
document.addEventListener('keydown', function (e) {
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) {
      konamiPosition = 0;
      cheat();
    }
  } else {
    konamiPosition = 0;
  }
});
let basiccheat = ['c', 'h', 'e', 'a', 't'];
let basicPosition = 0;
document.addEventListener('keydown', function (e) {
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
    widthow = 100;
    barow.style.width = widthow + "%";
    ptsow.innerHTML = widthow + " pts";
    sessionStorage.setItem("widthow", widthow);
    owrestant = 0;
    popuptxt.innerHTML = "Répondez encore à " + owrestant + " questions avant d'accéder au prochain niveau.";
    carimg = document.getElementById("carimg");
    carimg.classList.remove("carimg");
    carimg.classList.add("carunlocked");
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.getElementById("coeur1").src = "../img/heart.png";
    document.getElementById("coeur2").src = "../img/heart.png";
    document.getElementById("coeur3").src = "../img/heart.png";
  }
  else if (window.location.href.includes("fps.html")) {
    widthfps = 100;
    barfps.style.width = widthfps + "%";
    ptsfps.innerHTML = widthfps + " pts";
    sessionStorage.setItem("widthfps", widthfps);
    fpsrestant = 0;
    popuptxt2.innerHTML = "Répondez encore à " + fpsrestant + " questions avant d'accéder au prochain niveau.";
    carimg2 = document.getElementById("carimg2")
    carimg2.classList.remove("carimg2");
    carimg2.classList.add("carunlocked2");
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.getElementById("coeur1").src = "../img/heart.png";
    document.getElementById("coeur2").src = "../img/heart.png";
    document.getElementById("coeur3").src = "../img/heart.png";
  }
  else if (window.location.href.includes("mv.html")) {
    widthmv = 100;
    barmv.style.width = widthmv + "%";
    ptsmv.innerHTML = widthmv + " pts";
    sessionStorage.setItem("widthmv", widthmv);
    mvrestant = 0;
    popuptxt3.innerHTML = "Répondez encore à " + mvrestant + " questions avant d'accéder au prochain niveau.";
    carimg3 = document.getElementById("carimg3")
    carimg3.classList.remove("carimg3");
    carimg3.classList.add("carunlocked3");
    vie = 3;
    sessionStorage.setItem("vie", vie);
    document.getElementById("coeur1").src = "../img/heart.png";
    document.getElementById("coeur2").src = "../img/heart.png";
    document.getElementById("coeur3").src = "../img/heart.png";
  }

  if (window.location.href.includes("gameover.html")) {
    window.location.href = "../view/victoire.html";
    widthow = 100;
    barow.style.width = widthow + "%";
    ptsow.innerHTML = widthow + " pts";
    sessionStorage.setItem("widthow", widthow);
    widthfps = 100;
    barfps.style.width = widthfps + "%";
    ptsfps.innerHTML = widthfps + " pts";
    sessionStorage.setItem("widthfps", widthfps);
    widthmv = 100;
    barmv.style.width = widthmv + "%";
    ptsmv.innerHTML = widthmv + " pts";
    sessionStorage.setItem("widthmv", widthmv);
    mvrestant = 0;
    popuptxt3.innerHTML = "Répondez encore à " + mvrestant + " questions avant d'accéder au prochain niveau.";
    carimg3 = document.getElementById("carimg3")
    carimg3.classList.remove("carimg3");
    carimg3.classList.add("carunlocked3");
    vie = 3;
    document.getElementById("coeur1").src = "../img/heart.png";
    document.getElementById("coeur2").src = "../img/heart.png";
    document.getElementById("coeur3").src = "../img/heart.png";
  }
}

