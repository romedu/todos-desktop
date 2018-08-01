"Multi Todo App"

const app = {
	state: [
		"showBackDrop",
		"showSideDrawer",
		"showModal",
		"loading"
	],
	props: [
		"user",
		"message",
		"verifyToken"
	],
	methods: [
		"showSideDrawer",
		"hideSideDrawer",
		"showModal",
		"hideModal"
	],
	contains: [
		{
			name: "Nav",
			type: "container",
			contains: [
				{
					name: "NavBar",
					type: "container",
					props: ["user"],
					contains: [
						{
							name: "Logo",
							type: "ui component",
							linksTo: "TodoApp"
						},
						{
							name: "NavItems",
							type: "component",
							contains: {
								name: "NavItem",
								type: "component"
							}
						}
					]
				},
				{
					name: "Toolbar",
					type: "container",
					contains: [
						{
							name: "Logo",
							type: "ui component",
							linksTo: "TodoApp"
						},
						{
							name: "Hamburger",
							type: "ui component"
						}
					]
				},
				{
					name: "SideDrawer",
					type: "container",
					props: [
						"user",
						"currentFolder"
					],
					contains: [
						{
							name: "NavItems",
							type: "component",
							props: ["currentFolder"],
							contains: {
								name: "NavItem",
								type: "component"
							}
						}
					]
				}
			]
		},
		,
		{
			name: "modal",
			type: "component",
			props: [
				"title",
				"message",
				"loading"
			]
		},
		{
			name: "BackDrop",
			type: "ui component",
			props: [
				"hideModal",
				"hideSideDrawer"
			],
			methods: ["hideBackDrop"]
		},
		{
			name: "TodoApp",
			type: "container",
			state: [
				"showItemForm"
			],
			props: [
				"user",
				"loading",
				"message",
				"folders",
				"todoLists",
				"currentFolder",
				"createFolder",
				"updateFolder",
				"deleteFolder",
				"openFolder",
				"closeFolder",
				"createTodoList",
				"updateTodoList",
				"deleteTodoList"
			],
			contains: [
				{
					name: "DisplayIcon",
					type: "component",
					linksTo: ["Folder" || "Todos"],
					props: [
						"name",
						"image",
						"type"
					]
				},
				{
					name: "Folder",
					type: "container",
					props: [
						"name",
						"todoLists",
						"message"
					],
					contains: [
						{
							name: "DisplayIcon",
							type: "component",
							linksTo: ["Todos"],
							props: [
								"name",
								"image",
								"type"
							]
						}
					]
				},
				{
					name: "ItemForm",
					type: "component",
					state: ["inputValues"],
					props: [
						"type",
						"inputValues",
						"updateInput",
						"submitInput",
						"createFolder",
						"createTodoList"
					],
					contains: [
						{
							name: "Button",
							type: "component",
							props: ["type"]
						},
						{
							name: "InputField",
							type: "component",
							props: [
								"name",
								"type",
								"value",
								"placeholder"
							]
						}
					]
				},
				{
					name: "Todos",
					type: "container",
					state: ["inputValue"],
					props: [
						"loading",
						"name",
						"todos",
						"currentFolder",
						"openTodoList",
						"closeTodoList",
						"createTodo",
						"editTodo",
						"deleteTodo"
					],
					methods: [
						"updateInput",
						"submitInput"
					],
					contains: [
						{
							name: "TodosMenu",
							type: "component",
							linksTo: "Todos",
							props: ["todoLists"]
						},
						{
							name: "TodoForm",
							type: "component",
							props: ["inputValue"]
						},
						{
							name: "TodoList",
							type: "component",
							contains: [
								{
									name: "todo",
									type: "component",
									props: [
										"description",
										"id"
									],
									contains: {
										name: "Button",
										type: "ui component"
									}
								}
							]
						}
					]
				}
			]
		},
		{
			name: "Authentication",
			type: "container",
			state: [
				"loginInputs",
				"registerInputs",
				"showingPasswords"
			],
			props: [
				"user",
				"loading",
				"message"
			],
			methods: [
				"update input",
				"submit input",
				"show/hide password"
			],
			contains: [
				{
					name: "AuthForm",
					type: "component",
					props: [
						"type",
						"inputValues",
						"showingPasswords",
						"submitInput",
						"updateInput"
					],
					contains: [
						{
							name: "InputField",
							type: "component",
							props: [
								"name",
								"type",
								"placeholder",
								"value",
								"showingPasswords"
							]
						},
						{
							name: "button",
							type: "ui component",
							props: ["type"]
						}
					]
				}
			]
		}
	]
};

const store = {
	state: {
		user: "user",
		message: "message",
		folder: [
			"currentFolder",
			"folders"
		],
		todoList: [
			"currentTodoList",
			"todoLists"
		]
	},
	actions:{
		folder: [
			"getFolders",
			"removeFolders",
			"openFolder",
			"closeFolder",
			"createFolder",
			"updateFolder",
			"deleteFolder"
		],
		todoList: [
			"getTodoLists",
			"clearTodoList",
			"createTodoList",
			"updateTodoList",
			"deleteTodoList",
			"openTodoList",
			"closeTodoList"
		],
		todo: [
			"createTodo",
			"editTodo",
			"deleteTodo"
		],
		user: [
			"loginUser",
			"logoutUser"
		]
	}
};

const updates = [
	"Random error, showing your token in a message as an error",
	"active resource style in the homeScreen",
	"Update the loader component",
	"Sad css face for empty desktops and folders",
	"update the message when the collection showing in the desktop is empty",
	"update the messages, most should be addressed only in the server",
	"display to the user the max length for naming",
	"make a look for all route",
	"refactor and simplify the whole todoDesktop container",
	"refactor some of the closures that are props",
	"global qwest config",
	"Bug when creating an item while having another user's token different token",
	"Send an email for when an user registers",
	"Handle password reset",
	"Show the folder description on hover",
	"Ajax when scrolling support",
	"set an order to the data received from the db, maybe based on popularity",
	"User Docs",
	"Help Component",
	"Create an exclusive Todo reducer",
	"Enable support for admin users",
	"Animated transitions",
	"full keyboard support",
	"ability to share lists and folders",
	"footer",
	"Enable styling lists",
	"profile Page"
];
