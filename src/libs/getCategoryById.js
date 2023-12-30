import category from "@/models/category";
import category from "@/models/category";

const getCategoriesById = async(req, res) => {
    const id = req.query;

    try {
        const category = await category.findById(id);

        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

export default getCategoriesById;