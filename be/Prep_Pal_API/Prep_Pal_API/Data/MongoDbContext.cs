using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Prep_Pal_API.Configuration;
using Prep_Pal_API.Models;

namespace Prep_Pal_API.Data
{
    public class MongoDbContext
    {

        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbConfiguration> settings)
        {
            // Create a new MongoClient with the connection string from settings
            var client = new MongoClient(settings.Value.ConnectionString);
            // Get the specified database
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        // Define collections for the models
        public IMongoCollection<PromptsModel> PromptsModels =>
            _database.GetCollection<PromptsModel>("PromptsModels");

        public IMongoCollection<QuestionModel> QuestionModels =>
            _database.GetCollection<QuestionModel>("QuestionModels");
    }
}
