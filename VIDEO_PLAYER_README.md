# Branded Video Player Component

A premium, museum-style video player component for The Australian Art Anthology, featuring custom branding with Burnt Orange (#E07A2F) accents and theater mode.

## Features

- **Custom Poster Frame**: High-resolution thumbnail with dark overlay
- **Branded Play Button**: Large circular button in Burnt Orange (#E07A2F) with hover effects
- **Theater Mode**: Full-screen modal experience with dimmed background
- **Plyr Integration**: Professional video controls with custom branding
- **YouTube/Vimeo Support**: Seamless embedding with hidden branding
- **Responsive Design**: Works beautifully on all screen sizes

## Installation

1. Include the CSS in your HTML `<head>`:
```html
<link rel="stylesheet" href="style.css">
```

2. Include Plyr CSS (before your custom CSS):
```html
<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
```

3. Include the JavaScript files before closing `</body>`:
```html
<script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>
<script src="video-player.js"></script>
```

## Usage

### Basic HTML Structure

```html
<div class="video-player-wrapper" 
     data-video-id="YOUR_VIDEO_ID" 
     data-video-type="youtube" 
     data-theater-mode="true">
    
    <div class="video-poster-container">
        <img src="poster-image.jpg" alt="Video Title" class="video-poster-image">
        <div class="video-poster-overlay"></div>
        <div class="video-play-button"></div>
    </div>
    
    <div class="video-container"></div>
    
    <p class="video-caption">
        Preview: Series 01 Anthology | Educational License Required for Full Access.
    </p>
</div>
```

### Attributes

- `data-video-id`: The YouTube video ID, Vimeo video ID, or direct video URL
- `data-video-type`: `"youtube"`, `"vimeo"`, or `"html5"` (for direct video files)
- `data-theater-mode`: `"true"` for theater mode, `"false"` for inline playback

### YouTube Example

```html
<div class="video-player-wrapper" 
     data-video-id="5WdwJyCm7ho" 
     data-video-type="youtube" 
     data-theater-mode="true">
    <!-- ... poster and container ... -->
</div>
```

You can also use full YouTube URLs - the script will extract the video ID automatically:
```html
data-video-id="https://youtu.be/5WdwJyCm7ho?si=VKog-VSQvzgI6kK0"
```

### Vimeo Example

```html
<div class="video-player-wrapper" 
     data-video-id="123456789" 
     data-video-type="vimeo" 
     data-theater-mode="true">
    <!-- ... poster and container ... -->
</div>
```

Or with full Vimeo URL:
```html
data-video-id="https://vimeo.com/123456789"
```

### HTML5 Video Example

```html
<div class="video-player-wrapper" 
     data-video-id="path/to/video.mp4" 
     data-video-type="html5" 
     data-theater-mode="false">
    <!-- ... poster and container ... -->
</div>
```

## Customization

### Colors

The player uses CSS variables defined in `style.css`:
- `--accent-orange: #E07A2F` - Burnt Orange for buttons and controls
- `--bg-color: #2F353B` - Dark slate background
- `--text-color: #E6E6E6` - Light text color

### Caption Text

Customize the caption below the player:
```html
<p class="video-caption">
    Your custom caption text here.
</p>
```

### Play Button Size

Adjust the play button size in `style.css`:
```css
.video-play-button {
    width: 80px;  /* Change size */
    height: 80px;
}
```

## Theater Mode

When `data-theater-mode="true"`:
- Clicking play opens a full-screen modal
- Background dims with blur effect
- Video plays in center of screen
- Close button appears in top-right
- Press `Escape` to close

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Plyr handles fallbacks for older browsers

## Notes

- YouTube videos will hide related videos and branding when possible
- Vimeo videos will hide title, byline, and portrait when possible
- Theater mode prevents body scrolling while active
- Video loads only when play button is clicked (lazy loading)
