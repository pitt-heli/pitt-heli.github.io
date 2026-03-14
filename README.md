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
The Projects page is built from the HTML structure in `./projects.html`, the page-specific styling in
`./static/css/projects.css`, and the expand/collapse behavior in `./static/js/projects.js`.
Each project is represented by one `<article class="project-card">` block inside the
`<div class="projects-list">` container.

## Projects Template
``` HTML
<article class="project-card" id="project-example">
    <button class="project-card-toggle" type="button" aria-expanded="false" aria-controls="project-example-content">
        <span class="project-card-title">PROJECT NAME</span>
        <span class="project-card-summary-action">Know more <span aria-hidden="true">↓</span></span>
    </button>
    <div class="project-card-content" id="project-example-content" hidden>
        <p>Your full project description goes here.</p>
        <div class="project-card-footer">
            <a href="#" class="project-card-link">Link</a>
            <button class="project-card-close" type="button" aria-label="Collapse PROJECT NAME details">×</button>
        </div>
    </div>
</article>
```

### Adding Projects
To add a new project, open `./projects.html` and find the `<div class="projects-list">` section.
Copy one existing `<article class="project-card">` block and paste it below the last project.
Then update the following values:
- The outer `id`, for example `project-example`
- The `aria-controls` value on the toggle button
- The inner content `id` on the `.project-card-content`
- The visible project title
- The description text
- The `href` on the `Link`
- The `aria-label` on the close button

### Removing Projects
To remove a project, delete the full `<article class="project-card"> ... </article>` block for that project
from `./projects.html`.

### Updating Projects
To update project content, edit the matching project card in `./projects.html`.
Common updates include:
- Change the title in `.project-card-title`
- Change the description inside `.project-card-content p`
- Replace `href="#"` with the real project URL

If you need to adjust spacing, colors, card sizes, or footer/header appearance on the Projects page,
make those changes in `./static/css/projects.css`.
If you need to change how the expand/collapse interaction works, edit `./static/js/projects.js`.


# Classes
The Classes page is built from the HTML structure in `./classes.html` and the page-specific styling in
`./static/css/classes.css`.
Each class is represented by one `<article class="class-card">` block inside the
`<div class="classes-grid">` container.

## Classes Template
``` HTML
<article class="class-card">
    <h2>COURSE TITLE</h2>
    <div class="class-card-body">
        <p>Your full course description goes here.</p>
    </div>
</article>
```

### Adding Classes
To add a new class, open `./classes.html` and find the `<div class="classes-grid">` section.
Copy one existing `<article class="class-card">` block and paste it where you want the new class to appear.
Then update:
- The course title in the `<h2>`
- The course description in the `<p>`

If you want the new card to be vertically offset like the current staggered layout, you can reuse or add
class names such as `class-card-offset` and then define the spacing in `./static/css/classes.css`.

### Removing Classes
To remove a class, delete the full `<article class="class-card"> ... </article>` block for that class
from `./classes.html`.

### Updating Classes
To update a class, edit the corresponding card in `./classes.html`.
If you need to change layout, card width, spacing, colors, header styling, or footer spacing on this page,
make those changes in `./static/css/classes.css`.
