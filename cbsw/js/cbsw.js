/********************************************************/
var sessao = aleatorio();
var primeiroclique = '';
var aberto;
const input = document.getElementById('cbsw_input')
const mic = document.querySelector('.input-group-text')
var currentContext = {};
var user;


function PrimeiraResposta() {

  if (aberto!= true){
    aberto=true;
    var historico = document.getElementById('cbsw_dialogue').innerHTML;  
    var id = aleatorio();
    digitando(id);

    var url = "";

    var body = {};
		
	  var http = new XMLHttpRequest();
	  http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json; charset=utf-8','Access-Control-Allow-Origin', '*');
	  http.send(JSON.stringify(body));
	
	  http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var data = JSON.parse(this.responseText);
      console.log(data);
      console.log(data.output);
      user = data.user_id;
      console.log(user);      
      for (i = 0; i < data.output.text.length; i++){
      res = data.output.text[i].replace( /[\r\n]+/gm, "" );
      console.log(res);      
      document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-success d-inline-block shadow'>"+res+"</span></div>";
      historico = document.getElementById('cbsw_dialogue').innerHTML;
    } 
      scroll();
    }
		}
	}

  
  }


/********************************************************/
function mensagemVoz() {
  
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  if ('SpeechRecognition' in window) {
    // speech recognition API supported
    console.log('speech recognition API supported')
  } else {
    // speech recognition API not supported
    console.log('speech recognition API not supported')
  }
  const recognition =  new SpeechRecognition()
  //{event listener que chama dictate}
  recognition.start()
  recognition.onresult = (event) => {

    const speechToText = event.results[0][0].transcript //texto capturado
    //fazer algo com speechToText
    document.getElementById('cbsw_input').value = speechToText;
    mensage(); //enviar mensagem
  }


}
function mensage() {
	let mensagem = document.getElementById('cbsw_input').value;
	if(mensagem.trim() == null || mensagem.trim() == ''){
		document.getElementById('cbsw_input').value='';
		document.getElementById('cbsw_input').placeholder='Como posso te ajudar?';
		maximizar();
		return;
	}else{
		solicitacao(mensagem.trim());
		document.getElementById('cbsw_input').value='';
		//document.getElementById('cbsw_input').disabled = true;
		document.getElementById('cbsw_input').placeholder='Posso te ajudar em algo mais?';
		scroll();
	}
}

function TeclaPressionada(event) {
    var tecla = event.which || event.keyCode;
    if (tecla == 13) {
        mensage();
	}
}

/********************************************************/
function scroll() {
       var objDiv = document.getElementById('cbsw_scroll');
       objDiv.scrollTop = objDiv.scrollHeight;
    }



function toggle() {
		document.getElementById('cbsw').classList.toggle('cbsw_collapsed');
		document.getElementById('cbsw_submit').classList.toggle('rounded-right');
		document.getElementById('background-chat').classList.toggle('background-chat-open');
		//document.getElementById('btnContato').classList.toggle('sofia-btn-contato');
		scroll();
}

/********************************************************/

function maximizar() {
		document.getElementById('cbsw').classList.remove('cbsw_collapsed');
		document.getElementById('cbsw_submit').classList.remove('rounded-right');
		document.getElementById('background-chat').classList.add('background-chat-open');
		//document.getElementById('btnContato').classList.remove('sofia-btn-contato');
		scroll();
}

function minimizar() {
		document.getElementById('cbsw').classList.add('cbsw_collapsed');
		document.getElementById('cbsw_submit').classList.add('rounded-right');
		document.getElementById('background-chat').classList.remove('background-chat-open');
		scroll();
}


/********************************************************/

function solicitacao(texto) {
    var historico = document.getElementById('cbsw_dialogue').innerHTML;

    if(texto==''){}
      else{
        document.getElementById('cbsw_dialogue').innerHTML = historico +
        "<div class='cbsw_rr cbsw_request my-2'><span class='cbsw_bubble alert alert-warning d-inline-block' style='word-break: break-word;'>"+texto+"</span></div>";

        var id = aleatorio();
        digitando(id);
        document.getElementById('cbsw_dialogue').scrollTop = 100000000;
        resposta(texto,id);
     }
}

/********************************************************/

function URLEncode2(plaintext) {
    if (plaintext == null || typeof(plaintext) == 'undefined' || plaintext === '' || plaintext.toString() == 'NaN') {
        return "";
    }
    plaintext = plaintext.toString();

    // The Javascript escape and unescape functions do not correspond
    // with what browsers actually do...
    var SAFECHARS = "0123456789" +                  // Numeric
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +  // Alphabetic
                    "abcdefghijklmnopqrstuvwxyz" +
                    "-_.!~*'()?";                   // RFC2396 Mark characters
    var HEX = "0123456789ABCDEF";

    var encoded = "";
    for (var i = 0; i < plaintext.length; i++ ) {
        var ch = plaintext.charAt(i);
        if (ch == " ") {
            encoded += "+";                         // x-www-urlencoded, rather than %20
        } else if (SAFECHARS.indexOf(ch) != -1) {
            encoded += ch;
        } else {
            var charCode = ch.charCodeAt(0);
            if (charCode > 255) {
            encoded += "+";
            } else {
                encoded += "%";
                encoded += HEX.charAt((charCode >> 4) & 0xF);
                encoded += HEX.charAt(charCode & 0xF);
            }
        }
    }
    return encoded;
}

function resposta(texto,id) {
    var historico = document.getElementById('cbsw_dialogue').innerHTML;

    var url = "";
    console.log(user);      
    var body = {};
	  var http = new XMLHttpRequest();
	  http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json; charset=utf-8','Access-Control-Allow-Origin', '*');
	  http.send(JSON.stringify(body));
	
	  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          var data = JSON.parse(this.responseText);
        if(res != '' && res != null ){
          for (i = 0; i < data.output.text.length; i++){
            res = data.output.text[i].replace( /[\r\n]+/gm, "" );
            console.log(res);      
            document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-success d-inline-block shadow'>"+res+"</span></div>";
            historico = document.getElementById('cbsw_dialogue').innerHTML;
          } 
        document.getElementById(id).style.display="none";        document.getElementById('cbsw_input').disabled = false;
        document.getElementById(id).style.display="none";
        document.getElementById('cbsw_scroll').scrollTop = 100000000;
        document.getElementById('cbsw_input').focus();
        scroll();
      }
      }


     } 
}

/********************************************************/

function digitando(id) {
    var historico = document.getElementById('cbsw_dialogue').innerHTML;
     document.getElementById('cbsw_dialogue').innerHTML = historico +
     " <div id="+id+" class='digitando text-black-50'><i>digitando</i></div>";
}

/********************************************************/

function aleatorio() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1) +'-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + '-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + '-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
}

function sendPwKeyPress(event,elemento) {
    var tecla = event.which || event.keyCode;
    if (tecla == 13) {
        sendPw(elemento);
	}
}

function OpenURLOnNewWindow(link, a, b) {
  window.open(link, "_blank")
}



/********************************************************/
