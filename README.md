*What does it do?*

This is a Qrcode reader using webcam.

*How does it do?*

This script use html video tag to show the video. This video is copyed to canvas each 150 millisecond and converted for javascript qrcode function.
If the qrcode library to read the QrCode image, so, it is sent by ajax to php server by ajax and the code is analyzed.

*Wrong example:*

Use this url to generate wrong qrcode
http://chart.apis.google.com/chart?chs=400x400&cht=qr&chld=M|0&choe=UTF-8&chl=Name:%20Serginho

Run the index.php and show this qrcode to webcam
The script will return who the user is wrong.

*Success example:*

Use this url to generate correct qrcode
http://chart.apis.google.com/chart?chs=400x400&cht=qr&chld=M|0&choe=UTF-8&chl=Name:%20Sergio

Run the index.php and show this qrcode to webcam
The script will return who the user is correct.