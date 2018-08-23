<?php

?>
<html>
  <head>
    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
    <script src="https://rawgit.com/donmccurdy/aframe-extras/v2.1.1/dist/aframe-extras.loaders.min.js"></script>
    <script src="//cdn.rawgit.com/donmccurdy/aframe-extras/v3.8.3/dist/aframe-extras.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <!-- Component -->
  </head>
  <body>

  	<p>Please select the type of controller:</p>

  	Controller: <select name="combo" id="combo" onchange="joystick()">
  	</select>
  	<input type="button" class="bsize" value="Reset Controller" onclick="buttonResetClicked()">
  	<input type="button" class="bsize" value="Reset Position" onclick="resetPosition()">
  	<form>
		Pitch: <input type="number" min="0" id="PitchSet" onfocus="onFocusAxes(this)" onfocusout="onFocusOutAxes(this)"> <input type="checkbox" id="PitchReverse" onclick="reverse()" /> <label for="PitchReverse">Reverse</label><br>
		Alt: <input type="number" min="0" id="AltSet" onfocus="onFocusAxes(this)" onfocusout="onFocusOutAxes(this)"> <input type="checkbox" id="AltReverse" onclick="reverse()" /> <label for="AltReverse">Reverse</label><br>
		Yaw: <input type="number" min="0" id="YawSet" onfocus="onFocusAxes(this)" onfocusout="onFocusOutAxes(this)"> <input type="checkbox" id="YawReverse" onclick="reverse()" /> <label for="YawReverse">Reverse</label><br>
		Roll: <input type="number" min="0" id="RollSet" onfocus="onFocusAxes(this)" onfocusout="onFocusOutAxes(this)"> <input type="checkbox" id="RollReverse" onclick="reverse()" /> <label for="RollReverse">Reverse</label><br>
	<!--<input type="button" class="bsize" value="Send" onclick="send()"> -->
	</form>

	<a-scene>
	    <a-entity id=camera camera="userHeight: 1.6"></a-entity>
	    <!--<a-entity camera="userHeight: 1.6" universal-controls="fly: true;movementEasingY: 15;"></a-entity>-->
		<a-assets>
	    	<img id="groundTexture" src="../img/grassField.jpg">
	    	<img id="skyTexture" src="../img/sky3b.jpg">
	    	<a-asset-item id="drone" src="../img/LAB470_V4_Quadcopter.ply"></a-asset-item>
	    	<a-asset-item id="prop" src="../img/prop_enroute_ver19_centeredBlack.ply"></a-asset-item>
	    </a-assets>
	    <a-entity id="drone" ply-model="src: #drone" position="0 0.4 -3.3" scale="0.001 0.001 0.001"></a-entity>
	    
	  	<a-entity ply-model="src: #prop" position="0 0.3 -5.3" scale="0.001 0.001 0.001"animation__r1="property: rotation; dir: reverse; dur: 1000; easing: linear; loop: true; to: 0 360 0"></a-entity>
		
		<a-entity ply-model="src: #prop" position="0 0.9 -3.3" scale="0.001 0.001 0.001"
		animation__r1="property: rotation; dir: normal; dur: 1000; easing: linear; loop: true; to: 0 360 0"></a-entity>
	  	<a-cylinder id="ground" src="#groundTexture" radius="50" height="0.1"></a-cylinder>
	  	<a-sky id="background" src="#skyTexture" theta-length="90" radius="50"></a-sky>
	</a-scene>
	<script type="text/javascript" src="flightsim.js"></script>
  </body>
</html>
