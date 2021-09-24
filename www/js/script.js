$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;


var  content = document.getElementsByClassName("formation");
var options = document.getElementsByClassName("option");
var texte = document.getElementById("texte_info");
var titre = document.getElementById("title_master");
var cours = document.getElementsByClassName("cours");

var edtBtn = document.getElementById("edt_button");

var color = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"];

var currentFormation = "alma";
var currentOption = "recherche";

function reactualiserBouton(name) {
	for(var i = 0; i < content.length; i++) {
	    if(content[i].id != name){
			content[i].className = "ui inverted red button formation";
	    }else{
			currentFormation = content[i].id;
	    	content[i].className = "ui inverted button green formation";			
	    }
	}
	updateTexte();
}

function reactualiserOptions(name){
	for(var i = 0; i < options.length; i++) {
	    if(options[i].id != name){
			options[i].className = "ui inverted red button option";
	    }else{
			currentOption = options[i].id;
	    	options[i].className = "ui inverted button green option";
	    }
	}
	updateTexte();
}

function updateTexte(){
	let option = "";
	if(currentOption=="recherche"){
		option = "Introduction à la recherche / Communication connaissance de l'entreprise";
	}else if(currentOption=="management"){
		option = "Management à visée innovante et entrepreneuriale";
	}
	
	texte.innerHTML = "<p style=\"color:#FCFCFC\">Vous êtes étudiant de "+currentFormation.toUpperCase() +" et votre option est "+option+".</p>";
	titre.innerHTML= "Master Informatique "+currentFormation.toUpperCase()+" - Semestre 1"
}

function onValideAction(){
	initialise();
	updateCours();
	updateEdtBtn();
	localStorage.setItem("option", currentOption);
	localStorage.setItem("formation", currentFormation);
	
}

function updateEdtBtn(){
	if(currentFormation != "alma"){
		edtBtn.innerHTML = "<button class=\"ui button twitter huge\" onclick=\"redirecEDTV1()\"><i class=\"calendar icon\"></i>EDT V1</button>";
	}else{
		edtBtn.innerHTML = "<button class=\"ui button twitter huge\" onclick=\"redirecEDTV1Alma()\"><i class=\"calendar icon\"></i>EDT V1</button>" ;
		
	}
}

function initialise(){
	for(var i=0;i<cours.length;i++){
		cours[i].style.display = 'none'; 
		for(var j=0;j<color.length;j++){
			cours[i].className = cours[i].className.replace(color[j],"");
		}	
	}
}

function updateCours(){
	let cpt=0;
	for(var i=0;i<cours.length;i++){
		if(cours[i].className.includes(currentFormation)){
			cours[i].style.display = 'block'; 
			cours[i].className = cours[i].className+" "+color[cpt%12];
			cpt++;          
		}
		if(cours[i].className.includes(currentOption)){
			cours[i].style.display = 'block';
			cours[i].className = cours[i].className+" "+color[cpt%12]; 
			cpt++;          
		}
	}
}

function onParameterAction(){
	$('#setting')
	  .modal('setting', 'closable', false)
	  .modal('show')
	  
	;
}


const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
var darkIcon = document.getElementById("darkIcon");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
  darkIcon.className= "sun icon";
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
  darkIcon.className= "moon icon";
}

btn.addEventListener("click", function () {
	if(darkIcon.className =="moon icon"){
		darkIcon.className= "sun icon"
	}else{
		darkIcon.className= "moon icon"
	}
	
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});


if (localStorage.getItem("cookieAccepted") == null){
	initialise();
	$('#cookie')
	  .modal('show')
	  .modal('setting', 'closable', false)
	;
}else if (localStorage.getItem("formation") != null) {
	if (localStorage.getItem("option") !=null){
		currentFormation=localStorage.getItem("formation");
		currentOption = localStorage.getItem("option");
		initialise();
		updateCours();
		updateTexte();
		reactualiserBouton(currentFormation);
		reactualiserOptions(currentOption);
		updateEdtBtn();
	}else{
		onParameterAction();
	}
}else{
	onParameterAction();
}

function redirecEDTV1(){
	var URL = "";
	switch(currentFormation){
	case "vico":
		URL = "https://edt.univ-nantes.fr/sciences/g975679.html";
		break;
	case "atal" :
		URL = "https://edt.univ-nantes.fr/sciences/g351179.html" ;
		break;
	case "ds" :
		URL = "https://edt.univ-nantes.fr/sciences/g975683.html";
		break;
	case "oro" :
		URL = "https://edt.univ-nantes.fr/sciences/g351226.html";
		break;
	}
	window.open(URL, '_blank');
}

function redirecEDTV1Alma(){
	
	edtBtn.innerHTML = "<div class=\"ui buttons\"><button class=\"ui button twitter big\" onclick=\"redirecte(1)\">TD1</button><button class=\"ui button twitter big\" onclick=\"redirecte(2)\">TD2</button></div>";
	
}

function redirecte(num){
	if(num==1){
		window.open("https://edt.univ-nantes.fr/sciences/g351177.html", '_blank');
		
	}else{
		window.open("https://edt.univ-nantes.fr/sciences/g351178.html", '_blank');
	}
	updateEdtBtn();
}

function accepteCookie(){
	localStorage.setItem("cookieAccepted",true);
	location.reload();
}
