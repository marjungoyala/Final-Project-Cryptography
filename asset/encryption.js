var fileInput = document.getElementById("fileInput");
    var encryptOrDecrypt = document.getElementById("encryptOrDecrypt");
    var downloadLink = document.getElementById("downloadLink");
    var processFunction;

    function process() {
      if (encryptOrDecrypt.value === "encrypt") {
        processFunction = CaesarCipher.encrypt;
      }
      else {
        processFunction = CaesarCipher.decrypt;
      }

      var file = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = function() {
        var plaintext = reader.result;
        var ciphertext = processFunction(plaintext, 3);
        var blob = new Blob([ciphertext], {type: "text/plain;charset=utf-8"});
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.style.display = "inline";
      };
      reader.readAsText(file);
    }


var CaesarCipher = {
    encrypt: function(text, key) {
      var result = "";
      for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        if (c >= 65 && c <= 90) {
          result += String.fromCharCode((c - 65 + key) % 26 + 65);
        }
        else if (c >= 97 && c <= 122) {
          result += String.fromCharCode((c - 97 + key) % 26 + 97);
        }
        else {
          result += text.charAt(i);
        }
      }
      return result;
    },
  
    decrypt: function(text, key) {
      return CaesarCipher.encrypt(text, 26 - key);
    }
  };
  