const { body } = require('express-validator');
const registrationValidation = [
    //TODO check validator
    body('email').isEmail().withMessage('Email is invalid'),
    body('firstName').isLength({ min: 3 }).withMessage('Too short first name'),
    body('lastName').isLength({ min: 3 }).withMessage('Too short last name'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('repass').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match')]
const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];
const createEditValidation = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('firstName').isLength({ min: 3 }).withMessage('Too short first name'),
    body('lastName').isLength({ min: 3 }).withMessage('Too short last name'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('repass').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match')]
module.exports = { createEditValidation, loginValidation, registrationValidation }