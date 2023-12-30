import category from "@/models/category";

const getCategories = async(req, res) => {
    try {
        const categories = await category.find({});
        return res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

export default getCategories;