
export async function findOrCreateModel(Model, query) {
    try {
      const result = await Model.findOneAndUpdate(query, query, {
        upsert: true,
        new: true,
        runValidators: true,
      });
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
 