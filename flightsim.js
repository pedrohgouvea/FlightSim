$(document).ready(function(){
	document.addEventListener('keydown', function(event) {
	    if(event.keyCode == 74) {
	        leftPressed();
	    }
	    else if(event.keyCode == 76) {
	        rightPressed();
	    }
	    else if(event.keyCode == 73) {
	        frontPressed();
	    }
	    else if(event.keyCode == 75) {
	        backPressed();
	    }
	    else if(event.keyCode == 89) {
	        upPressed();
	    }
	    else if(event.keyCode == 72) {
	        downPressed();
	    }
	});
});

function rightPressed() {
  var drone = document.querySelector('a-entity#drone');
  var dronePos = drone.getAttribute( "position" );
  dronePos.x = dronePos.x+0.01;
  drone.setAttribute( "position", dronePos);
}

function leftPressed() {
  var drone = document.querySelector('a-entity#drone');
  var dronePos = drone.getAttribute( "position" );
  dronePos.x = dronePos.x-0.01;
  drone.setAttribute( "position", dronePos);
}


function frontPressed() {
  var drone = document.querySelector('a-entity#drone');
  var dronePos = drone.getAttribute( "position" );
  dronePos.z = dronePos.z-0.01;
  drone.setAttribute( "position", dronePos);
}

function backPressed() {
  var drone = document.querySelector('a-entity#drone');
  var dronePos = drone.getAttribute( "position" );
  dronePos.z = dronePos.z+0.01;
  drone.setAttribute( "position", dronePos);
}


function upPressed() {
  goAlt(-0.01);
}

function downPressed() {
  goAlt(0.01);
}
//alt = y
//pitch = z
//roll = x
function sinD(angle) {
	return Math.sin(angle/180*Math.PI);
}
function cosD(angle) {
	return Math.cos(angle/180*Math.PI);
}
function goAlt(value){
	var drone = document.querySelector('a-entity#drone');
	var dronePos = drone.getAttribute( "position" );
	//console.log(dronePos);
	if(dronePos){
		dronePos.y = dronePos.y+value;
		drone.setAttribute( "position", dronePos);
	}
}
function goPitch(value){
	var drone = document.querySelector('a-entity#drone');
	var dronePos = drone.getAttribute( "position" );
	var droneRot = drone.getAttribute( "rotation" );
	if(dronePos){
		console.log(droneRot.y);
		orientation = droneRot.y;
		zIncre = value*(cosD(orientation));
		xIncre = value*(sinD(orientation));
		console.log(orientation+" "+zIncre+" "+xIncre);
		dronePos.z = dronePos.z+zIncre;
		dronePos.x = dronePos.x+xIncre;
		drone.setAttribute( "position", dronePos);
	}
}
function goRoll(value){
	var drone = document.querySelector('a-entity#drone');
	var dronePos = drone.getAttribute( "position" );
	var droneRot = drone.getAttribute( "rotation" );
	if(dronePos){
		orientation = droneRot.y;
		zIncre = -1*value*(sinD(orientation));
		xIncre = value*(cosD(orientation));
		dronePos.z = dronePos.z+zIncre;
		dronePos.x = dronePos.x+xIncre;
		drone.setAttribute( "position", dronePos);
	}
}
function horizontalRotate(value){
	var drone = document.querySelector('a-entity#drone');
	var dronePos = drone.getAttribute( "rotation" );
	if(dronePos){
		dronePos.y = dronePos.y+value;
		drone.setAttribute( "rotation", dronePos);
	}
	var droneRot = drone.getAttribute("rotation");
	console.log(droneRot.y);
}
function tiltX(value){
	var drone = document.querySelector('a-entity#drone');
	var dronePos = drone.getAttribute( "rotation" );
	if(dronePos){
		dronePos.z = value;
		drone.setAttribute( "rotation", dronePos);
	}
}
function tiltZ(value){
	var drone = document.querySelector('a-entity#drone');
	var dronePos = drone.getAttribute( "rotation" );
	if(dronePos){
		dronePos.x = value;
		drone.setAttribute( "rotation", dronePos);
	}
}


/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var selectedController = {};
var defaultConfig = {pitch:1, yaw:0, roll:2, alt:3,pitchReverse:false, yawReverse:true, rollReverse:false, altReverse:true};
var config = {pitch:1, yaw:0, roll:2, alt:3,pitchReverse:false, yawReverse:true, rollReverse:false, altReverse:true};
var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
var configMode = false;
var selectedAxe = "";
syncDisplay(defaultConfig);
function syncDisplay(config){
	document.getElementById("PitchSet").value = config.pitch;
	document.getElementById("YawSet").value = config.yaw;
	document.getElementById("RollSet").value = config.roll;
	document.getElementById("AltSet").value = config.alt;
}
function connecthandler(e) {
	console.log("add");
	addgamepad(e.gamepad);
	addgamepadtoCombo(e.gamepad);
	console.log(e.gamepad);
	rAF(updateStatus);
}
function addgamepad(gamepad) {
	controllers[gamepad.index] = gamepad;
	//Dev fix to have xbox selected by default
	if((gamepad.id).indexOf("Xbox") != -1){
		selectedController = gamepad;
	}
	var d = document.createElement("div");
	d.setAttribute("id", "controller" + gamepad.index);

	var t = document.createElement("h1");
	t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
	d.appendChild(t);

	var a = document.createElement("div");
	a.className = "axes";

	for (var i = 0; i < gamepad.axes.length; i++) {
	    var p = document.createElement("progress");
	    p.className = "axis";
	    //p.id = "a" + i;
	    p.setAttribute("max", "2");
	    p.setAttribute("value", "1");
	    p.innerHTML = i;
	    a.appendChild(p);
	}
	//selectedController = gamepad;
}

