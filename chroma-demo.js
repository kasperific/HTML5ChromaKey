

function draw() {
    if (window.requestAnimationFrame) window.requestAnimationFrame(draw);
    // IE implementation
    else if (window.msRequestAnimationFrame) window.msRequestAnimationFrame(draw);
    // Firefox implementation
    else if (window.mozRequestAnimationFrame) window.mozRequestAnimationFrame(draw);
    // Chrome implementation
    else if (window.webkitRequestAnimationFrame) window.webkitRequestAnimationFrame(draw);
    // Other browsers that do not yet support feature
    else setTimeout(draw, 16.7);
    DrawVideoOnCanvas();
}



function DrawVideoOnCanvas() {
    var object = document.getElementById("videodata")
    var width = object.width;
    var height = object.height;
    var canvas = document.getElementById("videoscreen");
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.drawImage(object, 0, 0, width, height);
        imgDataNormal = context.getImageData(0, 0, width, height);
        var imgData = context.createImageData(width, height);

        for (i = 0; i < imgData.width * imgData.height * 4; i += 4) {
            var r = imgDataNormal.data[i + 0];
            var g = imgDataNormal.data[i + 1];
            var b = imgDataNormal.data[i + 2];
            var a = imgDataNormal.data[i + 3];
            // set rgb levels for green and set alphachannel to 0;
            selectedR = 110;
            selectedG = 154;
            selectedB = 90;
            if (r <= selectedR && g >= selectedG && b >= selectedB) {
                a = 0;
            }
            if (a != 0) {
                imgData.data[i + 0] = r;
                imgData.data[i + 1] = g;
                imgData.data[i + 2] = b;
                imgData.data[i + 3] = a;
            }
        }
        // For image anti-aliasing
        for (var y = 0; y < imgData.height; y++) {
            for (var x = 0; x < imgData.width; x++) {
                var r = imgData.data[((imgData.width * y) + x) * 4];
                var g = imgData.data[((imgData.width * y) + x) * 4 + 1];
                var b = imgData.data[((imgData.width * y) + x) * 4 + 2];
                var a = imgData.data[((imgData.width * y) + x) * 4 + 3];
                if (imgData.data[((imgData.width * y) + x) * 4 + 3] != 0) {
                    offsetYup = y - 1;
                    offsetYdown = y + 1;
                    offsetXleft = x - 1;
                    offsetxRight = x + 1;
                    var change = false;
                    if (offsetYup > 0) {
                        if (imgData.data[((imgData.width * (y - 1)) + (x)) * 4 + 3] == 0) {
                            change = true;
                        }
                    }
                    if (offsetYdown < imgData.height) {
                        if (imgData.data[((imgData.width * (y + 1)) + (x)) * 4 + 3] == 0) {
                            change = true;
                        }
                    }
                    if (offsetXleft > -1) {
                        if (imgData.data[((imgData.width * y) + (x - 1)) * 4 + 3] == 0) {
                            change = true;
                        }
                    }
                    if (offsetxRight < imgData.width) {
                        if (imgData.data[((imgData.width * y) + (x + 1)) * 4 + 3] == 0) {
                            change = true;
                        }
                    }
                }
            }
        }
        context.putImageData(imgData, 0, 0);
    }
}
