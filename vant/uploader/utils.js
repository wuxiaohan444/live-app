Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isImageUrl = isImageUrl, exports.isImageFile = isImageFile, exports.isVideo = isVideo;

var IMAGE_EXT = [ "jpeg", "jpg", "gif", "png", "svg" ];

function isImageUrl(i) {
    return IMAGE_EXT.some(function(e) {
        return -1 !== i.indexOf("." + e);
    });
}

function isImageFile(e) {
    return e.type ? 0 === e.type.indexOf("image") : e.path ? isImageUrl(e.path) : !!e.url && isImageUrl(e.url);
}

function isVideo(e, i) {
    return "video" === i;
}