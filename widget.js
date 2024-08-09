// ai-enhanced-inputs.js
document.addEventListener('DOMContentLoaded', function () {
    // Create a new style element
    var style = document.createElement('style');

    // Add CSS rules to the style element
    style.innerHTML = `
    .magic-ai {
        position: absolute;
        right: 3px;
        z-index: 10;
        outline: none;
        border: 1px solid;
        background: rgb(249, 244, 255);
        border-color: rgb(134, 79, 207);
        color: rgb(85, 39, 144);
        border-radius: 0.5rem;
        padding: 1px 6px 0px 6px;
    }
    .magic-ai:hover {
        background-color: #f1e7fc;
        border-color: #6f37ba;
    }
    .magic-ai svg {
        width: 1em;
        height: 1em;
    }
    .magic-ai-menu {
        display: none;
        position: absolute;
        right: 10px;
        bottom: 40px;
        width: 190px;
        border: 1px solid #ddd;
        border-radius: 0.5em;
        background: #2d2c2d;
        color: #dddddd;
        padding: 3px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 20;
    }
    .magic-ai-submenu {
        display: none;
    }
    .magic-ai-menu-item:hover .magic-ai-submenu {   
        position: absolute;
        display: block;
        left: calc(100% - 5px);
        bottom: 40px;
        width: 190px;
        border: 1px solid #ddd;
        border-radius: 0.5em;
        background: #3d3d3d;
        color: #2b2c2c;
        padding: 3px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 20;
    }
    .magic-ai-menu.show {
        display: block;
    }
    .magic-ai-menu-item {
        cursor: pointer;
        margin: 2px;
        border-radius: 0.2em;
        padding: 0.3em;
        color: #d7d7d7;
    }
    .magic-ai-menu-item span.icon {
        width: 22px;
        display: inline-block;
    }
    .magic-ai-menu-item span.icon svg {
        fill: #8e5eaa;
        width: 1em;
        height: 1em;
    }
    .magic-ai-menu-item:hover {
        background: gray;
    }
    .magic-ai-menu-item.group::after {
        content: '>';
        width: 1em;
        height: 1em;
        display: inline-block;
        right: 0.5em;
        position: absolute;
        font-family: monospace;
    }
    /* Add more CSS rules as needed */
    `;

    // Append the style element to the head (common practice)
    document.head.appendChild(style);

    function hideMenu(aiMenu) {
        let classNames = aiMenu.className.split(' ');
        const showidx = classNames.findIndex((v) => v == 'show');
        if(showidx>=0) classNames.splice(showidx, 1);
        aiMenu.className = classNames.join(' ');
    }
    // Function to create the AI button and menu
    function enhanceInputElement(inputElement) {
        // Create the AI button element
        let padding = 3;
        const aiButton = document.createElement('button');        
        aiButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.18 5.324c.454 0 .85.306.965.746.516 1.976 1.087 3.215 1.957 4.14.873.927 2.142 1.638 4.263 2.353a.997.997 0 0 1 0 1.89c-2.12.715-3.39 1.427-4.263 2.354-.87.925-1.441 2.164-1.957 4.14a.998.998 0 0 1-1.93 0c-.516-1.976-1.087-3.215-1.957-4.14-.873-.927-2.142-1.639-4.263-2.353a.997.997 0 0 1 0-1.891c2.12-.715 3.39-1.426 4.263-2.354.87-.924 1.441-2.163 1.957-4.14a.997.997 0 0 1 .965-.745Zm-4.19 8.184c1.094.535 1.987 1.153 2.72 1.932.607.644 1.08 1.373 1.47 2.205.39-.832.863-1.561 1.47-2.205.733-.78 1.626-1.397 2.72-1.932-1.094-.534-1.987-1.152-2.72-1.931-.607-.644-1.08-1.373-1.47-2.206-.39.833-.863 1.562-1.47 2.205-.733.78-1.626 1.398-2.72 1.932ZM17.587 1.67c.454 0 .85.305.965.744.284 1.082.582 1.695.999 2.136.42.445 1.057.816 2.227 1.209a.998.998 0 0 1 0 1.891c-1.17.393-1.807.764-2.227 1.21-.417.44-.715 1.053-.999 2.135a.997.997 0 0 1-1.93 0c-.283-1.082-.581-1.695-.998-2.136-.42-.445-1.057-.816-2.227-1.209a.997.997 0 0 1 0-1.891c1.17-.393 1.806-.764 2.227-1.209.417-.44.715-1.054.998-2.136a.997.997 0 0 1 .965-.745Zm0 3.601c-.151.23-.32.446-.513.65-.283.298-.6.556-.955.784.355.228.672.485.955.784.192.204.362.42.513.649.152-.23.322-.445.514-.649.282-.299.6-.556.955-.784a5.062 5.062 0 0 1-.955-.785 4.775 4.775 0 0 1-.514-.649ZM18.914 14.694c.451 0 .847.303.963.74.205.763.41 1.154.671 1.425.268.277.692.53 1.544.81a.998.998 0 0 1 0 1.896c-.852.28-1.276.533-1.544.81-.261.27-.466.662-.67 1.426a.998.998 0 0 1-1.928 0c-.204-.764-.41-1.155-.67-1.426-.268-.277-.692-.53-1.545-.81a.998.998 0 0 1 0-1.896c.853-.28 1.277-.533 1.544-.81.262-.27.467-.662.671-1.426a.998.998 0 0 1 .964-.74Zm0 3.327a3.683 3.683 0 0 1-.616.596 3.822 3.822 0 0 1 .616.596 3.68 3.68 0 0 1 .616-.596 3.793 3.793 0 0 1-.616-.596Z" fill="currentColor"></path></svg>';
        aiButton.className = 'magic-ai'
        aiButton.style.height = (inputElement.offsetHeight - padding * 2) + "px";
        let marginbottom = inputElement.style.marginBottom;
        if(inputElement.tagName == "TEXTAREA") {
            marginbottom = 4;
            aiButton.style.height = '2em';
        }
        aiButton.style.bottom = padding + marginbottom + 'px';

        // Create a wrapper div to position the button correctly
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';

        // Wrap the input element
        inputElement.parentNode.insertBefore(wrapper, inputElement);
        wrapper.appendChild(inputElement);

        // Append the AI button inside the wrapper div
        wrapper.appendChild(aiButton);

        // Create the AI menu element
        const aiMenu = document.createElement('div');
        aiMenu.className = 'magic-ai-menu';

        // Create menu options
        const options = [
            {
                html: '<span class="icon"><svg class="use-chat-gpt-ai--MuiSvgIcon-root use-chat-gpt-ai--MuiSvgIcon-fontSizeMedium use-chat-gpt-ai-context-menu-e8cpb9" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TranslateOutlinedIcon"><path d="m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z"></path></svg></span>Translate',
                type: 'group',
                children: [
                    {
                        html: 'To English',
                        type: 'translate',
                    },
                    {
                        html: 'To Spanish',
                        type: 'translate',
                    },
                    {
                        html: 'To Dutch',
                        type: 'translate',
                    }
                ]
            },
            {
                html: '<span class="icon"><svg class="use-chat-gpt-ai--MuiSvgIcon-root use-chat-gpt-ai--MuiSvgIcon-fontSizeMedium use-chat-gpt-ai-context-menu-e8cpb9" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShortTextIcon"><path d="M4 9h16v2H4V9zm0 4h10v2H4v-2z"></path></svg></span>Make shorter',
                type: 'shorter',
            },
            {
                html: '<span class="icon"><svg class="use-chat-gpt-ai--MuiSvgIcon-root use-chat-gpt-ai--MuiSvgIcon-fontSizeMedium use-chat-gpt-ai-context-menu-e8cpb9" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SubjectIcon"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></svg></span>Make longer',
                type: 'longer',
            },
            {
                html: '<span class="icon"><svg class="use-chat-gpt-ai--MuiSvgIcon-root use-chat-gpt-ai--MuiSvgIcon-fontSizeMedium use-chat-gpt-ai-context-menu-e8cpb9" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DoneIcon"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg></span>Fix spelling & grammar',
                type: 'spelling',
            }
        ];
        function addMenu(parent, options) {
            options.forEach(function (option) {
                const menuOption = document.createElement('div');
                menuOption.innerHTML = option.html;
                menuOption.className = 'magic-ai-menu-item'
                if(option.type == 'group') menuOption.className += ' group';

                // Event listener for menu options
                menuOption.addEventListener('click', function () {
                    console.log('AI action selected:', option.type);
                    // Placeholder: Implement AI functionality here
                    hideMenu(aiMenu);
                });

                parent.appendChild(menuOption);
                
                if(option.type == 'group') {
                    const submenu = document.createElement('div');
                    submenu.className = 'magic-ai-submenu';
                    menuOption.appendChild(submenu);
                    addMenu(submenu, option.children);
                }
            });
        }
        addMenu(aiMenu, options);

        // Append the AI menu to the wrapper div
        wrapper.appendChild(aiMenu);

        // Toggle the AI menu display on button click
        aiButton.addEventListener('click', function () {
            let classNames = aiMenu.className.split(' ');
            const showidx = classNames.findIndex((v) => v == 'show');
            if(showidx>=0) classNames.splice(showidx, 1);
            else classNames.push('show');
            aiMenu.className = classNames.join(' ');
        });

        // Hide the menu if clicked outside
        document.addEventListener('click', function (event) {
            if (!wrapper.contains(event.target)) {
                hideMenu(aiMenu);
            }
        });
    }

    // Select all text input and textarea elements
    const inputElements = document.querySelectorAll('input[type="text"].enhance, textarea.enhance');
    inputElements.forEach(enhanceInputElement);
});