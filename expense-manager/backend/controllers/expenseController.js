import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        const expense = await Expense.create({
            userId: req.user.id,
            title,
            amount,
            category,
            date
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};