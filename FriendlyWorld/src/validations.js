const { body } = require('express-validator');
//TODO check validator
const registrationValidation = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('repass').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match')]
const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];
const createEditValidation = [
    body('name').isLength({ min: 2 }).withMessage('Name is invalid'),
    body('need').isLength({ min: 3 }).withMessage('Too short first need'),
    body('kind').isLength({ min: 3 }).withMessage('Too short last kind'),
    body('image').isURL({
        require_tld: false,
    }).withMessage('Invalid Image')]
module.exports = { createEditValidation, loginValidation, registrationValidation }