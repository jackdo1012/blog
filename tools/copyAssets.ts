import * as shell from "shelljs"

// copy all the view templates
setInterval(() => {
    shell.cp("-R", "./src/views/", "./dist/")
    shell.cp("-R", "./src/public/", "./dist/")
}, 1000)
