# University Of Pittsburgh's HELI Lab
This is the University Of Pittsburgh's HUMAN-CENTERED ENVIRONMENTS FOR LEARNING INNOVATION Lab 
Portfolio Website. This site showcases the HELI labs members, projects, publications, classes, and 
how to join the lab if you are interested. 


# People 
The People page is populated through a JSON file that houses the names, headshot locations, bios, and
linkedin page links of the Principal investigator, grad/undergrad Students, and Alumni. To add, remove, 
or update this page you will need to go into the JSON file located at `./static/data/people.json`. 
Inside this JSON the people are seperated via groups named; `principal_investigator`, `phd_students`, 
`undergraduate_students`, & `alumni_students`. These groups are used to determine which sections are 
populated 
## Principal Investigator, Undergrad Students, & Grad Students Template 
``` JSON
{
    "name": "First Last",
    "image": "./static/images/headshots/First Last.png",
    "bio": "This is the persons full bio inside quotation marks.",
    "linkedin": "https://www.linkedin.com/in/their-personalized-link/"
}
```
## Alumni Students Template 
``` JSON
{
    "name": "First Last",
    "image": "./static/images/headshots/First Last.png",
}
```
### Adding People 
To add a person to the JSON file you will first need to first find the correct group they fit in,
`phd_students`, `undergraduate_students`, etc. Then inside of the section you will need to add a comma
after the last set of curly braces and then add a new set of curly braces copying the respective template
above and filling in the person's information. 

### Removing People
To remove a person from the JSON file you will need to find the person and where they are located in the group. 
* If they are the first person in their group: 
    * Delete everything from the starting curly brace to the comma after the closing curly brace
* If they are a person in the middle of the group: 
    * Same as the first person in the group; Delete everything from the starting curly brace to the 
    comma after the closing curly brace
* If they are the last person in the group: 
    * Delete everything from starting curly brace to closing curly brace 

### Updating People
Making updates to a person in this database is quite simple; you find the desired person to update and
then inside their respective curly brace you modify either their `name`, `image`, `bio`, or `linkedin`
with the desired changes. 


# Projects
The Projects page is populated through the JSON file located at `./static/data/projects.json`.
The HTML container lives in `./projects.html`, the page-specific styling lives in
`./static/css/projects.css`, and the expand/collapse behavior plus rendering logic live in
`./static/js/projects.js`.
Each project in the JSON file becomes one project card on the page.

## Projects Template
``` JSON
{
    "id": "project-id",
    "title": "PROJECT NAME",
    "description": "Your full project description goes here.",
    "link": "https://example.com",
    "modifierClass": ""
}
```

### Adding Projects
To add a new project, open `./static/data/projects.json` and add a new JSON object to the array.
Then update the following values:
- `id`: a short unique id such as `project-id`
- `title`: the project name shown on the card
- `description`: the full project description
- `link`: the destination for the `Link`
- `modifierClass`: leave this as `""` unless a special layout class is added in CSS later

### Removing Projects
To remove a project, delete its full JSON object from `./static/data/projects.json`.

### Updating Projects
To update project content, edit the matching object in `./static/data/projects.json`.
Common updates include:
- Change `title`
- Change `description`
- Replace `link` with the real project URL

If you need to adjust spacing, colors, card sizes, or footer/header appearance on the Projects page,
make those changes in `./static/css/projects.css`.
If you need to change how the expand/collapse interaction works, edit `./static/js/projects.js`.


# Classes
The Classes page is populated through the JSON file located at `./static/data/classes.json`.
The HTML container lives in `./classes.html`, and the page-specific styling lives in
`./static/css/classes.css`. Rendering logic lives in `./static/js/classes.js`.
Each class in the JSON file becomes one class card on the page.

## Classes Template
``` JSON
{
    "title": "COURSE TITLE",
    "description": "Your full course description goes here.",
    "modifierClass": ""
}
```

### Adding Classes
To add a new class, open `./static/data/classes.json` and add a new JSON object to the array.
Then update:
- `title`
- `description`
- `modifierClass`

If you want the new card to be vertically offset like the current staggered layout, you can reuse or add
class names such as `class-card-offset` and then define the spacing in `./static/css/classes.css`.

### Removing Classes
To remove a class, delete its full JSON object from `./static/data/classes.json`.

### Updating Classes
To update a class, edit the corresponding object in `./static/data/classes.json`.
If you need to change layout, card width, spacing, colors, header styling, or footer spacing on this page,
make those changes in `./static/css/classes.css`.
