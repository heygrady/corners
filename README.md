# UI Corners
SASS and JavaScript for easy cross-browser rounded corners.

[See the blog article](http://heygrady.com/blog/2011/08/25/using-images-and-javascript-and-compass-for-easy-cross-browser-rounded-corners/)

## Example Markup
The point of this project is to apply styling to a simple set of markup that will work cross-browser (neglecting IE6) and replicate the ease-of-use and look of `border-radius` using images. You can add this markup to your HTML directly or use the jQuery plugin to do it for you.

```html
<div class="box ui-corners">
  <div class="ui-corners-content">
    <h2>Some Headline</h2>
    <p>My content.</p>
  </div>
  <span class="ui-corners-corner ui-corners-corner-tl"></span>
  <span class="ui-corners-corner ui-corners-corner-tr"></span>
  <span class="ui-corners-corner ui-corners-corner-br"></span>
  <span class="ui-corners-corner ui-corners-corner-bl"></span>
  <span class="ui-corners-side ui-corners-side-top"></span>
  <span class="ui-corners-side ui-corners-side-right"></span>
  <span class="ui-corners-side ui-corners-side-bottom"></span>
  <span class="ui-corners-side ui-corners-side-left"></span>
</div>
```

## Using the jQuery Plugin
The JavaScript file will automatically add the necessary markup to the page to make the CSS work correctly.

### Before the Plugin
Assuming we're starting with some normal markup we might have a simple `div` containing some content like below.

```html
<div class="box">
  <h2>Some Headline</h2>
  <p>My content.</p>
</div>
```

### Applying the Plugin
The plugin only adds markup to the page. You need to use the SASS plugin to actually add the styles.

```javascript
$('.box').corners(); // no options are available
```

## Using the SASS File
The SASS file contains some useful mixins for adding images as background images. It relies on the (compass library)[http://compass-style.org/] for working with the images and will attempt to measure each background image to make configuration easier.

### Mixins
#### corner-border-width($border-width, [$padding])
Because the corner plugin is used to fake borders, it is necessary to remove real borders and fake them using `padding`.

- **$border-width** Fakes the border-width using padding. Can be a single value or a (list of values)[http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#lists] matching the (CSS `padding` spec)[https://developer.mozilla.org/en/CSS/padding]. Only pixel values are supported.
- **$padding** Provides extra padding in addition to the faked border padding. Can be a single value or a (list of values)[http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#lists] matching the (CSS `padding` spec)[https://developer.mozilla.org/en/CSS/padding]. Only pixel values are supported.

#### corner-images([$tl], [$t], [$tr], [$r], [$br], [$b], [$bl], [$l])
This mixing adds all of the provided images as background images to the corresponding `span` elements. At a minimum, 8 images should be supplied (one for each corner and side). Each argument can be a list. The arguments are ordered clock-wise starting from the top-left corner. Corners and sides use slightly different arguments for the list. Normally all arguments are calculated automatically except for the `background-image`.

- **corner** [background-image] [width] [height] [background-position-x] [background-position-y] [left|right] [top|bottom]
- **top|bottom** [background-image] [height] [background-position-x] [background-position-y] [top|bottom] [left] [right]
- **left|right** [background-image] [width] [background-position-x] [background-position-y] [left|right] [top] [bottom]

Advanced details on each value in the list:

- **background-image** The image to use for the background on the element. The image must be a valid `$path` for the (`image-url` function)[http://compass-style.org/reference/compass/helpers/urls/#image-url].
- **width** The width of the element. This is usually measured automatically using the (`image-width` function)[http://compass-style.org/reference/compass/helpers/image-dimensions/#image-width].
- **height** The height of the element. This is usually measured automatically using the (`image-height` function)[http://compass-style.org/reference/compass/helpers/image-dimensions/#image-height].
- **background-position-x** Valid value for the first, horizontal value in (`background-position`)[https://developer.mozilla.org/en/CSS/background-position]. Automatically calculated for each corner and side. For instance, the top-left corner has a `background-position-x` of 0 and the bottom-right corner has a `background-position-x` of 100% by default.
- **background-position-y** Valid value for the second, vertical value in (`background-position`)[https://developer.mozilla.org/en/CSS/background-position]. Automatically calculated for each corner and side. For instance, the top-left corner has a `background-position-y` of 0 and the bottom-right corner has a `background-position-y` of 100% by default.
- **top** Positions the corner or side element using absolute positioning. Takes any valid (`top`)[https://developer.mozilla.org/en/CSS/top] value. There's rarely a need to customize this.
- **right** Positions the corner or side element using absolute positioning. Takes any valid (`right`)[https://developer.mozilla.org/en/CSS/right] value. There's rarely a need to customize this.
- **bottom** Positions the corner or side element using absolute positioning. Takes any valid (`bottom`)[https://developer.mozilla.org/en/CSS/bottom] value. There's rarely a need to customize this.
- **left** Positions the corner or side element using absolute positioning. Takes any valid (`left`)[https://developer.mozilla.org/en/CSS/left] value. There's rarely a need to customize this.

### Normal Usage
The following example shows the easiest use-case where each corner and side is a separate image.

```css
@import "ui-corners";
.box {
  @include corner-images(
    "corner-tl.png",
    "corner-t.png",
    "corner-tr.png",
    "corner-l.png",
    "corner-br.png",
    "corner-b.png",
    "corner-bl.png",
    "corner-l.png"
  );
  @include corner-border-width(1px, 10px);
}
```

### Advanced Usage
This example uses a single sprite and must supply custom height, width and background positioning for each corner and side.

```css
@import "ui-corners";
.box {
  @include corner-images(
    "corner.png" 12px 12px -13px -13px,
    "corner.png" auto 0 -25px,
    "corner.png" 12px 12px -1px -13px,
    "corner.png" auto 11px 0,
    "corner.png" 12px 12px -1px -1px,
    "corner.png" auto 0 11px,
    "corner.png" 12px 12px -13px -1px,
    "corner.png" auto -25px 0
  );
  @include corner-border-width(1px, 10px);
}
