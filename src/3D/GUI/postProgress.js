!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e(require("babylonjs")))
    : "function" == typeof define && define.amd
    ? define("babylonjs-post-process", ["babylonjs"], e)
    : "object" == typeof exports
    ? (exports["babylonjs-post-process"] = e(require("babylonjs")))
    : (t.POSTPROCESSES = e(t.BABYLON));
})(
  "undefined" != typeof self
    ? self
    : "undefined" != typeof global
    ? global
    : this,
  (t) =>
    (() => {
      "use strict";
      var e = {
          520: (e) => {
            e.exports = t;
          },
        },
        o = {};
      function r(t) {
        var i = o[t];
        if (void 0 !== i) return i.exports;
        var n = (o[t] = { exports: {} });
        return e[t](n, n.exports, r), n.exports;
      }
      (r.d = (t, e) => {
        for (var o in e)
          r.o(e, o) &&
            !r.o(t, o) &&
            Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
      }),
        (r.g = (function () {
          if ("object" == typeof globalThis) return globalThis;
          try {
            return this || new Function("return this")();
          } catch (t) {
            if ("object" == typeof window) return window;
          }
        })()),
        (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
        (r.r = (t) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "__esModule", { value: !0 });
        });
      var i = {};
      return (
        (() => {
          r.d(i, { default: () => p });
          var t = {};
          r.r(t),
            r.d(t, {
              AsciiArtFontTexture: () => c,
              AsciiArtPostProcess: () => f,
            });
          var e = {};
          r.r(e),
            r.d(e, {
              AsciiArtFontTexture: () => c,
              AsciiArtPostProcess: () => f,
            });
          var o = function (t, e) {
            return (
              (o =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var o in e)
                    Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                }),
              o(t, e)
            );
          };
          function n(t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Class extends value " +
                  String(e) +
                  " is not a constructor or null"
              );
            function r() {
              this.constructor = t;
            }
            o(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((r.prototype = e.prototype), new r()));
          }
          function a(t, e, o, r) {
            var i,
              n = arguments.length,
              a =
                n < 3
                  ? e
                  : null === r
                  ? (r = Object.getOwnPropertyDescriptor(e, o))
                  : r;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              a = Reflect.decorate(t, e, o, r);
            else
              for (var l = t.length - 1; l >= 0; l--)
                (i = t[l]) &&
                  (a = (n < 3 ? i(a) : n > 3 ? i(e, o, a) : i(e, o)) || a);
            return n > 3 && a && Object.defineProperty(e, o, a), a;
          }
          Object.create, Object.create;
          var l = r(520);
          l.ShaderStore.ShadersStore.asciiartPixelShader =
            "varying vec2 vUV;uniform sampler2D textureSampler;uniform sampler2D asciiArtFont;uniform vec4 asciiArtFontInfos;uniform vec4 asciiArtOptions;float getLuminance(vec3 color)\n{return clamp(dot(color,vec3(0.2126,0.7152,0.0722)),0.,1.);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) \n{float caracterSize=asciiArtFontInfos.x;float numChar=asciiArtFontInfos.y-1.0;float fontx=asciiArtFontInfos.z;float fonty=asciiArtFontInfos.w;float screenx=asciiArtOptions.x;float screeny=asciiArtOptions.y;float tileX=float(floor((gl_FragCoord.x)/caracterSize))*caracterSize/screenx;float tileY=float(floor((gl_FragCoord.y)/caracterSize))*caracterSize/screeny;vec2 tileUV=vec2(tileX,tileY);vec4 tileColor=texture2D(textureSampler,tileUV);vec4 baseColor=texture2D(textureSampler,vUV);float tileLuminance=getLuminance(tileColor.rgb);float offsetx=(float(floor(tileLuminance*numChar)))*caracterSize/fontx;float offsety=0.0;float x=float(mod(gl_FragCoord.x,caracterSize))/fontx;float y=float(mod(gl_FragCoord.y,caracterSize))/fonty;vec4 finalColor= texture2D(asciiArtFont,vec2(offsetx+x,offsety+(caracterSize/fonty-y)));finalColor.rgb*=tileColor.rgb;finalColor.a=1.0;finalColor= mix(finalColor,tileColor,asciiArtOptions.w);finalColor= mix(finalColor,baseColor,asciiArtOptions.z);gl_FragColor=finalColor;}";
          var c = (function (t) {
              function e(e, o, r, i) {
                void 0 === i && (i = null);
                var n = t.call(this, i) || this;
                if (!(i = n.getScene())) return n;
                (n.name = e),
                  n._text,
                  n._font,
                  (n.wrapU = l.Texture.CLAMP_ADDRESSMODE),
                  (n.wrapV = l.Texture.CLAMP_ADDRESSMODE);
                var a = n._getFontHeight(o),
                  c = n._getFontWidth(o);
                n._charSize = Math.max(a.height, c);
                var f = Math.ceil(n._charSize * r.length),
                  s = n._charSize;
                n._texture = i
                  .getEngine()
                  .createDynamicTexture(
                    f,
                    s,
                    !1,
                    l.Texture.NEAREST_SAMPLINGMODE
                  );
                var u = n.getSize(),
                  p = document.createElement("canvas");
                (p.width = u.width), (p.height = u.height);
                var h = p.getContext("2d");
                (h.textBaseline = "top"),
                  (h.font = o),
                  (h.fillStyle = "white"),
                  (h.imageSmoothingEnabled = !1);
                for (var g = 0; g < r.length; g++)
                  h.fillText(r[g], g * n._charSize, -a.offset);
                return (
                  i.getEngine().updateDynamicTexture(n._texture, p, !1, !0), n
                );
              }
              return (
                n(e, t),
                Object.defineProperty(e.prototype, "charSize", {
                  get: function () {
                    return this._charSize;
                  },
                  enumerable: !1,
                  configurable: !0,
                }),
                (e.prototype._getFontWidth = function (t) {
                  var e = document.createElement("canvas").getContext("2d");
                  return (
                    (e.fillStyle = "white"),
                    (e.font = t),
                    e.measureText("W").width
                  );
                }),
                (e.prototype._getFontHeight = function (t) {
                  var e = document.createElement("canvas"),
                    o = e.getContext("2d");
                  o.fillRect(0, 0, e.width, e.height),
                    (o.textBaseline = "top"),
                    (o.fillStyle = "white"),
                    (o.font = t),
                    o.fillText("jH|", 0, 0);
                  for (
                    var r = o.getImageData(0, 0, e.width, e.height).data,
                      i = -1,
                      n = -1,
                      a = 0;
                    a < e.height;
                    a++
                  )
                    for (var l = 0; l < e.width; l++) {
                      if (0 !== r[4 * (a * e.width + l)]) {
                        -1 === i && (i = a);
                        break;
                      }
                      if (l === e.width - 1 && -1 !== i) {
                        (n = a), (a = e.height);
                        break;
                      }
                    }
                  return { height: n - i + 1, offset: i - 1 };
                }),
                (e.prototype.clone = function () {
                  return new e(
                    this.name,
                    this._font,
                    this._text,
                    this.getScene()
                  );
                }),
                (e.Parse = function (t, o) {
                  return l.SerializationHelper.Parse(
                    function () {
                      return new e(t.name, t.font, t.text, o);
                    },
                    t,
                    o,
                    null
                  );
                }),
                a([(0, l.serialize)("font")], e.prototype, "_font", void 0),
                a([(0, l.serialize)("text")], e.prototype, "_text", void 0),
                e
              );
            })(l.BaseTexture),
            f = (function (t) {
              function e(e, o, r) {
                var i =
                  t.call(
                    this,
                    e,
                    "asciiart",
                    ["asciiArtFontInfos", "asciiArtOptions"],
                    ["asciiArtFont"],
                    {
                      width: o.getEngine().getRenderWidth(),
                      height: o.getEngine().getRenderHeight(),
                    },
                    o,
                    l.Texture.TRILINEAR_SAMPLINGMODE,
                    o.getEngine(),
                    !0
                  ) || this;
                (i.mixToTile = 0), (i.mixToNormal = 0);
                var n = "40px Monospace",
                  a =
                    " `-.'_:,\"=^;<+!*?/cL\\zrs7TivJtC{3F)Il(xZfY5S2eajo14[nuyE]P6V9kXpKwGhqAUbOd8#HRDB0$mgMW&Q%N@";
                r &&
                  ("string" == typeof r
                    ? (n = r)
                    : ((n = r.font || n),
                      (a = r.characterSet || a),
                      (i.mixToTile = r.mixToTile || i.mixToTile),
                      (i.mixToNormal = r.mixToNormal || i.mixToNormal))),
                  (i._asciiArtFontTexture = new c(e, n, a, o.getScene()));
                var f = i._asciiArtFontTexture.getSize();
                return (
                  (i.onApply = function (t) {
                    t.setTexture("asciiArtFont", i._asciiArtFontTexture),
                      t.setFloat4(
                        "asciiArtFontInfos",
                        i._asciiArtFontTexture.charSize,
                        a.length,
                        f.width,
                        f.height
                      ),
                      t.setFloat4(
                        "asciiArtOptions",
                        i.width,
                        i.height,
                        i.mixToNormal,
                        i.mixToTile
                      );
                  }),
                  i
                );
              }
              return n(e, t), e;
            })(l.PostProcess),
            s =
              void 0 !== r.g
                ? r.g
                : "undefined" != typeof window
                ? window
                : void 0;
          if (void 0 !== s) for (var u in t) s.BABYLON[u] = t[u];
          const p = e;
        })(),
        i.default
      );
    })()
);
//# sourceMappingURL=babylon.asciiArtPostProcess.min.js.map