function drawOnHUD(value, font, size, color, x, y, align, isStroked, strokeColor, thickness) {
    let ctx = Video.bufferContext();
    
    ctx.font = size + "px " + font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "top";
    ctx.fillText(value, x, y);
    
    if (isStroked) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = thickness;
        ctx.strokeText(value, x, y);
    }
}
