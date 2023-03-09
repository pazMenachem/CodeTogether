const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Project = require('../../models/Project')

const SERVER_ERROR = 'Server error'
const DECENTING_ORDER = -1
const ASCENDING_ORDER = 1
const TITLE_MAX_LENGTH = 15

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
        const projects = await Project.find().sort({date: DECENTING_ORDER});

        res.json(projects)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(SERVER_ERROR)
    }
});

/**
 * Route to get all id user projects
 * @route GET /api/projects/:id
 * @returns JSON array of user projects
 * @access Private
 * 
 * @throws 500 - Server error
 * 
 */
router.get('/user/:id', async (req, res) => {
    try {
        const projects = await Project.find({user: req.params.id});
        res.json(projects)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(SERVER_ERROR)
    }
});

/**
 * Route to get Project by project id.
 * @route GET /api/projects/:id
 * @returns JSON array of user projects
 * @access Private
 * 
 * @throws 500 - Server error
 * 
 */
router.get('/:id', async (req, res) => {
    try {
        let project = await Project.findById(req.params.id)
        res.json(project)
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
           [check('githubLink', 'GithubLink is required').notEmpty(),
            check('title').custom(async (value) => {;
            if (!value || value.length > TITLE_MAX_LENGTH) throw new Error('Unvalid title length.');
            return true;
            }),
            check('title').custom(async(value) => {
            if (await Project.findOne({title: value })) throw new Error('Title name aleardy taken.');
            return true;
            }),
           auth],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) 
        return res.status(400).json({ errors: errors.array() });

    const { title,
            description, 
            programLanguage, 
            githubLink,
            difficult,
            projectStartDate,
            contactLink,
            image,
          } = req.body;

    try{
        const newProject = new Project({
            user: req.user.id,
            title,
            description,
            programLanguage,
            githubLink,
            difficult,
            projectStartDate,
            contactLink,
            image,
        });

        const project = await newProject.save();
        res.json(project)

    } catch(err) {
        console.error(err.message);
        res.status(500).send(SERVER_ERROR);
    }
});

/**
 * Update a project by title
 * @route PUT api/projects/
 * @access Private
 * 
 * @throws {404} If the project with the specified id is not found
 * @throws {401} If the user is not authorized to access this endpoint
 * @throws {500} If there is a server error
 *
 */
router.put('/', 
           [check('githubLink', 'GithubLink is required').notEmpty(),
            check('title').custom(async (value) => {;
                    if (!value || value.length > TITLE_MAX_LENGTH) throw new Error('Unvalid title length.');
                    return true;
                 }),
            auth],
            async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const {
        title,
        description,
        programLanguage,
        githubLink,
        difficult,
        projectStartDate,
        contactLink,
        image
      } = req.body;
    
      const projectFields = {
        title,
        description,
        programLanguage,
        githubLink,
        difficult,
        projectStartDate,
        contactLink,
        image
      };

  try{
    let project = await Project.findOne({ title: req.body.title })

    if(!project)
        return res.status(404).json({msg:'Project not found'});

    if(project.user.toString() !== req.user.id) 
        return res.status(401).json({msg:'User not authorized'});
    project = await Project.findOneAndUpdate(
        { title: req.body.title },
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
 * @route Delete api/projects/:id
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
