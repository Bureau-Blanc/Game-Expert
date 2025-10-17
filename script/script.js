//ow = open world
//fps = first person shooter
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

//fin du loading screen
function chargement1() {
    if (owrestant === 9) {
    window.location.href = "../view/jeufps.html";
  }
}
window.onload = function () {
  let widthow = parseInt(sessionStorage.getItem("widthow")) || 0;
  let vie = parseInt(sessionStorage.getItem("vie")) || 3;
  var bar = document.getElementById("barow");
  var pts = document.getElementById("ptsow");
  if (vie === 2) {
    document.getElementById("coeur3").src = "../img/brokenheart.png"
    if (bar && pts) {
      bar.style.width = widthow + "%";
      pts.innerHTML = widthow + " pts";
    }
  }

  if (vie === 1) {
    document.getElementById("coeur2").src = "../img/brokenheart.png"
    document.getElementById("coeur3").src = "../img/brokenheart.png"
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
      essaitest.classList.add("essai" + questionow)
      owrestant -= 1;
      popuptxt.innerHTML = "Répondez encore à " + owrestant + " questions avant d'accéder au prochain niveau.";
      sessionStorage.setItem("widthow", widthow)
      if (owrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + owrestant + " question avant d'accéder au prochain niveau.";
      }

      if (owrestant === 9) {
        carimg = document.getElementById("carimg")
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
      }
    }

    else {
      widthow -= 5;
      vie -= 1;
      sessionStorage.setItem("widthow", widthow)
      sessionStorage.setItem("vie", vie)
      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png"
      }

      if (vie === 1) {
        document.getElementById("coeur2").src = "../img/brokenheart.png"
      }

      if (vie === 0) {
        document.getElementById("coeur1").src = "../img/brokenheart.png"
        window.location.href = "../view/gameover.html"

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
      document.getElementById("rnb").id = "questionfin"
      document.getElementById("myNav" + questionow).style.height = "0%";
      barow.style.width = widthow + "%";
      ptsow.innerHTML = widthow + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionow)
      essai = 1
      owrestant -= 1;
      sessionStorage.setItem("widthow", widthow)

      popuptxt.innerHTML = "Répondez encore à " + owrestant + " questions avant d'accéder au prochain niveau.";

      if (owrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + owrestant + " question avant d'accéder au prochain niveau.";
      }

      if (owrestant === 9) {
        carimg = document.getElementById("carimg")
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none"
      }
    }

    else {
      widthow -= 5;
      vie -= 1;
      sessionStorage.setItem("widthow", widthow)
      sessionStorage.setItem("vie", vie)

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png"
      }

      if (vie === 1) {
        document.getElementById("coeur2").src = "../img/brokenheart.png"
      }

      if (vie === 0) {
        document.getElementById("coeur1").src = "../img/brokenheart.png"
        window.location.href = "../view/gameover.html"

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
  //autres questions
  else {
    if (document.getElementById(questionow + "vrai").checked === true) {
      scoreow += 10;
      widthow += 10;
      document.getElementById("rnb").id = "questionfin"
      document.getElementById("myNav" + questionow).style.height = "0%";
      barow.style.width = widthow + "%";
      ptsow.innerHTML = widthow + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionow)
      essai = 1
      owrestant -= 1;
      popuptxt.innerHTML = "Répondez encore à " + owrestant + " questions avant d'accéder au prochain niveau.";
      sessionStorage.setItem("widthow", widthow)

      if (owrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + owrestant + " question avant d'accéder au prochain niveau.";
      }

      if (owrestant === 0) {
        carimg = document.getElementById("carimg")
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none"
      }
    }

    else {
      widthow -= 5;
      vie -= 1;
      sessionStorage.setItem("widthow", widthow)
      sessionStorage.setItem("vie", vie)

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png"
      }

      if (vie === 1) {
        document.getElementById("coeur2").src = "../img/brokenheart.png"
      }

      if (vie === 0) {
        document.getElementById("coeur1").src = "../img/brokenheart.png"
        window.location.href = "../view/gameover.html"

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
      document.getElementById("rnb").id = "questionfin"
      document.getElementById("myNav" + questionfps).style.height = "0%";
      barfps.style.width = widthfps + "%";
      ptsfps.innerHTML = widthfps + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionfps)
      essai = 1
      fpsrestant -= 1;
      popuptxt.innerHTML = "Répondez encore à " + fpsrestant + " questions avant d'accéder au prochain niveau.";
      if (ptsfps === 100) {
        ptsfps.style.right = "0%"
        progressfps.style.right = "0%"
      }
      if (fpsrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + fpsrestant + " question avant d'accéder au prochain niveau.";
      }

      if (fpsrestant === 0) {
        carimg = document.getElementById("carimg")
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none"
      }
    }

    else {
      widthfps -= 5;
      vie -= 1;

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png"
      }

      if (vie === 1) {
        document.getElementById("coeur2").src = "../img/brokenheart.png"
      }

      if (vie === 0) {
        document.getElementById("coeur1").src = "../img/brokenheart.png"
        window.location.href = "../view/gameover.html"
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
      document.getElementById("rnb").id = "questionfin"
      document.getElementById("myNav" + questionfps).style.height = "0%";
      barfps.style.width = widthfps + "%";
      ptsfps.innerHTML = widthfps + " pts";
      essaitest.classList.remove("essaij");
      essaitest.classList.remove("essair");
      essaitest.classList.add("essai" + questionfps)
      essai = 1
      fpsrestant -= 1;
      if (ptsfps === 100) {
        ptsfps.style.right = "0%"
        progressfps.style.right = "0%"
      }
      popuptxt.innerHTML = "Répondez encore à " + fpsrestant + " questions avant d'accéder au prochain niveau.";
      if (fpsrestant === 1) {
        popuptxt.innerHTML = "Répondez encore à " + fpsrestant + " question avant d'accéder au prochain niveau.";
      }

      if (fpsrestant === 0) {
        carimg = document.getElementById("carimg")
        carimg.classList.remove("carimg");
        carimg.classList.add("carunlocked");
        popuptxt.style.display = "none"
      }
    }

    else {
      widthfps -= 5;
      vie -= 1;

      if (vie === 2) {
        document.getElementById("coeur3").src = "../img/brokenheart.png"
      }

      if (vie === 1) {
        document.getElementById("coeur2").src = "../img/brokenheart.png"
      }

      if (vie === 0) {
        document.getElementById("coeur1").src = "../img/brokenheart.png"
        window.location.href = "../view/gameover.html"

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
}