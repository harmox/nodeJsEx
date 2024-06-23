const { body } = require('express-validator');
const registrationValidation = [
    body('email').isEmail().isLength({ min: 10, max: 20 }).withMessage('Email is invalid'),
    body('username').isLength({ min: 2, max: 20 }).withMessage('Too short for username'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 5 characters long'),
    body('repass').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match')]
const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];
const createEditValidation = [
    body('title').trim().isLength({ min: 2 }).withMessage('Title is too short'),
    body('description').trim().isLength({ min: 10, max: 100 }).withMessage('Invalid description must be in 10-100'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('Invalid ingredients must be in 10-200'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('Too short instructions'),
    body('image').isURL({ require_tld: false, }).withMessage('Invalid image')]
module.exports = { createEditValidation, loginValidation, registrationValidation }