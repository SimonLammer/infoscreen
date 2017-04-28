var pages = [
    {
        name: 'Home',
        vueConfig: {
            template: `
            <div id="home">
                <h1>Home</h1>
                <ul>
                    <li v-for="page in pages">
                        {{ page.name }}
                    </li>
                </ul>
            </div>`,
            data: function() {
                return {
                    pages: pages
                };
            }  
        },
        navbarItems: [
            {
                class: "glyphicon glyphicon-alert",
                text: "View on GitHub",
                click: function() {
                    alert('1');
                }
            }
        ]
    },
    {
        name: 'Editor',
        vueConfig: {
            template: `
            <div id="editor">
                <div style="background-color: #567;">
                <div id="preview" />
                <div id="viewProperties" />
                <div id="right">
                    <div id="controls" />
                    <div id="navigation" />
                    <div id="containerProperties" />
                </div>
                asdf
                </div>
            </div>`
        },
        navbarItems: []
    }
];