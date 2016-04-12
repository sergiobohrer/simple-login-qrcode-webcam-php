// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var webkit = false;
var moz = false;
var lastCredential = '';
var cleaningCredentialStarted = false;
var myCleaningCredential = null;

function initCanvas( widthCanvas, heightCanvas ) {
    gCanvas = document.getElementById( 'qr-canvas' );
    gCanvas.width = widthCanvas;
    gCanvas.height = heightCanvas;
    gCtx = gCanvas.getContext( '2d' );
    gCtx.clearRect( 0, 0, widthCanvas, heightCanvas );
}

function startVideoCapture() {
    setTimeout( captureToCanvas, 150 );
}

function cleaningCredential()
{
    cleaningCredentialStarted = false;
    lastCredential = '';
}

function startCleaningLastCredential()
{
    if ( ! cleaningCredentialStarted ) {
        cleaningCredentialStarted = true;
        myCleaningCredential = setTimeout( cleaningCredential, 8000 );
    }
}

function stopTimeoutCleaningCredential()
{
    clearTimeout( myCleaningCredential );
}

function captureToCanvas() {
    try {
        gCtx.drawImage( v, 0, 0 );
        try {
            qrcode.decode();
        }
        catch( e ) {
            startVideoCapture();
        };
    }
    catch( e ) {
        startVideoCapture();
    };
}

function read( a ) {

    startCleaningLastCredential();

    if (lastCredential != a )
    {
        var dataString = { send : true , credential : a };

        $.ajax({
            type: 'POST',
            url: 'checkuser.php',
            data: dataString,
            dataType: 'json',
            async: false,
            cache: false,
            success: function( data ) {

                if ( data.read == true ) {

                    lastCredential = a;

                    if ( data.status == true ) {
                        swal({ title: data.name, text: 'Usuário identificado com sucesso!', type: 'success', timer: 3000, showConfirmButton: false});
                    } else {
                        swal({ title: data.name, text: 'Usuário não identificado!', type: 'warning', timer: 3000, showConfirmButton: false});
                    }
                }
                startVideoCapture();
            },
            error: function( xhr, status, error ) {
                startVideoCapture();
            }
        });

    } else {
        startVideoCapture();
    }
}

// Verify canvas available
function isCanvasSupported() {
    var elem = document.createElement( 'canvas' );
    return !!( elem.getContext && elem.getContext( '2d' ) );
}

function success( stream ) {
    var v = document.getElementById( 'v' );
    if ( webkit )
    {
        v.src = window.webkitURL.createObjectURL( stream );
    } else {
        if ( moz ) {
            v.mozSrcObject = stream;
            v.play();
        } else {
            v.src = stream;
        }
    }
    startVideoCapture();
}

function error( error ) {
    return;
}

// Set video navigator
function setwebcam() {
    if ( navigator.getUserMedia ) {
        navigator.getUserMedia( {video: true, audio: false}, success, error );
    } else {
        if ( navigator.webkitGetUserMedia ) {
            webkit = true;
            navigator.webkitGetUserMedia( {video: true, audio: false}, success, error );
        } else {
            if ( navigator.mozGetUserMedia )
            {
                moz = true;
                navigator.mozGetUserMedia( {video: true, audio: false}, success, error );
            }
        }
    }
}

// Load all configurations
function load()
{
    if ( isCanvasSupported() && window.File && window.FileReader )
    {
        initCanvas( 800, 600 );
        qrcode.callback = read;
        setwebcam();
    } else {
        document.getElementsByTagName( 'body' )[0].innerHTML = '<center><p>QR code scanner for HTML5 capable browsers</p><br>'+
        '<br><p>sorry your browser is not supported</p></center>';
    }
}