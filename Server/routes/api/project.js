const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Project = require('../../models/Project')

const SERVER_ERROR = 'Server error'
const DECENTING_ORDER = -1
const ASCENDING_ORDER = 1

/**
 * Route to get all projects sorted in descending order by date
 * @route GET /api/projects
 * @returns JSON array of projects
 * @access Public
 * 
 * @throws 500 - Server error
 * 
 */
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({date: -1});
        res.json(projects)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(SERVER_ERROR)
    }
});

/**
 * Create a new project
 * @route POST api/projects
 * @access Private
 * 
 * @throws 500 - Server error
 * 
 */
router.post('/',
[auth, check('title', 'Title is required').notEmpty()],
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) 
        return res.status(400).json({ errors: errors.array() });
    
    const { title,
            description, 
            program_language, 
            github_link 
          } = req.body;

    try{
        const newProject = new Project({
            user: req.user.id,
            title,
            description,
            program_language,
            github_link
        });

        const project = await newProject.save();
        res.json(project)

    } catch(err) {
        console.error(err.message);
        res.status(500).send(SERVER_ERROR);
    }
});

/**
 * Update a project by id
 * @route PUT api/projects/:id
 * @access Private
 * 
 * @throws {404} If the project with the specified id is not found
 * @throws {401} If the user is not authorized to access this endpoint
 * @throws {500} If there is a server error
 *
 */
router.put('/:id', auth, async (req, res) =>{

  const projectFields = {};
  if (req.body.title) projectFields.title = req.body.title;
  if (req.body.description) projectFields.description = req.body.description;
  if (req.body.program_language) projectFields.program_language = req.body.program_language;
  if (req.body.github_link) projectFields.github_link = req.body.github_link;

  try{
    let project = await Project.findById(req.params.id)

    if(!project)
        return res.status(404).json({msg:'Project not found'});

    if(project.user.toString() !== req.user.id) 
        return res.status(401).json({msg:'User not authorized'});
    
    project = await Project.findByIdAndUpdate(
        req.params.id,
        { $set: projectFields},
        { new: true}
    );

    res.json(project);
  } catch(err){
    console.error(err.message);
    res.status(500).send(SERVER_ERROR);
  }
});

/**
 * Update a project by id
 * @route PUT api/projects/:id
 * @access Private
 * 
 * @throws {404} If the project with the specified id is not found
 * @throws {401} If the user is not authorized to access this endpoint
 * @throws {500} If there is a server error
 *
 */
router.delete('/:id', auth, async (req, res) =>{
  
    try{
      let project = await Project.findById(req.params.id)
  
      if(!project)
          return res.status(404).json({msg:'Project not found'});
  
      if(project.user.toString() !== req.user.id) 
          return res.status(401).json({msg:'User not authorized'});
      
      await Project.findByIdAndDelete(req.params.id);
      res.json({msg: "Project Removed"});
    }
    catch(err){
      console.error(err.message);
      res.status(500).send(SERVER_ERROR);
    }
  });

module.exports = router;
