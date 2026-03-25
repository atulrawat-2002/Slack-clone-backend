function crudRepository (schema) {
    return {
        model: schema,
        create: async function (data) {
            const newDoc = await this.model.create(data);
            const withSenderInfo = await newDoc.populate('senderId', 'username email avatar');
            return withSenderInfo;
        },
        getAll: async function () {
            const allDoc = await this.model.find();
            return allDoc;
        },
        getById: async function (id) {
            const doc = await this.model.findById(id);
            return doc;
        },
        delete: async function (id) {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        },
        update: async function (id, data) {
            const updatedDoc = await this.model.findByIdAndUpdate(id, data, {
            returnDocument: 'after',
            runValidators: true
        });
            return updatedDoc
        },
        deleteMany: async function(modelIds) {
        const response = await this.model.deleteMany({
            _id: {
                $in: modelIds
            }
        });
        return response;
        }
    }
}

export default crudRepository;