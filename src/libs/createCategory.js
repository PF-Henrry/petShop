import category from "@/models/category";

const createCategory = async(req, res) => {
    const { name } = req.body;

    try {
        const newCategory = await category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default createCategory;