# TODO

## Status

Curren status is that I am remaking this node app into an app that has my journals in it. Its like an index app or something.

My current goal is to get all the necessary assets created for the app itself. What I need to make are.

1. Get a json file that has all the data in it for each journal.
   a. name
   b. date
   c. pages
   d. cover image
   With this I needed to resize all the images down to a smaller size. I used ImageMagick for this.
   `ls | sed "s/.*/convert & -resize 200x300 &/" | sh`

   e. full index
   f. short description
   g. indexed(true/false)
   h. pdf made(true/false)

2. create HTML files
   Do this by creating the whole website, minus the functionality outside of the app and get all the styles working as they should and then create the app after that.

   So here I need to make templates and then use a javascript function to replace the items in the templates.

3. Style with tailwind.

   So here I want to integrate tailwind into the design process. Probly have to use the CDN in this case.

## TODO

Now that I have created the html templates I must figure out how to take information from the dataset and populate the templates in a way were if the book belongs to the first section then it will be a certain color. And the books will be added to the template in a certain order depending on the dataset.
