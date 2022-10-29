var mylaser = document.getElementsByClassName('mylaser')[0];
var toggle = document.getElementsByClassName('toggle_btn')[0];
var light  = document.getElementsByClassName('beam')[0];
var aLight = document.getElementsByClassName('topRef')[0];
var bLight = document.getElementsByClassName('bottomRef')[0];
var aRef   = document.getElementsByClassName('aboveReflection')[0];
var laser  = document.getElementsByClassName('laser')[0];
var check1  = document.getElementById('check1');
var check2  = document.getElementById('check2');
var title   = document.getElementsByClassName('title');
var medium1 = document.getElementsByTagName('select')[0];
var medium2 = document.getElementsByTagName('select')[1];
var Top = document.getElementsByClassName('top')[0];
var Bottom = document.getElementsByClassName('bottom')[0];
var lineY  = document.getElementsByClassName('lineY')[0];
var protroctor = document.getElementsByClassName('protroctor')[0];

var colors  = {'Air':'#fff', 'Water':'#9ec4f1', 'Glass':'#ABA9D4'};
var mediums = {'Air': 1.00, 'Water': 1.33, 'Glass': 1.50};

title[0].addEventListener('click', () => check1.click());
title[1].addEventListener('click', () => check2.click());

function getDegree(className){
	var el = document.getElementsByClassName(className)[0];
	var st = window.getComputedStyle(el, null);
	var tr = st.getPropertyValue("-webkit-transform") ||
	st.getPropertyValue("-moz-transform") ||
	st.getPropertyValue("-ms-transform") ||
	st.getPropertyValue("-o-transform") ||
	st.getPropertyValue("transform") ||
	"FAIL";

	var values = tr.split('(')[1].split(')')[0].split(',');
	var a = values[0];
	var b = values[1];
	var c = values[2];
	var d = values[3];

	var scale = Math.sqrt(a*a + b*b);
	var sin = b/scale;
	// next line works for 30deg but not 130deg (returns 50);
	// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
	var angle1 = -Math.round(Math.atan2(b, a) * (180/Math.PI))+60;
	return angle1;
}

function identifyMediums(){
	if (!toggle.classList.contains('toggled')) return;
	let n1 = mediums[medium1.value];
	let n2 = mediums[medium2.value];
	let theta1 = getDegree('mylaser') * Math.PI / 180;
	let theta2 = -Math.asin((n1 * Math.sin(theta1)) / n2) * (180 / Math.PI);
	let angle = getDegree('mylaser');
	light.style.display  = 'block';
	aLight.style.display = 'block';
	bLight.style.display = 'block';
	bLight.style.opacity = 1;
	aLight.style.transform = 'rotate('+angle+'deg)';
	bLight.style.transform = 'rotate('+theta2+'deg)';	
	if (medium1.value == "Air" && medium2.value == "Water"){
		if (90 > angle && angle > 80){
			bLight.style.opacity = .3;
			aLight.style.opacity = 1;
		} else if (angle == 90){
			bLight.style.opacity = 0;
			aLight.style.opacity = 1;
		} else {
			bLight.style.opacity = 1;
			aLight.style.opacity = .2;
		}
	} else if (medium1.value == "Water" && medium2.value == "Air"){
		if (90 >= angle && angle > 48){
			bLight.style.opacity = 0;
			aLight.style.opacity = 1;
		} else {
			bLight.style.opacity = 1;
			aLight.style.opacity = .2;
		}
	} else if (medium1.value == "Air" && medium2.value == "Glass"){
		if (90 > angle && angle >= 80){
			bLight.style.opacity = .5;
			aLight.style.opacity = 1;
		} else if (angle == 90){
			bLight.style.opacity = 0;
			aLight.style.opacity = 1;
		} else {
			bLight.style.opacity = 1;
			aLight.style.opacity = .2;
		}
	} else if (medium1.value == "Glass" && medium2.value == "Air"){
		if (90 >= angle && angle > 42){
			bLight.style.opacity = 0;
			aLight.style.opacity = 1;
		} else if (40 > angle){
			bLight.style.opacity = 1;
			aLight.style.opacity = .2;
		} else {
			bLight.style.opacity = .5;
			aLight.style.opacity = 1;
		}
	} else if (medium1.value == "Water" && medium2.value == "Glass"){
		if (30 >= angle && angle > 0){
			bLight.style.opacity = 1;
			aLight.style.opacity = 0;
		} else if (angle >= 85){
			bLight.style.opacity = .7;
			aLight.style.opacity = 1;
			if (angle == 90) bLight.style.display='none';
			else bLight.style.display='block';
		} else {
			bLight.style.opacity = 1;
			aLight.style.opacity = .2;
		}
	} else if (medium1.value == "Glass" && medium2.value == "Water"){
		if (23 >= angle && angle >= 0){
			bLight.style.opacity = 1;
			aLight.style.opacity = 0;
		} else if (angle > 61){
			bLight.style.opacity = 0;
			aLight.style.opacity = 1;
			if (angle == 90) bLight.style.display='none';
			else bLight.style.display='block';
		} else {
			bLight.style.opacity = 1;
			aLight.style.opacity = .2;
		}
	} else {
		aLight.style.display = 'none';
	}
}

medium1.addEventListener('change', (e) => {
	Top.style.backgroundColor = colors[e.target.value];
	document.getElementsByClassName('index')[0].innerHTML = '(n = ' + (mediums[e.target.value] == 1 ? '1.00' : (mediums[e.target.value] == 1.5 ? '1.50' : mediums[e.target.value])) + ')';
	identifyMediums();
});

medium2.addEventListener('change', (e) => {
	Bottom.style.backgroundColor = colors[e.target.value];
	document.getElementsByClassName('index')[1].innerHTML = '(n = ' + (mediums[e.target.value] == 1 ? '1.00' : (mediums[e.target.value] == 1.5 ? '1.50' : mediums[e.target.value])) + ')';
	identifyMediums();
});

toggle.addEventListener('click', () => {
	if (toggle.classList.contains('toggled')){
		toggle.classList.remove('toggled');
		light.style.display  = 'none';
		aLight.style.display = 'none';
		bLight.style.display = 'none';
	} else {
		toggle.classList.add('toggled');
		light.style.display  = 'block';
		aLight.style.display = 'block';
		bLight.style.display = 'block';
		identifyMediums();
	}
});

check1.addEventListener('click', () => {
	if (check1.checked)
		lineY.style.display = 'block';
	else
		lineY.style.display = 'none';
});

check2.addEventListener('click', () => {
	if (check2.checked)
		protroctor.style.display = 'block';
	else
		protroctor.style.display = 'none';
});

/* Rotation effect below  */
Draggable.create(".mylaser", {type: "rotation", inertia: true, bounds: {minRotation:-30.5, maxRotation: 59.5}, onDrag: changePos});
gsap.set(".mylaser", {transformOrigin:"bottom right"});

Draggable.create(".protroctor", {type: "x,y", inertia: true, bounds: {top: 0, left: 0, width: 1280, height: 720}});

function changePos(e){
	var angle1 = getDegree('mylaser');
	var angle2 = -angle1 + angle1/2;
	identifyMediums();
}