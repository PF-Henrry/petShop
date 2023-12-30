import category from "@/models/category";

const deleteCategory = async(req, res) => {
    const { id } = req.query;

    try {
        const deleteCategory = await category.findByIdAndDelete(id);

        if(!deleteCategory){
            return res.status(404).json({message: "No Category Found"});
        }

        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default deleteCategory;