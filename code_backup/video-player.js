/**
 * Branded Museum-Style Video Player Component
 * Uses Plyr.io for custom video controls
 */

(function() {
    'use strict';

    let activePlayer = null;
    let activeButton = null;
    let theaterOverlay = null;
    let theaterContainer = null;
    let theaterPlayer = null;

    document.addEventListener('DOMContentLoaded', function() {
        createTheaterMode();
        initializeWatchTrailerButtons();
        initializeVideoPlayers();
        setupTheaterModeHandlers();
    });

    function createTheaterMode() {
        console.log('Creating theater mode elements');
        theaterOverlay = document.createElement('div');
        theaterOverlay.className = 'theater-mode-overlay';
        theaterOverlay.id = 'theater-mode-overlay';
        theaterOverlay.style.display = 'none';
        theaterOverlay.style.pointerEvents = 'none';
        
        theaterContainer = document.createElement('div');
        theaterContainer.className = 'theater-mode-container';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'theater-mode-close';
        closeButton.setAttribute('aria-label', 'Close theater mode');
        closeButton.addEventListener('click', closeTheaterMode);
        
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.style.position = 'absolute';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        videoContainer.style.display = 'block';
        videoContainer.style.opacity = '1';
        videoContainer.style.visibility = 'visible';
        videoContainer.style.zIndex = '51';
        videoContainer.style.pointerEvents = 'auto';
        
        theaterContainer.appendChild(closeButton);
        theaterContainer.appendChild(videoContainer);
        theaterOverlay.appendChild(theaterContainer);
        
        document.body.appendChild(theaterOverlay);
        console.log('Theater mode elements created');
    }

    function initializeWatchTrailerButtons() {
        const buttons = document.querySelectorAll('.watch-trailer-btn');
        console.log('Found', buttons.length, 'Watch Trailer buttons');
        
        buttons.forEach(function(button, index) {
            // Remove any existing listeners by cloning and replacing
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                console.log('Watch Trailer button clicked!', index);
                e.preventDefault();
                e.stopPropagation();
                
                const videoId = newButton.getAttribute('data-video-id');
                const videoType = newButton.getAttribute('data-video-type');
                
                console.log('Opening theater mode with:', { videoId, videoType });
                
                if (!videoId || !videoType) {
                    console.error('Missing video data:', { videoId, videoType });
                    return;
                }
                
                openTheaterMode(videoId, videoType);
            });
            
            // Ensure button is interactive
            newButton.style.pointerEvents = 'auto';
            newButton.style.cursor = 'pointer';
            newButton.disabled = false;
        });
    }

    function openTheaterMode(videoId, videoType) {
        if (!theaterOverlay || !theaterContainer) {
            createTheaterMode();
        }
        
        const videoContainer = theaterContainer.querySelector('.video-container');
        if (!videoContainer) {
            console.error('Video container not found');
            return;
        }
        
        videoContainer.innerHTML = '';
        
        // Ensure container is visible and properly sized
        videoContainer.style.display = 'block';
        videoContainer.style.visibility = 'visible';
        videoContainer.style.opacity = '1';
        
        // Create video element
        let videoElement;
        if (videoType === 'youtube') {
            if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
                videoId = extractYouTubeId(videoId);
            }
            // Ensure we have a valid video ID
            if (!videoId || videoId.length !== 11) {
                console.error('Invalid YouTube video ID:', videoId);
                return;
            }
            videoElement = document.createElement('iframe');
            videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;
            videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            videoElement.allowFullscreen = true;
            videoElement.setAttribute('frameborder', '0');
            videoElement.style.position = 'absolute';
            videoElement.style.top = '0';
            videoElement.style.left = '0';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.border = 'none';
            videoElement.style.display = 'block';
            videoElement.style.opacity = '1';
            videoElement.style.visibility = 'visible';
            videoElement.style.zIndex = '51';
        } else if (videoType === 'vimeo') {
            if (videoId.includes('vimeo.com')) {
                const match = videoId.match(/vimeo\.com\/(\d+)/);
                videoId = match ? match[1] : videoId;
            }
            videoElement = document.createElement('iframe');
            videoElement.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0`;
            videoElement.allow = 'autoplay; fullscreen; picture-in-picture';
            videoElement.allowFullscreen = true;
            videoElement.setAttribute('frameborder', '0');
            videoElement.style.position = 'absolute';
            videoElement.style.top = '0';
            videoElement.style.left = '0';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.border = 'none';
            videoElement.style.display = 'block';
            videoElement.style.opacity = '1';
            videoElement.style.visibility = 'visible';
            videoElement.style.zIndex = '51';
        } else {
            videoElement = document.createElement('video');
            videoElement.src = videoId;
            videoElement.controls = true;
            videoElement.playsInline = true;
            videoElement.style.position = 'absolute';
            videoElement.style.top = '0';
            videoElement.style.left = '0';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.display = 'block';
            videoElement.style.opacity = '1';
            videoElement.style.visibility = 'visible';
            videoElement.style.zIndex = '51';
        }
        
        videoContainer.appendChild(videoElement);
        
        // Initialize Plyr for HTML5 video
        if (videoElement.tagName === 'VIDEO') {
            theaterPlayer = new Plyr(videoElement, {
                controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'],
                settings: ['quality', 'speed'],
                keyboard: { focused: true, global: false },
                tooltips: { controls: true, seek: true },
                clickToPlay: true,
                hideControls: false,
                resetOnEnd: false
            });
        } else {
            theaterPlayer = null;
        }
        
        // Ensure video container is visible
        videoContainer.style.position = 'absolute';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        videoContainer.style.display = 'block';
        videoContainer.style.opacity = '1';
        videoContainer.style.visibility = 'visible';
        videoContainer.style.zIndex = '51';
        
        // Show theater mode
        setTimeout(function() {
            console.log('Activating theater mode overlay');
            if (theaterOverlay) {
                theaterOverlay.style.display = 'flex';
                theaterOverlay.style.pointerEvents = 'auto';
                theaterOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Force reflow to ensure visibility
                theaterContainer.offsetHeight;
                videoContainer.offsetHeight;
                if (videoElement) {
                    videoElement.offsetHeight;
                }
            } else {
                console.error('Theater overlay not found when trying to activate');
            }
        }, 10);
    }

    function closeTheaterMode() {
        console.log('closeTheaterMode called');
        if (!theaterOverlay || !theaterOverlay.classList.contains('active')) {
            console.log('Theater mode not active, skipping close');
            return;
        }
        
        // Stop video playback immediately
        const videoContainer = theaterContainer.querySelector('.video-container');
        const videoElement = videoContainer ? videoContainer.querySelector('video, iframe') : null;
        
        if (videoElement) {
            if (videoElement.tagName === 'VIDEO') {
                videoElement.pause();
                videoElement.currentTime = 0;
                videoElement.src = '';
            } else if (videoElement.tagName === 'IFRAME') {
                // For YouTube/Vimeo iframes, remove src to stop playback
                const currentSrc = videoElement.src;
                videoElement.src = 'about:blank';
                // Small delay then clear to ensure audio stops
                setTimeout(function() {
                    if (videoElement.parentNode) {
                        videoElement.remove();
                    }
                }, 100);
            }
        }
        
        // Destroy Plyr instance if exists
        if (theaterPlayer) {
            try {
                theaterPlayer.pause();
                theaterPlayer.destroy();
            } catch (e) {
                console.log('Error destroying player:', e);
            }
            theaterPlayer = null;
        }
        
        // Hide overlay and disable pointer events
        theaterOverlay.classList.remove('active');
        theaterOverlay.style.pointerEvents = 'none';
        theaterOverlay.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clear video container after transition
        setTimeout(function() {
            if (videoContainer) {
                videoContainer.innerHTML = '';
            }
        }, 300);
    }

    function setupTheaterModeHandlers() {
        // Click outside to close (delegated event)
        if (theaterOverlay) {
            theaterOverlay.addEventListener('click', function(e) {
                // Only close if clicking directly on the overlay background, not the container
                if (e.target === theaterOverlay) {
                    closeTheaterMode();
                }
            });
        }
        
        // ESC key to close
        let escapeHandler = function(e) {
            if (e.key === 'Escape' && theaterOverlay && theaterOverlay.classList.contains('active')) {
                closeTheaterMode();
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    function setupClickOutsideHandler() {
        document.addEventListener('click', function(e) {
            if (!activePlayer || !activeButton) return;
            
            const clickedInside = activePlayer.contains(e.target);
            const clickedButton = e.target.closest('.watch-trailer-btn');
            const clickedClose = e.target.closest('.video-player-close');
            
            if (clickedClose) {
                closePlayer();
                return;
            }
            
            if (!clickedInside && !clickedButton) {
                closePlayer();
            }
        });
    }

    function closePlayer() {
        if (!activePlayer || !activeButton) return;
        
        const player = activePlayer.player;
        if (player) {
            player.pause();
            player.destroy();
            activePlayer.player = null;
        }
        
        const videoContainer = activePlayer.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.innerHTML = '';
            videoContainer.classList.remove('active', 'initialized');
        }
        
        const posterContainer = activePlayer.querySelector('.video-poster-container');
        if (posterContainer) {
            posterContainer.style.display = 'block';
        }
        
        activePlayer.style.display = 'none';
        activeButton.style.display = 'inline-block';
        
        activePlayer = null;
        activeButton = null;
    }

    function updateFullscreenButtons() {
        const isFullscreen = document.fullscreenElement || 
                            document.webkitFullscreenElement || 
                            document.mozFullScreenElement || 
                            document.msFullscreenElement;
        
        document.querySelectorAll('.video-player-wrapper').forEach(function(wrapper) {
            const fullscreenBtn = wrapper.querySelector('.video-player-fullscreen-btn');
            if (fullscreenBtn) {
                if (isFullscreen === wrapper) {
                    // In fullscreen - show exit icon
                    fullscreenBtn.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h4v2H6v2H4V4zm8 0h4v4h-2V6h-2V4zM4 14h2v-2h2v4H4v-2zm12 0v2h-4v-2h2v-2h2v2z"/></svg>';
                } else {
                    // Not in fullscreen - show enter icon
                    fullscreenBtn.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h4v2H4v2H2V2zm12 0h4v4h-2V4h-2V2zM2 16h2v-2h2v4H2v-2zm16 0v2h-4v-2h2v-2h2v2z"/></svg>';
                }
            }
        });
    }

    function initializeVideoPlayers() {
        // Set up fullscreen change listeners once
        document.addEventListener('fullscreenchange', updateFullscreenButtons);
        document.addEventListener('webkitfullscreenchange', updateFullscreenButtons);
        document.addEventListener('mozfullscreenchange', updateFullscreenButtons);
        document.addEventListener('MSFullscreenChange', updateFullscreenButtons);
        
        document.querySelectorAll('.video-player-wrapper').forEach(function(wrapper) {
            const posterContainer = wrapper.querySelector('.video-poster-container');
            const videoContainer = wrapper.querySelector('.video-container');
            const playButton = wrapper.querySelector('.video-play-button');
            const closeButton = wrapper.querySelector('.video-player-close');
            const fullscreenButton = wrapper.querySelector('.video-player-fullscreen-btn');
            const videoId = wrapper.getAttribute('data-video-id');
            const videoType = wrapper.getAttribute('data-video-type');
            const useTheaterMode = wrapper.getAttribute('data-theater-mode') === 'true';

            if (!posterContainer || !videoContainer || !playButton) return;

            wrapper.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            playButton.addEventListener('click', function(e) {
                e.stopPropagation();
                playVideo(wrapper, videoId, videoType, useTheaterMode);
            });

            posterContainer.addEventListener('click', function(e) {
                e.stopPropagation();
                if (e.target === posterContainer || e.target === posterContainer.querySelector('.video-poster-image')) {
                    playVideo(wrapper, videoId, videoType, useTheaterMode);
                }
            });

            if (closeButton) {
                closeButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closePlayer();
                });
            }

            if (fullscreenButton) {
                fullscreenButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFullscreen(wrapper);
                });
            }
        });
    }

    function toggleFullscreen(wrapper) {
        // Theater mode replaces fullscreen - redirect to theater mode
        const videoId = wrapper.getAttribute('data-video-id');
        const videoType = wrapper.getAttribute('data-video-type');
        
        if (videoId && videoType) {
            openTheaterMode(videoId, videoType);
        }
    }

    function playVideo(wrapper, videoId, videoType, useTheaterMode) {
        const videoContainer = wrapper.querySelector('.video-container');
        const posterContainer = wrapper.querySelector('.video-poster-container');
        
        if (!videoContainer) return;

        if (videoContainer.classList.contains('initialized')) {
            showVideo(wrapper);
            return;
        }

        let videoElement;
        if (videoType === 'youtube') {
            videoElement = createYouTubeEmbed(videoId);
        } else if (videoType === 'vimeo') {
            videoElement = createVimeoEmbed(videoId);
        } else {
            videoElement = createHTML5Video(videoId);
        }

        videoContainer.appendChild(videoElement);
        videoContainer.classList.add('initialized');

        const player = new Plyr(videoElement, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'],
            settings: ['quality', 'speed'],
            keyboard: { focused: true, global: false },
            tooltips: { controls: true, seek: true },
            clickToPlay: true,
            hideControls: false,
            resetOnEnd: false,
            fullscreen: { enabled: true, fallback: true, iosNative: false }
        });

        wrapper.player = player;
        showVideo(wrapper);
        
        // Show fullscreen button when video starts playing
        const fullscreenBtn = wrapper.querySelector('.video-player-fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.style.display = 'flex';
        }
        
        player.play();
        
        // Update fullscreen button when Plyr fullscreen state changes
        if (player.on) {
            player.on('enterfullscreen', function() {
                if (fullscreenBtn) {
                    fullscreenBtn.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h4v2H6v2H4V4zm8 0h4v4h-2V6h-2V4zM4 14h2v-2h2v4H4v-2zm12 0v2h-4v-2h2v-2h2v2z"/></svg>';
                }
            });
            
            player.on('exitfullscreen', function() {
                if (fullscreenBtn) {
                    fullscreenBtn.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h4v2H4v2H2V2zm12 0h4v4h-2V4h-2V2zM2 16h2v-2h2v4H2v-2zm16 0v2h-4v-2h2v-2h2v2z"/></svg>';
                }
            });
        }
    }

    function createYouTubeEmbed(videoId) {
        // Extract video ID from URL if full URL provided
        if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
            videoId = extractYouTubeId(videoId);
        }

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        return iframe;
    }

    function createVimeoEmbed(videoId) {
        // Extract video ID from URL if full URL provided
        if (videoId.includes('vimeo.com')) {
            const match = videoId.match(/vimeo\.com\/(\d+)/);
            videoId = match ? match[1] : videoId;
        }

        const iframe = document.createElement('iframe');
        iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0`;
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        return iframe;
    }

    function createHTML5Video(videoUrl) {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.controls = false;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = 'auto';
        
        return video;
    }

    function extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function showVideo(wrapper) {
        const posterContainer = wrapper.querySelector('.video-poster-container');
        const videoContainer = wrapper.querySelector('.video-container');
        
        if (posterContainer) posterContainer.style.display = 'none';
        if (videoContainer) videoContainer.classList.add('active');
    }

    window.VideoPlayer = {
        playVideo: playVideo,
        closePlayer: closePlayer
    };

})();