function appendToCombo(text,data){
	console.log("append "+ text +" "+ data);
	$("#combo").append("<option value=\""+data+"\">"+text+"</option>");
}
function addgamepadtoCombo(gamepad){
	appendToCombo(gamepad.id,gamepad.index);
	//Dev fix to have xbox selected by default
	if((gamepad.id).indexOf("Xbox") != -1){
		$("#combo").val(gamepad.index);
	}
	//$("#combo").val(gamepad.index);
}


function disconnecthandler(e) {
	removegamepad(e.gamepad);
	removegamepadFromCombo(e.gamepad);
}
function removegamepadFromCombo(gamepad){
	$('#combo option').filter(function(){return this.value==gamepad.index}).remove();
}

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function updateStatus() {
	var controller = selectedController;
	if(configMode){
		//do stuff
		for (var i = 0; i < controller.axes.length; i++) {//for each axes
			if(controller.axes[i] > 0.1 || controller.axes[i] < -0.1){
				console.log("axes moved "+i);
				document.getElementById(selectedAxe).value = i;
				switch(selectedAxe) {
				    case "PitchSet":
				        config.pitch = i;
				        break;
				    case "AltSet":
				        config.alt = i;
				        break;
			        case "YawSet":
				        config.yaw = i;
				        break;
			        case "RollSet":
				        config.roll = i;
				        break;
				}
				configMode = false;
			}
			//var axe = controller.axes[i];
			//a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
			//a.setAttribute("value", controller.axes[i] + 1);
			//console.log(a);
		}
		//console.log(a);
		//configMode = false;
		rAF(updateStatus);
		return;
	}
	var tiltedX = false;
	var tiltedZ = false;
	scangamepads();
	
	altCoef = 1;
	if(config.altReverse){
		altCoef = -1;
	}
	yawCoef = 1;
	if(config.yawReverse){
		yawCoef = -1;
	}
	if(controller.axes[config.alt] > 0.1 || controller.axes[config.alt] < -0.1){
		goAlt(controller.axes[config.alt]/10*altCoef);
	}
	if(controller.axes[config.pitch] > 0.2 || controller.axes[config.pitch] < -0.2){
		goPitch(controller.axes[config.pitch]/10);
		tiltZ(controller.axes[config.pitch]*(30));
		tiltedZ = true;
	}
	if(controller.axes[config.roll] > 0.2 || controller.axes[config.roll] < -0.2){
		goRoll(controller.axes[config.roll]/10);
		tiltX(controller.axes[config.roll]*(-30));
		tiltedX = true;
	}
	if(controller.axes[config.yaw] > 0.1 || controller.axes[config.yaw] < -0.1){
		horizontalRotate(controller.axes[config.yaw]*yawCoef);
		//tiltedX = true;
	}
	if(!tiltedX){
		tiltX(0);
	}
	if(!tiltedZ){
		tiltZ(0);
	}
	crash();
	rAF(updateStatus);
}

function scangamepads() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
	for (var i = 0; i < gamepads.length; i++) {
	if (gamepads[i]) {
		if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
      	addgamepad(gamepads[i]);
			}
		}
	}
}

if (haveEvents) {
	window.addEventListener("gamepadconnected", connecthandler);
	window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
	window.addEventListener("webkitgamepadconnected", connecthandler);
	window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
	setInterval(scangamepads, 500);
}
function joystick() {
	var selectedID = $("#combo").val();
	selectedController = controllers[selectedID];
	if((selectedController.id).indexOf("Xbox") != -1){
		config = defaultConfig;
	}else if((selectedController.id).indexOf("KMODEL") != -1){
		config = {pitch:0, yaw:3, roll:4, alt:1,pitchReverse:false, yawReverse:true, rollReverse:false, altReverse:false};
	}else{
		config = defaultConfig;
	}
	syncDisplay(config);
}
function buttonResetClicked(){
	reset();
	//config = defaultConfig;
}
function reset() {
	var drone = document.querySelector('a-entity#drone');
	drone.setAttribute( "position", "0 0.4 -3.3");
	drone.setAttribute( "rotation", "0 0 0");
}

function crash(){
	var drone = document.querySelector('a-entity#drone');
	var dronePos = drone.getAttribute( "position" );
	if(dronePos.y < 0){
		error();
		reset();
	}
}

function send(){
	 console.log(config);
	 var PitchSet = document.getElementById('PitchSet');
	 var AltSet = document.getElementById('AltSet');
	 var YawSet = document.getElementById('YawSet');
	 var RollSet = document.getElementById('RollSet');
	 config.pitch = PitchSet.value;
	 config.yaw = YawSet.value;
	 config.roll = RollSet.value;
	 config.alt = AltSet.value;
	 console.log(config);

}

function onFocusAxes(elt){
	configMode = true;
	selectedAxe = elt.id;
	console.log(elt);
}
function onFocusOutAxes(elt){
	console.log("focus out");
	configMode = false;
}

function error(){
	alert("Crashed");
}

/*function buttonPressed(evt, pressed){
	console.log(evt.button, pressed);
}
window.addEventListener("MozGamepadButtonDown", function(evt) { buttonPressed(evt, true); } );
window.addEventListener("MozGamepadButtonUp", function(evt) { buttonPressed(evt, false); } );*/