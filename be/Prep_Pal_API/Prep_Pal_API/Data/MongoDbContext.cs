using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Prep_Pal_API.Configuration;
using Prep_Pal_API.Models;

namespace Prep_Pal_API.Data
{
    public class MongoDbContext
    {

        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbConfiguration> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<PromptsModel> PromptsModels =>
            _database.GetCollection<PromptsModel>("PromptsModels");
    }
}
