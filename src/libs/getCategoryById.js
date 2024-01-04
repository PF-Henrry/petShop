import category from "@/models/category";

const getCategoryById = async(req, res) => {
    const id = req.query;

    try {
        const categorys = await category.findById(id);

        if(!categorys){
            return res.status(404).json({message: "No Category found with the given ID"});
        }
        res.status(200).json(categorys);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

export default getCategoryById;