import category from "@/models/category";

const updateCategory = async(req, res) => {
    const { id } = req.query;
    const { name } = req.body;

    try {
        const updateCategory = await category.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if(!updateCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json(updateCategory);
    } catch (error) {
        res.status(500).json({ error: ' Internal Server Error' });
    }
};

export default updateCategory;