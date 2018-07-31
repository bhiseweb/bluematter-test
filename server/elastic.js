var elasticsearch = require('elasticsearch');
var fse = require('fs');

var elasticClient = new elasticsearch.Client({  
    host: '127.0.0.1:9200',
});

var indexName = "project";

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;  

function initMapping() {  
  return elasticClient.indices.putMapping({
      index: indexName,
      type: "document",
      body: {
          properties: {
            industry: { type: "text" },
            skills: {type: "text"},
          }
      }
  });
}
exports.initMapping = initMapping;


function addDocument(document) { 
	const str = document.skills.join(" ");
	return elasticClient.index({
      index: indexName,
      type: "document",
			body: {
				'industry': document.industry,
				'skills': str,
				'description': document.description,
				'email': document.email,
				'name': document.name
			}
  });
}
exports.addDocument = addDocument;


function searchDocument(document) {
	const str = document.skills.join(" ");
  return elasticClient.search({  
    index: indexName,
    type: 'document',
    body: {
			query: {
				"bool": {
					"should": [
						{ "match": { "industry":  document.industry }},
						{ "match": { "skills": str }},
						{ "match": { "description": `${document.industry} ${str} ${document.description}`}}
					]
				}
			},
    }
  });
}
exports.searchDocument = searchDocument;

function filesCreate() {
	return elasticClient.indices.create({
		index: 'files'
	})
	.then(() => {
		// create a mapping for the attachment
		return elasticClient.indices.putMapping({
			index: 'files',
			type: 'document',
			body: {
				document: {
					properties: {
						file: {
							type: 'attachment',
							fields: {
								content: {
									type: 'text',
									store: true
								}
							}
						}
					}
				}
			}
		});
	});
}
exports.filesCreate = filesCreate;

function filesAdd(document) {
	const fileContents = fse.readFileSync(document.path);
	const fileBase64 = new Buffer(fileContents).toString('base64');

	return elasticClient.index({
		index: 'files',
		type: 'document',
		body: {
			file: {
				_content: fileBase64
			}
		}
	})
}
exports.filesAdd = filesAdd;

function filesSearch(document) {
	const str = document.skills.join(" ");
	return elasticClient.search({
		index: 'files',
		type: 'document',
		q: `${document.industry} ${str} ${document.description}`
	});
}
exports.filesSearch = filesSearch

function filesIndexExists() {  
	return elasticClient.indices.exists({
			index: 'files'
	});
}
exports.filesIndexExists = filesIndexExists;  

function deleteFileIndex() {  
	return elasticClient.indices.delete({
			index: 'files'
	});
}
exports.deleteFileIndex = deleteFileIndex;
