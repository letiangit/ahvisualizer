var Color = (function () {
    function Color(red, green, blue, alpha, position) {
        if (alpha === void 0) { alpha = 1; }
        if (position === void 0) { position = 0; }
        this.red = Math.floor(red);
        this.green = Math.floor(green);
        this.blue = Math.floor(blue);
        this.alpha = alpha;
        this.position = Math.round(position * 100) / 100;
    }
    Color.prototype.toString = function () {
        return "rgba(" + this.red + ", " + this.green + "," + this.blue + ", " + this.alpha + ")";
    };
    return Color;
}());
var Palette = (function () {
    function Palette() {
        this.colors = [];
        this.lookup = [];
    }
    Palette.prototype.buildLookup = function () {
        this.lookup = [];
        for (var i = 0; i < 1000; i++)
            this.lookup.push(this.getColorAt(i / 1000));
    };
    ;
    Palette.prototype.getColorFromLookupAt = function (position) {
        var idx;
        if (isNaN(position))
            idx = 0;
        else
            idx = Math.floor(position * this.lookup.length);
        if (idx < 0)
            idx = 0;
        if (idx >= this.lookup.length)
            idx = this.lookup.length - 1;
        return this.lookup[idx];
    };
    ;
    Palette.prototype.getColorAt = function (position) {
        if (position < this.colors[0].position)
            return this.colors[0];
        if (position >= this.colors[this.colors.length - 1].position)
            return this.colors[this.colors.length - 1];
        for (var i = 0; i < this.colors.length; i++) {
            if (position >= this.colors[i].position && position < this.colors[i + 1].position) {
                var relColorAlpha = (position - this.colors[i].position) / (this.colors[i + 1].position - this.colors[i].position);
                var red = this.colors[i].red * (1 - relColorAlpha) + this.colors[i + 1].red * (relColorAlpha);
                var green = this.colors[i].green * (1 - relColorAlpha) + this.colors[i + 1].green * (relColorAlpha);
                var blue = this.colors[i].blue * (1 - relColorAlpha) + this.colors[i + 1].blue * (relColorAlpha);
                return new Color(red, green, blue, 1, position);
            }
        }
    };
    Palette.prototype.addColor = function (c) {
        this.colors.push(c);
    };
    Palette.prototype.drawTo = function (ctx, width, height) {
        for (var i = 0; i < width; i++) {
            var pos = i / width;
            var c = this.getColorFromLookupAt(pos);
            ctx.fillStyle = "rgb(" + c.red + "," + c.green + "," + c.blue + ")";
            ctx.fillRect(i, 0, 1, height);
        }
    };
    return Palette;
}());
//# sourceMappingURL=color.js.map