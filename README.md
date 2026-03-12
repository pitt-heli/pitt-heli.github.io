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