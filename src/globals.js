var infoscreen = {
    name: 'Unnamed Infoscreen',
    container: [
        /*{
            name: 'Sample container',
            position: {
                x: 4,             //  4 %
                y: 10             // 10 %
            },
            size: {
                width: 11,        // 11 %
                height: 12        // 12 %
            },
            z-index: 4,
            view: {
                type: 'Color',    // ModuleType name
                arguments: {
                    // color: '#900' // could be set to a fixed value here, but in this example, the color should change dynamically, according to the 'Color' variable
                },
                variables: {
                    color: 5      // use the value of the variable with id 5 as color input-variable 'color' (defined in the ModuleType)
                }
            }
          }*/
    ],
    processes: [
        /*{
            type: 'Incrementor (Sample Process)',
            arguments: {
                // inputValueA: 'fixed value'
            },
            variables: {
                number: 6         // use value of variable with id 6 as input-variable 'number'
            },
            outputs: {
                result: 7         // save result in variable with id 7
            }
        }*/
    ],
    variables: [
        /*{
            id: 5,
            name: 'Color',
            initialValue: '#900'
        },{
            id: 6,
            name: 'Number',
            initialValue: 1
        },{
            id: 7,
            name: 'Incremented Number',
            initialValue: 0
        }*/
    ]
};

var idCounter = 0;
function getNextId(){
    return ++idCounter;
}

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
    },{
        name: 'Editor',
        vueConfig: {
            template: `
            <div id="editor">
                <div style="background-color: #567;">
                <div id="preview" />
                <div id="viewProperties" />
                <div id="right">
                    <div id="controls" >
                        <button v-on:click="addContainer">Add Container</button>
                    </div>
                    <div id="navigation" />
                    <div id="containerProperties" />
                </div>
                asdf
                </div>
            </div>`,
            methods:{
                addContainer: function(event){
                    infoscreen.container.push(createDefaultContainer());
                }
            }
        },
        navbarItems: []
    },{
        name: 'Viewer',
        vueConfig: {
            template: `<div id="viewer">
                <my-viewer class="maximize" />
            </div>`
        },
        navbarItems: []
    }
];